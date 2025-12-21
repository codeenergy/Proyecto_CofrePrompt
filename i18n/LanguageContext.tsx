// ═══════════════════════════════════════════════════════════════════════════
// LANGUAGE CONTEXT - Sistema de Idiomas con localStorage
// ═══════════════════════════════════════════════════════════════════════════

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationKeys } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Detectar idioma inicial del navegador o localStorage
  const getInitialLanguage = (): Language => {
    // Primero verificar localStorage
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      return savedLang;
    }

    // Si no hay guardado, detectar del navegador
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) {
      return 'es';
    }
    return 'en'; // Por defecto inglés para US/Canadá
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Guardar en localStorage cuando cambie
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Sincronizar con localStorage al montar
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
  }, []);

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
