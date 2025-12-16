import React, { useState, useEffect } from 'react';
import { HOTMART_CONFIG } from '../config/hotmart.config';
import HotmartModal from './HotmartModal';

const HotmartFloatingButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  if (!HOTMART_CONFIG.enabled) return null;

  useEffect(() => {
    // Aparecer después de 2 segundos con animación
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  // Posición del botón
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-24 right-6',
    'top-left': 'top-24 left-6',
  };

  const position = positionClasses[HOTMART_CONFIG.floatingButtonPosition];

  if (!isVisible) return null;

  return (
    <>
      {/* Botón Flotante Ultra Moderno */}
      <div className={`floating-button-container ${position}`}>
        {/* Círculos de pulso animados */}
        <div className="pulse-ring pulse-ring-1" />
        <div className="pulse-ring pulse-ring-2" />
        <div className="pulse-ring pulse-ring-3" />

        {/* Botón principal */}
        <button
          onClick={handleClick}
          className="floating-button"
          aria-label="Ver productos recomendados"
        >
          {/* Efecto de brillo animado */}
          <div className="button-glow" />

          {/* Partículas flotantes */}
          <div className="particles">
            <div className="particle particle-1">✨</div>
            <div className="particle particle-2">💫</div>
            <div className="particle particle-3">⭐</div>
          </div>

          {/* Contenido del botón */}
          <div className="button-content">
            {/* Icono animado */}
            <div className="gift-icon">
              <span className="gift-bounce">🎁</span>
            </div>

            {/* Texto */}
            <div className="button-text">
              <span className="text-main">Ofertas</span>
              <span className="text-sub">Especiales</span>
            </div>

            {/* Badge de nuevo */}
            <div className="new-badge">
              <span className="badge-ping" />
              <span className="badge-text">NUEVO</span>
            </div>
          </div>

          {/* Efecto de ondas en click */}
          <span className="click-ripple" />
        </button>

        {/* Tooltip mejorado */}
        <div className="modern-tooltip">
          <div className="tooltip-content">
            <span className="tooltip-emoji">🔥</span>
            <div className="tooltip-text">
              <p className="tooltip-title">¡Ofertas Exclusivas!</p>
              <p className="tooltip-desc">Productos premium con descuento</p>
            </div>
          </div>
          <div className="tooltip-arrow" />
        </div>
      </div>

      {/* Modal */}
      <HotmartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Estilos CSS Ultra Modernos */}
      <style>{`
        /* Container */
        .floating-button-container {
          position: fixed;
          z-index: 90;
          animation: slideInBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Anillos de pulso - Colores Hotmart */
        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(255, 109, 0, 0.5), rgba(14, 77, 164, 0.5));
          animation: pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .pulse-ring-1 {
          animation-delay: 0s;
        }

        .pulse-ring-2 {
          animation-delay: 0.4s;
        }

        .pulse-ring-3 {
          animation-delay: 0.8s;
        }

        /* Botón Principal - Colores Hotmart */
        .floating-button {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          background: linear-gradient(135deg, #FF6D00 0%, #FF8C00 25%, #0E4DA4 75%, #1E88E5 100%);
          background-size: 300% 300%;
          border-radius: 9999px;
          box-shadow:
            0 20px 40px -10px rgba(255, 109, 0, 0.7),
            0 0 60px rgba(255, 140, 0, 0.5),
            0 0 100px rgba(14, 77, 164, 0.3),
            inset 0 2px 0 rgba(255, 255, 255, 0.4),
            inset 0 -2px 0 rgba(0, 0, 0, 0.3);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
          cursor: pointer;
          animation: gradient-shift 3s ease infinite, float 3s ease-in-out infinite, rainbow-glow 2s ease-in-out infinite;
        }

        .floating-button:hover {
          transform: scale(1.15) rotate(-3deg);
          box-shadow:
            0 30px 60px -10px rgba(255, 109, 0, 0.9),
            0 0 100px rgba(255, 140, 0, 0.7),
            0 0 150px rgba(14, 77, 164, 0.5),
            inset 0 2px 0 rgba(255, 255, 255, 0.5),
            inset 0 -2px 0 rgba(0, 0, 0, 0.3);
        }

        .floating-button:active {
          transform: scale(0.95);
        }

        /* Brillo del botón */
        .button-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: button-glow 2s linear infinite;
        }

        /* Partículas flotantes */
        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          font-size: 1rem;
          animation: particle-float 3s ease-in-out infinite;
        }

        .particle-1 {
          top: 10%;
          left: 20%;
          animation-delay: 0s;
        }

        .particle-2 {
          top: 60%;
          right: 15%;
          animation-delay: 1s;
        }

        .particle-3 {
          bottom: 20%;
          left: 30%;
          animation-delay: 2s;
        }

        /* Contenido del botón */
        .button-content {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        /* Icono de regalo */
        .gift-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          backdrop-filter: blur(10px);
          box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3);
        }

        .gift-bounce {
          font-size: 1.5rem;
          display: inline-block;
          animation: gift-bounce 1s ease-in-out infinite;
        }

        /* Texto del botón */
        .button-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.125rem;
        }

        .text-main {
          font-size: 1rem;
          font-weight: 800;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.5px;
        }

        .text-sub {
          font-size: 0.625rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Badge de NUEVO - Color Verde Vibrante */
        .new-badge {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.375rem 0.625rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 9999px;
          box-shadow:
            0 4px 12px rgba(16, 185, 129, 0.6),
            0 0 20px rgba(16, 185, 129, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          animation: badge-pulse 2s ease-in-out infinite;
        }

        .badge-ping {
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          background: rgba(251, 191, 36, 0.4);
          animation: badge-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .badge-text {
          position: relative;
          z-index: 10;
          font-size: 0.625rem;
          font-weight: 800;
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.5px;
        }

        /* Efecto de click */
        .click-ripple {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
          opacity: 0;
          transform: scale(0);
        }

        .floating-button:active .click-ripple {
          animation: click-ripple 0.6s ease-out;
        }

        /* Tooltip Moderno */
        .modern-tooltip {
          position: absolute;
          bottom: calc(100% + 1rem);
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .floating-button-container:hover .modern-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .tooltip-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(51, 65, 85, 0.98));
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 1rem;
          box-shadow:
            0 10px 30px -5px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(139, 92, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          white-space: nowrap;
        }

        .tooltip-emoji {
          font-size: 1.5rem;
          animation: tooltip-emoji-bounce 1s ease-in-out infinite;
        }

        .tooltip-text {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .tooltip-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .tooltip-desc {
          font-size: 0.75rem;
          color: rgb(148, 163, 184);
          margin: 0;
        }

        .tooltip-arrow {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid rgba(30, 41, 59, 0.98);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        /* Responsive */
        @media (max-width: 640px) {
          .floating-button {
            padding: 0.75rem 1rem;
            gap: 0.5rem;
          }

          .gift-icon {
            width: 2rem;
            height: 2rem;
          }

          .gift-bounce {
            font-size: 1.25rem;
          }

          .text-main {
            font-size: 0.875rem;
          }

          .text-sub {
            font-size: 0.5625rem;
          }

          .modern-tooltip {
            display: none; /* Ocultar tooltip en móvil */
          }
        }

        /* Animaciones */
        @keyframes slideInBounce {
          0% {
            opacity: 0;
            transform: translateY(100px) scale(0.5);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) scale(1.1);
          }
          80% {
            transform: translateY(5px) scale(0.95);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes button-glow {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        @keyframes particle-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(10px, -15px) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes gift-bounce {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-5px) rotate(-10deg);
          }
          50% {
            transform: translateY(-8px) rotate(0deg);
          }
          75% {
            transform: translateY(-5px) rotate(10deg);
          }
        }

        @keyframes badge-ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes click-ripple {
          0% {
            opacity: 1;
            transform: scale(0);
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }

        @keyframes tooltip-emoji-bounce {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-4px) rotate(10deg);
          }
        }

        @keyframes rainbow-glow {
          0%, 100% {
            filter: hue-rotate(0deg) brightness(1);
          }
          50% {
            filter: hue-rotate(20deg) brightness(1.2);
          }
        }

        @keyframes badge-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.6), 0 0 20px rgba(16, 185, 129, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.8), 0 0 30px rgba(16, 185, 129, 0.6);
          }
        }
      `}</style>
    </>
  );
};

export default HotmartFloatingButton;
