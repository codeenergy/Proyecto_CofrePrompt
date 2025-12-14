import { useEffect, useRef } from 'react';
import { shouldLoadAds, canShowVignette, MONETAG_CONFIG } from '../config/monetag.config';

// Hook para cargar In-Page Push de forma controlada
export const useInPagePush = () => {
  const loadedRef = useRef(false);

  useEffect(() => {
    // Solo cargar una vez y si está habilitado
    if (loadedRef.current || !shouldLoadAds() || !MONETAG_CONFIG.inPagePush.enabled) {
      return;
    }

    // Delay para no molestar inmediatamente
    const timer = setTimeout(() => {
      try {
        const script = document.createElement('script');
        script.dataset.zone = MONETAG_CONFIG.inPagePush.zone;
        script.src = MONETAG_CONFIG.inPagePush.src;
        script.async = true;

        const target = [document.documentElement, document.body]
          .filter(Boolean)
          .pop();

        if (target) {
          target.appendChild(script);
          loadedRef.current = true;
          console.log('Monetag In-Page Push cargado');
        }
      } catch (error) {
        console.error('Error al cargar In-Page Push:', error);
      }
    }, MONETAG_CONFIG.inPagePush.delayMs);

    return () => clearTimeout(timer);
  }, []);
};

// Hook para cargar Vignette Banner de forma controlada
export const useVignetteBanner = () => {
  const loadedRef = useRef(false);

  useEffect(() => {
    // Verificar si puede mostrarse (incluye límite de frecuencia)
    if (loadedRef.current || !canShowVignette()) {
      return;
    }

    // Delay mayor para que sea menos intrusivo
    const timer = setTimeout(() => {
      try {
        const script = document.createElement('script');
        script.dataset.zone = MONETAG_CONFIG.vignetteBanner.zone;
        script.src = MONETAG_CONFIG.vignetteBanner.src;
        script.async = true;

        const target = [document.documentElement, document.body]
          .filter(Boolean)
          .pop();

        if (target) {
          target.appendChild(script);
          loadedRef.current = true;
          console.log('Monetag Vignette Banner cargado');
        }
      } catch (error) {
        console.error('Error al cargar Vignette Banner:', error);
      }
    }, MONETAG_CONFIG.vignetteBanner.delayMs);

    return () => clearTimeout(timer);
  }, []);
};

// Hook combinado que carga todos los anuncios habilitados
export const useMonetag = (options?: {
  enableInPagePush?: boolean;
  enableVignetteBanner?: boolean;
}) => {
  const {
    enableInPagePush = true,
    enableVignetteBanner = true,
  } = options || {};

  // Cargar In-Page Push si está habilitado
  useEffect(() => {
    if (!enableInPagePush) return;

    const loadedRef = { current: false };

    if (loadedRef.current || !shouldLoadAds() || !MONETAG_CONFIG.inPagePush.enabled) {
      return;
    }

    const timer = setTimeout(() => {
      try {
        const script = document.createElement('script');
        script.dataset.zone = MONETAG_CONFIG.inPagePush.zone;
        script.src = MONETAG_CONFIG.inPagePush.src;
        script.async = true;

        const target = [document.documentElement, document.body]
          .filter(Boolean)
          .pop();

        if (target) {
          target.appendChild(script);
          loadedRef.current = true;
        }
      } catch (error) {
        console.error('Error al cargar In-Page Push:', error);
      }
    }, MONETAG_CONFIG.inPagePush.delayMs);

    return () => clearTimeout(timer);
  }, [enableInPagePush]);

  // Cargar Vignette Banner si está habilitado
  useEffect(() => {
    if (!enableVignetteBanner) return;

    const loadedRef = { current: false };

    if (loadedRef.current || !canShowVignette()) {
      return;
    }

    const timer = setTimeout(() => {
      try {
        const script = document.createElement('script');
        script.dataset.zone = MONETAG_CONFIG.vignetteBanner.zone;
        script.src = MONETAG_CONFIG.vignetteBanner.src;
        script.async = true;

        const target = [document.documentElement, document.body]
          .filter(Boolean)
          .pop();

        if (target) {
          target.appendChild(script);
          loadedRef.current = true;
        }
      } catch (error) {
        console.error('Error al cargar Vignette Banner:', error);
      }
    }, MONETAG_CONFIG.vignetteBanner.delayMs);

    return () => clearTimeout(timer);
  }, [enableVignetteBanner]);
};
