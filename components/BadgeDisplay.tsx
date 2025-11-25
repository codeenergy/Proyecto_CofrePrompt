import React from 'react';
import { Trophy, Star, Zap, Award, Target, Flame, Crown, Sparkles } from 'lucide-react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: 'trophy' | 'star' | 'zap' | 'award' | 'target' | 'flame' | 'crown' | 'sparkles';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  earnedAt?: string;
}

interface BadgeDisplayProps {
  badges: Badge[];
  className?: string;
  showProgress?: boolean;
}

const ICON_MAP = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  award: Award,
  target: Target,
  flame: Flame,
  crown: Crown,
  sparkles: Sparkles
};

const TIER_COLORS = {
  bronze: {
    bg: 'bg-orange-900/20',
    border: 'border-orange-700/50',
    text: 'text-orange-400',
    glow: 'shadow-orange-500/20'
  },
  silver: {
    bg: 'bg-slate-700/20',
    border: 'border-slate-500/50',
    text: 'text-slate-300',
    glow: 'shadow-slate-400/20'
  },
  gold: {
    bg: 'bg-yellow-900/20',
    border: 'border-yellow-600/50',
    text: 'text-yellow-400',
    glow: 'shadow-yellow-500/20'
  },
  platinum: {
    bg: 'bg-purple-900/20',
    border: 'border-purple-600/50',
    text: 'text-purple-400',
    glow: 'shadow-purple-500/20'
  }
};

export default function BadgeDisplay({ badges, className = '', showProgress = true }: BadgeDisplayProps) {
  const earnedBadges = badges.filter(b => b.earned);
  const inProgressBadges = badges.filter(b => !b.earned && b.progress !== undefined);

  return (
    <div className={className}>
      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            Badges Conseguidos ({earnedBadges.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {earnedBadges.map((badge) => {
              const Icon = ICON_MAP[badge.icon];
              const colors = TIER_COLORS[badge.tier];

              return (
                <div
                  key={badge.id}
                  className={`group relative p-4 ${colors.bg} border ${colors.border} rounded-lg hover:shadow-lg ${colors.glow} transition-all cursor-pointer`}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className={`p-3 rounded-full ${colors.bg} border ${colors.border}`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${colors.text}`}>{badge.name}</p>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 w-48 text-center">
                    <p className="text-xs text-white font-medium mb-1">{badge.name}</p>
                    <p className="text-[10px] text-slate-400">{badge.description}</p>
                    {badge.earnedAt && (
                      <p className="text-[10px] text-slate-500 mt-1">
                        {new Date(badge.earnedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* In Progress Badges */}
      {showProgress && inProgressBadges.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            En Progreso ({inProgressBadges.length})
          </h4>
          <div className="space-y-3">
            {inProgressBadges.map((badge) => {
              const Icon = ICON_MAP[badge.icon];
              const colors = TIER_COLORS[badge.tier];
              const progress = badge.progress || 0;
              const max = badge.maxProgress || 100;
              const percentage = (progress / max) * 100;

              return (
                <div
                  key={badge.id}
                  className="p-3 bg-slate-800/30 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border} opacity-50`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-white">{badge.name}</p>
                        <span className="text-xs text-slate-400">
                          {progress}/{max}
                        </span>
                      </div>

                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <p className="text-[10px] text-slate-500 mt-1">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {badges.length === 0 && (
        <div className="text-center py-8">
          <Award className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">Aún no tienes badges</p>
          <p className="text-xs text-slate-500 mt-1">¡Empieza a ganar logros creando prompts!</p>
        </div>
      )}
    </div>
  );
}
