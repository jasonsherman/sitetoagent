import { useState } from 'react';
import { Globe, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';

type ResponseLanguage = 'en' | 'ja';

interface UrlFormProps {
  onSubmit: (url: string, responseLanguage?: ResponseLanguage) => Promise<void>;
  isLoading: boolean;
}

const UrlForm = ({ onSubmit, isLoading }: UrlFormProps) => {
  const { t } = useTranslation();
  const { isJapanese, toggleLanguage } = useLanguage();
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const validateUrl = (value: string) => {
    if (!value.trim()) {
      setIsValid(false);
      setErrorMessage(t('form.urlError.empty'));
      return false;
    }

    // Simple URL validation
    if (!value.match(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/)) {
      setIsValid(false);
      setErrorMessage(t('form.urlError.invalid'));
      return false;
    }

    setIsValid(true);
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateUrl(url)) {
      return;
    }

    // Format the URL if needed
    let formattedUrl = url;
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    await onSubmit(formattedUrl, isJapanese ? 'ja' : undefined);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('hero.title')}</h2>
        <p className="text-gray-600 mb-6">{t('hero.subtitle')}</p>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('form.urlPlaceholder')}
              className={`w-full pl-10 pr-24 py-3 border ${!isValid ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 bg-purple-100 text-gray-800`}
              disabled={isLoading}
            />

            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    {t('form.processingButton')}
                  </>
                ) : (
                  <>
                    {t('form.analyzeButton')} <ArrowRight className="ml-1 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isJapanese}
                onChange={toggleLanguage}
                disabled={isLoading}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">{t('form.japaneseToggle')}</span>
            </label>
          </div>

          {!isValid && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
          )}

          <p className="mt-3 text-xs text-gray-500">
            {t('form.description')}
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default UrlForm;