# Guía de Configuración de Monetag

## ✨ Implementación Inteligente con Control Total

Los anuncios de Monetag están implementados de forma **controlada y no intrusiva** para mantener una buena experiencia de usuario.

## 🎯 Características

- ✅ **Solo se activan en producción** (Vercel) - NO en desarrollo local
- ✅ **Delays configurables** - Los anuncios no aparecen inmediatamente
- ✅ **Control de frecuencia** - El Vignette Banner solo se muestra 1 vez por sesión
- ✅ **Fácil de habilitar/deshabilitar** - Todo desde un solo archivo de configuración
- ✅ **Clean Code** - Implementación modular y mantenible

## 📋 Scripts Implementados

### 1. In-Page Push (Zona: 10325700)
- **Delay:** 3 segundos después de cargar la página
- **Ubicación:** Se carga automáticamente en el background
- **Intrusividad:** Baja - Solo notificaciones discretas

### 2. Vignette Banner (Zona: 10325703)
- **Delay:** 5 segundos después de cargar la página
- **Frecuencia:** Máximo 1 vez por sesión
- **Ubicación:** Pantalla completa al cambiar de página
- **Intrusividad:** Media - Fácil de cerrar

### 3. Direct Link (https://otieu.com/4/10325708)
- **Ubicación:** Banner visual después de la lista de prompts
- **Diseño:** Integrado con el estilo de la app
- **Intrusividad:** Baja - Se ve como contenido nativo

## 🎛️ Cómo Controlar los Anuncios

Edita el archivo: `config/monetag.config.ts`

### Deshabilitar TODOS los anuncios
```typescript
export const MONETAG_CONFIG = {
  enabled: false,  // ← Cambia a false
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

### Ajustar delays (menos intrusivos)
```typescript
inPagePush: {
  delayMs: 5000,  // ← Espera 5 segundos en vez de 3
},

vignetteBanner: {
  delayMs: 10000,  // ← Espera 10 segundos en vez de 5
},
```

### Ajustar frecuencia del Vignette
```typescript
vignetteBanner: {
  maxPerSession: 2,  // ← Permite 2 veces por sesión en vez de 1
},
```

## 📁 Archivos Creados

```
config/
  └─ monetag.config.ts          # Configuración centralizada

hooks/
  └─ useMonetag.ts               # Hook para carga controlada

components/
  ├─ MonetagAdsProvider.tsx      # Proveedor que carga los scripts
  └─ MonetagDirectLink.tsx       # Componente visual del Direct Link
```

## 🔧 Personalización del Direct Link

El componente `MonetagDirectLink` tiene 3 variantes:

### Banner (por defecto)
```tsx
<MonetagDirectLink />
```

### Botón
```tsx
<MonetagDirectLink
  variant="button"
  text="Apoya este proyecto"
/>
```

### Link de texto
```tsx
<MonetagDirectLink
  variant="text"
  text="Ayúdanos"
/>
```

## 🚀 Deployment

Los anuncios solo funcionan cuando:
1. La app está desplegada en Vercel (producción)
2. El hostname NO es localhost/127.0.0.1

En desarrollo local verás en la consola:
```
Monetag In-Page Push cargado
Monetag Vignette Banner cargado
```

## 🐛 Debug

Para verificar que los anuncios se están cargando correctamente:

1. Abre DevTools (F12) → Console
2. En producción deberías ver:
   - "Monetag In-Page Push cargado" (después de 3 seg)
   - "Monetag Vignette Banner cargado" (después de 5 seg)
3. En desarrollo NO se cargarán

## 💡 Recomendaciones

### Para máxima ganancia pero manteniendo buena UX:
```typescript
enabled: true
inPagePush.enabled: true
vignetteBanner.enabled: true (con maxPerSession: 1)
directLink.enabled: true
```

### Para solo anuncios no intrusivos:
```typescript
enabled: true
inPagePush.enabled: true
vignetteBanner.enabled: false
directLink.enabled: true
```

### Para testing (solo Direct Link visible):
```typescript
enabled: true
inPagePush.enabled: false
vignetteBanner.enabled: false
directLink.enabled: true
```

## 📊 Monitoreo

Revisa tus estadísticas en el panel de Monetag para:
- Ver cuál tipo de anuncio genera más ingresos
- Ajustar la configuración según el rendimiento
- Optimizar delays y frecuencia

## ⚠️ Importante

- Los anuncios solo se cargan en producción
- Cada script se carga máximo 1 vez por página
- Los delays ayudan a mejorar la experiencia del usuario
- Puedes cambiar la configuración en cualquier momento sin tocar código

---

**¿Necesitas más control?** Edita `config/monetag.config.ts` y ajusta según tus necesidades.
