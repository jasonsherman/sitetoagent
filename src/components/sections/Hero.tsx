import { motion } from 'framer-motion';
import { Bot, FileText, MessageSquare, BarChart4 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            className="text-xl mb-8 text-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <Bot className="h-8 w-8 mb-2 mx-auto text-indigo-200" />
              <h3 className="font-medium">{t('hero.features.aiOverview')}</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <MessageSquare className="h-8 w-8 mb-2 mx-auto text-indigo-200" />
              <h3 className="font-medium">{t('hero.features.businessAnswers')}</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <FileText className="h-8 w-8 mb-2 mx-auto text-indigo-200" />
              <h3 className="font-medium">{t('hero.features.knowledgeBase')}</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <BarChart4 className="h-8 w-8 mb-2 mx-auto text-indigo-200" />
              <h3 className="font-medium">{t('hero.features.salesQA')}</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;