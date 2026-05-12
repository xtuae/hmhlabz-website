import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-cream border-t border-brand-dark/5 pt-32 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
          <div className="md:col-span-4">
            <img src={logo} alt="HMH Labz" className="h-10 md:h-12 w-auto mb-10" />
            <p className="text-brand-dark/50 text-xl font-medium leading-relaxed max-w-sm mb-10">
              Architecting the next generation of digital infrastructure and intelligent software solutions.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-brand-dark/5 flex items-center justify-center text-brand-dark hover:bg-brand-orange hover:text-white transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Services', 'About', 'Insights', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Insights' ? '/insights' : `/#${item.toLowerCase()}`} className="text-lg font-bold text-brand-dark hover:text-brand-orange transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange mb-8">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <Link to="/privacy" className="text-lg font-bold text-brand-dark hover:text-brand-orange transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange mb-8">Newsletter</h4>
            <p className="text-brand-dark/50 font-medium mb-8 text-lg">Stay updated with our latest research and reports.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="email@hmhlabz.com" 
                className="w-full bg-brand-dark/5 border border-brand-dark/5 rounded-2xl px-6 py-5 outline-none focus:border-brand-orange transition-all font-bold placeholder:text-brand-dark/20"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-brand-dark text-white px-6 rounded-xl font-bold hover:bg-brand-orange transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-dark/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-brand-dark/40 font-bold text-sm">
            © {new Date().getFullYear()} HMH Labz. Built for the frontier.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-brand-dark/60 font-black text-[10px] uppercase tracking-widest">System Status: Optimal</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
