# 🎯 Guía de Configuración de Monetag

## ✨ Implementación 100% Optimizada

Los anuncios de Monetag están implementados de forma **altamente controlada y optimizada** para mantener una excelente experiencia de usuario mientras generas ingresos.

### 🚀 Última Actualización (v2.0)

- ❌ **Google AdSense Eliminado** - Removido completamente para mejor rendimiento
- ✅ **Solo Monetag** - Sistema unificado y más eficiente
- ✅ **Delays Optimizados** - 4s y 8s (anteriormente 3s y 5s)
- ✅ **Código Ultra Limpio** - Sin dependencias de AdSense
- ✅ **Grid Optimizado** - Vista más rápida y limpia de prompts

## 🎯 Características

- ✅ **Solo se activan en producción** (Vercel) - NO en desarrollo local
- ✅ **Delays inteligentes** - Los anuncios esperan a que el usuario explore el contenido
- ✅ **Control de frecuencia** - El Vignette Banner solo se muestra 1 vez por sesión
- ✅ **Configuración simple** - Todo desde un solo archivo
- ✅ **Clean Code** - Implementación modular y mantenible
- ✅ **Sin AdSense** - Solo Monetag para máxima eficiencia

## 📋 Scripts Implementados

### 1. In-Page Push (Zona: 10325700)
- **Delay:** 4 segundos (optimizado) ⬆️
- **Ubicación:** Se carga automáticamente en el background
- **Intrusividad:** ⭐ Muy Baja - Solo notificaciones discretas
- **Rendimiento:** Excelente - No afecta la carga inicial

### 2. Vignette Banner (Zona: 10325703)
- **Delay:** 8 segundos (optimizado) ⬆️
- **Frecuencia:** Máximo 1 vez por sesión
- **Ubicación:** Pantalla completa al navegar
- **Intrusividad:** ⭐⭐ Media - Fácil de cerrar
- **Control:** Respeta totalmente al usuario

### 3. Direct Link (https://otieu.com/4/10325708)
- **Ubicación:** Banner visual después de la lista de prompts
- **Diseño:** Totalmente integrado con el estilo de la app
- **Intrusividad:** ⭐ Muy Baja - Parece contenido nativo
- **Variantes:** 3 opciones disponibles (banner, botón, texto)

## 🎛️ Cómo Controlar los Anuncios

Todo se controla desde: **`config/monetag.config.ts`**

### Deshabilitar TODOS los anuncios
```typescript
export const MONETAG_CONFIG = {
  enabled: false,  // ← Cambiar a false
  // ...
};
```

### Deshabilitar anuncios específicos
```typescript
inPagePush: {
  enabled: false,  // ← Deshabilita In-Page Push
  // ...
},

vignetteBanner: {
  enabled: false,  // ← Deshabilita Vignette Banner
  // ...
},

directLink: {
  enabled: false,  // ← Deshabilita Direct Link
  // ...
},
```

### Ajustar delays (personalizar experiencia)
```typescript
inPagePush: {
  delayMs: 6000,  // ← 6 segundos (aún menos intrusivo)
},

vignetteBanner: {
  delayMs: 12000,  // ← 12 segundos (máxima paciencia)
},
```

### Ajustar frecuencia del Vignette
```typescript
vignetteBanner: {
  maxPerSession: 2,  // ← Permite 2 veces por sesión
},
```

## 📁 Archivos del Sistema

```
config/
  └─ monetag.config.ts          # ⚙️ Configuración centralizada (AQUÍ CONTROLAS TODO)

hooks/
  └─ useMonetag.ts               # 🪝 Hook para carga controlada

components/
  ├─ MonetagAdsProvider.tsx      # 🎯 Proveedor que carga los scripts
  └─ MonetagDirectLink.tsx       # 🎨 Componente visual del Direct Link

App.tsx                          # 📱 Integración principal
```

## 🔧 Personalización del Direct Link

El componente `MonetagDirectLink` tiene 3 variantes visuales:

### Banner (por defecto - Recomendado)
```tsx
<MonetagDirectLink />
```
Diseño atractivo e integrado con la app.

### Botón
```tsx
<MonetagDirectLink
  variant="button"
  text="Apoya este proyecto"
/>
```
Botón con gradiente llamativo.

### Link de texto
```tsx
<MonetagDirectLink
  variant="text"
  text="Ayúdanos a crecer"
/>
```
Enlace discreto y minimalista.

## 🚀 Deployment

Los anuncios **SOLO** funcionan cuando:
1. ✅ La app está desplegada en Vercel (producción)
2. ✅ El hostname NO es localhost/127.0.0.1
3. ✅ `enabled: true` en la configuración

### En desarrollo local:
```console
# Consola del navegador (Development)
Service Worker: Monetag deshabilitado en desarrollo
```

### En producción (Vercel):
```console
# Consola del navegador (Production)
Service Worker registrado exitosamente
Monetag In-Page Push cargado (después de 4s)
Monetag Vignette Banner cargado (después de 8s)
```

## 🐛 Debug y Verificación

### 1. Verificar en Producción

