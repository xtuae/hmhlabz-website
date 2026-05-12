import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-brand-dark text-brand-cream relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-sm font-black tracking-[0.3em] uppercase text-brand-orange mb-8">Ready to Scale?</h2>
            <h3 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.9]">
              Let's build <br />
              <span className="italic font-serif text-brand-orange">something.</span>
            </h3>
            
            <div className="space-y-8 mt-16">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Mail className="text-brand-orange" size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Email</p>
                  <p className="text-xl font-bold">hello@hmhlabz.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <MapPin className="text-brand-orange" size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Location</p>
                  <p className="text-xl font-bold">Strategy Hub, New York</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 md:p-12"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-orange transition-all placeholder:text-white/20 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-orange transition-all placeholder:text-white/20 font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Message</label>
                <textarea rows="4" placeholder="Tell us about your project..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-orange transition-all placeholder:text-white/20 font-bold resize-none"></textarea>
              </div>
              <button className="w-full bg-brand-orange text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-500 flex items-center justify-center gap-3 group">
                Initialize Connection <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
