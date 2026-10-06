'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { dictionaries, type Dictionary, type Language } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // El diccionario es dinámico por diseño: la búsqueda por clave es intencional.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = 'language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Hidratación: el primer render es siempre 'es' (lo único que el servidor
  // conoce). El idioma guardado se aplica después del montaje, en useEffect,
  // para que servidor y cliente generen el mismo HTML inicial.
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if ((saved === 'es' || saved === 'en') && saved !== 'es') {
      // Sincroniza el idioma guardado tras el montaje (el linter pide evitar
      // setState en efectos, pero aquí es el patrón de hidratación correcto).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Mantiene sincronizados <html lang>, el estado y localStorage.
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const t = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (key: string): any => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = dictionaries[language] as Dictionary;
      for (const part of key.split('.')) {
        if (value && value[part] !== undefined) {
          value = value[part];
        } else {
          return key;
        }
      }
      return value;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
