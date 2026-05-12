import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="px-6 py-24 md:py-40 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6 inline-block">
            Next Generation Digital Solutions
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Innovate with <span className="gradient-text">Precision</span> <br />
            Elevate your <span className="gradient-text">Brand</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            We build state-of-the-art digital experiences that combine stunning aesthetics with high-performance backend architecture.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-premium flex items-center gap-2 text-lg">
              Get Started <ArrowRight size={20} />
            </button>
            <button className="px-8 py-3 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors text-lg">
              View Our Work
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="text-indigo-400" />}
              title="Lightning Fast"
              description="Optimized for performance and speed, ensuring your users never have to wait."
            />
            <FeatureCard 
              icon={<Shield className="text-purple-400" />}
              title="Secure by Design"
              description="Enterprise-grade security built into every layer of your application."
            />
            <FeatureCard 
              icon={<Globe className="text-blue-400" />}
              title="Global Scale"
              description="Architecture designed to grow with your business across the globe."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-3xl glass"
  >
    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </motion.div>
);

export default Home;
