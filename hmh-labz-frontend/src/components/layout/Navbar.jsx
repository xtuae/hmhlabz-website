import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../App';

const Navbar = () => {
  const { openFitCall } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { label: 'Approach', path: '#approach' },
    { label: 'Services', path: '#how-we-work' },
    { label: 'Insights', path: '/insights' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (e, path) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const id = path.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', path);
      } else if (location.pathname !== '/') {
        window.location.href = '/' + path;
      }
    }
  };

  const isActive = (path) => {
    if (path.startsWith('#')) {
      return location.pathname === '/' && location.hash === path;
    }
    return location.pathname === path;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-paper/85 backdrop-blur-md border-b border-ink/10" : ""}`}>
        <div className="px-6 md:px-10 lg:px-14 h-[84px] sm:h-[92px] flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex-shrink-0">
            <img src="https://www.hmhlabz.com/wp-content/uploads/hmh-labz-black.png" alt="HMH Labz" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[13px] text-ink font-bold uppercase tracking-widest">
            {items.map((it) => (
              <a 
                key={it.label} 
                href={it.path} 
                onClick={(e) => handleNavClick(e, it.path)}
                className="relative group py-2"
              >
                <span className={isActive(it.path) ? 'text-terra' : ''}>{it.label}</span>
                <span className={`absolute left-0 bottom-1 h-px bg-terra transition-all duration-300 ${isActive(it.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </a>
            ))}
            <button 
              onClick={openFitCall}
              className="ml-4 px-6 py-3 bg-ink text-paper rounded-full hover:bg-terra transition-all hover:scale-105 active:scale-95"
            >
              Book Fit Call
            </button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 group">
            <span className="w-full h-[2px] bg-ink group-hover:bg-terra transition-colors"></span>
            <span className="w-full h-[2px] bg-ink group-hover:bg-terra transition-colors"></span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
            className="fixed inset-0 z-[100] bg-paper flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-20">
              <img src="https://www.hmhlabz.com/wp-content/uploads/hmh-labz-black.png" alt="HMH Labz" className="h-6 object-contain" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 border border-ink/10 rounded-full text-2xl flex items-center justify-center">&times;</button>
            </div>
            <div className="flex flex-col gap-10">
              {['Home', ...items.map(i => i.label)].map(m => {
                const path = m === 'Home' ? '/' : items.find(i => i.label === m).path;
                return (
                  <a 
                    key={m} 
                    href={path}
                    onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, path); }}
                    className="text-left font-sans font-bold text-5xl tracking-tighter text-ink hover:text-terra transition-colors"
                  >
                    {m}
                  </a>
                );
              })}
            </div>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); openFitCall(); }}
              className="mt-auto w-full py-5 bg-terra text-paper rounded-full font-mono font-bold text-xs uppercase tracking-widest shadow-xl shadow-terra/20"
            >
              Book a Fit Call →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
