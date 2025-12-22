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
    title: '🍰 230+ Recetas de Postres',
    shortDescription: 'Aprende a preparar postres deliciosos sin horno',
    description: 'Aprende a preparar postres deliciosos sin horno, con coberturas exquisitas y más. Curso completo con recetas paso a paso, trucos profesionales y técnicas de decoración. Ideal para emprendedores que quieren iniciar su negocio de repostería o para quienes desean sorprender a su familia con deliciosos postres caseros.',
    youtubeVideoId: 'VKHFZhLX5i8',
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/E103121102Q?dp=1',
    category: '🍰 Repostería',
    highlights: [
      '230+ recetas sin horno',
      'Coberturas exquisitas',
      'Videos paso a paso',
      'Técnicas profesionales'
    ],
    badge: '🔥 MÁS VENDIDO'
  },
  {
    id: '2',
    title: '💰 Libertad Financiera',
    shortDescription: 'Deja tu empleo sin consecuencias financieras',
    description: 'Deja tu empleo sin consecuencias financieras. Guía completa de 213 páginas con estrategias probadas para alcanzar la libertad financiera. Aprende a crear múltiples fuentes de ingresos, invertir inteligentemente y construir un patrimonio sólido que te permita vivir la vida que siempre soñaste.',
    youtubeVideoId: 'mOhzl98NqIw',
    imageUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/A101639222W?dp=1',
    category: '💰 Finanzas Personales',
    highlights: [
      'eBook de 213 páginas',
      'Estrategias probadas',
      'Múltiples fuentes de ingresos',
      'Plan de acción completo'
    ],
    badge: '⚡ eBook Premium'
  },
  {
    id: '3',
    title: '💎 Diseña con Resina Epoxi',
    shortDescription: 'Crea joyería, llaveros y accesorios únicos',
    description: 'Crea joyería, llaveros y accesorios únicos. De principiante a experto. Aprende todas las técnicas de trabajo con resina epoxi, desde lo más básico hasta proyectos avanzados. Incluye lista de proveedores, moldes recomendados y trucos para lograr acabados profesionales.',
    youtubeVideoId: 'JnStWI4Vf7A',
    imageUrl: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/K101644464P?dp=1',
    category: '💎 Manualidades',
    highlights: [
      'De principiante a experto',
      'Lista de proveedores',
      'Acceso de por vida',
      'Técnicas avanzadas'
    ],
    badge: '🌟 ACCESO VITALICIO'
  },
  {
    id: '4',
    title: '🕯️ Velas Artesanales Pro',
    shortDescription: 'Domina el arte de crear velas decorativas',
    description: 'Domina el arte de crear velas decorativas. Incluye lista de proveedores. Aprende a elaborar velas aromáticas, decorativas y terapéuticas con acabado profesional. Curso certificado que te enseña desde cómo elegir las mejores ceras hasta técnicas avanzadas de diseño y decoración.',
    youtubeVideoId: 'xFEp87KxEK0',
    imageUrl: 'https://images.unsplash.com/photo-1602874801006-e747926f4a57?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/E103136583X?dp=1',
    category: '🕯️ Artesanías',
    highlights: [
      'Curso certificado',
      'Lista de proveedores',
      'Técnicas profesionales',
      'Velas aromáticas y decorativas'
    ],
    badge: '💰 CURSO CERTIFICADO'
  },
  {
    id: '5',
    title: '💇 Extensiones V-Light',
    shortDescription: 'Certificación profesional en extensiones de cabello',
    description: 'Certificación profesional en extensiones de cabello. Duración hasta 4 meses. Programa completo que te enseña la técnica V-Light desde cero, con práctica supervisada, materiales incluidos y certificación oficial al finalizar. Conviértete en una profesional de las extensiones capilares.',
    youtubeVideoId: 'rCcPF0cRSFI',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/Q101638891S?dp=1',
    category: '💇 Belleza Profesional',
    highlights: [
      'Certificación oficial',
      'Duración hasta 4 meses',
      'Práctica supervisada',
      'Materiales incluidos'
    ],
    badge: '🔥 PROGRAMA COMPLETO'
  },
  {
    id: '6',
    title: '🎈 Master en Decoración con Globos',
    shortDescription: 'Convierte tu tiempo libre en ingresos',
    description: 'Convierte tu tiempo libre en ingresos. 3 niveles + certificación oficial. Aprende desde decoraciones básicas hasta arcos elaborados, columnas, centros de mesa y esculturas complejas. Incluye mentorías en vivo, acceso a grupo privado y certificación reconocida internacionalmente.',
    youtubeVideoId: '3aLy0mAYUYo',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/T101431344N?dp=1',
    category: '🎈 Decoración',
    highlights: [
      '3 niveles de aprendizaje',
      'Certificación oficial',
      'Mentorías en vivo',
      'Grupo privado'
    ],
    badge: '⭐ POPULAR'
  },
  {
    id: '7',
    title: '🧪 Moldes de Silicona Caseros',
    shortDescription: 'Aprende a elaborar tus propios moldes desde casa',
    description: 'Aprende a elaborar tus propios moldes desde casa. Ahorra dinero. Guía práctica completa que te enseña a crear moldes de silicona para cualquier proyecto: repostería, resina, velas, jabones y más. Incluye fórmulas, proveedores y técnicas para moldes de alta calidad.',
    youtubeVideoId: 'OY8l4wcABMk',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/I101639218Q?dp=1',
    category: '🧪 DIY',
    highlights: [
      'Guía práctica completa',
      'Ahorra en moldes',
      'Fórmulas incluidas',
      'Lista de proveedores'
    ],
    badge: '🚀 GUÍA PRÁCTICA'
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
