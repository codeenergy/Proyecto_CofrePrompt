import React, { useState } from 'react';
import { Prompt } from '../types';
import { Copy, Heart, Eye, CheckCheck } from 'lucide-react';

interface PromptCardProps {
  prompt: Prompt;
  onOpen: (prompt: Prompt) => void;
}

const PLATFORM_COLORS: Record<string, string> = {
  'ChatGPT': 'bg-emerald-500/90',
  'Midjourney': 'bg-purple-500/90',
  'Claude': 'bg-orange-500/90',
  'Stable Diffusion': 'bg-pink-500/90',
  'Gemini': 'bg-blue-500/90',
};

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onOpen }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => onOpen(prompt)}
      className="group bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 rounded-xl overflow-hidden cursor-pointer hover:border-indigo-500/30 hover:bg-slate-50 dark:hover:bg-slate-900/80 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={prompt.imageUrl}
          alt={prompt.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        {/* Platform badge */}
        <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded text-white ${PLATFORM_COLORS[prompt.platform] || 'bg-slate-600'}`}>
          {prompt.platform}
        </span>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`absolute top-2 right-2 p-1.5 rounded-md transition-all ${
            copied
              ? 'bg-emerald-500 text-white'
              : 'bg-black/50 text-white/80 opacity-0 group-hover:opacity-100 hover:bg-black/70'
          }`}
        >
          {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
          {prompt.title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {prompt.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Heart size={12} className="text-red-400/70" />
              {prompt.likes}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {prompt.views}
            </span>
          </div>
          <span>{prompt.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
