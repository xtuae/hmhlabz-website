import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-semibold mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Pioneering Digital Innovation</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
          >
            Empowering <br />
            <span className="gradient-text">Future-Ready</span> <br />
            Enterprises
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed"
          >
            HMH Labz delivers cutting-edge software solutions, strategic digital transformation, and advanced analytics to help your business dominate the modern economy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            <button className="btn-primary flex items-center gap-2">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all font-semibold">
              View Case Studies
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hero Visual Element (Abstract Grid) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 opacity-20 hidden lg:block">
        <div className="w-full h-full border border-primary/20 rotate-12 grid grid-cols-6 grid-rows-6">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border border-primary/10 hover:bg-primary/20 transition-colors" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
