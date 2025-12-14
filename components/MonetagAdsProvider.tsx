import React from 'react';
import { useMonetag } from '../hooks/useMonetag';

interface MonetagAdsProviderProps {
  children: React.ReactNode;
  enableInPagePush?: boolean;
  enableVignetteBanner?: boolean;
}

/**
 * Proveedor de anuncios de Monetag
 * Componente invisible que carga los scripts de publicidad de forma controlada
 *
 * Características:
 * - Solo se activa en producción (Vercel)
 * - Delays configurables para no molestar inmediatamente
 * - Control de frecuencia (Vignette solo 1 vez por sesión)
 * - Fácil de habilitar/deshabilitar desde monetag.config.ts
 *
 * Uso:
 * <MonetagAdsProvider>
 *   <App />
 * </MonetagAdsProvider>
 *
 * O con control específico:
 * <MonetagAdsProvider enableInPagePush={true} enableVignetteBanner={false}>
 *   <App />
 * </MonetagAdsProvider>
 */
const MonetagAdsProvider: React.FC<MonetagAdsProviderProps> = ({
  children,
  enableInPagePush = true,
  enableVignetteBanner = true,
}) => {
  // Hook que maneja la carga controlada de los anuncios
  useMonetag({
    enableInPagePush,
    enableVignetteBanner,
  });

  // Este componente no renderiza nada visible, solo carga los scripts
  return <>{children}</>;
};

export default MonetagAdsProvider;
