import { useState } from 'react';
import { Globe, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface UrlFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

const UrlForm = ({ onSubmit, isLoading }: UrlFormProps) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const validateUrl = (value: string) => {
    if (!value.trim()) {
      setIsValid(false);
      setErrorMessage('Please enter a URL');
      return false;
    }
    
    // Simple URL validation
    if (!value.match(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/)) {
      setIsValid(false);
      setErrorMessage('Please enter a valid URL');
      return false;
    }
    
    setIsValid(true);
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUrl(url)) {
      return;
    }
    
    // Format the URL if needed
    let formattedUrl = url;
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    
    await onSubmit(formattedUrl);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Generate Your AI Sales Agent</h2>
        <p className="text-gray-600 mb-6">Enter any business website URL and we'll create a complete sales agent training kit.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className={`w-full pl-10 pr-24 py-3 border ${
                !isValid ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2`}
              disabled={isLoading}
            />
            
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Processing
                  </>
                ) : (
                  <>
                    Analyze <ArrowRight className="ml-1 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
          
          {!isValid && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
          )}
          
          <p className="mt-3 text-xs text-gray-500">
            We'll analyze the site and generate a complete sales agent training kit based on the content.
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default UrlForm;