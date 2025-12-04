# 🔐 Configuración de Firebase Authentication

Guía paso a paso para configurar Firebase y habilitar login con Google en CofrePrompt.

---

## 📋 ¿Por qué Firebase?

Firebase Authentication te permite:
- ✅ Login con Google con 1 click
- ✅ Gestión segura de usuarios
- ✅ Gratis hasta 10,000 usuarios activos/mes
- ✅ No necesitas configurar base de datos
- ✅ Funciona sin Firebase (modo demo)

---

## 🚀 Paso 1: Crear Proyecto en Firebase

### 1.1 Acceder a Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Click en **"Agregar proyecto"** o **"Add project"**

### 1.2 Configurar el Proyecto

1. **Nombre del proyecto**:
   ```
   CofrePrompt
   ```
   (o el nombre que prefieras)

2. **Google Analytics** (opcional):
   - Puedes habilitarlo si quieres analytics
   - O deshabilitarlo para empezar más rápido

3. Click en **"Crear proyecto"**
4. Espera 30-60 segundos mientras se crea

---

## 🔧 Paso 2: Configurar Authentication

### 2.1 Habilitar Authentication

1. En el menú lateral, click en **"Authentication"** (o **"Autenticación"**)
2. Click en **"Get started"** o **"Comenzar"**
3. La sección de Authentication se activará

### 2.2 Configurar Google Sign-In

1. Ve a la pestaña **"Sign-in method"** (Método de inicio de sesión)
2. Busca **"Google"** en la lista de proveedores
3. Click en **"Google"**
4. Habilita el interruptor (toggle)
5. **Correo electrónico de asistencia del proyecto**:
   - Selecciona tu email de Google
6. Click en **"Guardar"** o **"Save"**

¡Listo! Google Sign-In está habilitado.

---

## 🌐 Paso 3: Registrar tu App Web

### 3.1 Crear App Web

1. En la página principal de Firebase, busca **"Tus apps"**
2. Click en el ícono **Web** (`</>`)
3. **Nombre de la app**:
   ```
   CofrePrompt Web
   ```
4. **Firebase Hosting**: Desmarca la casilla (no lo necesitamos)
5. Click en **"Registrar app"**

### 3.2 Copiar las Credenciales

Verás un código similar a este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "cofreprompt-xxxxx.firebaseapp.com",
  projectId: "cofreprompt-xxxxx",
  storageBucket: "cofreprompt-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

**GUARDA ESTOS VALORES** - Los necesitarás en el siguiente paso.

---

## ⚙️ Paso 4: Configurar Variables de Entorno

### 4.1 En Desarrollo Local

1. En la raíz de tu proyecto, abre `.env.local`
2. Agrega las siguientes variables con tus valores reales:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=cofreprompt-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cofreprompt-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=cofreprompt-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

3. **Importante**: Reemplaza los valores `XXXXX` con tus credenciales reales
4. Guarda el archivo
5. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### 4.2 En Vercel (Producción)

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Click en **Settings** → **Environment Variables**
3. Agrega cada variable una por una:

   | Nombre | Valor |
   |--------|-------|
   | `VITE_FIREBASE_API_KEY` | `AIzaSy...` |
   | `VITE_FIREBASE_AUTH_DOMAIN` | `cofreprompt-xxxxx.firebaseapp.com` |
   | `VITE_FIREBASE_PROJECT_ID` | `cofreprompt-xxxxx` |
   | `VITE_FIREBASE_STORAGE_BUCKET` | `cofreprompt-xxxxx.appspot.com` |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | `123456789012` |
   | `VITE_FIREBASE_APP_ID` | `1:123456789012:web:abc...` |

4. Para cada variable:
   - Click en **Add New**
   - Nombre: Copia exactamente como se muestra
   - Value: Pega tu valor real
   - Environment: Selecciona **Production**, **Preview**, **Development**
   - Click en **Save**

