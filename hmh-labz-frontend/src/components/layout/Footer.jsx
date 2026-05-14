import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ink text-paper/65 px-6 py-28 relative z-10 text-left">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 sm:gap-16 pb-20 border-b border-paper/10">
          <div className="md:col-span-6">
            <Link to="/" className="block mb-8">
              <img src="https://www.hmhlabz.com/wp-content/uploads/hmh-icon.webp" alt="HMH Labz" className="h-10 w-auto invert brightness-0" />
            </Link>
            <p className="font-serif italic text-paper/40 leading-relaxed max-w-sm text-xl text-left">
              Strategy + build, in one team. We tell you what to do, then we ship it.
            </p>
          </div>
          <div className="md:col-span-3 text-left">
            <h5 className="font-mono uppercase text-xs font-bold text-terra mb-8">Approach</h5>
            <ul className="space-y-4 text-sm text-paper/85">
              <li><Link to="/#approach" className="hover:text-terra transition-colors">Diagnose</Link></li>
              <li><Link to="/#approach" className="hover:text-terra transition-colors">Recommend</Link></li>
              <li><Link to="/#approach" className="hover:text-terra transition-colors">Ship</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3 text-left">
            <h5 className="font-mono uppercase text-xs font-bold text-terra mb-8">Contact</h5>
            <ul className="space-y-4 text-sm text-paper/85">
              <li><a href="mailto:hello@hmhlabz.com" className="hover:text-terra transition-colors">hello@hmhlabz.com</a></li>
              <li><button className="hover:text-terra transition-colors text-left">Book Fit Call</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-mono text-[10px] uppercase text-paper/40">© 2026 HMH LABZ</p>
          <span className="font-mono text-[10px] uppercase text-paper/40">Operating 100% Remote</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
