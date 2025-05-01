import { Brain } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-indigo-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">SiteToAgent</h1>
            <p className="text-xs text-gray-500">AI-Powered Sales Agent Generator</p>
          </div>
        </div>
        <nav className="flex items-center space-x-1 sm:space-x-3">
          <a 
            href="#" 
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            How It Works
          </a>
          <a 
            href="#" 
            className="hidden sm:inline-block px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Pricing
          </a>
          <a 
            href="#" 
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;