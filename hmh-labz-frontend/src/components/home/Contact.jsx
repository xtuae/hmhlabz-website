import React, { useState } from 'react';
import Reveal from '../ui/Reveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    phone: '',
    employees: '',
    tier: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submission:', formData);
    // Future API integration here
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="bg-cream border-y border-ink/10 px-6 md:px-10 lg:px-14 py-32 sm:py-40">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="font-sans font-bold leading-[1.04] tracking-[-0.03em] text-ink" style={{ fontSize: "clamp(42px, 6.8vw, 96px)" }}>
            Not sure if your business is<br /><em className="font-serif italic font-normal not-italic text-terra" style={{ fontStyle: 'italic' }}>ready?</em>
          </h2>
          <p className="mt-10 max-w-[52ch] mx-auto text-ink/65 text-[17px] sm:text-[19px] leading-[1.6]">
            That's exactly what the Fit Call is for. 20 minutes. No deck. No pitch. Just a clear answer about whether AI or digital systems would actually move the needle for a business like yours.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-16">
          {!submitted ? (
            <div className="bg-paper rounded-[2.5rem] p-8 sm:p-12 shadow-xl text-left max-w-2xl mx-auto border border-ink/5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input 
                    required 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name" 
                    className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl outline-none focus:border-terra text-ink" 
                  />
                  <input 
                    required 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email" 
                    className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl focus:border-terra text-ink" 
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input 
                    required 
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Business Name" 
                    className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl focus:border-terra text-ink" 
                  />
                  <input 
                    required 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone No" 
                    type="tel" 
                    className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl focus:border-terra text-ink" 
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <select 
                    required 
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl focus:border-terra text-ink cursor-pointer"
                  >
                    <option value="" disabled>No. of Employees</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                  </select>
                  <select 
                    required 
                    name="tier"
                    value={formData.tier}
                    onChange={handleChange}
                    className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl focus:border-terra text-ink cursor-pointer"
                  >
                    <option value="" disabled>Tier looking for</option>
                    <option value="Tier 01">Tier 01 · Wedge</option>
                    <option value="Tier 02">Tier 02 · Build</option>
                    <option value="Tier 03">Tier 03 · Flagship</option>
                  </select>
                </div>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Anything else we should know?" 
                  className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl focus:border-terra h-24 resize-none text-ink" 
                />
                <button type="submit" className="w-full py-5 bg-terra text-paper rounded-full font-mono font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-terra/20 hover:bg-terra-deep transition-all">
                  Request Fit Call →
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-paper rounded-[2.5rem] p-12 sm:p-20 shadow-xl text-center max-w-2xl mx-auto border border-ink/5">
              <div className="w-20 h-20 rounded-full bg-terra/10 border-2 border-terra flex items-center justify-center mx-auto mb-8 text-terra text-3xl">✓</div>
              <h3 className="text-3xl font-bold mb-4 text-ink">Request Sent</h3>
              <p className="text-ink/50 text-lg">We'll reach out within 24 hours.</p>
            </div>
          )}
        </Reveal>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/45">No sales pitch.</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/45">Just reality.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
