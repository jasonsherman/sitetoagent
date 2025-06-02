import { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  isJapanese: boolean;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [isJapanese, setIsJapanese] = useState(false);
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newIsJapanese = !isJapanese;
    setIsJapanese(newIsJapanese);
    i18n.changeLanguage(newIsJapanese ? 'ja' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ isJapanese, toggleLanguage }}>
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