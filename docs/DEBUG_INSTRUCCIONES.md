# Instrucciones para Debugging: "No se muestran los prompts creados"

## Paso 1: Verificar que el prompt se guardó en Firebase

1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto "cofreprompt"
3. Click en "Firestore Database" en el menú lateral
4. Busca la colección "prompts"
5. ¿Ves tu prompt nuevo?
   - ✅ **SÍ** → Continúa al Paso 2
   - ❌ **NO** → El problema está en guardar. Ve al Paso 5

## Paso 2: Verificar los campos del prompt

Abre el prompt en Firestore y verifica que tenga:

**Campos requeridos:**
- ✅ `authorId` (string) - **MUY IMPORTANTE**
- ✅ `author` (string)
- ✅ `title` (string)
- ✅ `description` (string)
- ✅ `content` (string)
- ✅ `platform` (string)
- ✅ `category` (string)
- ✅ `tags` (array)
- ✅ `imageUrl` (string)
- ✅ `likes` (number)
- ✅ `views` (number)
- ✅ `createdAt` (timestamp)

Si falta `authorId`, ese es el problema.

## Paso 3: Verificar las reglas de Firestore

1. En Firebase Console, ve a Firestore Database → Reglas
2. Las reglas actuales deberían ser:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

O para producción:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /prompts/{promptId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
                             request.auth.uid == resource.data.authorId;
    }
  }
}
```

**Si las reglas están bloqueando:**
- Temporalmente usa `allow read, write: if true;` para testing
- ⚠️ Recuerda cambiarlas después a las de producción

## Paso 4: Verificar en el navegador

Abre tu app en el navegador y:

1. Abre DevTools (F12)
2. Ve a la pestaña "Console"
3. Intenta crear un prompt
4. ¿Ves algún error?

**Errores comunes y soluciones:**

### Error: "Missing or insufficient permissions"
**Causa:** Reglas de Firestore bloqueando
**Solución:** Actualiza las reglas (Paso 3)

### Error: "Network request failed"
**Causa:** Problema de conexión o Firebase mal configurado
**Solución:** Verifica tu conexión a internet y la configuración de Firebase

### Error: "User is not authenticated"
**Causa:** No estás logueado
**Solución:** Haz login con Google antes de crear un prompt

### No hay errores pero no se muestra
**Causa:** El `authorId` no coincide o la UI no se actualiza
**Solución:** Recarga la página (F5) después de crear el prompt

## Paso 5: Verificar que guardar funciona

Abre DevTools y ejecuta en la consola:

```javascript
// Ver el estado del usuario
console.log('Usuario:', window.localStorage);

// Ver todos los prompts
fetch('https://firestore.googleapis.com/v1/projects/cofreprompt/databases/(default)/documents/prompts')
  .then(r => r.json())
  .then(console.log);
```

## Paso 6: Test manual de guardado

En la consola de DevTools:

```javascript
import { db } from './services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// Test de guardado
const testPrompt = {
  title: "Test Prompt",
  description: "Este es un test",
  content: "Contenido de prueba",
  author: "Test User",
  authorId: "test-123",
  platform: "ChatGPT",
  category: "General",
  tags: ["test"],
  imageUrl: "https://via.placeholder.com/400",
  likes: 0,
  views: 0,
  createdAt: Timestamp.now()
};

addDoc(collection(db, "prompts"), testPrompt)
  .then(ref => console.log("✅ Guardado con ID:", ref.id))
  .catch(err => console.error("❌ Error:", err));
```

## Paso 7: Verificar que estás usando la última versión

```bash
git pull origin main
npm install
npm run dev
```

## Solución Rápida: Actualiza las reglas de Firestore

La solución más común es actualizar las reglas de Firestore:

1. Ve a Firebase Console
2. Firestore Database → Reglas
3. Reemplaza con:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir todo mientras debugueamos
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

4. Click en "Publicar"
5. Espera 30 segundos
6. Recarga tu app
7. Intenta crear un prompt de nuevo

## Después de Arreglar

Una vez que funcione, cambia las reglas a:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /prompts/{promptId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
                             request.auth.uid == resource.data.authorId;
    }
  }
}
```

Esto asegura que solo usuarios autenticados puedan ver y crear prompts, y solo el autor puede editar/eliminar sus propios prompts.
