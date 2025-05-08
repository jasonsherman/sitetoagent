import { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import UrlForm from './components/features/UrlForm';
import ResultsSection from './components/sections/ResultsSection';
import { Website } from './types/website';
import { analyzeWebsite } from './services/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Website | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await analyzeWebsite(url);
      setResults(data);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'An error occurred while analyzing the website.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <UrlForm onSubmit={handleSubmit} isLoading={loading} />
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          {results && !loading && (
            <ResultsSection website={results} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;