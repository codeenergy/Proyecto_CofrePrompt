import React, { useMemo } from 'react';
import { Category, Platform, Prompt } from '../types';
import { LayoutGrid, Code, Palette, Megaphone, PenTool, Briefcase, Sparkles, X, TrendingUp, Users, Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  closeMobile: () => void;
  selectedCategory: Category;
  onSelectCategory: (c: Category) => void;
  selectedPlatform: Platform | 'All';
  onSelectPlatform: (p: Platform | 'All') => void;
  prompts: Prompt[];
}

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  [Category.All]: <LayoutGrid size={18} />,
  [Category.General]: <Sparkles size={18} />,
  [Category.Coding]: <Code size={18} />,
  [Category.Design]: <Palette size={18} />,
  [Category.Marketing]: <Megaphone size={18} />,
  [Category.Writing]: <PenTool size={18} />,
  [Category.Business]: <Briefcase size={18} />,
};

const PLATFORM_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'All': { bg: 'bg-slate-600', text: 'text-slate-200', border: 'border-slate-500' },
  'ChatGPT': { bg: 'bg-emerald-600', text: 'text-emerald-200', border: 'border-emerald-500' },
  'Midjourney': { bg: 'bg-purple-600', text: 'text-purple-200', border: 'border-purple-500' },
  'Claude': { bg: 'bg-orange-600', text: 'text-orange-200', border: 'border-orange-500' },
  'Stable Diffusion': { bg: 'bg-pink-600', text: 'text-pink-200', border: 'border-pink-500' },
  'Gemini': { bg: 'bg-blue-600', text: 'text-blue-200', border: 'border-blue-500' },
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen, closeMobile, selectedCategory, onSelectCategory, selectedPlatform, onSelectPlatform, prompts
}) => {
  const { t } = useLanguage();

  // Calculate real statistics
  const stats = useMemo(() => {
    const totalPrompts = prompts.length;
    const totalViews = prompts.reduce((sum, p) => sum + (p.views || 0), 0);

    // Get prompts from last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newPromptsThisWeek = prompts.filter(p => new Date(p.createdAt) > oneWeekAgo).length;

    // Get most popular category
    const categoryCounts: Record<string, number> = {};
    prompts.forEach(p => {
      if (p.category !== Category.All) {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
      }
    });
    const mostPopularCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];

    return {
      totalPrompts,
      totalViews,
      newPromptsThisWeek,
      mostPopularCategory: mostPopularCategory ? mostPopularCategory[0] : 'Coding',
      mostPopularCount: mostPopularCategory ? mostPopularCategory[1] : 0
    };
  }, [prompts]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 lg:hidden backdrop-blur-sm"
          onClick={closeMobile}
        />
      )}

      <aside className={`
        fixed top-16 left-0 bottom-0 z-40 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:shrink-0
      `}>
        {/* Mobile close */}
        <button
          onClick={closeMobile}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
        >
          <X size={18} />
        </button>

        <div className="h-full overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-orange-500/50 scrollbar-track-slate-800/30 hover:scrollbar-thumb-orange-500/70">

          {/* Categories Section */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-2">
              <LayoutGrid size={16} className="text-orange-400" />
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.sidebar.categories}</h3>
            </div>
            <div className="space-y-1">
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => { onSelectCategory(cat); closeMobile(); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className={selectedCategory === cat ? 'text-white' : 'text-slate-400'}>
                    {CATEGORY_ICONS[cat]}
                  </span>
                  <span className="font-semibold">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800"></div>

          {/* Platforms Section */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-2">
              <Star size={16} className="text-blue-400" />
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.sidebar.platform}</h3>
            </div>
            <div className="space-y-1">
              {['All', ...Object.values(Platform)].map((plat) => {
                const colors = PLATFORM_COLORS[plat];
                return (
                  <button
                    key={plat}
                    onClick={() => onSelectPlatform(plat as Platform | 'All')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedPlatform === plat
                        ? `${colors.bg} ${colors.text} shadow-lg`
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedPlatform === plat ? 'bg-white' : colors.bg.replace('bg-', 'bg-')}`}></span>
                    <span className="font-semibold">{plat === 'All' ? t.sidebar.all : plat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800"></div>

          {/* Stats Cards */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3 px-2">
              <TrendingUp size={16} className="text-emerald-400" />
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estadísticas</h3>
            </div>

            {/* Total Prompts */}
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-orange-300 font-semibold uppercase tracking-wide">Total Prompts</p>
                <Star size={14} className="text-orange-400" />
              </div>
              <p className="text-2xl font-black text-white mb-1">{stats.totalPrompts.toLocaleString()}</p>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-semibold">+{stats.newPromptsThisWeek}</span>
                <span className="text-slate-400">{t.sidebar.thisWeek}</span>
              </div>
            </div>

            {/* Total Views */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-blue-300 font-semibold uppercase tracking-wide">Total Vistas</p>
                <Users size={14} className="text-blue-400" />
              </div>
              <p className="text-2xl font-black text-white mb-1">{stats.totalViews.toLocaleString()}</p>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded font-semibold">{prompts.length > 0 ? Math.round(stats.totalViews / prompts.length) : 0}</span>
                <span className="text-slate-400">promedio</span>
              </div>
            </div>

            {/* Popular Category */}
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-purple-300 font-semibold uppercase tracking-wide">Más Popular</p>
                <TrendingUp size={14} className="text-purple-400" />
              </div>
              <p className="text-lg font-black text-white mb-1">{stats.mostPopularCategory}</p>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded font-semibold">{stats.mostPopularCount}</span>
                <span className="text-slate-400">prompts</span>
              </div>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
