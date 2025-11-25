import React from 'react';

type LegalView = 'PRIVACY' | 'TERMS' | 'COOKIES' | 'CONTACT';

interface FooterProps {
  onOpenLegal: (view: LegalView) => void;
  onPresetFilter: (type: 'BEST' | 'NEW' | 'ART' | 'CODE') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal, onPresetFilter }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="text-sm font-semibold text-white">CofrePrompt</span>
            <span className="text-xs text-slate-500 hidden sm:inline">© 2024</span>
          </div>

          {/* Quick filters */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 mr-2 hidden sm:inline">Explorar:</span>
            <button onClick={() => onPresetFilter('BEST')} className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors">
              Populares
            </button>
            <button onClick={() => onPresetFilter('NEW')} className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors">
              Nuevos
            </button>
            <button onClick={() => onPresetFilter('ART')} className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors">
              Arte
            </button>
            <button onClick={() => onPresetFilter('CODE')} className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors">
              Código
            </button>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <button onClick={() => onOpenLegal('PRIVACY')} className="hover:text-slate-300 transition-colors">
              Privacidad
            </button>
            <span className="text-slate-700">•</span>
            <button onClick={() => onOpenLegal('TERMS')} className="hover:text-slate-300 transition-colors">
              Términos
            </button>
            <span className="text-slate-700">•</span>
            <button onClick={() => onOpenLegal('CONTACT')} className="hover:text-slate-300 transition-colors">
              Contacto
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
