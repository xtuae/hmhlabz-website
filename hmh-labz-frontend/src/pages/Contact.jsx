import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import client from '../api/client';
import { Loader2 } from 'lucide-react';

const Contact = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    client.get('/pages/contact')
      .then(res => setData(res.data.content.contact))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    try {
      await client.post('/leads/contact', formData);
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-paper flex items-center justify-center">
      <Loader2 className="animate-spin text-terra" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-paper font-sans selection:bg-terra selection:text-paper">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-10 lg:px-14 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Directory */}
          <div className="space-y-16">
            <header className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-ink uppercase">
                {data?.header?.title} <span className="text-terra italic font-serif lowercase">{data?.header?.highlight}</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-ink/70 max-w-md">
                {data?.header?.description}
              </p>
            </header>

            <div className="space-y-10">
              {data?.locations?.map((loc, idx) => (
                <div key={idx} className="border-b border-ink/20 pb-8 space-y-4">
                  <p className="font-mono text-[10px] font-black uppercase tracking-widest text-terra">{'//'} OFFICE : {loc.city}</p>
                  <h3 className="text-2xl font-black uppercase text-ink">{loc.city}</h3>
                  <div className="space-y-1 font-mono text-xs text-ink/60">
                    <p>{loc.address}</p>
                    <p>{loc.phone}</p>
                    <p>{loc.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white border border-ink/10 p-8 md:p-12 space-y-8 rounded-[2rem] shadow-xl shadow-ink/5">
              <div className="space-y-6">
                <input 
                  type="text" 
                  placeholder="NAME"
                  required
                  className="w-full bg-transparent border-b border-ink/20 py-4 font-mono text-sm placeholder:text-ink/40 focus:outline-none focus:border-terra transition-colors rounded-none"
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="EMAIL"
                  required
                  className="w-full bg-transparent border-b border-ink/20 py-4 font-mono text-sm placeholder:text-ink/40 focus:outline-none focus:border-terra transition-colors rounded-none"
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="SUBJECT"
                  required
                  className="w-full bg-transparent border-b border-ink/20 py-4 font-mono text-sm placeholder:text-ink/40 focus:outline-none focus:border-terra transition-colors rounded-none"
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                />
                <textarea 
                  placeholder="MESSAGE"
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-ink/20 py-4 font-mono text-sm placeholder:text-ink/40 focus:outline-none focus:border-terra transition-colors resize-none rounded-none"
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-ink text-paper py-5 px-8 flex items-center justify-between font-mono font-bold text-xs uppercase tracking-[0.2em] hover:bg-terra transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{submitStatus === 'loading' ? 'Sending...' : 'Send Message'}</span>
                <span>→</span>
              </button>
              
              {submitStatus === 'success' && (
                <p className="font-mono text-xs text-green-600 uppercase tracking-widest text-center mt-4">Message sent successfully.</p>
              )}
            </form>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
