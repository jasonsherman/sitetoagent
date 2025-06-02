import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle, Copy } from 'lucide-react';
import { Website } from '../../types/website';

interface SalesQAProps {
  salesQA: Website['salesQA'];
}

const SalesQA = ({ salesQA }: SalesQAProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const copyAll = () => {
    const allText = `
${t('salesQA.questions.services')}:
${salesQA.services}

${t('salesQA.questions.differentiators')}:
${salesQA.differentiators}

${t('salesQA.questions.profitable')}:
${salesQA.profitableItems}

${t('salesQA.questions.closingLines')}:
${salesQA.closingLines.map((line, i) => `${i + 1}. ${line}`).join('\n')}
    `.trim();

    copyToClipboard(allText, 'all');
  };

  const qaItems = [
    {
      id: 'services',
      question: t('salesQA.questions.services'),
      answer: salesQA.services,
    },
    {
      id: 'differentiators',
      question: t('salesQA.questions.differentiators'),
      answer: salesQA.differentiators,
    },
    {
      id: 'profitable',
      question: t('salesQA.questions.profitable'),
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
        <h3 className="text-xl font-semibold text-gray-800">{t('salesQA.title')}</h3>
        <button
          onClick={copyAll}
          className="inline-flex items-center px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-md transition-colors"
        >
          {copied === 'all' ? (
            <>
              <CheckCircle className="h-4 w-4 mr-1.5 text-green-500" />
              <span className="text-green-500">{t('salesQA.copied')}</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1.5" />
              {t('salesQA.copyAll')}
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
                    <span className="text-green-500">{t('salesQA.copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    {t('salesQA.copy')}
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
            <h4 className="font-medium text-gray-700">{t('salesQA.closingLines.title')}</h4>
            <button
              onClick={() => copyToClipboard(salesQA.closingLines.join('\n'), 'closing')}
              className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              {copied === 'closing' ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-green-500">{t('salesQA.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  {t('salesQA.copyClosingLines')}
                </>
              )}
            </button>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {salesQA.closingLines.map((line, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg text-gray-600"
                >
                  {line}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SalesQA;