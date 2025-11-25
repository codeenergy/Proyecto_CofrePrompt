import React from 'react';
import { Category, Platform } from '../types';
import { LayoutGrid, Code, Palette, Megaphone, PenTool, Briefcase, Sparkles, X } from 'lucide-react';

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
        fixed top-14 left-0 bottom-0 z-40 w-52 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/50 transform transition-transform duration-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:shrink-0
      `}>
        {/* Mobile close */}
        <button
          onClick={closeMobile}
          className="lg:hidden absolute top-3 right-3 p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="h-full overflow-y-auto p-3 space-y-5">

          {/* Categories */}
          <div>
            <h3 className="text-[11px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 px-2">Categorías</h3>
            <div className="space-y-0.5">
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => { onSelectCategory(cat); closeMobile(); }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[13px] transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {CATEGORY_ICONS[cat]}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-[11px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 px-2">Plataforma</h3>
            <div className="space-y-0.5">
              {['All', ...Object.values(Platform)].map((plat) => (
                <button
                  key={plat}
                  onClick={() => onSelectPlatform(plat as Platform | 'All')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[13px] transition-all ${
                    selectedPlatform === plat
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${PLATFORM_COLORS[plat]}`}></span>
                  {plat === 'All' ? 'Todas' : plat}
                </button>
              ))}
            </div>
          </div>

          {/* Stats card */}
          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800/50">
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-lg p-3 border border-indigo-500/10">
              <p className="text-[11px] text-slate-500 uppercase tracking-wide">Total Prompts</p>
              <p className="text-xl font-bold text-white">1,248</p>
              <p className="text-[11px] text-emerald-400 mt-1">+23 esta semana</p>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
