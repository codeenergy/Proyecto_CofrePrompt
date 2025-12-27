import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

type LegalView = 'PRIVACY' | 'TERMS' | 'COOKIES' | 'CONTACT';

interface FooterProps {
  onOpenLegal: (view: LegalView) => void;
  onPresetFilter: (type: 'BEST' | 'NEW' | 'ART' | 'CODE') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal, onPresetFilter }) => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-xl border-t-2 border-orange-500/20 py-6 px-4 shadow-2xl shadow-orange-500/10">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-blue-600/5 to-purple-600/5 animate-gradient-shift pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand con efectos modernos */}
          <div className="flex items-center gap-3 group">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-blue-600 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow" />

              <div className="relative w-8 h-8 bg-gradient-to-br from-orange-500 via-orange-600 to-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-orange-500/50 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-white font-black text-sm drop-shadow-lg">C</span>
              </div>
            </div>
            <div>
              <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-blue-400 drop-shadow-lg">
                CofrePrompt
              </span>
              <span className="block text-xs text-slate-400 font-semibold">© 2025</span>
            </div>
          </div>

          {/* Quick filters modernos */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-orange-300 mr-2 hidden sm:inline font-black">{t.footer.explore}</span>
            <button
              onClick={() => onPresetFilter('BEST')}
              className="px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-gradient-to-r hover:from-orange-500/30 hover:to-blue-500/30 rounded-lg transition-all duration-300 hover:scale-105 border border-slate-700/50 hover:border-orange-500/50 backdrop-blur-sm"
            >
              {t.footer.popular}
            </button>
            <button
              onClick={() => onPresetFilter('NEW')}
              className="px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30 rounded-lg transition-all duration-300 hover:scale-105 border border-slate-700/50 hover:border-blue-500/50 backdrop-blur-sm"
            >
              {t.footer.new}
            </button>
            <button
              onClick={() => onPresetFilter('ART')}
              className="px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 rounded-lg transition-all duration-300 hover:scale-105 border border-slate-700/50 hover:border-purple-500/50 backdrop-blur-sm"
            >
              {t.footer.art}
            </button>
            <button
              onClick={() => onPresetFilter('CODE')}
              className="px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-gradient-to-r hover:from-green-500/30 hover:to-emerald-500/30 rounded-lg transition-all duration-300 hover:scale-105 border border-slate-700/50 hover:border-green-500/50 backdrop-blur-sm"
            >
              {t.footer.code}
            </button>
          </div>

          {/* Legal links modernos */}
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => onOpenLegal('PRIVACY')}
              className="text-slate-400 hover:text-orange-400 transition-all duration-300 font-semibold hover:scale-110"
            >
              {t.footer.privacy}
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onOpenLegal('TERMS')}
              className="text-slate-400 hover:text-blue-400 transition-all duration-300 font-semibold hover:scale-110"
            >
              {t.footer.terms}
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onOpenLegal('CONTACT')}
              className="text-slate-400 hover:text-purple-400 transition-all duration-300 font-semibold hover:scale-110"
            >
              {t.footer.contact}
            </button>
          </div>

        </div>

        {/* Línea decorativa con gradiente */}
        <div className="mt-6 pt-4 border-t border-orange-500/10">
          <p className="text-center text-xs text-slate-500">
            Made by{' '}
            <a
              href="https://codeenergy.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 font-bold transition-colors hover:underline"
            >
              Code Energy
            </a>
            {' '}for All Users AI Future
          </p>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
