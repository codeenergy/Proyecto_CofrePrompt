# 💰 Configuración de Google AdSense

Guía paso a paso para configurar Google AdSense en CofrePrompt y empezar a monetizar tu plataforma.

---

## 📋 Requisitos Previos

- ✅ Sitio web publicado y accesible públicamente (en Vercel u otro hosting)
- ✅ Cuenta de Google
- ✅ Contenido original y de calidad
- ✅ Cumplir con las [Políticas de AdSense](https://support.google.com/adsense/answer/48182)

---

## 🚀 Paso 1: Crear Cuenta de Google AdSense

### 1.1 Registrarse

1. Ve a [Google AdSense](https://www.google.com/adsense/)
2. Click en **"Empezar"** o **"Sign Up"**
3. Ingresa la URL de tu sitio (tu dominio de Vercel)
4. Selecciona tu país
5. Acepta los términos y condiciones
6. Click en **"Create account"**

### 1.2 Proporcionar Información

1. **Datos de pago**: Nombre, dirección, información fiscal
2. **Método de pago**: Transferencia bancaria, cheque, etc.
3. **Verificación de identidad**: Puede requerir documentación

---

## 🔧 Paso 2: Agregar el Código de AdSense a tu Sitio

### 2.1 Obtener el Código de AdSense

1. Ve al [Dashboard de AdSense](https://www.google.com/adsense/)
2. En el menú lateral, click en **"Sitios"** → **"Agregar sitio"**
3. Ingresa tu URL: `https://tu-proyecto.vercel.app`
4. Copia el **código de AdSense** que se muestra

El código se ve así:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
     crossorigin="anonymous"></script>
```

### 2.2 Configurar en CofrePrompt

#### Opción A: Variable de Entorno (Recomendado)

1. **En Vercel**:
   - Ve a tu proyecto en [vercel.com](https://vercel.com)
   - Settings → Environment Variables
   - Agrega una nueva variable:
     ```
     Nombre: VITE_ADSENSE_CLIENT_ID
     Valor:  ca-pub-1234567890123456
     ```
   - Click en **Save**
   - Redeploy el proyecto

2. **En desarrollo local**:
   - Edita `.env.local`:
     ```env
     VITE_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
     ```
   - Reinicia el servidor: `npm run dev`

#### Opción B: Editar directamente el código

Edita `index.html` y reemplaza:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
```

Por tu código real:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
```

---

## 📍 Paso 3: Crear Unidades de Anuncios

### 3.1 Crear Anuncios en AdSense

1. Ve a **"Anuncios"** → **"Por unidad de anuncio"**
2. Click en **"Nueva unidad de anuncio"**
3. Selecciona el tipo:
   - **Display ads** (recomendado para comenzar)
   - **In-feed ads** (para integrar entre prompts)
   - **In-article ads**

### 3.2 Configurar cada Unidad

**Unidad 1: Banner Superior (Horizontal)**
- Nombre: `Banner Superior CofrePrompt`
- Tipo: Display ads → Horizontal
- Tamaño: Responsive
- Copiar el **data-ad-slot**: Por ejemplo `1234567890`

**Unidad 2: Banner Entre Contenido (Fluid)**
- Nombre: `In-Feed CofrePrompt`
- Tipo: In-feed ads
- Copiar el **data-ad-slot**: Por ejemplo `0987654321`

**Unidad 3: Banner Inferior (Horizontal)**
- Nombre: `Banner Inferior CofrePrompt`
- Tipo: Display ads → Horizontal
- Copiar el **data-ad-slot**: Por ejemplo `1122334455`

### 3.3 Actualizar los Slots en el Código

Edita `App.tsx` y reemplaza los slots con tus valores reales:

```tsx
{/* Banner Superior */}
<AdUnit slot="1234567890" format="horizontal" className="mb-4" />

{/* Entre contenido */}
<AdUnit slot="0987654321" format="fluid" />

{/* Banner Inferior */}
<AdUnit slot="1122334455" format="horizontal" className="mt-6" />
```

---

## ✅ Paso 4: Verificar y Activar

### 4.1 Verificar el Código

1. En AdSense, ve a **"Sitios"**
2. Verifica que tu sitio aparezca
3. Google revisará tu sitio (puede tardar 24-48 horas)

### 4.2 Probar los Anuncios

1. **En desarrollo**: Verás placeholders con "Google AdSense Space"
2. **En producción**: Los anuncios reales aparecerán después de la aprobación

### 4.3 Esperar Aprobación

- Google revisará tu sitio en **1-3 días**
- Recibirás un email cuando sea aprobado
- Mientras tanto, verás anuncios en blanco o de prueba

---

## 📊 Ubicaciones de AdSense en CofrePrompt

CofrePrompt tiene **3 ubicaciones estratégicas** de anuncios:

### 1. Banner Superior
- **Ubicación**: Encima del contenido principal
- **Formato**: Horizontal (728x90 o responsive)
- **Visibilidad**: Alta - Primera cosa que ve el usuario
- **Slot en código**: `slot="1234567890"`

### 2. Banner Entre Contenido
- **Ubicación**: Cada 8 prompts en el grid
- **Formato**: Fluid (se adapta al contenido)
- **Visibilidad**: Media - Aparece mientras navegan
- **Slot en código**: `slot="0987654321"`

### 3. Banner Inferior
- **Ubicación**: Debajo de todos los prompts
- **Formato**: Horizontal
- **Visibilidad**: Media - Antes del footer
- **Slot en código**: `slot="1122334455"`

---

## 💡 Mejores Prácticas

### ✅ Hacer

- ✅ **Contenido de calidad**: Crea prompts útiles y originales
- ✅ **Navegación clara**: Facilita que los usuarios encuentren contenido
- ✅ **Responsive design**: Los anuncios se adaptan a móvil/desktop
- ✅ **Políticas de privacidad**: Agrega una página de privacidad
- ✅ **Paciencia**: Los ingresos crecen con el tráfico

### ❌ Evitar

- ❌ **Demasiados anuncios**: No satures la página
- ❌ **Clicks propios**: Nunca hagas click en tus propios anuncios
- ❌ **Contenido copiado**: Solo contenido original
- ❌ **Tráfico falso**: No compres visitas
- ❌ **Ocultar anuncios**: Los anuncios deben ser visibles

---

## 🔍 Verificar que Funciona

### Método 1: Inspeccionar Elemento

1. Abre tu sitio en producción
2. Click derecho → **Inspeccionar**
3. Busca `<ins class="adsbygoogle">`
4. Debería tener los atributos:
   ```html
   data-ad-client="ca-pub-XXXXXXXXX"
   data-ad-slot="XXXXXXXXXX"
   data-adsbygoogle-status="done"
   ```

### Método 2: Consola de AdSense

1. Ve a [AdSense Dashboard](https://www.google.com/adsense/)
2. **Anuncios** → **Vista general**
3. Deberías ver impresiones en las últimas 24 horas

### Método 3: Extensión de Chrome

Instala [Google Publisher Toolbar](https://chrome.google.com/webstore) para ver:
- Qué anuncios se están mostrando
- Estadísticas en tiempo real
- Errores de implementación

---

## 🐛 Solución de Problemas

### Los anuncios no aparecen

**Problema**: Los espacios están vacíos

**Soluciones**:
1. Verifica que `VITE_ADSENSE_CLIENT_ID` esté configurado
2. Espera 24-48 horas si acabas de crear la cuenta
3. Revisa la consola del navegador (F12) para errores
4. Verifica que el script de AdSense esté en `index.html`
5. Asegúrate de que tu sitio esté aprobado en AdSense

### Error: "AdSense code not found"

**Solución**: Agrega el script de AdSense a `index.html`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXX"></script>
```

### Los anuncios se ven rotos

**Solución**: Verifica que el formato sea correcto:
- `horizontal` para banners anchos
- `fluid` para anuncios adaptables
- `rectangle` para cuadrados

### Cuenta suspendida

**Solución**:
1. Lee el email de Google cuidadosamente
2. Revisa las [Políticas de AdSense](https://support.google.com/adsense/answer/48182)
3. Corrige los problemas
4. Solicita una revisión

---

## 📈 Optimización de Ingresos

### 1. Aumenta el Tráfico

- SEO: Optimiza títulos y descripciones
- Redes Sociales: Comparte prompts populares
- Contenido regular: Agrega nuevos prompts frecuentemente

### 2. Mejora el CTR (Click-Through Rate)

- Coloca anuncios en áreas visibles
- Usa formatos responsive
- Experimenta con diferentes posiciones

### 3. Aumenta el RPM (Revenue Per Mille)

- Contenido premium atrae anunciantes premium
- Nichos específicos pagan mejor
- Tráfico de países desarrollados paga más

---

## 💰 Expectativas de Ingresos

### Factores que afectan los ingresos:

- **Tráfico**: Más visitantes = más impresiones
- **Nicho**: Tecnología/IA paga mejor que otros nichos
- **Ubicación**: Tráfico de USA/Europa paga más
- **CTR**: % de usuarios que hacen click
- **CPC**: Cuánto pagan los anunciantes por click

### Ejemplos estimados:

- **1,000 visitas/día**: $2-10 USD/día
- **10,000 visitas/día**: $20-100 USD/día
- **100,000 visitas/día**: $200-1,000 USD/día

*Nota: Estos son estimados. Los resultados reales varían.*

---

## 📚 Recursos Adicionales

- [Centro de Ayuda de AdSense](https://support.google.com/adsense/)
- [Políticas del Programa](https://support.google.com/adsense/answer/48182)
- [Optimización de Anuncios](https://support.google.com/adsense/answer/17957)
- [Comunidad de AdSense](https://support.google.com/adsense/community)

---

## ✅ Checklist Final

Antes de ir a producción:

- [ ] Cuenta de AdSense creada y verificada
- [ ] Script de AdSense en `index.html`
- [ ] `VITE_ADSENSE_CLIENT_ID` configurado en Vercel
- [ ] Unidades de anuncio creadas (mínimo 3)
- [ ] Slots actualizados en el código
- [ ] Sitio deployado en producción
- [ ] Anuncios visibles en el sitio
- [ ] Política de privacidad agregada
- [ ] Sitio aprobado por Google (esperar 1-3 días)

---

## 🎉 ¡Listo!

Una vez configurado, los anuncios comenzarán a generar ingresos automáticamente. Monitorea tus estadísticas en el [Dashboard de AdSense](https://www.google.com/adsense/).

**Próximos pasos:**
1. Promociona tu sitio para aumentar tráfico
2. Agrega más prompts de calidad
3. Experimenta con posiciones de anuncios
4. Revisa analytics semanalmente

¿Preguntas? Consulta el [Centro de Ayuda de AdSense](https://support.google.com/adsense/).
