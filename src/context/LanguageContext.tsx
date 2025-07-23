
'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import i18n from '@/lib/i18n';
import { useTranslation, TFunction } from 'react-i18next';

type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: TFunction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { t, i18n: i18nInstance } = useTranslation();
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('language') as Language | null;
      return storedLanguage || 'bn';
    }
    return 'bn';
  });

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language | null;
    if (storedLanguage) {
      setLanguageState(storedLanguage);
      i18nInstance.changeLanguage(storedLanguage);
    }
  }, [i18nInstance]);

  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
    i18nInstance.changeLanguage(lang);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'bn' ? 'en' : 'bn';
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
