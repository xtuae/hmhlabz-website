import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import client from '../api/client';
import { Loader2 } from 'lucide-react';

const Contact = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({ 
    name: '', email: '', businessName: '', phone: '', employees: '', tier: '', message: '' 
  });
  const [submitStatus, setSubmitStatus] = useState(null); // 'loading', 'success', 'error'

  useEffect(() => {
    client.get('/pages/contact')
      .then(res => setData(res.data.content))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    try {
      await client.post('/leads/fit-call', formData);
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#C2410C]" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EA] text-[#161513] font-sans selection:bg-[#C2410C] selection:text-[#F4F1EA]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 md:pt-40 md:pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="mb-16 md:mb-24 max-w-3xl">
            <span className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-[#C2410C] mb-6 block">06 — Contact</span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#161513] mb-8">
              {data?.header?.title} <em className="font-serif italic font-normal text-[#C2410C]">{data?.header?.highlight}</em>
            </h1>
            <p className="text-xl text-[#161513]/65 font-light leading-relaxed">
              {data?.header?.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-[#EDE6D3] p-8 md:p-12 rounded-[2.5rem] border border-[#161513]/5 shadow-xl shadow-[#161513]/5">
              
              {submitStatus === 'success' ? (
                <div className="py-16 text-center">
                  <div className="w-24 h-24 rounded-full bg-[#C2410C]/10 flex items-center justify-center mx-auto mb-8 text-[#C2410C] text-4xl font-serif italic border border-[#C2410C]/20">✓</div>
                  <h3 className="text-3xl font-bold mb-4 text-[#161513] tracking-tight">Request Received.</h3>
                  <p className="text-[#161513]/60 text-lg max-w-sm mx-auto">We are reviewing your details and will reach out within 24 hours to schedule a fit call.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-[#161513]/50 block mb-2">Your Name</label>
                      <input required type="text" placeholder="Jane Doe" 
                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#F4F1EA] border border-[#161513]/10 rounded-xl p-4 font-bold text-[#161513] focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] transition-colors" />
                    </div>
                    <div>
                      <label className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-[#161513]/50 block mb-2">Work Email</label>
                      <input required type="email" placeholder="jane@company.com" 
                        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#F4F1EA] border border-[#161513]/10 rounded-xl p-4 font-bold text-[#161513] focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] transition-colors" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-[#161513]/50 block mb-2">Business Name</label>
                      <input required type="text" placeholder="Acme Corp" 
                        value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                        className="w-full bg-[#F4F1EA] border border-[#161513]/10 rounded-xl p-4 font-bold text-[#161513] focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] transition-colors" />
                    </div>
                    <div>
                      <label className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-[#161513]/50 block mb-2">Phone Number</label>
                      <input required type="tel" placeholder="+1 (555) 000-0000" 
                        value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-[#F4F1EA] border border-[#161513]/10 rounded-xl p-4 font-bold text-[#161513] focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] transition-colors" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-[#161513]/50 block mb-2">Company Size</label>
                      <select required value={formData.employees} onChange={(e) => setFormData({...formData, employees: e.target.value})}
                        className="w-full bg-[#F4F1EA] border border-[#161513]/10 rounded-xl p-4 font-bold text-[#161513] focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] cursor-pointer transition-colors appearance-none">
                        <option value="" disabled>Select size</option>
                        <option>1-10 Employees</option>
                        <option>11-50 Employees</option>
                        <option>51-200 Employees</option>
                        <option>201+ Employees</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-[#161513]/50 block mb-2">Engagement Interest</label>
                      <select required value={formData.tier} onChange={(e) => setFormData({...formData, tier: e.target.value})}
                        className="w-full bg-[#F4F1EA] border border-[#161513]/10 rounded-xl p-4 font-bold text-[#161513] focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] cursor-pointer transition-colors appearance-none">
                        <option value="" disabled>Select tier</option>
                        <option>Tier 01 · Opportunity Audit</option>
                        <option>Tier 02 · Implementation Sprint</option>
                        <option>Tier 03 · Digital Transformation</option>
                        <option>Just exploring</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-[#161513]/50 block mb-2">How can we help?</label>
                    <textarea required placeholder="Tell us about your current bottlenecks, the systems you use, and what you're trying to build..." 
                      value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-[#F4F1EA] border border-[#161513]/10 rounded-xl p-4 font-bold text-[#161513] focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] h-32 resize-y transition-colors"></textarea>
                  </div>

                  <button type="submit" disabled={submitStatus === 'loading'}
                    className="w-full mt-4 py-5 bg-[#C2410C] text-[#F4F1EA] rounded-full font-mono font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-[#C2410C]/20 hover:bg-[#9A330A] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50">
                    {submitStatus === 'loading' ? 'Sending...' : 'Submit Inquiry →'}
                  </button>
                  {submitStatus === 'error' && <p className="text-red-500 text-sm mt-2 text-center">Failed to send request. Please try again later.</p>}
                </form>
              )}
            </div>

            {/* Office Information */}
            <div className="lg:col-span-5 space-y-12">

              {data?.locations?.map((loc, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <hr className="border-[#161513]/10" />}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-serif text-3xl text-[#161513] mb-4">{loc.city} {idx === 0 ? 'Head Office' : 'Branch Office'}</h3>
                      <p className="text-lg text-[#161513]/70 leading-relaxed font-light whitespace-pre-line">
                        {loc.address}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 pt-2">
                      {loc.primaryPhone && (
                        <div>
                          <span className="font-mono uppercase tracking-[0.22em] text-[10px] font-semibold text-[#161513]/40 block mb-1">Primary Phone</span>
                          <a href={`tel:${loc.primaryPhone.replace(/[^\d+]/g, '')}`} className="text-base font-bold text-[#161513] hover:text-[#C2410C] transition-colors inline-block">{loc.primaryPhone}</a>
                        </div>
                      )}
                      {loc.secondaryPhone && (
                        <div>
                          <span className="font-mono uppercase tracking-[0.22em] text-[10px] font-semibold text-[#161513]/40 block mb-1">Secondary Phone</span>
                          <a href={`tel:${loc.secondaryPhone.replace(/[^\d+]/g, '')}`} className="text-base font-bold text-[#161513] hover:text-[#C2410C] transition-colors inline-block">{loc.secondaryPhone}</a>
                        </div>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 pt-2">
                      {loc.primaryEmail && (
                        <div>
                          <span className="font-mono uppercase tracking-[0.22em] text-[10px] font-semibold text-[#161513]/40 block mb-1">Primary Email</span>
                          <a href={`mailto:${loc.primaryEmail}`} className="text-base font-bold text-[#161513] hover:text-[#C2410C] transition-colors inline-block border-b border-[#C2410C]/30 hover:border-[#C2410C] pb-0.5">{loc.primaryEmail}</a>
                        </div>
                      )}
                      {loc.secondaryEmail && (
                        <div>
                          <span className="font-mono uppercase tracking-[0.22em] text-[10px] font-semibold text-[#161513]/40 block mb-1">Secondary Email</span>
                          <a href={`mailto:${loc.secondaryEmail}`} className="text-base font-bold text-[#161513] hover:text-[#C2410C] transition-colors inline-block border-b border-[#C2410C]/30 hover:border-[#C2410C] pb-0.5">{loc.secondaryEmail}</a>
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
