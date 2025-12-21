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
      {/* Botón Flotante Limpio */}
      <div className={`floating-button-container ${position}`}>
        <button
          onClick={handleClick}
          className="floating-button"
          aria-label="Ver productos recomendados"
        >
          <div className="button-content">
            <span className="button-icon">🎁</span>
            <div className="button-text">
              <span className="text-main">Ofertas</span>
              <span className="text-sub">Especiales</span>
            </div>
          </div>
        </button>
      </div>

      {/* Modal */}
      <HotmartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Estilos CSS Limpios */}
      <style>{`
        /* Container */
        .floating-button-container {
          position: fixed;
          z-index: 90;
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
        }

        /* Botón Principal */
        .floating-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          background: linear-gradient(135deg, #FF6D00, #0E4DA4);
          border: none;
          border-radius: 9999px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .floating-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }

        .floating-button:active {
          transform: translateY(0);
        }

        /* Contenido */
        .button-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        /* Icono */
        .button-icon {
          font-size: 1.5rem;
        }

        /* Texto */
        .button-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.125rem;
        }

        .text-main {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          letter-spacing: 0.5px;
        }

        .text-sub {
          font-size: 0.625rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .floating-button {
            padding: 0.75rem 1rem;
            gap: 0.5rem;
          }

          .button-icon {
            font-size: 1.25rem;
          }

          .text-main {
            font-size: 0.875rem;
          }

          .text-sub {
            font-size: 0.5625rem;
          }
        }

        /* Animación */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default HotmartFloatingButton;
