import React, { useState } from 'react';
import { HOTMART_PRODUCTS, HOTMART_CONFIG, HotmartProduct } from '../config/hotmart.config';

interface HotmartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HotmartModal: React.FC<HotmartModalProps> = ({ isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState<HotmartProduct | null>(null);

  if (!isOpen) return null;

  const handleProductClick = (product: HotmartProduct) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const handleBuyClick = (affiliateLink: string) => {
    window.open(affiliateLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Backdrop con blur */}
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-container">
        <div className="modal-content">
          {/* Header Glassmorphism */}
          <div className="modal-header">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                {selectedProduct && (
                  <button
                    onClick={handleBack}
                    className="back-button"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2 modal-title">
                    {selectedProduct ? selectedProduct.title : HOTMART_CONFIG.modalTitle}
                  </h2>
                  {!selectedProduct && (
                    <p className="text-sm text-purple-200 mt-1 modal-subtitle">{HOTMART_CONFIG.modalSubtitle}</p>
                  )}
                </div>
              </div>
              <button onClick={onClose} className="close-button">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="modal-body">
            {selectedProduct ? (
              // Vista Individual del Producto
              <div className="product-detail">
                {/* Video con efecto de brillo */}
                <div className="video-container">
                  <div className="video-glow" />
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedProduct.youtubeVideoId}?autoplay=1&rel=0`}
                    title={selectedProduct.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-2xl"
                  />
                </div>

                {/* Grid de información */}
                <div className="product-info-grid">
                  {/* Info Principal */}
                  <div className="product-main-info">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="category-badge">
                        {selectedProduct.category}
                      </span>
                      {selectedProduct.badge && (
                        <span className="product-badge-gold">
                          ✨ {selectedProduct.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-300 leading-relaxed text-base md:text-lg mb-6">
                      {selectedProduct.description}
                    </p>

                    {/* Features con animación */}
                    <div className="features-section">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">✨</span>
                        Lo que incluye:
                      </h3>
                      <div className="features-grid">
                        {selectedProduct.highlights.map((highlight, index) => (
                          <div key={index} className="feature-item" style={{ animationDelay: `${index * 0.1}s` }}>
                            <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-slate-300">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card de Compra Sticky */}
                  <div className="purchase-card-sticky">
                    <div className="purchase-card">
                      {/* Efecto de brillo animado */}
                      <div className="card-shine" />

                      <div className="text-center mb-6">
                        <div className="relative inline-block mb-4">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 blur-2xl opacity-60 animate-pulse"></div>
                          <div className="relative text-5xl md:text-6xl font-black">🎁</div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-blue-400 mb-3 animate-gradient">
                          ¡OFERTA ESPECIAL!
                        </h3>
                        <p className="text-slate-300 text-base mb-2">
                          Descubre el precio exclusivo y accede al contenido completo
                        </p>
                        <div className="discount-badge">
                          🔥 DESCUENTO LIMITADO DISPONIBLE
                        </div>
                      </div>

                      <button
                        onClick={() => handleBuyClick(selectedProduct.affiliateLink)}
                        className="buy-button"
                      >
                        <span className="button-shine" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span className="text-2xl">🚀</span>
                          VER OFERTA COMPLETA
                        </span>
                      </button>

                      <p className="text-xs text-slate-400 text-center mt-4 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Pago 100% Seguro • Garantía de 7 días
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Grid de Productos con efectos modernos
              <div className="products-grid">
                {HOTMART_PRODUCTS.map((product, index) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="product-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Imagen con overlay gradiente */}
                    <div className="product-image-container">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="product-image"
                      />
                      {/* Overlay gradiente */}
                      <div className="image-overlay" />

                      {/* Badge flotante */}
                      {product.badge && (
                        <div className="floating-badge">
                          ✨ {product.badge}
                        </div>
                      )}

                      {/* Play button con efecto */}
                      <div className="play-overlay">
                        <div className="play-button">
                          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Info del producto */}
                    <div className="product-card-body">
                      <span className="product-category">
                        {product.category}
                      </span>

                      <h3 className="product-title">
                        {product.title}
                      </h3>

                      <p className="product-description">
                        {product.shortDescription}
                      </p>

                      {/* CTA */}
                      <div className="product-footer">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🎯</span>
                          <span className="text-white font-bold text-sm">OFERTA ESPECIAL</span>
                        </div>
                        <button className="view-button">
                          Ver oferta
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Efecto de brillo en hover */}
                    <div className="card-hover-shine" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Estilos CSS modernos */}
      <style>{`
        /* Backdrop */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          animation: fadeIn 0.3s ease-out;
        }

        /* Container */
        .modal-container {
          position: fixed;
          inset: 0;
          z-index: 101;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-content {
          position: relative;
          width: 100%;
          max-width: 1400px;
          max-height: 95vh;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(14, 77, 164, 0.2) 50%, rgba(30, 41, 59, 0.95) 100%);
          border-radius: 2rem;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
                      0 0 100px rgba(255, 109, 0, 0.4),
                      0 0 150px rgba(14, 77, 164, 0.3),
                      inset 0 0 100px rgba(255, 109, 0, 0.1);
          border: 2px solid;
          border-image: linear-gradient(135deg, rgba(255, 109, 0, 0.6), rgba(14, 77, 164, 0.6)) 1;
        }

        /* Header Glassmorphism - Colores Hotmart */
        .modal-header {
          position: sticky;
          top: 0;
          z-index: 10;
          background: linear-gradient(135deg, rgba(255, 109, 0, 0.3), rgba(14, 77, 164, 0.3));
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 2px solid;
          border-image: linear-gradient(90deg, rgba(255, 109, 0, 0.5), rgba(14, 77, 164, 0.5)) 1;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(255, 109, 0, 0.2);
        }

        .modal-title {
          background: linear-gradient(90deg, #FF6D00, #FF8C00, #FFB300, #0E4DA4, #1E88E5);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(255, 109, 0, 0.5));
        }

        .modal-subtitle {
          animation: fadeIn 0.5s ease-out 0.2s backwards;
        }

        .back-button, .close-button {
          padding: 0.5rem;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .back-button:hover, .close-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1) rotate(90deg);
        }

        /* Body */
        .modal-body {
          overflow-y: auto;
          max-height: calc(95vh - 100px);
          padding: 2rem;
        }

        .modal-body::-webkit-scrollbar {
          width: 8px;
        }

        .modal-body::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 4px;
        }

        .modal-body::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5));
          border-radius: 4px;
        }

        /* Vista Individual */
        .product-detail {
          animation: fadeInScale 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .video-container {
          position: relative;
          aspect-ratio: 16/9;
          width: 100%;
          margin-bottom: 2rem;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5),
                      0 0 60px rgba(139, 92, 246, 0.4);
        }

        .video-glow {
          position: absolute;
          inset: -50%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
          animation: pulse 3s ease-in-out infinite;
        }

        .product-info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .product-info-grid {
            grid-template-columns: 1fr 400px;
          }
        }

        .category-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, rgba(14, 77, 164, 0.3), rgba(30, 136, 229, 0.3));
          border: 2px solid rgba(30, 136, 229, 0.6);
          border-radius: 9999px;
          color: #60D5FD;
          font-size: 0.875rem;
          font-weight: 700;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 20px rgba(30, 136, 229, 0.3);
        }

        .product-badge-gold {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          border-radius: 9999px;
          color: white;
          font-size: 0.875rem;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
          animation: pulse 2s ease-in-out infinite;
        }

        .features-section {
          padding: 1.5rem;
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }

        .features-grid {
          display: grid;
          gap: 1rem;
        }

        .feature-item {
          display: flex;
          align-items: start;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 0.75rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .feature-item:hover {
          background: rgba(139, 92, 246, 0.1);
          transform: translateX(0.5rem);
        }

        /* Purchase Card */
        .purchase-card-sticky {
          position: sticky;
          top: 120px;
        }

        .purchase-card {
          position: relative;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(255, 109, 0, 0.2) 0%, rgba(14, 77, 164, 0.3) 100%);
          border: 2px solid;
          border-image: linear-gradient(135deg, rgba(255, 109, 0, 0.6), rgba(14, 77, 164, 0.6)) 1;
          border-radius: 1.5rem;
          backdrop-filter: blur(20px);
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
                      0 0 40px rgba(255, 109, 0, 0.3),
                      0 0 60px rgba(14, 77, 164, 0.2);
          animation: card-glow 3s ease-in-out infinite;
        }

        .card-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: shine 3s ease-in-out infinite;
        }

        .discount-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 9999px;
          color: white;
          font-size: 0.875rem;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
          animation: bounce 2s ease-in-out infinite;
        }

        .buy-button {
          position: relative;
          width: 100%;
          padding: 1.25rem;
          background: linear-gradient(135deg, #FF6D00 0%, #FF8C00 50%, #FFB300 100%);
          background-size: 200% auto;
          color: white;
          font-weight: 800;
          font-size: 1.125rem;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(255, 109, 0, 0.6), 0 0 40px rgba(255, 140, 0, 0.4);
          animation: gradient-slide 3s ease infinite;
        }

        .buy-button:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 20px 50px rgba(255, 109, 0, 0.8), 0 0 60px rgba(255, 140, 0, 0.6);
        }

        .buy-button:active {
          transform: translateY(0) scale(0.98);
        }

        .button-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: buttonShine 2s ease-in-out infinite;
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .product-card {
          position: relative;
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 1.5rem;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
          backdrop-filter: blur(10px);
        }

        .product-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(139, 92, 246, 0.6);
          box-shadow: 0 25px 50px -12px rgba(139, 92, 246, 0.4),
                      0 0 60px rgba(139, 92, 246, 0.2);
        }

        .product-image-container {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover .product-image {
          transform: scale(1.15) rotate(2deg);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          transition: opacity 0.3s;
        }

        .product-card:hover .image-overlay {
          background: linear-gradient(to top, rgba(139, 92, 246, 0.6), transparent);
        }

        .floating-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.5rem 0.75rem;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          border-radius: 9999px;
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(251, 191, 36, 0.5);
          animation: float 3s ease-in-out infinite;
          z-index: 2;
        }

        .play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
          transition: background 0.3s;
        }

        .product-card:hover .play-overlay {
          background: rgba(139, 92, 246, 0.5);
        }

        .play-button {
          display: flex;
          align-items: center;
          justify-center: center;
          width: 4rem;
          height: 4rem;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 9999px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .product-card:hover .play-button {
          transform: scale(1.2);
          background: white;
          box-shadow: 0 15px 35px rgba(139, 92, 246, 0.5);
        }

        .product-card-body {
          padding: 1.5rem;
        }

        .product-category {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 9999px;
          color: rgb(196, 181, 253);
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .product-title {
          color: white;
          font-size: 1.125rem;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s;
        }

        .product-card:hover .product-title {
          color: rgb(196, 181, 253);
        }

        .product-description {
          color: rgb(148, 163, 184);
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(139, 92, 246, 0.2);
        }

        .view-button {
          display: flex;
          align-items: center;
          padding: 0.625rem 1.25rem;
          background: linear-gradient(135deg, #FF6D00 0%, #FF8C00 100%);
          color: white;
          font-size: 0.875rem;
          font-weight: 700;
          border-radius: 0.75rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(255, 109, 0, 0.4);
        }

        .view-button:hover {
          transform: translateX(4px) scale(1.05);
          box-shadow: 0 10px 30px rgba(255, 109, 0, 0.7);
          background: linear-gradient(135deg, #FF8C00 0%, #FFB300 100%);
        }

        .card-hover-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
          pointer-events: none;
        }

        .product-card:hover .card-hover-shine {
          transform: translateX(100%);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        @keyframes buttonShine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          50% { transform: translateX(50%) translateY(50%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-slide {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes card-glow {
          0%, 100% {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
                        0 0 40px rgba(255, 109, 0, 0.3),
                        0 0 60px rgba(14, 77, 164, 0.2);
          }
          50% {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
                        0 0 60px rgba(255, 109, 0, 0.5),
                        0 0 80px rgba(14, 77, 164, 0.4);
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .modal-container {
            padding: 0.5rem;
          }

          .modal-content {
            border-radius: 1.5rem;
            max-height: 98vh;
          }

          .modal-header {
            padding: 1rem;
          }

          .modal-title {
            font-size: 1.25rem;
          }

          .modal-body {
            padding: 1rem;
          }

          .product-price {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default HotmartModal;
