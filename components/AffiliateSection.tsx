import React from 'react';
import { ExternalLink, Zap, Image, PenTool } from 'lucide-react';

interface AffiliateTool {
  name: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}

// Use real homepages. In production, replace these with your specific affiliate tracking links
const TOOLS: AffiliateTool[] = [
  {
    name: "Jasper AI",
    description: "Genera contenido de marketing de alto nivel 10x más rápido.",
    icon: <PenTool className="text-white" size={24} />,
    link: "https://www.jasper.ai/",
    color: "bg-gradient-to-br from-purple-600 to-blue-600"
  },
  {
    name: "Midjourney",
    description: "Crea imágenes artísticas impresionantes con IA.",
    icon: <Image className="text-white" size={24} />,
    link: "https://www.midjourney.com/",
    color: "bg-gradient-to-br from-pink-600 to-red-600"
  },
  {
    name: "Copy.ai",
    description: "Automatiza tu copywriting y posts de redes sociales.",
    icon: <Zap className="text-white" size={24} />,
    link: "https://www.copy.ai/",
    color: "bg-gradient-to-br from-green-500 to-emerald-700"
  }
];

const AffiliateSection: React.FC = () => {
  return (
    <div className="my-12 border-t border-slate-800 pt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Herramientas Recomendadas</h3>
        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded border border-slate-700">Partners</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TOOLS.map((tool, idx) => (
          <a 
            key={idx} 
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer" // Important for security and affiliate tracking
            className="group relative bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition-all hover:-translate-y-1 shadow-lg shadow-black/20"
          >
            <div className={`absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400`}>
              <ExternalLink size={16} />
            </div>
            
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-lg ${tool.color}`}>
                {tool.icon}
              </div>
              <h4 className="font-bold text-slate-200 text-lg">{tool.name}</h4>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed h-10 line-clamp-2">
              {tool.description}
            </p>
            
            <div className="mt-4 text-xs font-medium text-primary group-hover:underline flex items-center gap-1">
              Prueba Gratis <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AffiliateSection;