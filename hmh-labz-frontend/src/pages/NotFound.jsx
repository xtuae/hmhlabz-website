import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/ui/Reveal';
import SEO from '../components/seo/SEO';

const NotFound = () => {
  return (
    <div className="bg-paper selection:bg-terra selection:text-paper min-h-screen flex flex-col relative">
      <SEO 
        title="404 Not Found — HMH Labz"
        description="The page you are looking for has been moved, deleted, or never existed in the first place."
      />
      
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6 md:px-12 text-center">
        <Reveal className="max-w-3xl mx-auto w-full">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-terra mb-8 block">
            Error 404
          </span>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] text-ink mb-10">
            Page not <br className="hidden sm:block" /> <em className="font-serif italic font-normal text-terra">found.</em>
          </h1>

          <p className="text-xl md:text-2xl text-ink/60 font-light leading-relaxed mb-14 max-w-xl mx-auto">
            The page you are looking for has been moved, deleted, or never existed in the first place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/"
              className="inline-block px-10 py-5 bg-terra text-paper rounded-full font-mono font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-terra/20 hover:bg-terra-deep hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Return to Homepage →
            </Link>
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
