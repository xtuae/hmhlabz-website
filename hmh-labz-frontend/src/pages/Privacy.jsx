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

const Privacy = () => (
  <LegalLayout title="Privacy Policy">
    <p className="text-xl text-slate-400 mb-8">Effective Date: May 12, 2026</p>
    <h2>1. Information We Collect</h2>
    <p>We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.</p>
    <h2>2. How We Use Your Information</h2>
    <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect HMH Labz and our users.</p>
    <h2>3. Data Security</h2>
    <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
    {/* Additional privacy content */}
  </LegalLayout>
);

export default Privacy;
