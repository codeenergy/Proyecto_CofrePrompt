import React, { useState } from 'react';
import { Prompt } from '../types';
import { Copy, Heart, Eye, CheckCheck } from 'lucide-react';

interface PromptCardProps {
  prompt: Prompt;
  onOpen: (prompt: Prompt) => void;
  onCopy?: () => void;
}

const PLATFORM_COLORS: Record<string, string> = {
  'ChatGPT': 'from-emerald-500 to-emerald-600',
  'Midjourney': 'from-purple-500 to-purple-600',
  'Claude': 'from-orange-500 to-orange-600',
  'Stable Diffusion': 'from-pink-500 to-pink-600',
  'Gemini': 'from-blue-500 to-blue-600',
};

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onOpen, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  return (
    <div
      onClick={() => onOpen(prompt)}
      className="group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden cursor-pointer hover:border-orange-500/50 hover:-translate-y-2 transition-all duration-500 animate-slide-up"
      style={{
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 109, 0, 0.05)',
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-blue-600/0 group-hover:from-orange-500/10 group-hover:via-orange-500/5 group-hover:to-blue-600/10 transition-all duration-500 pointer-events-none rounded-2xl" />

      {/* Animated gradient border */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-orange-500 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 rounded-2xl pointer-events-none" />

      {/* Image Container con efectos 3D */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-blue-600/10" />

        <img
          src={prompt.imageUrl}
          alt={prompt.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          loading="lazy"
          style={{ filter: 'brightness(0.9) contrast(1.1)' }}
        />

        {/* Gradient overlay más moderno */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/10 transition-all duration-700 opacity-0 group-hover:opacity-100" style={{ transform: 'translateX(-100%) translateY(-100%)', transition: 'transform 0.7s ease, opacity 0.7s ease' }} />

        {/* Platform badge con gradiente */}
        <div className="absolute top-3 left-3">
          <div className={`relative px-3 py-1.5 rounded-xl bg-gradient-to-r ${PLATFORM_COLORS[prompt.platform] || 'from-slate-600 to-slate-700'} shadow-xl backdrop-blur-sm`}>
            <span className="text-xs font-black text-white drop-shadow-lg tracking-wide">
              {prompt.platform}
            </span>
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Copy button rediseñado */}
        <button
          onClick={handleCopy}
          className={`absolute top-3 right-3 p-2.5 rounded-xl backdrop-blur-xl transition-all duration-300 shadow-xl ${
            copied
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white scale-110 shadow-2xl shadow-emerald-500/60'
              : 'bg-slate-900/60 text-white/90 opacity-0 group-hover:opacity-100 hover:bg-slate-900/80 hover:scale-110 border border-white/10'
          }`}
          title={copied ? '¡Copiado!' : 'Copiar prompt'}
        >
          {copied ? <CheckCheck size={16} className="animate-pulse" /> : <Copy size={16} />}
        </button>
      </div>

      {/* Content con glassmorphism */}
      <div className="relative p-5 bg-gradient-to-b from-slate-800/60 to-slate-900/60 backdrop-blur-sm">
        <h3 className="text-base font-black text-white mb-2.5 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-blue-400 transition-all duration-300 leading-tight">
          {prompt.title}
        </h3>
        <p className="text-sm text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {prompt.description}
        </p>

        {/* Tags rediseñados */}
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="relative text-xs px-3 py-1 bg-gradient-to-r from-orange-500/20 to-blue-600/20 text-orange-300 rounded-lg border border-orange-500/30 hover:border-orange-500/50 hover:from-orange-500/30 hover:to-blue-600/30 transition-all duration-300 font-semibold backdrop-blur-sm overflow-hidden group/tag"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/tag:translate-x-full transition-transform duration-500" />
              <span className="relative">#{tag}</span>
            </span>
          ))}
          {prompt.tags.length > 3 && (
            <span className="text-xs px-3 py-1 text-slate-400 bg-slate-700/40 rounded-lg border border-slate-600/50 font-semibold backdrop-blur-sm">
              +{prompt.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer rediseñado */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition-colors duration-300 cursor-pointer group/like">
              <Heart size={15} className="text-red-400/80 group-hover/like:scale-125 transition-transform duration-300" />
              <span className="font-semibold">{prompt.likes}</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Eye size={15} className="text-blue-400/80" />
              <span className="font-semibold">{prompt.views}</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            {prompt.authorPhoto && (
              <div className="relative group/avatar">
                {/* Avatar glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full blur-md opacity-0 group-hover/avatar:opacity-60 transition-opacity duration-300" />
                <img
                  src={prompt.authorPhoto}
                  alt={prompt.author}
                  className="relative w-6 h-6 rounded-full border-2 border-orange-500/50 group-hover/avatar:border-orange-400 transition-all duration-300 shadow-lg"
                />
              </div>
            )}
            <span className="text-xs text-slate-400 font-bold group-hover:text-orange-400 transition-colors duration-300">
              {prompt.author}
            </span>
          </div>
        </div>
      </div>

      {/* 3D effect shadow */}
      <div className="absolute -bottom-2 left-4 right-4 h-2 bg-gradient-to-b from-slate-900/40 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
    </div>
  );
};

export default PromptCard;
