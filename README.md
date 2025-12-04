# 🚀 CofrePrompt - Premium AI Prompts Platform

<div align="center">

Una plataforma moderna y completa para descubrir, crear y compartir prompts de IA premium.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/cofreprompt)

[Demo en vivo](https://cofreprompt.vercel.app) · [Reportar Bug](https://github.com/tu-usuario/cofreprompt/issues) · [Solicitar Feature](https://github.com/tu-usuario/cofreprompt/issues) · [📚 Documentación](docs/)

</div>

---

## 📖 Documentación

- 📘 **[Guía de Inicio Rápido](docs/QUICKSTART.md)** - Comienza en 5 minutos
- 🚀 **[Guía de Deploy](docs/DEPLOY.md)** - Deploy a Vercel paso a paso
- 🔧 **[Configuración Firebase](docs/SETUP_FIREBASE.md)** - Setup de autenticación
- 🐛 **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Solución de problemas
- 📚 **[Documentación Completa](docs/)** - Todas las guías

---

## ✨ Características

### 🎯 Funcionalidades Principales
- **Exploración de Prompts**: Navega por categorías (Programación, Diseño, Marketing, etc.)
- **Filtros Avanzados**: Por plataforma (ChatGPT, Claude, Gemini, Midjourney, etc.)
- **Sistema de Búsqueda**: Encuentra prompts por título, descripción o tags
- **Ordenamiento**: Por popularidad, recientes o personalizado

### 👥 Funcionalidades Sociales
- **Sistema de Comentarios**: Deja reseñas y valoraciones (1-5 estrellas)
- **Perfiles de Usuario**: Muestra tus prompts creados, favoritos y colecciones
- **Favoritos**: Guarda tus prompts preferidos
- **Colecciones**: Organiza prompts en listas públicas o privadas
- **Sistema de Seguimiento**: Sigue a creadores de prompts

### 🎨 UX/UI Mejorada
- **Editor con Resaltado de Sintaxis**: Visualiza placeholders, variables y formato
- **Botones "Probar en [Plataforma]"**: Abre directamente en ChatGPT, Claude, etc.
- **Prompts Relacionados**: Algoritmo inteligente de recomendación
- **Historial de Uso**: Tracking de prompts utilizados
- **Modo Oscuro**: Diseño moderno con Tailwind CSS

### 📊 Analytics & Métricas
- **Dashboard de Estadísticas**: Vistas, likes, copias, comentarios
- **Gráficos de Tendencias**: Visualización de vistas por día
- **Engagement Tracking**: Métricas de interacción
- **Top Países**: Análisis geográfico de usuarios

### 🔌 Integraciones
- **Firebase Authentication**: Login con Google (opcional)
- **Copiar y Abrir en Plataforma**: Un click para usar el prompt
- **Google AdSense**: Monetización integrada
- **Responsive Design**: Funciona en móvil, tablet y desktop

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Authentication**: Firebase Auth (opcional)
- **Deployment**: Vercel
- **Package Manager**: npm

---

## 🚀 Deployment en Vercel

### Opción 1: Deploy con un Click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/cofreprompt)

### Opción 2: Deploy Manual

1. **Fork o clona este repositorio**

2. **Instala Vercel CLI** (si aún no lo tienes):
   ```bash
   npm install -g vercel
   ```

3. **Inicia sesión en Vercel**:
   ```bash
   vercel login
   ```

4. **Deploy el proyecto**:
   ```bash
   vercel
   ```

5. **Configura las variables de entorno en Vercel** (opcional):
   - Ve a tu proyecto en [vercel.com](https://vercel.com)
   - Settings → Environment Variables
   - Agrega las siguientes variables (ver `.env.example`):
     ```
     VITE_FIREBASE_API_KEY=tu-api-key
     VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
     VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
     VITE_FIREBASE_APP_ID=1:123456789:web:abc123
     ```

6. **Redeploy** para aplicar las variables:
   ```bash
   vercel --prod
   ```

---

## 💻 Desarrollo Local

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/cofreprompt.git
   cd cofreprompt
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura las variables de entorno** (opcional):
   ```bash
   cp .env.example .env.local
   ```
   Edita `.env.local` con tus credenciales de Firebase.

   **Nota**: La app funciona sin Firebase usando un usuario demo.

4. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

5. **Abre tu navegador** en [http://localhost:3000](http://localhost:3000)

### Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Compila para producción
npm run preview  # Preview del build de producción
npm run lint     # Verifica errores de TypeScript
```

---

## 📁 Estructura del Proyecto

```
cofreprompt/
├── components/          # Componentes de React
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── PromptCard.tsx
│   ├── Modal.tsx
│   ├── CommentsSection.tsx
│   ├── TryItButtons.tsx
│   ├── UserProfile.tsx
│   ├── CollectionsModal.tsx
│   ├── PromptEditor.tsx
│   ├── RelatedPrompts.tsx
│   ├── StatsPanel.tsx
│   └── ...
├── services/           # Servicios (Firebase, etc.)
│   └── firebase.ts
├── public/            # Archivos estáticos
│   └── favicon.svg
├── App.tsx           # Componente principal
├── index.tsx         # Entry point
├── types.ts          # TypeScript types
├── constants.ts      # Datos mock y constantes
├── index.css         # Estilos globales
├── tailwind.config.js
├── vite.config.ts
├── vercel.json       # Configuración de Vercel
└── package.json
```

---

## 🔧 Configuración

### Firebase (Opcional)

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Google Authentication
3. Copia las credenciales a `.env.local`
4. Si no configuras Firebase, la app usará un usuario demo

### Google AdSense (Opcional)

Edita `index.html` y reemplaza:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
```

---

## 🎨 Personalización

### Colores del Tema

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      background: '#0f172a',
      surface: '#1e293b',
      primary: '#6366f1',
      secondary: '#8b5cf6',
    }
  }
}
```

### Prompts de Ejemplo

Edita `constants.ts` para modificar los prompts de muestra.

---

## 🐛 Troubleshooting

### Error: Firebase API Key inválido
- **Solución**: Verifica que `.env.local` tenga las credenciales correctas, o simplemente no configures Firebase para usar el modo demo.

### La página se ve sin estilos
- **Solución**: Asegúrate de que Tailwind CSS esté correctamente configurado y ejecuta `npm run dev` de nuevo.

### Build falla en Vercel
- **Solución**: Verifica que todas las dependencias estén en `package.json` y que no haya errores de TypeScript con `npm run lint`.

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 👨‍💻 Autor

**Tu Nombre**

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Twitter: [@tu-twitter](https://twitter.com/tu-twitter)

---

## 🙏 Agradecimientos

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Firebase](https://firebase.google.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vercel](https://vercel.com/)

---

<div align="center">

Hecho con ❤️ por la comunidad

⭐ ¡Dale una estrella si te gustó el proyecto!

</div>
