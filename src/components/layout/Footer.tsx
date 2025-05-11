import { Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">SiteToAgent</h3>
            <p className="text-sm mb-2">
              Transform any business website into a <br />
              complete AI sales agent training kit in seconds.
            </p>
            <p className="text-xs text-gray-400 mb-4">&copy; {new Date().getFullYear()} Vengo AI.</p>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a> */}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="https://vengoai.com" target="_blank" className="text-gray-400 hover:text-white transition-colors">Vengo AI Agents</a></li>
              <li><a href="https://trendlyzer.com" target="_blank" className="text-gray-400 hover:text-white transition-colors">Trendlyzer</a></li>
              <li><a href="https://leadreplyai.com" target="_blank" className="text-gray-400 hover:text-white transition-colors">Lead Reply AI</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:info@vengoai.com" className="text-gray-400 hover:text-white transition-colors">info@vengoai.com</a></li>
              <li>Philadelphia, PA</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;