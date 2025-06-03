import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Website } from '../../types/website';
import { generatePDF } from '../../services/pdfGenerator';
import { generateWord } from '../../services/wordGenerator';

interface KnowledgeBaseProps {
  website: Website;
}

const KnowledgeBase = ({ website }: KnowledgeBaseProps) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [wordUrl, setWordUrl] = useState<string | null>(null);

  const handleGeneratePDF = async () => {
    try {
      setIsGenerating(true);
      const url = await generatePDF(website);
      setPdfUrl(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateWord = async () => {
    try {
      setIsGenerating(true);
      const url = await generateWord(website);
      setWordUrl(url);
    } catch (error) {
      console.error('Error generating Word document:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const sections = t('knowledgeBase.preview.sections', { returnObjects: true }) as string[];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 text-center">
          <div className="mb-6">
            <FileDown className="h-16 w-16 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('knowledgeBase.title')}</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {t('knowledgeBase.description')}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating || !!pdfUrl}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('knowledgeBase.generating')}
                </>
              ) : pdfUrl ? (
                <>
                  <FileDown className="h-4 w-4 mr-2" />
                  {t('knowledgeBase.downloadPDF')}
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4 mr-2" />
                  {t('knowledgeBase.generatePDF')}
                </>
              )}
            </button>

            <button
              onClick={handleGenerateWord}
              disabled={isGenerating || !!wordUrl}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('knowledgeBase.generating')}
                </>
              ) : wordUrl ? (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  {t('knowledgeBase.downloadWord')}
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  {t('knowledgeBase.generateWord')}
                </>
              )}
            </button>
          </div>

          {(pdfUrl || wordUrl) && (
            <div className="mt-4 space-y-2">
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  download="knowledge-base.pdf"
                  className="text-sm text-indigo-600 hover:text-indigo-700 block"
                >
                  {t('knowledgeBase.clickToDownloadPDF')}
                </a>
              )}
              {wordUrl && (
                <a
                  href={wordUrl}
                  download="knowledge-base.docx"
                  className="text-sm text-green-600 hover:text-green-700 block"
                >
                  {t('knowledgeBase.clickToDownloadWord')}
                </a>
              )}
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h4 className="font-medium text-gray-700 mb-3">{t('knowledgeBase.preview.title')}</h4>
          
          <div className="space-y-3 text-sm text-gray-600">
            {sections.map((section: string, index: number) => (
              <div key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mr-2">
                  {index + 1}
                </span>
                <span>{section}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default KnowledgeBase;