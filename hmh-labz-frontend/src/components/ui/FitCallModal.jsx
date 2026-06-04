import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, ChevronDown } from 'lucide-react';
import api from '../../api/client';
import localLogo from '../../assets/logo.png';

const FitCallModal = ({ isOpen, onClose, selectedTier }) => {
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

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        businessName: '',
        phone: '',
        employees: '',
        tier: selectedTier || 'General Inquiry',
        message: ''
      });
      setSent(false);
      setError(null);
    }
  }, [isOpen, selectedTier]);

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
        company: formData.businessName // Map to HubSpot expectation
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 text-left overflow-y-auto">
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
            className="relative w-full max-w-4xl bg-[#161616] rounded-2xl shadow-2xl overflow-hidden border border-white/10 my-8"
          >
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 z-50 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              <X size={16} />
            </button>

            {/* Split Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5">
              
              {/* Left Column: Branding & Info */}
              <div className="md:col-span-2 bg-white/[0.02] border-b border-white/10 md:border-b-0 md:border-r border-white/10 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <img src={localLogo} alt="HMH Labz" className="h-8 w-auto mb-8 invert brightness-0" />
                  <h3 className="text-white text-2xl font-bold mb-2">Book a Fit Call</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    Let's discuss if AI ops is the right move for your business now.
                  </p>
                  <ul className="space-y-3 my-8 text-sm text-white/80 font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-terra text-base">✓</span> 20 Minutes
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-terra text-base">✓</span> No Pitch
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-terra text-base">✓</span> No Deck
                    </li>
                  </ul>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-8 md:mt-0">
                  hello@hmhlabz.com
                </div>
              </div>

              {/* Right Column: Form / Success screen */}
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                {!sent ? (
                  <>
                    <div className="mb-6">
                      <span className="text-terra tracking-widest text-xs uppercase font-mono block mb-2">FIT CALL</span>
                      <h3 className="text-white font-bold text-3xl leading-tight tracking-tight">Schedule your session</h3>
                    </div>
                    
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                      <input 
                        required 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name" 
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-terra transition-colors" 
                      />
                      <input 
                        required 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Work Email" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-terra transition-colors" 
                      />
                      <input 
                        required 
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Company Name" 
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-terra transition-colors" 
                      />
                      <input 
                        required 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number" 
                        type="tel" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-terra transition-colors" 
                      />
                      
                      <div className="relative">
                        <select 
                          required 
                          name="employees"
                          value={formData.employees}
                          onChange={handleChange}
                          className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder-white/40 focus:outline-none focus:border-terra transition-colors appearance-none cursor-pointer ${formData.employees === '' ? 'text-white/40' : 'text-white'}`}
                        >
                          <option value="" disabled className="bg-[#161616] text-white/40">No. of Employees</option>
                          <option value="1-10" className="bg-[#161616] text-white">1-10</option>
                          <option value="11-50" className="bg-[#161616] text-white">11-50</option>
                          <option value="51-200" className="bg-[#161616] text-white">51-200</option>
                          <option value="200+" className="bg-[#161616] text-white">200+</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/40">
                          <ChevronDown size={16} />
                        </div>
                      </div>

                      <div className="relative">
                        <select 
                          required 
                          name="tier"
                          value={formData.tier}
                          onChange={handleChange}
                          className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder-white/40 focus:outline-none focus:border-terra transition-colors appearance-none cursor-pointer ${formData.tier === '' ? 'text-white/40' : 'text-white'}`}
                        >
                          <option value="Tier 01 · Wedge" className="bg-[#161616] text-white">Tier 01 · Wedge</option>
                          <option value="Tier 02 · Build" className="bg-[#161616] text-white">Tier 02 · Build</option>
                          <option value="Tier 03 · Flagship" className="bg-[#161616] text-white">Tier 03 · Flagship</option>
                          <option value="General Inquiry" className="bg-[#161616] text-white">General Inquiry</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/40">
                          <ChevronDown size={16} />
                        </div>
                      </div>

                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Anything else we should know?" 
                        style={{ minHeight: '100px' }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-terra transition-colors col-span-1 sm:col-span-2 resize-none" 
                      />
                      
                      {error && (
                        <p className="col-span-1 sm:col-span-2 text-terra text-xs font-bold text-center italic">{error}</p>
                      )}

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="col-span-1 sm:col-span-2 w-full bg-terra hover:bg-terra-deep text-white py-4 rounded-full font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Transmitting...
                          </>
                        ) : (
                          'REQUEST FIT CALL →'
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-10 animate-in fade-in zoom-in duration-500 text-white">
                    <div className="w-20 h-20 rounded-full bg-terra/10 border-2 border-terra flex items-center justify-center mx-auto mb-6 text-terra">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black mb-3 text-white tracking-tight">Request Sent</h3>
                    <p className="text-white/60 text-base font-medium leading-relaxed max-w-[28ch] mx-auto">
                      The diagnostics are underway.<br />We'll reach out within 24 hours.
                    </p>
                    <button 
                      onClick={onClose}
                      className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-terra hover:underline focus:outline-none"
                    >
                      Close Terminal
                    </button>
                  </div>
                )}
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FitCallModal;
