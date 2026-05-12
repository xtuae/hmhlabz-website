const LegalLayout = ({ title, children }) => (
  <div className="pt-32 pb-24 min-h-screen">
    <div className="max-w-4xl mx-auto px-6">
      <h1 className="text-5xl font-bold mb-12">{title}</h1>
      <div className="prose prose-invert max-w-none prose-slate">
        {children}
      </div>
    </div>
  </div>
);

const Terms = () => (
  <LegalLayout title="Terms of Service">
    <p className="text-xl text-slate-400 mb-8">Effective Date: May 12, 2026</p>
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing and using HMH Labz, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
    <h2>2. Use License</h2>
    <p>Permission is granted to temporarily download one copy of the materials on HMH Labz's website for personal, non-commercial transitory viewing only.</p>
    <h2>3. Disclaimer</h2>
    <p>The materials on HMH Labz's website are provided on an 'as is' basis. HMH Labz makes no warranties, expressed or implied.</p>
    {/* Additional terms content */}
  </LegalLayout>
);

export default Terms;
