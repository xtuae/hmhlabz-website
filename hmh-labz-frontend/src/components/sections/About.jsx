import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-32 bg-brand-cream relative overflow-hidden">
      {/* Decorative vertical border */}
      <div className="absolute top-0 right-[20%] bottom-0 w-[1px] bg-brand-dark/5 hidden lg:block"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-brand-dark rounded-[60px] overflow-hidden rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
                alt="Strategy meeting"
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* Overlaying card */}
            <div className="absolute -bottom-10 -right-10 bg-brand-orange p-10 rounded-[40px] shadow-2xl text-white max-w-sm hidden md:block">
              <h4 className="text-3xl font-black tracking-tighter mb-4 leading-tight">We build what others only map out.</h4>
              <p className="font-medium text-white/80">Our methodology bridges the gap between high-level strategy and technical execution.</p>
            </div>
          </motion.div>

          <div>
            <h2 className="text-sm font-black tracking-[0.3em] uppercase text-brand-orange mb-8">Our Philosophy</h2>
            <h3 className="text-5xl md:text-8xl font-bold tracking-tighter text-brand-dark mb-10 leading-[0.9]">
              Strategy <br />
              <span className="text-brand-dark/20">& Production.</span>
            </h3>
            <div className="space-y-6 text-xl text-brand-dark/60 font-medium leading-relaxed">
              <p>
                At HMH Labz, we don't believe in the separation of strategy and build. We've seen too many brilliant roadmaps fail in production and too many engineering marvels build the wrong thing.
              </p>
              <p>
                We operate as a single unit—a laboratory where designers, strategists, and engineers collaborate in real-time to solve the most difficult digital problems facing modern industry.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12 mt-16">
              <div>
                <p className="text-5xl font-black text-brand-dark mb-2">98%</p>
                <p className="text-xs font-black uppercase tracking-widest text-brand-orange">Project Retention</p>
              </div>
              <div>
                <p className="text-5xl font-black text-brand-dark mb-2">12+</p>
                <p className="text-xs font-black uppercase tracking-widest text-brand-orange">Industry Verticals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
