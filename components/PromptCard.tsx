import React, { useState } from 'react';
import { Prompt } from '../types';
import { Copy, Heart, Eye, CheckCheck } from 'lucide-react';

interface PromptCardProps {
  prompt: Prompt;
  onOpen: (prompt: Prompt) => void;
  onCopy?: () => void;
}

const PLATFORM_COLORS: Record<string, string> = {
  'ChatGPT': 'bg-emerald-500/90',
  'Midjourney': 'bg-purple-500/90',
  'Claude': 'bg-orange-500/90',
  'Stable Diffusion': 'bg-pink-500/90',
  'Gemini': 'bg-blue-500/90',
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
      className="group bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 rounded-xl overflow-hidden cursor-pointer hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 animate-slide-up"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
        <img
          src={prompt.imageUrl}
          alt={prompt.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Platform badge */}
        <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded text-white ${PLATFORM_COLORS[prompt.platform] || 'bg-slate-600'}`}>
          {prompt.platform}
        </span>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`absolute top-2 right-2 p-2 rounded-lg backdrop-blur-sm transition-all duration-300 ${
            copied
              ? 'bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/50'
              : 'bg-black/40 text-white/90 opacity-0 group-hover:opacity-100 hover:bg-black/60 hover:scale-110'
          }`}
          title={copied ? 'Copiado!' : 'Copiar prompt'}
        >
          {copied ? <CheckCheck size={16} className="animate-pulse" /> : <Copy size={16} />}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {prompt.title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {prompt.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {prompt.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
            >
              #{tag}
            </span>
          ))}
          {prompt.tags.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 text-slate-500 dark:text-slate-500">
              +{prompt.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
            <span className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <Heart size={13} className="text-red-400/70" />
              {prompt.likes}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={13} />
              {prompt.views}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {prompt.authorPhoto && (
              <img
                src={prompt.authorPhoto}
                alt={prompt.author}
                className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700"
              />
            )}
            <span className="text-[10px] text-slate-500 dark:text-slate-500 font-medium">
              {prompt.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
