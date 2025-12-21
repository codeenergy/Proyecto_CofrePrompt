import React from 'react';
import { Category, Platform } from '../types';
import { LayoutGrid, Code, Palette, Megaphone, PenTool, Briefcase, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  closeMobile: () => void;
  selectedCategory: Category;
  onSelectCategory: (c: Category) => void;
  selectedPlatform: Platform | 'All';
  onSelectPlatform: (p: Platform | 'All') => void;
}

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  [Category.All]: <LayoutGrid size={16} />,
  [Category.General]: <Sparkles size={16} />,
  [Category.Coding]: <Code size={16} />,
  [Category.Design]: <Palette size={16} />,
  [Category.Marketing]: <Megaphone size={16} />,
  [Category.Writing]: <PenTool size={16} />,
  [Category.Business]: <Briefcase size={16} />,
};

const PLATFORM_COLORS: Record<string, string> = {
  'All': 'bg-slate-500',
  'ChatGPT': 'bg-emerald-500',
  'Midjourney': 'bg-purple-500',
  'Claude': 'bg-orange-500',
  'Stable Diffusion': 'bg-pink-500',
  'Gemini': 'bg-blue-500',
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen, closeMobile, selectedCategory, onSelectCategory, selectedPlatform, onSelectPlatform
}) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 lg:hidden"
          onClick={closeMobile}
        />
      )}

      <aside className={`
        fixed top-16 left-0 bottom-0 z-40 w-64 bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-r border-orange-500/20 transform transition-transform duration-300 shadow-2xl shadow-orange-500/10
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:shrink-0
      `}>
        {/* Mobile close */}
        <button
          onClick={closeMobile}
          className="lg:hidden absolute top-3 right-3 p-2 rounded-xl bg-slate-800/60 backdrop-blur-xl text-slate-400 hover:text-orange-400 hover:bg-orange-500/20 transition-all duration-300 hover:scale-110 border border-slate-700/50"
        >
          <X size={18} />
        </button>

        <div className="h-full overflow-y-auto p-3 space-y-5">

          {/* Categories */}
          <div>
            <h3 className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400 uppercase tracking-wider mb-3 px-2">{t.sidebar.categories}</h3>
            <div className="space-y-1.5">
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => { onSelectCategory(cat); closeMobile(); }}
                  className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-orange-500/30 to-blue-600/30 text-white shadow-lg shadow-orange-500/20 border border-orange-500/50'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white hover:translate-x-1 border border-transparent hover:border-slate-700/50'
                  }`}
                >
                  {/* Glow effect on selected */}
                  {selectedCategory === cat && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-600/20 blur-xl" />
                  )}

                  {/* Icon with gradient for selected */}
                  <span className={`relative z-10 ${selectedCategory === cat ? 'text-orange-400' : 'text-slate-400 group-hover:text-orange-400'} transition-colors duration-300`}>
                    {CATEGORY_ICONS[cat]}
                  </span>

                  <span className="relative z-10">{cat}</span>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                </button>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 uppercase tracking-wider mb-3 px-2">{t.sidebar.platform}</h3>
            <div className="space-y-1.5">
              {['All', ...Object.values(Platform)].map((plat) => (
                <button
                  key={plat}
                  onClick={() => onSelectPlatform(plat as Platform | 'All')}
                  className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden ${
                    selectedPlatform === plat
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white shadow-lg shadow-blue-500/20 border border-blue-500/50'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white hover:translate-x-1 border border-transparent hover:border-slate-700/50'
                  }`}
                >
                  {/* Glow effect on selected */}
                  {selectedPlatform === plat && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl" />
                  )}

                  {/* Platform dot with pulse effect */}
                  <span className="relative z-10">
                    <span className={`block w-3 h-3 rounded-full ${PLATFORM_COLORS[plat]} ${selectedPlatform === plat ? 'animate-pulse shadow-lg' : ''}`}></span>
                  </span>

                  <span className="relative z-10">{plat === 'All' ? t.sidebar.all : plat}</span>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                </button>
              ))}
            </div>
          </div>

          {/* Stats card con glassmorphism */}
          <div className="mt-auto pt-4 border-t border-orange-500/20">
            <div className="relative bg-gradient-to-br from-orange-600/20 via-blue-600/20 to-purple-600/20 rounded-2xl p-4 border border-orange-500/30 backdrop-blur-xl overflow-hidden group hover:border-orange-500/50 transition-all duration-300 shadow-xl shadow-orange-500/10">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative z-10">
                <p className="text-xs text-orange-300 uppercase tracking-wide font-black mb-2 flex items-center gap-2">
                  <span className="text-xl">🚀</span>
                  {t.sidebar.totalPrompts}
                </p>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-blue-400 mb-2">1,248</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 rounded-lg border border-emerald-500/30 font-bold">
                    +23 {t.sidebar.thisWeek}
                  </span>
                  <span className="text-emerald-400 animate-pulse">📈</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
