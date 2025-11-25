# ⚡ Quick Start - CofrePrompt

Guía rápida para tener tu app corriendo en 2 minutos.

---

## 🚀 Opción 1: Deploy en Vercel (1 click)

La forma más rápida de tener tu app en producción:

1. Click en el botón de deploy:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/cofreprompt)

2. Espera 2 minutos mientras Vercel hace el build

3. ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

**Nota**: La app funcionará perfectamente sin configurar Firebase (usará un usuario demo).

---

## 💻 Opción 2: Desarrollo Local

### Paso 1: Instalar

```bash
git clone https://github.com/tu-usuario/cofreprompt.git
cd cofreprompt
npm install
```

### Paso 2: Ejecutar

```bash
npm run dev
```

### Paso 3: Abrir

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

¡Eso es todo! 🎉

---

## 🔧 Configuración Opcional

### Firebase (para login real)

Si quieres habilitar login con Google:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Google Authentication
3. Copia `.env.example` a `.env.local`
4. Pega tus credenciales de Firebase
5. Reinicia el servidor

**Sin Firebase**: La app usa un usuario demo automáticamente.

---

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Verificar errores
```

---

## 🎯 Próximos Pasos

1. ✅ **Personaliza los prompts**: Edita `constants.ts`
2. ✅ **Cambia los colores**: Edita `tailwind.config.js`
3. ✅ **Agrega tu dominio**: Configura en Vercel
4. ✅ **Habilita Analytics**: Settings → Analytics en Vercel

---

## 🐛 Problemas?

- **Pantalla en blanco**: Revisa la consola del navegador (F12)
- **Error de Firebase**: No configures Firebase o usa credenciales válidas
- **Build falla**: Ejecuta `npm run lint` para ver errores

Más ayuda en [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📚 Documentación Completa

- [README.md](./README.md) - Documentación completa
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía de deployment detallada

---

<div align="center">

**¿Te gustó el proyecto? ⭐ Dale una estrella!**

[Demo](https://cofreprompt.vercel.app) • [GitHub](https://github.com/tu-usuario/cofreprompt) • [Issues](https://github.com/tu-usuario/cofreprompt/issues)

</div>
