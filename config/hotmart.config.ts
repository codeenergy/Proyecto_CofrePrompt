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
    title: '💰 Sistema de Afiliados: Genera Ingresos Pasivos',
    shortDescription: 'Aprende a generar ingresos recurrentes con marketing de afiliados',
    description: 'Descubre el sistema completo para convertirte en afiliado exitoso. Aprende a seleccionar productos ganadores, crear contenido que convierte, dominar el tráfico orgánico y pagado, y construir un negocio digital 100% automatizado. Incluye estrategias de email marketing, embudos de venta y métricas clave para escalar tus comisiones. Con este método ya han generado más de $500K en comisiones.',
    youtubeVideoId: '4qQBR7SN9ZU', // Video real sobre marketing de afiliados
    imageUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/E103121102Q?dp=1',
    category: '💰 Marketing de Afiliados',
    highlights: [
      'Método probado con +500K generados',
      'Tráfico orgánico y pagado',
      'Embudos listos para usar',
      'Grupo privado de afiliados'
    ],
    badge: '🔥 MÁS VENDIDO'
  },
  {
    id: '2',
    title: '🤖 IA para Emprendedores: Automatización Total',
    shortDescription: 'Domina ChatGPT, Claude y herramientas IA para multiplicar tu productividad',
    description: 'Curso definitivo de Inteligencia Artificial aplicada a negocios. Aprende a automatizar creación de contenido, servicio al cliente, análisis de datos, generación de imágenes profesionales y mucho más. Incluye más de 1000 prompts probados, plantillas de automatización con Make y Zapier, y casos de éxito reales. Ahorra 20+ horas semanales automatizando tareas repetitivas.',
    youtubeVideoId: 'sTeoEFzVNSc', // Video sobre automatización con IA
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/A101639222W?dp=1',
    category: '🤖 Inteligencia Artificial',
    highlights: [
      '1000+ prompts profesionales',
      'Automatización con Make/Zapier',
      'Casos de éxito documentados',
      'Actualizaciones semanales IA'
    ],
    badge: '⚡ OFERTA LIMITADA'
  },
  {
    id: '3',
    title: '🛍️ E-commerce desde Cero: Tienda Rentable en 30 Días',
    shortDescription: 'Monta tu tienda online profesional y empieza a vender hoy',
    description: 'Método completo para crear una tienda virtual rentable sin inventario. Aprende dropshipping nacional e internacional, negociación con proveedores, estrategias de producto ganador, diseño de tienda profesional en Shopify/Nuvemshop, y campañas de Meta Ads que convierten. Incluye 50+ productos validados, scripts de anuncios probados, y acceso a grupo privado con mentorías semanales en vivo.',
    youtubeVideoId: 'mBJKJNMcBV4', // Video sobre ecommerce
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/K101644464P?dp=1',
    category: '🛒 E-commerce',
    highlights: [
      '50+ productos validados',
      'Proveedores nacionales e internacionales',
      'Scripts de anuncios ganadores',
      'Mentorías semanales en vivo'
    ],
    badge: '🌟 MÉTODO 2025'
  },
  {
    id: '4',
    title: '📊 Day Trade do Zero: Opere na Bolsa com Segurança',
    shortDescription: 'Aprenda estratégias comprovadas de day trade e swing trade',
    description: 'Formação completa em Day Trade e Swing Trade para iniciantes e intermediários. Domine análisis técnico avançado, gestão de risco profissional, leitura de tape reading, estrategias de scalping e position, e psicología do trader vencedor. Inclui sala ao vivo diária, indicadores personalizados para TradingView, e suporte direto com traders profissionais. Mais de 3.000 alunos operando com lucro consistente.',
    youtubeVideoId: 'sLqYJCDmW9c', // Video sobre day trade
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/E103136583X?dp=1',
    category: '📊 Trading & Investimentos',
    highlights: [
      'Sala ao vivo diária',
      'Indicadores TradingView inclusos',
      '+3000 alunos lucrando',
      'Gestão de risco profissional'
    ],
    badge: '💰 VALIDADO'
  },
  {
    id: '5',
    title: '✍️ Copy Persuasivo: Escreva Textos que Vendem',
    shortDescription: 'Domina a arte de vender com palavras e multiplique suas conversões',
    description: 'Curso completo de Copywriting Persuasivo do zero ao avançado. Aprenda fórmulas comprovadas (AIDA, PAS, FAB), gatilhos mentais poderosos, storytelling que vende, headlines que capturam atenção, e emails que convertem. Inclui swipe file com +500 copies vencedores, templates prontos para VSL, páginas de vendas e anúncios, além de análise personalizada dos seus textos. Já gerou mais de R$ 10M em vendas para alunos.',
    youtubeVideoId: 'bQw3fP_Lcx8', // Video sobre copywriting
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/Q101638891S?dp=1',
    category: '✍️ Copywriting',
    highlights: [
      'Swipe file com +500 exemplos',
      'Templates VSL e páginas de venda',
      'Análise personalizada de copies',
      'R$ 10M+ gerados por alunos'
    ],
    badge: '🔥 TOP VENDAS'
  },
  {
    id: '6',
    title: '🎨 Design Gráfico Profissional: Do Zero ao Avançado',
    shortDescription: 'Crie designs incríveis e venda seus serviços como freelancer',
    description: 'Formação completa em Design Gráfico para quem quer se tornar profissional. Domine Photoshop, Illustrator, Figma, Canva Pro e After Effects básico. Aprenda criação de identidade visual, design de logos memoráveis, posts para redes sociais, materiais gráficos, mockups realistas e muito mais. Inclui 50+ projetos práticos, portfólio profissional pronto, certificado reconhecido e estratégias para conseguir seus primeiros clientes pagantes.',
    youtubeVideoId: 'g01TRfAZTjk', // Video sobre design gráfico
    imageUrl: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/T101431344N?dp=1',
    category: '🎨 Design & Criatividade',
    highlights: [
      '5 ferramentas profissionais',
      '50+ projetos práticos',
      'Portfólio completo incluído',
      'Como captar primeiros clientes'
    ],
    badge: '⭐ POPULAR'
  },
  {
    id: '7',
    title: '💻 Dev Full Stack: Programador Profissional em 6 Meses',
    shortDescription: 'Torne-se desenvolvedor web e consiga trabalho remoto bem remunerado',
    description: 'Formação completa e atualizada em Desenvolvimento Web Full Stack. Domine HTML5, CSS3, JavaScript ES6+, React.js, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, Git/GitHub, deploy na nuvem e muito mais. Aprenda com projetos reais do mercado, desde landing pages até sistemas complexos. Inclui 25+ projetos no portfólio, preparação para entrevistas técnicas, simulados de código, e acesso vitalício à comunidade de devs. Mais de 500 alunos empregados.',
    youtubeVideoId: 'SV0R3nEwt0Q', // Video sobre programação web
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://go.hotmart.com/I101639218Q?dp=1',
    category: '💻 Programação',
    highlights: [
      '25+ projetos no portfólio',
      'Stack moderna 2025 (React/Next/Node)',
      'Preparação para entrevistas técnicas',
      '+500 alunos empregados'
    ],
    badge: '🚀 EMPREGABILIDADE'
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
