import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Download, Loader2 } from 'lucide-react';
import { Website } from '../../types/website';
import { generatePDF } from '../../services/mockApi';

interface KnowledgeBaseProps {
  website: Website;
}

const KnowledgeBase = ({ website }: KnowledgeBaseProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Knowledge Base PDF</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Generate a comprehensive PDF containing all the insights and sales materials extracted from the website.
            </p>
          </div>

          {pdfUrl ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 text-green-700 rounded-md">
                <p className="font-medium">Your PDF is ready!</p>
                <p className="text-sm">Click the button below to download it.</p>
              </div>
              
              <a
                href={pdfUrl}
                download={`${website.name}-sales-agent-kb.pdf`}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </a>
            </div>
          ) : (
            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <FileDown className="h-5 w-5 mr-2" />
                  Generate Knowledge Base PDF
                </>
              )}
            </button>
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h4 className="font-medium text-gray-700 mb-3">PDF Contents Preview:</h4>
          
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mr-2">1</span>
              <span>Business Overview & Company Information</span>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mr-2">2</span>
              <span>Services & Products Catalog</span>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mr-2">3</span>
              <span>Unique Selling Points & Competitive Advantages</span>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mr-2">4</span>
              <span>Brand Voice Guidelines & Communication Style</span>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mr-2">5</span>
              <span>Sales Scripts & Greeting Templates</span>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mr-2">6</span>
              <span>Common Sales Questions & Strategic Answers</span>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mr-2">7</span>
              <span>Value Propositions & Customer Benefits</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default KnowledgeBase;