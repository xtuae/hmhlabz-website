import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto pb-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-4xl font-bold mb-12">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
          <p>Last updated: May 12, 2026</p>
          <p>By using our services, you agree to these terms. Please read them carefully.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Acceptance of Terms</h2>
          <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use.</p>
          {/* Add more content as needed */}
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
