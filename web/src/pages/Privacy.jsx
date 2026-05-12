import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto pb-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-4xl font-bold mb-12">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
          <p>Last updated: May 12, 2026</p>
          <p>At HMH Labz, we take your privacy seriously. This policy describes how we collect, use, and protect your information.</p>
          <h2 className="text-2xl font-semibold text-white mt-8">Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account or contact us for support.</p>
          {/* Add more content as needed */}
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
