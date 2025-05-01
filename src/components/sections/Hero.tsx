import { motion } from 'framer-motion';
import { Bot, FileText, MessageSquare, BarChart4 } from 'lucide-react';

const Hero = () => {
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
            Transform Your Website <br />Into an AI Sales Agent
          </motion.h1>

          <motion.p
            className="text-xl mb-8 text-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Generate a complete AI sales agent training kit with just one click.
            Scrape your website, build a knowledge base, create greetings, and answer training questions with your own data.
          </motion.p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <Bot className="h-8 w-8 mb-2 mx-auto text-indigo-200" />
              <h3 className="font-medium">AI Analysis</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <MessageSquare className="h-8 w-8 mb-2 mx-auto text-indigo-200" />
              <h3 className="font-medium">Business Answers</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <FileText className="h-8 w-8 mb-2 mx-auto text-indigo-200" />
              <h3 className="font-medium">Knowledge Base</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <BarChart4 className="h-8 w-8 mb-2 mx-auto text-indigo-200" />
              <h3 className="font-medium">Sales Q&A</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;