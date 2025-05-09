import { useState, useRef, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import UrlForm from './components/features/UrlForm';
import ResultsSection from './components/sections/ResultsSection';
import { Website } from './types/website';
import { startAnalysis, getAnalysisStatus, transformResponse } from './services/api';
import AnalyzingModal from './components/features/AnalyzingModal';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Website | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState('');
  const [progressStep, setProgressStep] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const pollRef = useRef<number | null>(null);

  const clearPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  const handleSubmit = async (url: string) => {
    setResults(null);
    setError(null);
    setCurrentUrl(url);
    setAnalyzing(true);
    setProgress(0);
    setProgressMsg('Starting analysis...');
    setProgressStep('');
    setLoading(true);
    try {
      const taskId = await startAnalysis(url);
      localStorage.setItem('analyze_task_id', taskId);
      // Start polling
      pollRef.current = window.setInterval(async () => {
        try {
          const status = await getAnalysisStatus(taskId);
          setProgress(status.progress);
          setProgressMsg(status.message);
          setProgressStep(status.step);
          if (status.progress === 100 && status.result) {
            clearPolling();
            setAnalyzing(false);
            setResults(transformResponse(status.result));
            setLoading(false);
            localStorage.removeItem('analyze_task_id');
          }
        } catch (err) {
          setError('Error polling analysis status.');
          setAnalyzing(false);
          setLoading(false);
          clearPolling();
          localStorage.removeItem('analyze_task_id');
        }
      }, 2000);
    } catch (err) {
      setError('Failed to start analysis.');
      setAnalyzing(false);
      setLoading(false);
    }
  };

  // Resume polling if task_id is in localStorage
  useEffect(() => {
    const resumeTaskId = localStorage.getItem('analyze_task_id');
    if (resumeTaskId) {
      setAnalyzing(true);
      setLoading(true);
      pollRef.current = window.setInterval(async () => {
        try {
          const status = await getAnalysisStatus(resumeTaskId);
          setProgress(status.progress);
          setProgressMsg(status.message);
          setProgressStep(status.step);
          if (status.progress === 100 && status.result) {
            clearPolling();
            setAnalyzing(false);
            setResults(transformResponse(status.result));
            setLoading(false);
            localStorage.removeItem('analyze_task_id');
          }
        } catch (err) {
          setError('Error polling analysis status.');
          setAnalyzing(false);
          setLoading(false);
          clearPolling();
          localStorage.removeItem('analyze_task_id');
        }
      }, 2000);
    }
    return () => {
      clearPolling();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <UrlForm onSubmit={handleSubmit} isLoading={loading || analyzing} />
          {analyzing && (
            <AnalyzingModal
              url={currentUrl}
              progress={progress}
              message={progressMsg}
              step={progressStep}
            />
          )}
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}
          {results && !loading && !analyzing && (
            <ResultsSection website={results} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;