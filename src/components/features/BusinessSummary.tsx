import { motion } from 'framer-motion';
import { Clipboard } from 'lucide-react';
import { Website } from '../../types/website';

interface BusinessSummaryProps {
  summary: Website['summary'];
}

const BusinessSummary = ({ summary }: BusinessSummaryProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, we would show a toast notification here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Business Overview</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
          <p className="text-gray-700">{summary.businessOverview}</p>
          <button 
            onClick={() => copyToClipboard(summary.businessOverview)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy to clipboard"
          >
            <Clipboard className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Unique Selling Points</h3>
          <ul className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 relative">
            {summary.uniqueSellingPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
            <button 
              onClick={() => copyToClipboard(summary.uniqueSellingPoints.join('\n'))}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy to clipboard"
            >
              <Clipboard className="h-4 w-4" />
            </button>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Services/Products</h3>
          <ul className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 relative">
            {summary.servicesProducts.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-xs font-medium mr-2 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{service}</span>
              </li>
            ))}
            <button 
              onClick={() => copyToClipboard(summary.servicesProducts.join('\n'))}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy to clipboard"
            >
              <Clipboard className="h-4 w-4" />
            </button>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Brand Voice</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
            <p className="text-gray-700">{summary.brandVoice}</p>
            <button 
              onClick={() => copyToClipboard(summary.brandVoice)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy to clipboard"
            >
              <Clipboard className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Value Propositions</h3>
          <ul className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 relative">
            {summary.valuePropositions.map((proposition, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-green-100 text-green-800 text-xs font-medium mr-2 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{proposition}</span>
              </li>
            ))}
            <button 
              onClick={() => copyToClipboard(summary.valuePropositions.join('\n'))}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy to clipboard"
            >
              <Clipboard className="h-4 w-4" />
            </button>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessSummary;