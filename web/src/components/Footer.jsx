import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xl font-bold">
          HMH<span className="text-indigo-400">LABZ</span>
        </div>
        
        <div className="flex gap-8 text-sm text-slate-400">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <a href="mailto:hello@hmhlabz.com" className="hover:text-white transition-colors">Contact Us</a>
        </div>

        <div className="text-sm text-slate-500">
          &copy; 2026 HMH Labz. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
