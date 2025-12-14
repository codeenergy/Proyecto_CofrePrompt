import React from 'react';
import { shouldLoadAds, MONETAG_CONFIG } from '../config/monetag.config';

interface MonetagDirectLinkProps {
  className?: string;
  text?: string;
  variant?: 'button' | 'banner' | 'text';
}

/**
 * Componente de Direct Link de Monetag
 * Solo se muestra en producción y si está habilitado en la configuración
 * Puedes personalizarlo según el diseño de tu app
 */
const MonetagDirectLink: React.FC<MonetagDirectLinkProps> = ({
  className = '',
  text = 'Apoya este proyecto',
  variant = 'banner'
}) => {
  // No mostrar si no está habilitado o no es producción
  if (!shouldLoadAds() || !MONETAG_CONFIG.directLink.enabled) {
    return null;
  }

  const handleClick = () => {
    window.open(MONETAG_CONFIG.directLink.url, '_blank', 'noopener,noreferrer');
  };

  // Variante de botón
  if (variant === 'button') {
    return (
      <button
        onClick={handleClick}
        className={`px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 shadow-lg ${className}`}
      >
        {text}
      </button>
    );
  }

  // Variante de texto simple
  if (variant === 'text') {
    return (
      <a
        href={MONETAG_CONFIG.directLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm text-purple-400 hover:text-purple-300 transition-colors underline ${className}`}
      >
        {text}
      </a>
    );
  }

  // Variante de banner (por defecto)
  return (
    <div className={`flex flex-col items-center justify-center my-4 ${className}`}>
      <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-medium">
        Publicidad
      </span>
      <div
        onClick={handleClick}
        className="relative bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 w-full rounded-lg overflow-hidden cursor-pointer hover:border-purple-400/50 transition-all hover:scale-[1.02] p-4"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="text-sm text-slate-300 font-medium mb-1">
            {text}
          </p>
          <p className="text-xs text-slate-500">
            Click para apoyar el desarrollo
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonetagDirectLink;
