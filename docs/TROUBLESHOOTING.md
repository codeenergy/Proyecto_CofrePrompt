# Troubleshooting - Solución de Problemas

## Problema: Los prompts no se muestran después de crearlos

Si creas un prompt pero no aparece en la lista, sigue estos pasos:

### 1. Verificar Reglas de Firestore

Ve a [Firebase Console](https://console.firebase.google.com/) → Tu Proyecto → Firestore Database → Reglas

**Opción A: Reglas de Prueba (para desarrollo)**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

**Opción B: Reglas de Producción (recomendado)**
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

### 2. Verificar que el Prompt se Guardó

1. Ve a Firestore Database en Firebase Console
2. Busca la colección `prompts`
3. Verifica que tu prompt nuevo esté ahí
4. Comprueba que tenga todos los campos necesarios:
   - `title`
   - `description`
   - `content`
   - `author`
   - `authorId` ⚠️ **Este es crítico**
   - `likes`
   - `views`
   - `platform`
   - `category`
   - `tags`
   - `imageUrl`
   - `createdAt`

### 3. Verificar la Consola del Navegador

Abre las DevTools de tu navegador (F12) y busca errores en la consola:

**Errores comunes:**
- `Permission denied`: Las reglas de Firestore están bloqueando la operación
- `Firebase: Error (auth/...)`: Problema con la autenticación
- `Missing or insufficient permissions`: Usuario no autenticado o reglas incorrectas

### 4. Verificar que el Usuario está Logueado

El usuario **debe** estar logueado con Google para crear prompts. Verifica:
- Que el botón de "Entrar" cambió a tu foto de perfil
- Que puedes hacer clic en tu foto para ver tu perfil

### 5. Verificar Índices de Firestore

Si ves un error sobre índices faltantes:
1. Firebase te dará un enlace en el error
2. Haz clic en el enlace
3. Firebase creará automáticamente el índice necesario
4. Espera 2-3 minutos
5. Intenta de nuevo

### 6. Limpiar Caché y Recargar

1. Abre DevTools (F12)
2. Haz clic derecho en el botón de recargar
3. Selecciona "Vaciar caché y recargar de forma forzada"
4. O usa: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)

### 7. Verificar Configuración de Firebase

Asegúrate de que `services/firebase.ts` tiene la configuración correcta:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyCJ4aZq_7AX98lMEDb-t9UBPrtCG0CHHkI",
  authDomain: "cofreprompt.firebaseapp.com",
  projectId: "cofreprompt",
  storageBucket: "cofreprompt.firebasestorage.app",
  messagingSenderId: "887253905394",
  appId: "1:887253905394:web:9a4e38ec6d5b713c23456b",
  measurementId: "G-2T1P0Y3D2T"
};
```

### 8. Verificar Dominios Autorizados en Firebase

Para que el login funcione en producción:

1. Ve a Firebase Console → Authentication → Settings
2. En "Authorized domains" agrega:
   - `localhost` (para desarrollo)
   - Tu dominio de Vercel (ej: `cofreprompt.vercel.app`)

### 9. Probar en Modo Desarrollo Local

```bash
npm run dev
```

Luego abre `http://localhost:5173` y prueba crear un prompt.

### 10. Revisar Logs de Firebase

En Firebase Console:
1. Ve a Firestore Database
2. Click en "Usage" en el menú lateral
3. Revisa si hay operaciones de lectura/escritura

## Problema: "No has creado prompts aún" en el perfil

Esto sucede cuando:
- Los prompts no tienen el campo `authorId`
- El `authorId` del prompt no coincide con tu `uid` de usuario

**Solución:**
Verifica en Firestore que tus prompts tengan `authorId` igual a tu UID de usuario.

## Problema: No puedo editar o eliminar prompts

Solo puedes editar/eliminar tus propios prompts. Verifica:
- Que estés logueado
- Que el `authorId` del prompt sea igual a tu `uid`

## Contacto de Soporte

Si los problemas persisten:
1. Abre un issue en GitHub
2. Incluye:
   - Capturas de pantalla de errores
   - Logs de la consola del navegador
   - Descripción paso a paso de lo que hiciste
