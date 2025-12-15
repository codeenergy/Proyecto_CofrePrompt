import React, { useState } from 'react';
import { HOTMART_CONFIG } from '../config/hotmart.config';
import HotmartModal from './HotmartModal';

const HotmartFloatingButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  if (!HOTMART_CONFIG.enabled) return null;

  const handleClick = () => {
    setIsModalOpen(true);
    setIsPulsing(false);
  };

  // Posición del botón
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-24 right-6',
    'top-left': 'top-24 left-6',
  };

  const position = positionClasses[HOTMART_CONFIG.floatingButtonPosition];

  return (
    <>
      {/* Botón Flotante */}
      <div className={`fixed ${position} z-[90] group`}>
        {/* Onda de pulso */}
        {isPulsing && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-75" />
        )}

        {/* Botón Principal */}
        <button
          onClick={handleClick}
          className="relative flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110 group-hover:gap-3"
          aria-label="Ver productos recomendados"
        >
          {/* Icono de regalo */}
          <span className="text-2xl animate-bounce">🎁</span>

          {/* Texto */}
          <span className="text-sm whitespace-nowrap">
            {HOTMART_CONFIG.floatingButtonText}
          </span>

          {/* Badge de "NUEVO" */}
          <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-lg animate-pulse">
            NUEVO
          </span>
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap border border-purple-500/30">
            Descubre productos recomendados
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
              <div className="border-4 border-transparent border-t-slate-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <HotmartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Estilos de animación */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .7; }
        }
      `}</style>
    </>
  );
};

export default HotmartFloatingButton;
