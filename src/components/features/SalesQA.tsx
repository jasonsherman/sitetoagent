import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Copy } from 'lucide-react';
import { Website } from '../../types/website';

interface SalesQAProps {
  salesQA: Website['salesQA'];
}

const SalesQA = ({ salesQA }: SalesQAProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    const allText = `
Services or Products:
${salesQA.services}

Differentiators:
${salesQA.differentiators}

Most Profitable Items:
${salesQA.profitableItems}

Best Sales Lines:
${salesQA.closingLines.map((line, i) => `${i + 1}. ${line}`).join('\n')}
    `.trim();
    
    navigator.clipboard.writeText(allText);
    setCopied('all');
    setTimeout(() => setCopied(null), 2000);
  };

  const qaItems = [
    {
      id: 'services',
      question: 'What services or products does your business provide?',
      answer: salesQA.services,
    },
    {
      id: 'differentiators',
      question: 'How are you different from your competitors?',
      answer: salesQA.differentiators,
    },
    {
      id: 'profitable',
      question: 'What are your most profitable line items?',
      answer: salesQA.profitableItems,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Sales Q&A</h3>
        <button
          onClick={copyAll}
          className="inline-flex items-center px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-md transition-colors"
        >
          {copied === 'all' ? (
            <>
              <CheckCircle className="h-4 w-4 mr-1.5 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1.5" />
              Copy All Answers
            </>
          )}
        </button>
      </div>

      <div className="space-y-6">
        {qaItems.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h4 className="font-medium text-gray-700">{item.question}</h4>
              <button
                onClick={() => copyToClipboard(item.answer, item.id)}
                className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors"
              >
                {copied === item.id ? (
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
              <p className="text-gray-700">{item.answer}</p>
            </div>
          </motion.div>
        ))}

        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h4 className="font-medium text-gray-700">What are your 5 best sales lines to close a deal?</h4>
            <button
              onClick={() => copyToClipboard(salesQA.closingLines.join('\n'), 'closing')}
              className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              {copied === 'closing' ? (
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
            <ul className="space-y-3">
              {salesQA.closingLines.map((line, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SalesQA;