Abre DevTools (F12) → Console en tu sitio de Vercel:

✅ **Deberías ver:**
- "Service Worker registrado exitosamente"
- "Monetag In-Page Push cargado" (4 segundos después)
- "Monetag Vignette Banner cargado" (8 segundos después)

❌ **Si no ves los mensajes:**
- Verifica que `enabled: true` en `monetag.config.ts`
- Verifica que cada script tenga `enabled: true`
- Revisa la consola por errores de red

### 2. Verificar en Desarrollo

Abre DevTools (F12) → Console en localhost:

✅ **Deberías ver:**
- "Service Worker: Monetag deshabilitado en desarrollo"

❌ **Si los anuncios se cargan:**
- Verifica la función `isProduction()` en config

## 💡 Configuraciones Recomendadas

### Para Máxima Ganancia + Buena UX ⭐ (Configuración Actual)
```typescript
enabled: true
inPagePush.enabled: true       // Delay: 4s
vignetteBanner.enabled: true   // Delay: 8s, Max: 1/sesión
directLink.enabled: true
```
**Pros:** Todos los formatos activos con delays optimizados
**Cons:** Vignette puede molestar a algunos usuarios (solo 1 vez)

### Para Solo Anuncios No Intrusivos
```typescript
enabled: true
inPagePush.enabled: true       // Delay: 4s
vignetteBanner.enabled: false  // ← Deshabilitado
directLink.enabled: true
```
**Pros:** Experiencia ultra suave
**Cons:** Menor ganancia (sin Vignette)

### Para Testing Visual (Solo Direct Link)
```typescript
enabled: true
inPagePush.enabled: false
vignetteBanner.enabled: false
directLink.enabled: true       // ← Solo este
```
**Pros:** Perfecto para probar el diseño del banner
**Cons:** Mínima ganancia

### Para Máxima Paciencia con el Usuario
```typescript
enabled: true
inPagePush: {
  enabled: true,
  delayMs: 10000  // ← 10 segundos
}
vignetteBanner: {
  enabled: true,
  delayMs: 15000  // ← 15 segundos
  maxPerSession: 1
}
directLink.enabled: true
```
**Pros:** Usuario explora todo tranquilamente primero
**Cons:** Menos impresiones por visita

## 📊 Monitoreo en Monetag Dashboard

1. **Accede a tu panel de Monetag**
2. **Revisa estadísticas por zona:**
   - Zona 10325700 (In-Page Push)
   - Zona 10325703 (Vignette Banner)
   - Direct Link 10325708

3. **Optimiza según datos:**
   - Si Vignette genera poco → Deshabilítalo
   - Si In-Page Push funciona bien → Mantenlo
   - Ajusta delays según retención de usuarios

## ⚠️ Importante

### ✅ Buenas Prácticas
- Los anuncios solo se cargan **1 vez por página**
- Los delays protegen la experiencia del usuario
- El Vignette se muestra máximo 1 vez por sesión
- Todo funciona **solo en producción**

### ❌ No Recomendado
- ~~Reducir delays por debajo de 3 segundos~~
- ~~Aumentar maxPerSession a más de 2~~
- ~~Habilitar anuncios en desarrollo~~
- ~~Modificar los hooks directamente~~

## 🎓 Tips Pro

1. **Monitorea la tasa de rebote** - Si sube, aumenta los delays
2. **A/B Testing** - Prueba con y sin Vignette Banner
3. **Revisa estadísticas semanalmente** - Ajusta según rendimiento
4. **Escucha a tus usuarios** - Si se quejan, reduce intrusión
5. **Optimiza el Direct Link** - Cambia el texto según tu audiencia

## 🆘 Solución de Problemas

### Los anuncios no aparecen en producción
1. Verifica que `enabled: true`
2. Verifica que cada tipo tenga `enabled: true`
3. Espera los delays (4s y 8s)
4. Revisa la consola por errores

### Los anuncios aparecen en desarrollo
1. Verifica la función `isProduction()`
2. Asegúrate de estar en `localhost`
3. Limpia caché del navegador

### El Vignette aparece muchas veces
1. Verifica `maxPerSession: 1`
2. Limpia sessionStorage del navegador
3. No uses modo incógnito para probar

### El Direct Link no se ve
1. Verifica que haya prompts en la página
2. Verifica `directLink.enabled: true`
3. Revisa que estés en producción

---

## 📝 Resumen

**CofrePrompt ahora usa SOLO Monetag** para una monetización limpia y eficiente:

✅ **Sin Google AdSense** - Código más limpio y rápido
✅ **Delays Optimizados** - 4s y 8s para mejor UX
✅ **Control Total** - Un solo archivo de configuración
✅ **Producción Only** - No molesta durante desarrollo
✅ **Documentación Completa** - Todo está explicado

**¿Necesitas ayuda?** Revisa `config/monetag.config.ts` - Está completamente documentado.

**¿Quieres cambiar algo?** Edita el archivo de configuración, guarda y despliega. ¡Así de simple!

---

**🎉 ¡Tu proyecto está optimizado para generar ingresos sin sacrificar la experiencia del usuario!**
