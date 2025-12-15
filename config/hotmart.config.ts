// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN DE PRODUCTOS HOTMART
// ═══════════════════════════════════════════════════════════════════════════
//
// Configura tus 6 productos de afiliados de Hotmart aquí
// Incluye título, descripción, video de YouTube, imagen y link de afiliado
//
// ═══════════════════════════════════════════════════════════════════════════

export interface HotmartProduct {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: string;
  originalPrice?: string;
  youtubeVideoId: string; // ID del video de YouTube (ej: "dQw4w9WgXcQ")
  imageUrl: string;
  affiliateLink: string;
  category: string;
  highlights: string[];
  badge?: string; // Ej: "MÁS VENDIDO", "NOVEDAD", "OFERTA"
}

export const HOTMART_PRODUCTS: HotmartProduct[] = [
  {
    id: '1',
    title: 'Curso de Marketing Digital Completo 2025',
    shortDescription: 'Aprende a generar ingresos con marketing digital desde cero',
    description: 'Curso completo de marketing digital con más de 200 clases. Aprende SEO, Google Ads, Facebook Ads, Email Marketing, Copywriting y mucho más. Incluye certificado y soporte vitalicio.',
    price: '$97',
    originalPrice: '$297',
    youtubeVideoId: 'dQw4w9WgXcQ', // ← Reemplaza con tu video real
    imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/tu-link-afiliado-1', // ← Tu link de afiliado
    category: 'Marketing Digital',
    highlights: [
      '200+ clases en video',
      'Certificado profesional',
      'Soporte vitalicio',
      'Actualizaciones gratuitas'
    ],
    badge: 'MÁS VENDIDO'
  },
  {
    id: '2',
    title: 'Dropshipping: De 0 a $10k/mes',
    shortDescription: 'Sistema completo para crear tu tienda online rentable',
    description: 'Aprende a crear una tienda de dropshipping rentable desde cero. Incluye estrategias de producto ganador, automatización, Facebook Ads y scaling. Más de 500 alumnos ganando dinero.',
    price: '$127',
    originalPrice: '$397',
    youtubeVideoId: 'dQw4w9WgXcQ', // ← Reemplaza con tu video real
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/tu-link-afiliado-2', // ← Tu link de afiliado
    category: 'E-commerce',
    highlights: [
      'Sistema paso a paso',
      'Fornecedores verificados',
      'Grupo VIP de alumnos',
      'Bonus: Scripts de anuncios'
    ],
    badge: 'NOVEDAD'
  },
  {
    id: '3',
    title: 'ChatGPT para Negocios: Productividad x10',
    shortDescription: 'Automatiza tu negocio con inteligencia artificial',
    description: 'Descubre cómo usar ChatGPT y otras IAs para automatizar tareas, crear contenido, generar ideas y multiplicar tu productividad. Perfecto para emprendedores y profesionales.',
    price: '$47',
    originalPrice: '$147',
    youtubeVideoId: 'dQw4w9WgXcQ', // ← Reemplaza con tu video real
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/tu-link-afiliado-3', // ← Tu link de afiliado
    category: 'Inteligencia Artificial',
    highlights: [
      '100+ prompts listos',
      'Casos de uso reales',
      'Templates descargables',
      'Actualizaciones mensuales'
    ],
    badge: 'OFERTA'
  },
  {
    id: '4',
    title: 'Desarrollo Web Full Stack 2025',
    shortDescription: 'Conviértete en desarrollador profesional en 6 meses',
    description: 'Curso completo de desarrollo web con React, Node.js, MongoDB y más. Aprende a crear aplicaciones web modernas y consigue trabajo remoto. Incluye proyectos reales y portafolio.',
    price: '$197',
    originalPrice: '$597',
    youtubeVideoId: 'dQw4w9WgXcQ', // ← Reemplaza con tu video real
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/tu-link-afiliado-4', // ← Tu link de afiliado
    category: 'Programación',
    highlights: [
      '300+ horas de contenido',
      '15 proyectos reales',
      'Mentoría personalizada',
      'Garantía de empleo'
    ]
  },
  {
    id: '5',
    title: 'Copy Persuasivo: Vende con Palabras',
    shortDescription: 'Aprende copywriting que convierte visitas en ventas',
    description: 'Domina el arte del copywriting persuasivo. Aprende a escribir emails, páginas de ventas, anuncios y contenido que vende. Usado por más de 1000 emprendedores exitosos.',
    price: '$77',
    originalPrice: '$247',
    youtubeVideoId: 'dQw4w9WgXcQ', // ← Reemplaza con tu video real
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/tu-link-afiliado-5', // ← Tu link de afiliado
    category: 'Copywriting',
    highlights: [
      'Fórmulas probadas',
      'Swipe file exclusivo',
      'Revisión de copies',
      'Comunidad activa'
    ],
    badge: 'MÁS VENDIDO'
  },
  {
    id: '6',
    title: 'Trading: Estrategias Rentables 2025',
    shortDescription: 'Invierte en criptomonedas y forex de forma inteligente',
    description: 'Aprende estrategias de trading probadas para criptomonedas y forex. Incluye análisis técnico, gestión de riesgo, psicología del trader y estrategias automatizadas. Para principiantes y avanzados.',
    price: '$167',
    originalPrice: '$497',
    youtubeVideoId: 'dQw4w9WgXcQ', // ← Reemplaza con tu video real
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/tu-link-afiliado-6', // ← Tu link de afiliado
    category: 'Trading',
    highlights: [
      'Estrategias probadas',
      'Señales en tiempo real',
      'Bots de trading',
      'Soporte 24/7'
    ],
    badge: 'NOVEDAD'
  }
];

// Configuración general
export const HOTMART_CONFIG = {
  enabled: true, // Habilitar/deshabilitar el modal de afiliados
  floatingButtonPosition: 'bottom-right' as 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
  floatingButtonText: '🎁 Ofertas',
  modalTitle: 'Productos Recomendados para Ti',
  modalSubtitle: 'Cursos y herramientas seleccionadas para llevar tu negocio al siguiente nivel',
};
