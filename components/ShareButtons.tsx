import React, { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Link, Check } from 'lucide-react';
import { Prompt } from '../types';

interface ShareButtonsProps {
  prompt: Prompt;
  className?: string;
}

export default function ShareButtons({ prompt, className = '' }: ShareButtonsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const promptUrl = `${baseUrl}/prompts/${prompt.id}`;
  const shareText = `¡Mira este prompt para ${prompt.platform}: "${prompt.title}"`;

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(promptUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
    setShowMenu(false);
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(promptUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
    setShowMenu(false);
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(promptUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
    setShowMenu(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(promptUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: prompt.title,
          text: shareText,
          url: promptUrl,
        });
        setShowMenu(false);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={shareNative}
        className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
        title="Compartir"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Compartir</span>
      </button>

      {showMenu && !navigator.share && (
        <div className="absolute top-full right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 min-w-[200px]">
          <div className="p-2 space-y-1">
            <button
              onClick={shareToTwitter}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-left"
            >
              <Twitter className="w-4 h-4 text-sky-400" />
              <span className="text-sm text-white">Twitter</span>
            </button>

            <button
              onClick={shareToLinkedIn}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-left"
            >
              <Linkedin className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-white">LinkedIn</span>
            </button>

            <button
              onClick={shareToFacebook}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-left"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-white">Facebook</span>
            </button>

            <div className="border-t border-slate-700 my-1"></div>

            <button
              onClick={copyLink}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-left"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Link className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-white">Copiar link</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close menu */}
      {showMenu && !navigator.share && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}
