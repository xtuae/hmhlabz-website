import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-brand-cream">
      {/* Background Grid Pattern - Cyber-Lab Style */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#161513 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-12 h-[1px] bg-brand-orange"></span>
              <span className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs">Pioneering Digital Excellence</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-[110px] font-bold tracking-[-0.04em] leading-[0.95] text-brand-dark mb-10"
            >
              Strategy + build, <br />
              <span className="italic font-serif text-brand-orange">in one team.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl md:text-2xl text-brand-dark/60 max-w-2xl leading-relaxed mb-12"
            >
              HMH Labz delivers high-performance software and strategic digital transformation for the world's most ambitious enterprises.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              <button className="group relative bg-brand-dark text-white px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:pr-14">
                <span className="relative z-10">Launch Your Vision</span>
                <ArrowUpRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </button>
              <button className="px-10 py-5 rounded-full border-2 border-brand-dark/10 font-bold text-lg hover:bg-brand-dark hover:text-white transition-all duration-300">
                Our Work
              </button>
            </motion.div>
          </div>

          {/* Abstract Grid Visual - Cyber-Lab Element */}
          <div className="lg:col-span-4 hidden lg:block relative">
            <div className="w-full aspect-square border border-brand-dark/5 rounded-[40px] p-8 rotate-3">
              <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-4">
                {[...Array(16)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + (i * 0.05) }}
                    className={`rounded-xl ${i === 5 || i === 10 ? 'bg-brand-orange' : 'bg-brand-dark/5'}`}
                  />
                ))}
              </div>
            </div>
            {/* Float Floating Tag */}
            <div className="absolute -bottom-6 -left-12 bg-white p-6 rounded-2xl shadow-2xl border border-brand-dark/5 animate-bounce-slow">
              <p className="text-brand-orange font-bold text-sm mb-1 uppercase tracking-tighter">Status: Active</p>
              <p className="text-brand-dark font-black text-xl">Lab System Online</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
