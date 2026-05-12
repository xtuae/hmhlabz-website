import { motion } from 'framer-motion';
import { Database, Code, ShieldCheck, Globe, Cpu, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    { title: 'Custom Software', icon: Code, desc: 'Enterprise-grade applications architected for scale and performance.' },
    { title: 'Cloud Solutions', icon: Database, desc: 'Resilient cloud infrastructure with seamless migration and management.' },
    { title: 'Cyber Security', icon: ShieldCheck, desc: 'Advanced threat protection and comprehensive security architecture.' },
    { title: 'Web Platforms', icon: Globe, desc: 'High-conversion digital experiences built on modern frameworks.' },
    { title: 'AI Integration', icon: Cpu, desc: 'Intelligent automation and data-driven insights for competitive edge.' },
    { title: 'Performance Optimization', icon: Zap, desc: 'Audit and acceleration of existing systems for peak efficiency.' },
  ];

  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-sm font-black tracking-[0.3em] uppercase text-brand-orange mb-6">Core Capabilities</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-brand-dark leading-[0.95]">
              Modular solutions for <br />
              <span className="text-brand-dark/20">complex challenges.</span>
            </h3>
          </div>
          <div className="pb-2">
            <p className="text-brand-dark/60 text-lg max-w-[300px] font-medium italic">
              "Building the future requires a balance of stability and speed."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-cream flex items-center justify-center mb-8 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                <service.icon size={32} />
              </div>
              <h4 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight group-hover:text-brand-orange transition-colors">
                {service.title}
              </h4>
              <div className="h-[1px] w-full bg-brand-dark/5 mb-6"></div>
              <p className="text-brand-dark/50 leading-relaxed font-medium">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
