# Guía para Integrar Firebase (Login Real y Base de Datos)

Sigue estos pasos para dejar de usar los datos de prueba (Mock) y conectar tu aplicación a los servicios reales de Google.

## Paso 1: Configurar Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/).
2. Haz clic en **"Agregar proyecto"** y sigue los pasos.
3. Una vez creado el proyecto:
   - Ve al menú lateral **Compilación (Build)** -> **Authentication**.
   - Pestaña **Sign-in method**.
   - Habilita el proveedor **Google**.
4. Ve al menú lateral **Compilación (Build)** -> **Firestore Database**.
   - Haz clic en **Crear base de datos**.
   - Selecciona el modo **Test mode** (Modo de prueba) para empezar.
   - Elige una ubicación cercana a ti.

   ⚠️ **IMPORTANTE**: El modo de prueba permite acceso sin restricciones. Para producción, debes configurar reglas de seguridad (ver Paso 5).

## Paso 2: Obtener las claves

1. En tu proyecto de Firebase, haz clic en el engranaje de **Configuración del proyecto** (arriba a la izquierda).
2. Baja hasta la sección **"Tus apps"**.
3. Haz clic en el icono de web `</>`.
4. Registra la app (ponle un nombre como "CofrePrompt").
5. Copia el objeto `firebaseConfig` que aparece en pantalla.

## Paso 3: Instalar la librería

En tu terminal, dentro de la carpeta del proyecto, ejecuta:

```bash
npm install firebase
```

## Paso 4: Actualizar el código

### 4.1. Modificar `services/firebase.ts`

Reemplaza todo el contenido de este archivo con el siguiente código (asegúrate de pegar tu `firebaseConfig` real):

```typescript
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { User, Prompt } from "../types";

// --- PEGA TU CONFIGURACIÓN AQUÍ ---
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123...",
  appId: "1:123..."
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// --- AUTENTICACIÓN ---

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

// Escuchar cambios en el estado de autenticación
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      callback({
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL
      });
    } else {
      callback(null);
    }
  });
};

// --- BASE DE DATOS (PROMPTS) ---

// Guardar un nuevo prompt
export const savePromptToDb = async (promptData: any) => {
  try {
    const promptWithTimestamp = {
      ...promptData,
      createdAt: Timestamp.now() // Usar timestamp de Firestore
    };
    const docRef = await addDoc(collection(db, "prompts"), promptWithTimestamp);
    console.log("Prompt guardado con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error añadiendo documento: ", e);
    throw e;
  }
};

// Obtener todos los prompts
export const getPromptsFromDb = async (): Promise<Prompt[]> => {
  try {
    const q = query(collection(db, "prompts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const prompts: Prompt[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      prompts.push({
        id: doc.id,
        ...data,
        // Convertir Timestamp a string ISO para compatibilidad
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      } as Prompt);
    });

    return prompts;
  } catch (e) {
    console.error("Error obteniendo documentos: ", e);
    return [];
  }
};
```

### 4.2. Modificar `App.tsx`

Ahora conecta la App para que lea y guarde en la base de datos y mantenga la sesión del usuario.

1. Añade estos imports arriba:
   ```typescript
   import { useEffect } from 'react';
   import { getPromptsFromDb, savePromptToDb, onAuthChange } from './services/firebase';
   ```

2. Añade el manejo de persistencia de sesión:

   ```typescript
   // Añade este efecto para mantener la sesión del usuario
   useEffect(() => {
     const unsubscribe = onAuthChange((user) => {
       setUser(user);
     });

     // Cleanup al desmontar el componente
     return () => unsubscribe();
   }, []);
   ```

3. Modifica el estado inicial de prompts y carga datos al inicio:

   ```typescript
   // Reemplaza useState(MOCK_PROMPTS) por:
   const [prompts, setPrompts] = useState<Prompt[]>([]);

   // Añade este efecto para cargar los prompts
   useEffect(() => {
     const loadPrompts = async () => {
       const dbPrompts = await getPromptsFromDb();
       setPrompts(dbPrompts);
     };
     loadPrompts();
   }, []);
   ```

4. Modifica la función `handleCreatePrompt` para guardar correctamente en Firebase:

   ```typescript
   const handleCreatePrompt = async (newPromptData: Omit<Prompt, 'id' | 'likes' | 'views' | 'createdAt'>) => {
     const newPrompt = {
       ...newPromptData,
       likes: 0,
       views: 0
     };

     try {
       // 1. Guardar en Firebase y obtener el ID real
       const docId = await savePromptToDb(newPrompt);

       // 2. Recargar los prompts desde la base de datos
       const dbPrompts = await getPromptsFromDb();
       setPrompts(dbPrompts);

       console.log("Prompt creado con ID:", docId);
     } catch (error) {
       console.error("Error al crear el prompt:", error);
     }
   };
   ```

## Paso 5: Configurar Reglas de Seguridad (Producción)

Una vez que tu app esté funcionando, actualiza las reglas de Firestore en Firebase Console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Solo usuarios autenticados pueden leer prompts
    match /prompts/{promptId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
  }
}
```

## Paso 6: Variables de Entorno (Recomendado)

Para mayor seguridad, mueve las credenciales de Firebase a variables de entorno:

1. Crea un archivo `.env` en la raíz del proyecto:
   ```
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

2. Actualiza `firebase.ts` para usar las variables:
   ```typescript
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID
   };
   ```

3. Añade `.env` a tu `.gitignore` para no subir las credenciales.

¡Listo! Tu aplicación ahora usa autenticación real de Google, mantiene la sesión del usuario y guarda los prompts en la nube de forma segura.