5. Una vez agregadas todas, redeploy:
   ```bash
   vercel --prod
   ```

---

## 🔑 Paso 5: Configurar Dominio Autorizado

### 5.1 Agregar tu Dominio de Vercel

1. Ve a Firebase Console → **Authentication** → **Settings**
2. Scroll hasta **"Authorized domains"** (Dominios autorizados)
3. Click en **"Add domain"**
4. Agrega tu dominio de Vercel:
   ```
   tu-proyecto.vercel.app
   ```
5. Click en **"Add"**

### 5.2 Agregar localhost (para desarrollo)

Por defecto, `localhost` ya está autorizado. Si no:

1. En la misma sección, click en **"Add domain"**
2. Agrega:
   ```
   localhost
   ```

---

## ✅ Paso 6: Probar el Login

### 6.1 En Desarrollo Local

1. Abre [http://localhost:3000](http://localhost:3000)
2. Click en **"Iniciar Sesión"** en la navbar
3. Debería abrirse el popup de Google
4. Selecciona tu cuenta de Google
5. Deberías ver tu nombre y foto en la navbar

### 6.2 En Producción

1. Abre tu sitio en Vercel: `https://tu-proyecto.vercel.app`
2. Click en **"Iniciar Sesión"**
3. Completa el proceso de login con Google
4. Verifica que funcione correctamente

---

## 🎨 Funcionalidades que Ahora Funcionan

Con Firebase configurado, estas funcionalidades se activan:

✅ **Login con Google**
- Popup de autenticación de Google
- Sesión persistente (no necesitas loguearte cada vez)
- Logout funcional

✅ **Funcionalidades de Usuario**
- Crear prompts (requiere login)
- Comentar y valorar prompts
- Guardar prompts en favoritos
- Crear colecciones personalizadas
- Ver perfil de usuario

✅ **Seguridad**
- Usuarios autenticados vía Google
- UID único para cada usuario
- Email verificado automáticamente

---

## 🔄 Modo Demo (Sin Firebase)

Si **NO** configuras Firebase, la app funcionará en **modo demo**:

- ✅ Puedes explorar todos los prompts
- ✅ Login crea un usuario temporal local
- ✅ Todas las funcionalidades funcionan
- ❌ Los datos no persisten al recargar
- ❌ No hay autenticación real

**¿Cuándo usar modo demo?**
- Para desarrollo rápido
- Para pruebas locales
- Si no quieres configurar Firebase aún

---

## 🐛 Solución de Problemas

### Error: "Firebase API key is invalid"

**Solución**:
1. Verifica que las variables de entorno estén correctamente configuradas
2. Asegúrate de que el `VITE_FIREBASE_API_KEY` sea correcto
3. Revisa que no haya espacios al inicio o final
4. Reinicia el servidor/redeploy

### Error: "This domain is not authorized"

**Solución**:
1. Ve a Firebase Console → Authentication → Settings
2. Agrega tu dominio en "Authorized domains"
3. Para Vercel: `tu-proyecto.vercel.app`
4. Para local: `localhost`

### El popup de Google no se abre

**Solución**:
1. Verifica que los bloqueadores de popups estén desactivados
2. Revisa la consola del navegador (F12) para errores
3. Asegúrate de que Google Sign-In esté habilitado en Firebase

### "Error: auth/popup-blocked"

**Solución**:
- Permite popups en tu navegador para el sitio
- O usa el modo demo (sin Firebase)

### Los datos no persisten

**Solución**:
- Si estás en modo demo, los datos son temporales
- Configura Firebase para persistencia real
- O usa Firebase Firestore para guardar datos

---

## 📊 Ver Usuarios en Firebase

### Dashboard de Authentication

1. Ve a Firebase Console → **Authentication**
2. Pestaña **"Users"**
3. Verás la lista de usuarios registrados:
   - Email
   - UID
   - Fecha de creación
   - Último inicio de sesión

### Gestionar Usuarios

Desde el dashboard puedes:
- Ver detalles de cada usuario
- Deshabilitar cuentas
- Eliminar usuarios
- Ver métodos de autenticación

---

## 🔒 Seguridad y Mejores Prácticas

### ✅ Hacer

- ✅ **Variables de entorno**: Nunca hagas commit de `.env.local`
- ✅ **Reglas de seguridad**: Configura reglas si usas Firestore
- ✅ **HTTPS**: Siempre usa HTTPS en producción (Vercel lo hace automático)
- ✅ **Dominios autorizados**: Solo agrega dominios que controles

### ❌ Evitar

- ❌ **No publiques las credenciales**: Nunca subas `.env.local` a GitHub
- ❌ **No uses la misma app para dev y prod**: Crea 2 proyectos si es necesario
- ❌ **No dejes reglas abiertas**: Si usas Firestore, configura reglas de seguridad

---

## 🚀 Funcionalidades Avanzadas (Opcional)

### 1. Agregar más proveedores de login

Además de Google, puedes habilitar:
- **Email/Password**: Login tradicional
- **Facebook**: Login con Facebook
- **Twitter**: Login con Twitter
- **GitHub**: Login con GitHub

Pasos:
1. Firebase Console → Authentication → Sign-in method
2. Habilita el proveedor deseado
3. Sigue las instrucciones específicas de cada uno

### 2. Firestore Database (Base de Datos)

Para guardar prompts, comentarios y colecciones:

1. Firebase Console → **Firestore Database**
2. Click en **"Create database"**
3. Modo: **"Test mode"** (para empezar)
4. Ubicación: Selecciona la más cercana
5. Click en **"Enable"**

Luego actualiza `services/firebase.ts` para usar Firestore.

### 3. Firebase Analytics

Para rastrear uso de la app:

1. Firebase Console → **Analytics**
2. Habilita Analytics
3. Agrega el código de analytics en tu app

---

## 📈 Límites y Costos

Firebase Authentication es **GRATIS** hasta:

- ✅ **50,000 MAU** (Monthly Active Users)
- ✅ Usuarios ilimitados en total
- ✅ Sin límite de logins

**¿Qué pasa si superas el límite?**
- Solo pagas lo que usas
- Muy económico (centavos por usuario extra)

Ver precios: [Firebase Pricing](https://firebase.google.com/pricing)

---

## ✅ Checklist Final

Antes de ir a producción:

- [ ] Proyecto de Firebase creado
- [ ] Google Sign-In habilitado
- [ ] App web registrada en Firebase
- [ ] Credenciales copiadas
- [ ] Variables de entorno en `.env.local` (local)
- [ ] Variables de entorno en Vercel (producción)
- [ ] Dominio autorizado en Firebase
- [ ] Login probado en desarrollo
- [ ] Login probado en producción
- [ ] Usuarios aparecen en Firebase Console

---

## 🎉 ¡Listo!

Tu app ahora tiene autenticación real con Google. Los usuarios pueden:
- ✅ Iniciar sesión con su cuenta de Google
- ✅ Crear y guardar prompts
- ✅ Comentar y valorar
- ✅ Crear colecciones personalizadas

**Próximos pasos sugeridos:**
1. Agrega Firestore para persistir datos
2. Habilita más proveedores de login
3. Configura reglas de seguridad
4. Monitorea usuarios en Firebase Console

---

## 📚 Recursos Adicionales

- [Documentación de Firebase Auth](https://firebase.google.com/docs/auth)
- [Guía de Google Sign-In](https://firebase.google.com/docs/auth/web/google-signin)
- [Firebase Console](https://console.firebase.google.com/)
- [Precios de Firebase](https://firebase.google.com/pricing)

¿Problemas? Revisa la [documentación oficial](https://firebase.google.com/docs) o abre un issue en GitHub.
