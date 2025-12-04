# 🚀 Guía de Deployment en Vercel

Esta guía te ayudará a deployar **CofrePrompt** en Vercel en minutos.

---

## ✅ Checklist Pre-Deployment

Antes de deployar, asegúrate de que:

- [ ] El proyecto compila sin errores (`npm run build`)
- [ ] Todas las dependencias están en `package.json`
- [ ] `.gitignore` incluye `node_modules`, `.env.local`, `dist`
- [ ] Has probado la app localmente (`npm run dev`)

---

## 🌐 Método 1: Deploy desde GitHub (Recomendado)

### Paso 1: Sube tu código a GitHub

```bash
git init
git add .
git commit -m "Initial commit - CofrePrompt v1.0"
git branch -M main
git remote add origin https://github.com/tu-usuario/cofreprompt.git
git push -u origin main
```

### Paso 2: Conecta con Vercel

1. Ve a [vercel.com](https://vercel.com) y haz login
2. Click en **"New Project"**
3. **Import** tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Vite
5. Configura las variables de entorno (opcional):
   - Click en **"Environment Variables"**
   - Agrega cada variable de `.env.example` si quieres usar Firebase
6. Click en **"Deploy"**

¡Listo! Tu app estará en vivo en `https://tu-proyecto.vercel.app`

---

## 💻 Método 2: Deploy con Vercel CLI

### Paso 1: Instala Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Login en Vercel

```bash
vercel login
```

### Paso 3: Deploy

```bash
# Deploy a preview
vercel

# Deploy a producción
vercel --prod
```

Sigue las instrucciones en la terminal. Vercel creará automáticamente el proyecto y lo deployará.

---

## ⚙️ Configuración de Variables de Entorno

### Variables de Firebase (Opcionales)

Si quieres habilitar login con Google, configura estas variables en Vercel:

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Click en **Settings** → **Environment Variables**
3. Agrega las siguientes variables:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

4. Click en **Save**
5. Redeploy el proyecto para aplicar los cambios

### Cómo obtener las credenciales de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **Project Settings** → **General**
4. Scroll hasta **Your apps** → **Web app**
5. Si no tienes una app web, click en **Add app**
6. Copia las credenciales del `firebaseConfig`

**IMPORTANTE**: Si no configuras Firebase, la app funcionará con un usuario demo automáticamente.

---

## 🔄 Actualizar el Deployment

### Desde GitHub

Si deployaste desde GitHub, Vercel redesplegará automáticamente cada vez que hagas push:

```bash
git add .
git commit -m "Update features"
git push
```

### Desde CLI

```bash
vercel --prod
```

---

## 🐛 Troubleshooting

### Error: "Build failed"

**Problema**: El build falla en Vercel

**Soluciones**:
1. Verifica que el build funcione localmente: `npm run build`
2. Revisa los logs de error en Vercel
3. Asegúrate de que todas las dependencias estén en `dependencies` (no en `devDependencies` si son necesarias para el build)
4. Verifica que no haya errores de TypeScript: `npm run lint`

### Error: "Firebase API Key invalid"

**Problema**: Error de Firebase en producción

**Soluciones**:
1. Verifica que las variables de entorno estén configuradas en Vercel
2. Asegúrate de que los nombres empiecen con `VITE_`
3. Redeploy después de agregar variables
4. O simplemente no configures Firebase (la app usará modo demo)

### La página se ve sin estilos

**Problema**: Tailwind CSS no se está aplicando

**Soluciones**:
1. Verifica que `tailwind.config.js` y `postcss.config.js` existan
2. Asegúrate de que `index.css` tenga las directivas de Tailwind
3. Limpia el cache de Vercel: Settings → Functions → Clear Cache
4. Redeploy

### Errores 404 en rutas

**Problema**: Al navegar directamente a una URL, da 404

**Solución**: Esto no debería pasar porque `vercel.json` ya tiene configurado el rewrite. Si ocurre:
1. Verifica que `vercel.json` existe en la raíz
2. Asegúrate de que tenga el rewrite correcto
3. Redeploy

---

## 📊 Configuración de Dominio Personalizado

1. Ve a tu proyecto en Vercel
2. Click en **Settings** → **Domains**
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar el DNS

---

## 🎯 Optimizaciones para Producción

El proyecto ya incluye estas optimizaciones:

✅ Minificación de JavaScript y CSS
✅ Tree-shaking automático
✅ Code splitting
✅ Cache de assets estáticos (31536000s)
✅ Lazy loading de componentes
✅ Compresión Brotli/Gzip

---

## 📈 Monitoreo y Analytics

### Vercel Analytics

1. Ve a tu proyecto en Vercel
2. Click en **Analytics**
3. Habilita Vercel Analytics (gratis hasta cierto límite)

### Google Analytics (Opcional)

Agrega el script de GA en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔒 Seguridad

### Headers de Seguridad

El archivo `vercel.json` ya incluye configuración de cache. Para agregar headers de seguridad:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

## ✅ Checklist Post-Deployment

Después del deployment, verifica que:

- [ ] La app carga correctamente
- [ ] Los estilos se ven bien
- [ ] El login funciona (si configuraste Firebase)
- [ ] Los prompts se muestran correctamente
- [ ] Los modales se abren sin errores
- [ ] Responsive design funciona en móvil
- [ ] No hay errores en la consola del navegador
- [ ] El favicon se muestra correctamente

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa los [logs de deployment](https://vercel.com/docs/deployments/logs) en Vercel
2. Consulta la [documentación de Vercel](https://vercel.com/docs)
3. Abre un issue en GitHub
4. Contacta al equipo de soporte de Vercel

---

## 🎉 ¡Felicidades!

Tu app está en vivo. Comparte el link con el mundo:

```
https://tu-proyecto.vercel.app
```

---

**Próximos pasos sugeridos:**

1. Configura un dominio personalizado
2. Habilita Vercel Analytics
3. Configura Firebase para producción
4. Agrega más prompts a la plataforma
5. ¡Comparte con la comunidad!
