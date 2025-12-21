// ═══════════════════════════════════════════════════════════════════════════
// SISTEMA DE TRADUCCIONES - ESPAÑOL / INGLÉS
// ═══════════════════════════════════════════════════════════════════════════

export const translations = {
  es: {
    // Navbar
    navbar: {
      search: '🔍 Buscar prompts increíbles...',
      create: 'Crear',
      login: 'Entrar',
      logout: 'Cerrar Sesión',
      profile: 'Ver perfil',
    },

    // Sidebar
    sidebar: {
      categories: 'Categorías',
      platform: 'Plataforma',
      all: 'Todas',
      totalPrompts: 'Total Prompts',
      thisWeek: 'esta semana',
    },

    // Footer
    footer: {
      explore: '🔥 Explorar:',
      popular: 'Populares',
      new: 'Nuevos',
      art: 'Arte',
      code: 'Código',
      privacy: 'Privacidad',
      terms: 'Términos',
      contact: 'Contacto',
      madeWith: 'Hecho con',
      forDevelopers: 'por desarrolladores para desarrolladores',
    },

    // Modal
    modal: {
      by: 'Por',
      content: 'Contenido',
      comments: 'Comentarios',
      stats: 'Estadísticas',
      copyPrompt: 'Copiar Prompt',
      loginToCopy: 'Login para Copiar',
      download: 'Descargar',
      addToFavorites: 'Agregar a favoritos',
      removeFromFavorites: 'Quitar de favoritos',
      saveToCollection: 'Guardar en colección',
      lockedContent: 'Contenido bloqueado',
      loginRequired: 'Iniciar sesión',
    },

    // Hotmart Modal
    hotmart: {
      offers: '🎁 Ofertas',
      recommendedProducts: 'Productos Recomendados para Ti',
      subtitle: 'Cursos y herramientas seleccionadas para llevar tu negocio al siguiente nivel',
      specialOffer: '¡OFERTA ESPECIAL!',
      discoverPrice: 'Descubre el precio exclusivo y accede al contenido completo',
      limitedDiscount: '🔥 DESCUENTO LIMITADO DISPONIBLE',
      viewFullOffer: 'VER OFERTA COMPLETA',
      securePayment: 'Pago 100% Seguro • Garantía de 7 días',
      highlights: 'Destacados:',
      viewOffer: 'Ver oferta',
    },

    // Prompt Card
    promptCard: {
      copied: '¡Copiado!',
      copy: 'Copiar prompt',
    },

    // Categories (mantenemos en español porque son nombres propios)
    categories: {
      All: 'Todo',
      General: 'General',
      Coding: 'Programación',
      Design: 'Diseño',
      Marketing: 'Marketing',
      Writing: 'Escritura',
      Business: 'Negocios',
    },
  },

  en: {
    // Navbar
    navbar: {
      search: '🔍 Search amazing prompts...',
      create: 'Create',
      login: 'Sign In',
      logout: 'Sign Out',
      profile: 'View profile',
    },

    // Sidebar
    sidebar: {
      categories: 'Categories',
      platform: 'Platform',
      all: 'All',
      totalPrompts: 'Total Prompts',
      thisWeek: 'this week',
    },

    // Footer
    footer: {
      explore: '🔥 Explore:',
      popular: 'Popular',
      new: 'New',
      art: 'Art',
      code: 'Code',
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
      madeWith: 'Made with',
      forDevelopers: 'by developers for developers',
    },

    // Modal
    modal: {
      by: 'By',
      content: 'Content',
      comments: 'Comments',
      stats: 'Statistics',
      copyPrompt: 'Copy Prompt',
      loginToCopy: 'Login to Copy',
      download: 'Download',
      addToFavorites: 'Add to favorites',
      removeFromFavorites: 'Remove from favorites',
      saveToCollection: 'Save to collection',
      lockedContent: 'Locked content',
      loginRequired: 'Sign in',
    },

    // Hotmart Modal
    hotmart: {
      offers: '🎁 Offers',
      recommendedProducts: 'Recommended Products for You',
      subtitle: 'Selected courses and tools to take your business to the next level',
      specialOffer: 'SPECIAL OFFER!',
      discoverPrice: 'Discover the exclusive price and access the full content',
      limitedDiscount: '🔥 LIMITED DISCOUNT AVAILABLE',
      viewFullOffer: 'VIEW FULL OFFER',
      securePayment: '100% Secure Payment • 7-day Guarantee',
      highlights: 'Highlights:',
      viewOffer: 'View offer',
    },

    // Prompt Card
    promptCard: {
      copied: 'Copied!',
      copy: 'Copy prompt',
    },

    // Categories
    categories: {
      All: 'All',
      General: 'General',
      Coding: 'Coding',
      Design: 'Design',
      Marketing: 'Marketing',
      Writing: 'Writing',
      Business: 'Business',
    },
  },
};

export type Language = 'es' | 'en';
export type TranslationKeys = typeof translations.es;
