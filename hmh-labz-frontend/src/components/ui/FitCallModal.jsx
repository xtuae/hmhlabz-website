import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import api from '../../api/client';
import MonoLabel from './MonoLabel';

const FitCallModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    phone: '',
    employees: '',
    tier: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await api.post('/leads/fit-call', {
        ...formData,
        company: formData.businessName // Map to HubSpot expectation if needed
      });
      setSent(true);
    } catch (err) {
      console.error('Lead submission error:', err);
      setError('Failed to transmit lead. Please try again or email hello@hmhlabz.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 text-left">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-ink/95 backdrop-blur-xl" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-paper rounded-[2.5rem] p-8 sm:p-14 shadow-2xl overflow-hidden border border-white/5"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-2xl text-ink/30 hover:text-ink transition-colors focus:outline-none">
              <X size={24} />
            </button>

            {!sent ? (
              <>
                <MonoLabel color="terra">Fit Call</MonoLabel>
                <h3 className="text-3xl font-bold mt-4 mb-10 text-ink leading-tight tracking-tight">Schedule your session</h3>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input 
                      required 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name" 
                      className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl outline-none focus:border-terra text-ink font-medium" 
                    />
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email" 
                      className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl focus:border-terra text-ink font-medium" 
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input 
                      required 
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Business Name" 
                      className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl focus:border-terra text-ink font-medium" 
                    />
                    <input 
                      required 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone No" 
                      type="tel" 
                      className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl focus:border-terra text-ink font-medium" 
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <select 
                      required 
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                      className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl focus:border-terra text-ink cursor-pointer font-medium"
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
                      className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl focus:border-terra text-ink cursor-pointer font-medium"
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
                    className="w-full bg-ink/5 border border-ink/10 p-4 rounded-xl focus:border-terra h-24 resize-none text-ink font-medium" 
                  />
                  
                  {error && (
                    <p className="text-terra text-xs font-bold text-center italic">{error}</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-terra text-paper rounded-full font-mono font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-terra/20 hover:bg-terra-deep transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      'Request Fit Call →'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 rounded-full bg-terra/10 border-2 border-terra flex items-center justify-center mx-auto mb-8 text-terra">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black mb-4 text-ink tracking-tight">Request Sent</h3>
                <p className="text-ink/50 text-lg font-medium leading-relaxed">
                  The diagnostics are underway.<br />We'll reach out within 24 hours.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-10 text-[10px] font-black uppercase tracking-[0.2em] text-terra hover:underline"
                >
                  Close Terminal
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FitCallModal;
