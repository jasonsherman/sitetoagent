import React, { useState } from 'react';
import { Brain, PlayCircle } from 'lucide-react';
import VideoModal from './VideoModal';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isJapanese, toggleLanguage } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/">
            <img src="assets/img/site-to-agent-logo.png" alt={t('header.logoAlt')} className="h-12 w-auto" />
          </a>
        </div>
        <nav className="flex items-center space-x-1 sm:space-x-3">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-2 bg-gray-50 rounded-md hover:bg-gray-100"
            onClick={() => setModalOpen(true)}
          >
            <PlayCircle className="w-5 h-5" />
            {t('header.watchDemo')}
          </button>
          <a
            href="https://vengoai.com" target="_blank"
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-md hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
          >
            {t('header.vengoAI')}
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isJapanese ? t('header.switchToEnglish') : t('header.switchToJapanese')}
          </button>
        </div>
      </div>
      <VideoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
};

export default Header;