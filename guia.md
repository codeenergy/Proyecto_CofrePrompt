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
   - Selecciona el modo **Test mode** (Modo de prueba) para empezar (esto permite escribir sin reglas estrictas de seguridad al principio).
   - Elige una ubicación cercana a ti.

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
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
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

// --- BASE DE DATOS (PROMPTS) ---

// Guardar un nuevo prompt
export const savePromptToDb = async (promptData: any) => {
  try {
    const docRef = await addDoc(collection(db, "prompts"), promptData);
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
    // Ordenar por fecha de creación descendente
    const q = query(collection(db, "prompts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const prompts: Prompt[] = [];
    querySnapshot.forEach((doc) => {
      prompts.push({ id: doc.id, ...doc.data() } as Prompt);
    });
    
    return prompts;
  } catch (e) {
    console.error("Error obteniendo documentos: ", e);
    return [];
  }
};
```

### 4.2. Modificar `App.tsx`

Ahora conecta la App para que lea y guarde en la base de datos.

1. Añade estos imports arriba:
   ```typescript
   import { useEffect } from 'react'; // Asegúrate de que useEffect esté en el import de React
   import { getPromptsFromDb, savePromptToDb } from './services/firebase';
   ```

2. Modifica la función principal `App` para cargar datos al inicio:

   ```typescript
   // Reemplaza la línea de useState(MOCK_PROMPTS) por:
   const [prompts, setPrompts] = useState<Prompt[]>([]);
   
   // Añade este efecto justo después de declarar los estados
   useEffect(() => {
     const loadPrompts = async () => {
       const dbPrompts = await getPromptsFromDb();
       if (dbPrompts.length > 0) {
         setPrompts(dbPrompts);
       } else {
         // Fallback a datos de prueba si la DB está vacía
         setPrompts(MOCK_PROMPTS); 
       }
     };
     loadPrompts();
   }, []);
   ```

3. Modifica la función `handleCreatePrompt` para guardar en Firebase:

   ```typescript
   const handleCreatePrompt = async (newPromptData: Omit<Prompt, 'id' | 'likes' | 'views' | 'createdAt'>) => {
     const newPrompt = {
       ...newPromptData,
       likes: 0,
       views: 0,
       // Usamos timestamp ISO para que sea fácil de ordenar
       createdAt: new Date().toISOString() 
     };
     
     // 1. Guardar en Firebase
     await savePromptToDb(newPrompt);
     
     // 2. Recargar la lista (o añadirlo localmente para que sea instantáneo)
     // Opción rápida: añadirlo al estado local
     const promptWithTempId = { ...newPrompt, id: Date.now().toString() };
     setPrompts([promptWithTempId, ...prompts]);
   };
   ```

¡Listo! Con esto tu aplicación ahora usa autenticación real de Google y guarda los prompts en la nube.
