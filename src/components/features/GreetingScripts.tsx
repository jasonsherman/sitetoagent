import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Copy } from 'lucide-react';

interface GreetingScriptsProps {
  greetings: string[];
}

const GreetingScripts = ({ greetings }: GreetingScriptsProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllGreetings = () => {
    navigator.clipboard.writeText(greetings.join('\n\n'));
    // In a real app, we would show a toast notification here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Branded Greeting Scripts</h3>
        <button
          onClick={copyAllGreetings}
          className="inline-flex items-center px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-md transition-colors"
        >
          <Copy className="h-4 w-4 mr-1.5" />
          Copy All Greetings
        </button>
      </div>

      <div className="space-y-4">
        {greetings.map((greeting, index) => (
          <motion.div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h4 className="font-medium text-gray-700">Greeting {index + 1}</h4>
              <button
                onClick={() => copyToClipboard(greeting, index)}
                className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors"
              >
                {copiedIndex === index ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-700">{greeting}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GreetingScripts;