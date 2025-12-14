// Configuración de Monetag Ads
// Solo se activa en producción para no molestar durante desarrollo

export const MONETAG_CONFIG = {
  // Control maestro - puedes deshabilitar todo desde aquí
  enabled: true,

  // Detectar si estamos en producción
  isProduction: () => {
    if (typeof window === 'undefined') return false;
    return window.location.hostname !== 'localhost' &&
           window.location.hostname !== '127.0.0.1' &&
           !window.location.hostname.includes('192.168');
  },

  // Configuración de In-Page Push
  inPagePush: {
    enabled: true,
    zone: '10325700',
    src: 'https://nap5k.com/tag.min.js',
    // Delay antes de cargar (en milisegundos) - da tiempo al usuario de ver el contenido primero
    delayMs: 3000,
  },

  // Configuración de Vignette Banner
  vignetteBanner: {
    enabled: true,
    zone: '10325703',
    src: 'https://gizokraijaw.net/vignette.min.js',
    // Delay antes de cargar - menos intrusivo si se espera un poco
    delayMs: 5000,
    // Frecuencia: mostrar solo 1 vez por sesión
    maxPerSession: 1,
  },

  // Direct Link - solo mostrar en secciones específicas
  directLink: {
    enabled: true,
    url: 'https://otieu.com/4/10325708',
    // Mostrar solo en ciertas rutas/secciones
    showInFooter: true,
    showInModal: false,
  },
};

// Helper para verificar si los anuncios deben cargarse
export const shouldLoadAds = (): boolean => {
  return MONETAG_CONFIG.enabled && MONETAG_CONFIG.isProduction();
};

// Helper para tracking de frecuencia
export const canShowVignette = (): boolean => {
  if (!shouldLoadAds() || !MONETAG_CONFIG.vignetteBanner.enabled) {
    return false;
  }

  const sessionKey = 'monetag_vignette_count';
  const count = parseInt(sessionStorage.getItem(sessionKey) || '0');

  if (count < MONETAG_CONFIG.vignetteBanner.maxPerSession) {
    sessionStorage.setItem(sessionKey, (count + 1).toString());
    return true;
  }

  return false;
};
