import React, { useState } from 'react';
import { HOTMART_PRODUCTS, HotmartProduct } from '../config/hotmart.config';
import { useLanguage } from '../i18n/LanguageContext';
import { X, ArrowLeft, ExternalLink } from 'lucide-react';

interface HotmartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HotmartModal: React.FC<HotmartModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-slate-900 border border-orange-500/30 w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] rounded-lg overflow-hidden flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-800">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              {selectedProduct && (
                <button
                  onClick={handleBack}
                  className="p-1.5 sm:p-2 hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                >
                  <ArrowLeft size={18} className="sm:w-5 sm:h-5 text-white" />
                </button>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white truncate">
                  {selectedProduct ? selectedProduct.title : t.hotmart.recommendedProducts}
                </h2>
                {!selectedProduct && (
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-none">{t.hotmart.subtitle}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
            >
              <X size={18} className="sm:w-5 sm:h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
            {selectedProduct ? (
              // Vista Individual del Producto
              <div className="space-y-4 sm:space-y-6">
                {/* Video */}
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedProduct.youtubeVideoId}?autoplay=1&rel=0`}
                    title={selectedProduct.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {/* Descripción */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold">
                        {selectedProduct.category}
                      </span>
                      {selectedProduct.badge && (
                        <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold">
                          {selectedProduct.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-300 leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>✨</span> {t.hotmart.highlights}
                      </h3>
                      <ul className="space-y-2">
                        {selectedProduct.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3 text-slate-300">
                            <span className="text-green-400 mt-0.5">✓</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card de Compra */}
                  <div className="md:col-span-1">
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4 md:sticky md:top-4">
                      <div className="text-center space-y-3">
                        <div className="text-5xl">🎁</div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                          {t.hotmart.specialOffer}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {t.hotmart.discoverPrice}
                        </p>
                        <div className="px-3 py-2 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-400 text-sm font-semibold">
                          {t.hotmart.limitedDiscount}
                        </div>
                      </div>

                      <button
                        onClick={() => handleBuyClick(selectedProduct.affiliateLink)}
                        className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={20} />
                        {t.hotmart.viewFullOffer}
                      </button>

                      <p className="text-xs text-slate-500 text-center">
                        {t.hotmart.securePayment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Grid de Productos
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {HOTMART_PRODUCTS.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="group text-left bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-orange-500/50 rounded-lg overflow-hidden transition-all"
                  >
                    {/* Imagen */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500/90 rounded-full text-xs font-bold text-slate-900">
                          {product.badge}
                        </div>
                      )}
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-white text-lg line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <div className="pt-2">
                        <span className="text-orange-400 text-sm font-semibold group-hover:text-orange-300 transition-colors">
                          {t.hotmart.viewOffer} →
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HotmartModal;
