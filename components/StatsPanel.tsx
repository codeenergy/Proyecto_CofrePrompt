import React from 'react';
import { TrendingUp, Eye, Heart, MessageSquare, Copy, BarChart3, Globe } from 'lucide-react';
import { PromptStats } from '../types';

interface StatsPanelProps {
  stats: PromptStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  const totalEngagement = stats.totalLikes + stats.totalComments + stats.totalCopies;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-bold text-white">Estadísticas</h3>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-400">Vistas</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-xs text-slate-400">Likes</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalLikes.toLocaleString()}</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Copy className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400">Copias</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalCopies.toLocaleString()}</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-slate-400">Comentarios</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalComments.toLocaleString()}</div>
        </div>
      </div>

      {/* Rating & Engagement */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-slate-400">Valoración Media</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-white">
              {stats.averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-slate-400">/ 5.0</div>
          </div>
          <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all"
              style={{ width: `${(stats.averageRating / 5) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-slate-400">Engagement Total</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {totalEngagement.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {((totalEngagement / stats.totalViews) * 100).toFixed(1)}% tasa
          </div>
        </div>
      </div>

      {/* Views by Day Chart */}
      {stats.viewsByDay && stats.viewsByDay.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="text-sm font-medium text-slate-300 mb-3">Vistas por día (últimos 7 días)</div>
          <div className="flex items-end gap-2 h-32">
            {stats.viewsByDay.slice(-7).map((day, index) => {
              const maxViews = Math.max(...stats.viewsByDay.slice(-7).map(d => d.count));
              const height = (day.count / maxViews) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-slate-700 rounded-t relative" style={{ height: '100%' }}>
                    <div
                      className="absolute bottom-0 w-full bg-indigo-500 rounded-t transition-all"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(day.date).toLocaleDateString('es', { weekday: 'short' })}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">{day.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Top Countries */}
      {stats.topCountries && stats.topCountries.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">Top Países</span>
          </div>
          <div className="space-y-2">
            {stats.topCountries.slice(0, 5).map((country, index) => {
              const maxCount = stats.topCountries[0].count;
              const percentage = (country.count / maxCount) * 100;
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-12 text-xs text-slate-400">{country.country}</div>
                  <div className="flex-1 h-6 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 flex items-center justify-end px-2"
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="text-xs text-white font-medium">{country.count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
