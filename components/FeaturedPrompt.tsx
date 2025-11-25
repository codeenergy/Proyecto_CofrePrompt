import React from 'react';
import { Star, TrendingUp, Eye, Heart, Clock } from 'lucide-react';
import { Prompt } from '../types';

interface FeaturedPromptProps {
  prompt: Prompt;
  onOpen: (prompt: Prompt) => void;
  className?: string;
}

export default function FeaturedPrompt({ prompt, onOpen, className = '' }: FeaturedPromptProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>

      {/* Featured Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500 rounded-full shadow-lg">
          <Star className="w-4 h-4 text-yellow-900 fill-yellow-900" />
          <span className="text-xs font-bold text-yellow-900">DESTACADO DEL DÍA</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left Side - Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2 py-1 rounded bg-slate-800/50 text-slate-300 border border-slate-700">
                  {prompt.category}
                </span>
                <span className="text-xs font-medium px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  {prompt.platform}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                {prompt.title}
              </h2>

              <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                {prompt.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{prompt.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{prompt.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{prompt.createdAt}</span>
                </div>
              </div>

              <button
                onClick={() => onOpen(prompt)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Ver Prompt Completo
              </button>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Decorative Element */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>

                <div className="relative bg-slate-900/80 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(prompt.author)}&background=6366f1&color=fff&size=48`}
                      alt={prompt.author}
                      className="w-12 h-12 rounded-full border-2 border-indigo-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">Creado por</p>
                      <p className="text-xs text-slate-400">{prompt.author}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Popularidad</span>
                      <span className="text-indigo-400 font-medium">
                        {Math.round((prompt.likes / prompt.views) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${Math.min(100, (prompt.likes / prompt.views) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {prompt.tags && prompt.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {prompt.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="text-[10px] px-2 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
