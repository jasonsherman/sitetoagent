import { useState } from 'react';
import { motion } from 'framer-motion';
import { Website } from '../../types/website';
import BusinessSummary from '../features/BusinessSummary';
import GreetingScripts from '../features/GreetingScripts';
import SalesQA from '../features/SalesQA';
import KnowledgeBase from '../features/KnowledgeBase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/Tabs';

interface ResultsSectionProps {
  website: Website;
}

const ResultsSection = ({ website }: ResultsSectionProps) => {
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
          <h2 className="text-2xl font-bold text-gray-800">Results for {website.name}</h2>
          <p className="text-gray-600">
            We've analyzed the website and generated the following sales agent training materials.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6 pt-4">
            <TabsList>
              <TabsTrigger value="summary">Business Summary</TabsTrigger>
              <TabsTrigger value="greetings">Greetings</TabsTrigger>
              <TabsTrigger value="sales">Sales Q&A</TabsTrigger>
              <TabsTrigger value="pdf">Knowledge Base</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="summary" className="p-6">
            <BusinessSummary summary={website.summary} />
          </TabsContent>

          <TabsContent value="greetings" className="p-6">
            <GreetingScripts greetings={website.greetings} />
          </TabsContent>

          <TabsContent value="sales" className="p-6">
            <SalesQA salesQA={website.salesQA} />
          </TabsContent>

          <TabsContent value="pdf" className="p-6">
            <KnowledgeBase website={website} />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ResultsSection;