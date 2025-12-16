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
    title: '🚀 Millonario Digital: Fórmula Completa 2025',
    shortDescription: 'Domina el marketing digital y genera ingresos desde casa',
    description: 'El curso más completo de marketing digital en español. Aprende SEO, Google Ads, Facebook Ads, Email Marketing, Copywriting, Funnel de Ventas y mucho más. Más de 250 clases prácticas con casos reales de éxito. Certificado profesional incluido.',
    price: '$97',
    originalPrice: '$497',
    youtubeVideoId: 'pPKUfnZAGN0', // Video sobre marketing digital
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/E103121102Q?dp=1',
    category: '💰 Marketing Digital',
    highlights: [
      '250+ clases paso a paso',
      'Estrategias probadas 2025',
      'Certificado profesional',
      'Grupo VIP exclusivo'
    ],
    badge: '🔥 MÁS VENDIDO'
  },
  {
    id: '2',
    title: '🤖 IA para Negocios: ChatGPT Masterclass',
    shortDescription: 'Automatiza todo tu negocio con inteligencia artificial',
    description: 'Aprende a usar ChatGPT, Claude, Midjourney y las mejores herramientas de IA para multiplicar tu productividad x10. Incluye más de 500 prompts probados, casos de uso reales y estrategias avanzadas. Perfecto para emprendedores y profesionales.',
    price: '$67',
    originalPrice: '$297',
    youtubeVideoId: 'JTxsNm9IdYU', // Video sobre ChatGPT
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/A101639222W?dp=1',
    category: '🤖 Inteligencia Artificial',
    highlights: [
      '500+ prompts profesionales',
      'Automatización de tareas',
      'Casos de uso reales',
      'Actualizaciones continuas'
    ],
    badge: '⚡ OFERTA'
  },
  {
    id: '3',
    title: '💎 Dropshipping Premium: $10K/Mes Garantizado',
    shortDescription: 'Crea tu tienda online rentable paso a paso',
    description: 'Sistema completo y actualizado para crear un negocio de dropshipping exitoso. Aprende a encontrar productos ganadores, crear anuncios que venden, manejar proveedores y escalar a 5 cifras mensuales. Incluye plantillas, scripts y soporte 24/7.',
    price: '$147',
    originalPrice: '$497',
    youtubeVideoId: 'nMNdPlXrRPo', // Video sobre dropshipping
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/K101644464P?dp=1',
    category: '🛒 E-commerce',
    highlights: [
      'Método paso a paso',
      'Proveedores verificados',
      'Scripts de anuncios',
      'Grupo VIP de alumnos'
    ],
    badge: '🌟 NOVEDAD'
  },
  {
    id: '4',
    title: '📈 Trading Pro: Libertad Financiera 2025',
    shortDescription: 'Estrategias probadas de trading para principiantes y expertos',
    description: 'Domina el trading de criptomonedas, forex y acciones con estrategias rentables y probadas. Aprende análisis técnico, gestión de riesgo, psicología del trader y automatización. Incluye señales en vivo, bots configurados y mentorías grupales.',
    price: '$197',
    originalPrice: '$697',
    youtubeVideoId: 'fJUspOFKwVo', // Video sobre trading
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/E103136583X?dp=1',
    category: '📊 Trading & Inversiones',
    highlights: [
      'Estrategias rentables',
      'Señales en tiempo real',
      'Bots automatizados',
      'Mentoría grupal semanal'
    ],
    badge: '💰 TOP'
  },
  {
    id: '5',
    title: '✍️ Copywriting Millonario: Vende con Palabras',
    shortDescription: 'Convierte textos en máquinas de vender automáticas',
    description: 'Aprende el arte del copywriting persuasivo que genera ventas 24/7. Domina emails, páginas de ventas, anuncios y contenido viral. Incluye fórmulas secretas, swipe files con cientos de ejemplos y revisiones personalizadas de tus textos.',
    price: '$87',
    originalPrice: '$347',
    youtubeVideoId: 'XCN5LnC6y-I', // Video sobre copywriting
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/Q101638891S?dp=1',
    category: '✍️ Copywriting',
    highlights: [
      'Fórmulas que venden',
      'Swipe file gigante',
      'Revisión de copies',
      'Plantillas listas para usar'
    ],
    badge: '🔥 MÁS VENDIDO'
  },
  {
    id: '6',
    title: '🎨 Diseño Gráfico Pro: De Cero a Profesional',
    shortDescription: 'Crea diseños impactantes y vende tus servicios',
    description: 'Curso completo de diseño gráfico profesional. Domina Photoshop, Illustrator, Figma y Canva. Aprende branding, diseño de logos, redes sociales, UX/UI y más. Incluye proyectos reales, portafolio profesional y estrategias para conseguir clientes.',
    price: '$127',
    originalPrice: '$447',
    youtubeVideoId: 'YJB1qa0vQeY', // Video sobre diseño gráfico
    imageUrl: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/T101431344N?dp=1',
    category: '🎨 Diseño & Creatividad',
    highlights: [
      'Domina 4+ herramientas',
      'Proyectos profesionales',
      'Portafolio completo',
      'Cómo conseguir clientes'
    ],
    badge: '⭐ POPULAR'
  },
  {
    id: '7',
    title: '💻 Programación Web Full Stack: Empleabilidad Real',
    shortDescription: 'Conviértete en desarrollador web y consigue trabajo remoto',
    description: 'El curso más completo de programación web. Aprende HTML, CSS, JavaScript, React, Node.js, bases de datos y deployment. Incluye 20+ proyectos reales, preparación para entrevistas técnicas y bolsa de trabajo exclusiva. ¡Garantía de empleabilidad!',
    price: '$177',
    originalPrice: '$697',
    youtubeVideoId: 'UB1O30fR-EE', // Video sobre programación web
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/I101639218Q?dp=1',
    category: '💻 Programación',
    highlights: [
      '20+ proyectos reales',
      'Tecnologías modernas 2025',
      'Preparación para entrevistas',
      'Bolsa de trabajo exclusiva'
    ],
    badge: '🚀 LANZAMIENTO'
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
