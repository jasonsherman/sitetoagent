import { Brain } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="assets/img/site-to-agent-logo.png" alt="SiteToAgent Logo" className="h-12 w-auto" />
        </div>
        <nav className="flex items-center space-x-1 sm:space-x-3">
          <a
            href="#"
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            How It Works
          </a>
          <a
            href="https://vengoai.com" target="_blank"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Vengo AI Agents
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;