import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/#about' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-cream/90 backdrop-blur-xl border-b border-brand-dark/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <img src={logo} alt="HMH Labz" className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="text-[15px] font-medium hover:text-brand-orange transition-colors text-brand-dark/70 hover:text-brand-dark"
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-brand-dark text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-brand-orange transition-all duration-300 transform hover:scale-105 shadow-xl shadow-brand-dark/10">
            Let's Talk
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-brand-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[88px] bg-brand-cream z-40 p-8 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="text-3xl font-bold text-brand-dark border-b border-brand-dark/5 pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-brand-orange text-white w-full py-5 rounded-2xl font-bold text-xl mt-4">
            Start Your Project
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
