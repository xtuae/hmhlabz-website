import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: 'Services', path: '/#services' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-6">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600"></div>
          HMH<span className="text-indigo-400">LABZ</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-indigo-400 ${
                location.pathname === link.path ? 'text-indigo-400' : 'text-slate-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={onLoginClick}
            className="px-6 py-2 rounded-full border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 transition-all font-medium text-sm"
          >
            Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-slate-900 border-b border-white/5 p-6"
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-300"
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => {
                onLoginClick();
                setIsOpen(false);
              }}
              className="w-full py-4 rounded-2xl bg-indigo-500 text-white font-bold"
            >
              Login
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
