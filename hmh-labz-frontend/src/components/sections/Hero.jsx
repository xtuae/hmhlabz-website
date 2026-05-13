import { motion } from 'framer-motion';
import heroImg from '../../assets/hero-bg.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-paper">
      {/* Background Texture/Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img src={heroImg} alt="" className="w-full h-full object-cover mix-blend-multiply" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 w-full py-20">
        <div className="max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-terra">Operational Excellence</span>
            <div className="h-[1px] w-20 bg-brand-terra/30"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-7xl md:text-[140px] font-black tracking-[-0.05em] leading-[0.85] text-brand-ink mb-12"
          >
            Strategy <span className="text-brand-terra">+</span> <br />
            <span className="font-serif italic font-normal">build.</span>
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-2xl text-brand-ink/70 leading-tight font-medium max-w-md"
            >
              We bridge the gap between high-level roadmaps and technical implementation for the world's most ambitious teams.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <button className="bg-brand-terra text-white px-10 py-5 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-2xl shadow-brand-terra/20">
                  Initialize Project
                </button>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-ink/40">Status</span>
                  <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    System Online
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Grid Element */}
        <div className="absolute bottom-10 right-10 hidden lg:block">
          <div className="grid grid-cols-4 gap-2 opacity-10">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-8 h-8 border border-brand-ink"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
