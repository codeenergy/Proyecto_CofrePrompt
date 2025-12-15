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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-md border-b border-purple-500/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {selectedProduct ? (
                  <button
                    onClick={handleBack}
                    className="mr-2 p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                ) : null}
                {selectedProduct ? selectedProduct.title : HOTMART_CONFIG.modalTitle}
              </h2>
              {!selectedProduct && (
                <p className="text-sm text-purple-200 mt-1">{HOTMART_CONFIG.modalSubtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all hover:rotate-90 duration-300"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar">
          {selectedProduct ? (
            // Vista de Producto Individual
            <div className="p-6">
              {/* Video de YouTube */}
              <div className="aspect-video w-full mb-6 rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedProduct.youtubeVideoId}?autoplay=1`}
                  title={selectedProduct.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Info del Producto */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                        {selectedProduct.category}
                      </span>
                      {selectedProduct.badge && (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-xs font-bold">
                          {selectedProduct.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Lo que incluye:</h3>
                    <ul className="space-y-2">
                      {selectedProduct.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-slate-300">
                          <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card de Compra */}
                <div className="md:col-span-1">
                  <div className="sticky top-4 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-xl p-6">
                    <div className="text-center mb-4">
                      {selectedProduct.originalPrice && (
                        <p className="text-slate-400 line-through text-lg">{selectedProduct.originalPrice}</p>
                      )}
                      <p className="text-4xl font-bold text-white mb-2">{selectedProduct.price}</p>
                      {selectedProduct.originalPrice && (
                        <div className="inline-block px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                          ¡{Math.round((1 - parseInt(selectedProduct.price.replace('$', '')) / parseInt(selectedProduct.originalPrice.replace('$', ''))) * 100)}% OFF!
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleBuyClick(selectedProduct.affiliateLink)}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-purple-500/50 mb-3"
                    >
                      🎁 COMPRAR AHORA
                    </button>

                    <p className="text-xs text-slate-400 text-center">
                      Pago seguro • Garantía de 7 días
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Grid de Productos
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {HOTMART_PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  {/* Imagen */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.badge && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-xs font-bold shadow-lg">
                        {product.badge}
                      </div>
                    )}
                    {/* Overlay de Play */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-medium mb-2 border border-purple-500/30">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.originalPrice && (
                          <p className="text-xs text-slate-500 line-through">{product.originalPrice}</p>
                        )}
                        <p className="text-2xl font-bold text-white">{product.price}</p>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all">
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default HotmartModal;
