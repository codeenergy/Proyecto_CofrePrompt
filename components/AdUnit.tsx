import React, { useEffect } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdUnit: React.FC<AdUnitProps> = ({
  slot,
  format = 'auto',
  className = '',
  label = 'Publicidad'
}) => {
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX';
  const isConfigured = clientId !== 'ca-pub-XXXXXXXXXXXXXXXX';

  useEffect(() => {
    if (isConfigured) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [isConfigured]);

  // Tamaños predefinidos según el formato
  const formatStyles = {
    auto: 'min-h-[250px]',
    fluid: 'min-h-[300px]',
    rectangle: 'min-h-[250px] max-w-[300px] mx-auto',
    horizontal: 'min-h-[90px] max-w-[728px] mx-auto',
    vertical: 'min-h-[600px] max-w-[160px]'
  };

  return (
    <div className={`flex flex-col items-center justify-center my-4 ${className}`}>
      <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-medium">
        {label}
      </span>
      <div className={`relative bg-slate-800/30 border border-slate-700/50 w-full rounded-lg overflow-hidden flex items-center justify-center ${formatStyles[format]}`}>
        {isConfigured ? (
          <ins
            className="adsbygoogle block w-full h-full"
            style={{ display: 'block' }}
            data-ad-client={clientId}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-slate-400 font-medium mb-1">
              Google AdSense Space
            </p>
            <p className="text-xs text-slate-500">
              Formato: {format} • Slot: {slot}
            </p>
            <p className="text-xs text-slate-600 mt-2">
              Configura VITE_ADSENSE_CLIENT_ID
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdUnit;
