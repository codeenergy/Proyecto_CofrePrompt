import React, { useState } from 'react';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { Platform } from '../types';

interface TryItButtonsProps {
  promptContent: string;
  platform: Platform;
  onCopy?: () => void;
}

const PLATFORM_URLS: Record<Platform, string> = {
  [Platform.ChatGPT]: 'https://chat.openai.com/',
  [Platform.Claude]: 'https://claude.ai/new',
  [Platform.Gemini]: 'https://gemini.google.com/',
  [Platform.Midjourney]: 'https://discord.com/channels/@me',
  [Platform.StableDiffusion]: 'https://stablediffusionweb.com/'
};

const PLATFORM_COLORS: Record<Platform, string> = {
  [Platform.ChatGPT]: 'bg-emerald-500 hover:bg-emerald-600',
  [Platform.Claude]: 'bg-orange-500 hover:bg-orange-600',
  [Platform.Gemini]: 'bg-blue-500 hover:bg-blue-600',
  [Platform.Midjourney]: 'bg-purple-500 hover:bg-purple-600',
  [Platform.StableDiffusion]: 'bg-pink-500 hover:bg-pink-600'
};

export default function TryItButtons({ promptContent, platform, onCopy }: TryItButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptContent);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTryIt = () => {
    handleCopy();
    const url = PLATFORM_URLS[platform];
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleTryIt}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 ${PLATFORM_COLORS[platform]} text-white font-medium rounded-lg transition-colors`}
      >
        <ExternalLink className="w-4 h-4" />
        Probar en {platform}
      </button>

      <button
        onClick={handleCopy}
        className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        title="Copiar prompt"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
