import { useState } from 'react';
import { motion } from 'framer-motion';
import { Website } from '../../types/website';
import BusinessSummary from '../features/BusinessSummary';
import GreetingScripts from '../features/GreetingScripts';
import SalesQA from '../features/SalesQA';
import KnowledgeBase from '../features/KnowledgeBase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/Tabs';
import { useTranslation } from 'react-i18next';

interface ResultsSectionProps {
  website: Website;
}

const ResultsSection = ({ website }: ResultsSectionProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 bg-gray-50 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{t('results.title', { name: website.name })}</h2>
          <p className="text-gray-600">
            {t('results.subtitle')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6 pt-4">
            <TabsList>
              <TabsTrigger value="summary">{t('results.tabs.summary')}</TabsTrigger>
              <TabsTrigger value="greetings">{t('results.tabs.greetings')}</TabsTrigger>
              <TabsTrigger value="sales">{t('results.tabs.sales')}</TabsTrigger>
              <TabsTrigger value="pdf">{t('results.tabs.pdf')}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="summary">
            <BusinessSummary summary={website.summary} />
          </TabsContent>

          <TabsContent value="greetings">
            <GreetingScripts greetings={website.greetings} />
          </TabsContent>

          <TabsContent value="sales">
            <SalesQA salesQA={website.salesQA} />
          </TabsContent>

          <TabsContent value="pdf">
            <KnowledgeBase website={website} />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ResultsSection;