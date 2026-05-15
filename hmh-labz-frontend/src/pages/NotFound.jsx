import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import SEO from '../components/seo/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-sans">
      <SEO title="404 - Sector Not Found" />
      
      <div className="max-w-xl w-full text-center space-y-8 relative">
        {/* Background Glitch Effect */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 w-48 h-48 bg-blue-500 rounded-full animate-pulse delay-700"></div>
        </div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500 mb-4"
        >
          <AlertTriangle size={48} className="animate-bounce" />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
            404<span className="text-[#c84b21]">.</span>
          </h1>
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#00ff00] font-mono uppercase tracking-[0.3em]">
              Sector Not Found
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-medium max-w-sm mx-auto leading-relaxed">
              The coordinates you provided do not correspond to any registered lab sector.
            </p>
          </div>
        </div>

        <div className="pt-8">
          <Link 
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-[#00ff00]/10 hover:border-[#00ff00]/30 hover:text-[#00ff00] transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Return to Command Center
          </Link>
        </div>

        {/* Console Log Decoration */}
        <div className="pt-12 text-left opacity-20 hidden md:block">
          <div className="font-mono text-[8px] uppercase tracking-widest text-gray-500 space-y-1">
            <p>&gt; RUNNING SECTOR_SCAN...</p>
            <p>&gt; ERROR: NULL_REFERENCE_EXCEPTION</p>
            <p>&gt; AT PATH: {window.location.pathname}</p>
            <p>&gt; REDIRECTING_TO_STABLE_NODE...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
