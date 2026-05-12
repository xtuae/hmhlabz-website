import Hero from '../components/sections/Hero';
import { motion } from 'framer-motion';
import { Code, Globe, Database, Smartphone, Shield, Zap } from 'lucide-react';

const Home = () => {
  const services = [
    { title: 'Custom Software', icon: Code, desc: 'Tailored enterprise solutions built with modern tech stacks.' },
    { title: 'Cloud Infrastructure', icon: Database, desc: 'Scalable, secure, and resilient cloud architecture design.' },
    { title: 'Mobile Development', icon: Smartphone, desc: 'Premium iOS and Android experiences with React Native.' },
    { title: 'Cybersecurity', icon: Shield, desc: 'Comprehensive security audits and threat mitigation.' },
    { title: 'Web Platforms', icon: Globe, desc: 'High-performance SPAs and complex web ecosystems.' },
    { title: 'AI & Data', icon: Zap, desc: 'Intelligent automation and advanced data analytics.' },
  ];

  return (
    <div>
      <Hero />

      {/* Services Section */}
      <section id="services" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Our <span className="gradient-text">Core Capabilities</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We combine technical depth with strategic vision to solve your most complex digital challenges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-surface border border-white/5 hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Preview */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 translate-y-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="glass rounded-[40px] p-12 md:p-20 text-center">
            <h2 className="text-5xl font-bold mb-8">Ready to <span className="gradient-text">Transform</span> Your Business?</h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Join dozens of forward-thinking companies who have accelerated their growth with HMH Labz.
            </p>
            <button className="btn-primary text-lg px-10 py-5">
              Let's Start a Conversation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
