// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN OPTIMIZADA DE MONETAG
// ═══════════════════════════════════════════════════════════════════════════
//
// ✅ SOLO SE ACTIVA EN PRODUCCIÓN (Vercel)
// ✅ DELAYS OPTIMIZADOS PARA BUENA UX
// ✅ CONTROL TOTAL DESDE UN SOLO LUGAR
//
// Para deshabilitar todos los anuncios: enabled: false
// Para deshabilitar un tipo específico: inPagePush.enabled: false
// ═══════════════════════════════════════════════════════════════════════════

export const MONETAG_CONFIG = {
  // ──────────────────────────────────────────────────────────────────────────
  // CONTROL MAESTRO
  // ──────────────────────────────────────────────────────────────────────────
  enabled: true, // ← Cambiar a false para deshabilitar TODOS los anuncios

  // Detectar si estamos en producción (Vercel)
  isProduction: () => {
    if (typeof window === 'undefined') return false;
    return window.location.hostname !== 'localhost' &&
           window.location.hostname !== '127.0.0.1' &&
           !window.location.hostname.includes('192.168');
  },

  // ──────────────────────────────────────────────────────────────────────────
  // IN-PAGE PUSH (Zona: 10325700)
  // ──────────────────────────────────────────────────────────────────────────
  // Notificaciones discretas - BAJA INTRUSIÓN
  inPagePush: {
    enabled: true,
    zone: '10325700',
    src: 'https://nap5k.com/tag.min.js',
    delayMs: 4000, // 4 segundos - Usuario ve el contenido primero
  },

  // ──────────────────────────────────────────────────────────────────────────
  // VIGNETTE BANNER (Zona: 10325703)
  // ──────────────────────────────────────────────────────────────────────────
  // Pantalla completa al navegar - MEDIA INTRUSIÓN
  vignetteBanner: {
    enabled: true,
    zone: '10325703',
    src: 'https://gizokraijaw.net/vignette.min.js',
    delayMs: 8000, // 8 segundos - Mucho menos intrusivo
    maxPerSession: 1, // Solo 1 vez por sesión - Respeta al usuario
  },

  // ──────────────────────────────────────────────────────────────────────────
  // DIRECT LINK (https://otieu.com/4/10325708)
  // ──────────────────────────────────────────────────────────────────────────
  // Banner visual integrado - BAJA INTRUSIÓN
  directLink: {
    enabled: true,
    url: 'https://otieu.com/4/10325708',
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
