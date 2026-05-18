import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  Globe, 
  Layout, 
  Info, 
  AlertCircle, 
  Loader2, 
  CheckCircle2,
  Type,
  Hash,
  MousePointer2,
  ChevronDown,
  Layers,
  Sparkles,
  Timer,
  MapPin
} from 'lucide-react';
import client from '../api/client';

const SectionWrapper = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-8 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#c84b21]/5 rounded-xl text-[#c84b21]">
            <Icon size={20} />
          </div>
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={20} className="text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-black/5"
          >
            <div className="p-10 space-y-8">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Pages = () => {
  const [activePage, setActivePage] = useState('homepage');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  
  const initialContent = {
    hero: { title: "Strategy + build,", highlight: "in one team.", description: "We tell you what to do, then we ship it...", stats: [
      { prefix: "", number: "84", suffix: "%", desc: "average reduction in manual workflow time" },
      { prefix: "$", number: "2.4", suffix: "M", desc: "unlocked across client engagements" },
      { prefix: "", number: "2-12", suffix: "weeks", desc: "from first diagnostic to shipped systems" }
    ]},
    approach: { title: "Most studios talk. Most consultants", highlight: "vanish.", description: "One linear process...", steps: [
      { title: "Find what's actually broken.", desc: "We map your workflows..." },
      { title: "Score the highest-ROI fix.", desc: "Every opportunity gets a clear number..." },
      { title: "Build the system that solves it.", desc: "Custom platforms, client portals..." }
    ]},
    howWeWork: { title: "Three ways we work", highlight: "with you.", description: "Each engagement stands alone.", tiers: [
      { title: "AI Opportunity Audit", desc: "Clarity, before commitment.", timeline: "2-12 wks", shape: "Fixed fee", walkAway: "A prioritised list..." },
      { title: "Implementation Sprint", desc: "Shipping the roadmap.", timeline: "4-12 wks", shape: "Fixed fee", walkAway: "A live, fully operational system." },
      { title: "Embedded Studio", desc: "Your dedicated build team.", timeline: "Ongoing", shape: "Monthly", walkAway: "Continuous operational transformation." }
    ]},
    whyHmhLabz: { title: "Strategy and build", highlight: "in the same team.", description: "Four principles we hold to...", principles: [
      { title: "We don't pitch from a template.", desc: "Every engagement starts with diagnosis." },
      { title: "Strategy and build live in the same team.", desc: "The person who recommends the system is responsible for shipping it." },
      { title: "We tell you when AI is the wrong answer.", desc: "Often the highest-ROI move is a process fix." },
      { title: "Built for the long term.", desc: "We document, we hand over." }
    ]},
    costOfWaiting: { title: "Every hour you spend doing it", highlight: "doesn't grow.", manualLabel: "manually", middleText: "is an hour your business", quote: "It's all in someone's head is the most expensive sentence in your business." },
    cta: { title: "Ready to", highlight: "stop waiting?", description: "Let's build the system your team actually needs.", buttonText: "Book a 20-min Fit Call →" },
    about: {
      hero: { title: "About", highlight: "HMH Labz", description: "Strategy + build, in one team." },
      story: { heading: "Our Origins", text: "We started with a simple observation: most service businesses are drowning in manual work." },
      team: { heading: "The Operators", members: [
        { name: "Haj Akif", role: "Strategy", bio: "Ex-consultant turned builder." }
      ]}
    },
    contact: {
      header: { title: "Initiate", highlight: "contact.", description: "Reach out to discuss how we can transform your operations." },
      locations: [
        { city: "Chennai", address: "Tech Park, Taramani", phone: "+91 98765 43210", email: "chennai@hmhlabz.com" },
        { city: "Dubai", address: "Dubai Internet City", phone: "+971 50 123 4567", email: "dubai@hmhlabz.com" }
      ]
    }
  };

  const [formData, setFormData] = useState({
    title: '',
    metaDescription: '',
    content: initialContent
  });

  const pages = [
    { id: 'homepage', name: 'Homepage', slug: 'home', icon: Layout },
    { id: 'about', name: 'About Page', slug: 'about', icon: Info },
    { id: 'contact', name: 'Contact Page', slug: 'contact', icon: MapPin },
    { id: 'privacy-policy', name: 'Privacy Policy', slug: 'privacy-policy', icon: Hash },
    { id: 'terms-of-service', name: 'Terms of Service', slug: 'terms-of-service', icon: Hash },
    { id: 'cookie-policy', name: 'Cookie Policy', slug: 'cookie-policy', icon: Hash },
  ];

  useEffect(() => {
    fetchPageData();
  }, [activePage]);

  const fetchPageData = async () => {
    setLoading(true);
    setMessage(null);
    const slug = pages.find(p => p.id === activePage).slug;
    try {
      const response = await client.get(`/pages/${slug}`);
      const data = response.data;
      setFormData({
        title: data.title || '',
        metaDescription: data.metaDescription || '',
        content: data.content || initialContent
      });
    } catch (err) {
      console.error('Failed to fetch page data:', err);
      setFormData({ title: '', metaDescription: '', content: initialContent });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const slug = pages.find(p => p.id === activePage).slug;
    try {
      await client.put(`/pages/${slug}`, formData);
      setMessage({ type: 'success', text: 'Section data synchronized successfully.' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Failed to save page data:', err);
      setMessage({ type: 'error', text: 'Failed to save changes.' });
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (section, updates) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: { ...prev.content[section], ...updates }
      }
    }));
  };

  const updateNestedList = (section, listKey, index, updates) => {
    setFormData(prev => {
      const newList = [...prev.content[section][listKey]];
      newList[index] = { ...newList[index], ...updates };
      return {
        ...prev,
        content: {
          ...prev.content,
          [section]: { ...prev.content[section], [listKey]: newList }
        }
      };
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      <aside className="w-full lg:w-72 shrink-0 space-y-2 sticky top-28">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 ml-4">Architecture</h3>
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePage(p.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
              activePage === p.id 
                ? 'bg-[#1a1a1a] text-white shadow-xl shadow-black/10 scale-[1.02]' 
                : 'bg-white/50 text-gray-500 hover:bg-white hover:text-[#1a1a1a] border border-black/5'
            }`}
          >
            <p.icon size={18} />
            {p.name}
          </button>
        ))}
        <div className="mt-12 p-6 bg-[#c84b21]/5 rounded-[2rem] border border-[#c84b21]/10">
          <p className="text-[11px] text-[#1a1a1a]/60 leading-relaxed font-medium">
            This module uses Structured Content. Editing is restricted to maintain design integrity.
          </p>
        </div>
      </aside>

      <main className="flex-grow space-y-6 w-full max-w-4xl pb-20">
        {loading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white rounded-[3rem] border border-black/5">
            <Loader2 className="animate-spin text-[#c84b21] mb-4" size={32} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
              <h2 className="text-3xl font-black tracking-tighter">
                Editing <span className="font-serif italic text-[#c84b21]">{pages.find(p => p.id === activePage)?.name}</span>
              </h2>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-[#1a1a1a] text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#c84b21] transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/10 disabled:opacity-50"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {message && (
              <div className={`mx-4 p-4 rounded-2xl border flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span className="text-xs font-bold uppercase tracking-widest">{message.text}</span>
              </div>
            )}

            <SectionWrapper title="SEO & Meta" icon={Globe} defaultOpen>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Meta Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Meta Description</label>
                  <textarea value={formData.metaDescription} onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm h-24 resize-none" />
                </div>
              </div>
            </SectionWrapper>

            {activePage === 'homepage' && (
              <>
                <SectionWrapper title="Hero & Metrics" icon={Sparkles}>
                  <div className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Main Title</label>
                        <input type="text" value={formData.content.hero.title} onChange={(e) => updateSection('hero', { title: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Highlight (Orange)</label>
                        <input type="text" value={formData.content.hero.highlight} onChange={(e) => updateSection('hero', { highlight: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                      <textarea value={formData.content.hero.description} onChange={(e) => updateSection('hero', { description: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm h-24 resize-none" />
                    </div>

                    <div className="pt-6 border-t border-black/5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 block mb-6">Metrics Cards (3)</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {formData.content.hero.stats.map((stat, i) => (
                          <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-black/5 space-y-3">
                            <div className="grid grid-cols-3 gap-2">
                              <input type="text" placeholder="Prefix" value={stat.prefix} onChange={(e) => updateNestedList('hero', 'stats', i, { prefix: e.target.value })} className="w-full px-3 py-2 bg-white rounded-lg border border-black/5 text-xs font-bold" />
                              <input type="text" placeholder="2.4" value={stat.number} onChange={(e) => updateNestedList('hero', 'stats', i, { number: e.target.value })} className="w-full px-3 py-2 bg-white rounded-lg border border-black/5 text-xs font-bold text-center" />
                              <input type="text" placeholder="Suffix" value={stat.suffix} onChange={(e) => updateNestedList('hero', 'stats', i, { suffix: e.target.value })} className="w-full px-3 py-2 bg-white rounded-lg border border-black/5 text-xs font-bold" />
                            </div>
                            <textarea placeholder="Description" value={stat.desc} onChange={(e) => updateNestedList('hero', 'stats', i, { desc: e.target.value })} className="w-full px-3 py-2 bg-white rounded-lg border border-black/5 text-[11px] h-16 resize-none" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionWrapper>

                <SectionWrapper title="Approach" icon={Layers}>
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <input type="text" value={formData.content.approach.title} onChange={(e) => updateSection('approach', { title: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" placeholder="Title" />
                      <input type="text" value={formData.content.approach.highlight} onChange={(e) => updateSection('approach', { highlight: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" placeholder="Highlight" />
                    </div>
                    {formData.content.approach.steps.map((step, i) => (
                      <div key={i} className="p-6 bg-[#f5f1e8]/30 rounded-2xl border border-black/5 space-y-4">
                        <p className="text-[10px] font-black uppercase text-[#c84b21]">Step 0{i+1}</p>
                        <input type="text" value={step.title} onChange={(e) => updateNestedList('approach', 'steps', i, { title: e.target.value })} className="w-full px-4 py-2 bg-white rounded-lg border border-black/5 font-bold text-sm" placeholder="Step Title" />
                        <textarea value={step.desc} onChange={(e) => updateNestedList('approach', 'steps', i, { desc: e.target.value })} className="w-full px-4 py-2 bg-white rounded-lg border border-black/5 text-sm h-20 resize-none" placeholder="Step Description" />
                      </div>
                    ))}
                  </div>
                </SectionWrapper>

                <SectionWrapper title="Cost of Waiting" icon={Timer}>
                  <div className="space-y-6">
                    <input type="text" value={formData.content.costOfWaiting.title} onChange={(e) => updateSection('costOfWaiting', { title: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" placeholder="Headline Part 1" />
                    <input type="text" value={formData.content.costOfWaiting.highlight} onChange={(e) => updateSection('costOfWaiting', { highlight: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" placeholder="Highlight" />
                    <textarea value={formData.content.costOfWaiting.quote} onChange={(e) => updateSection('costOfWaiting', { quote: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm h-24 resize-none" placeholder="Quote" />
                  </div>
                </SectionWrapper>

                <SectionWrapper title="Final CTA" icon={MousePointer2}>
                  <div className="space-y-6">
                    <input type="text" value={formData.content.cta.title} onChange={(e) => updateSection('cta', { title: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" placeholder="CTA Title" />
                    <input type="text" value={formData.content.cta.buttonText} onChange={(e) => updateSection('cta', { buttonText: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" placeholder="Button Text" />
                  </div>
                </SectionWrapper>
              </>
            )}

            {activePage === 'about' && (
              <>
                <SectionWrapper title="About Hero" icon={Sparkles} defaultOpen>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <input type="text" value={formData.content.about.hero.title} onChange={(e) => updateSection('about', { hero: { ...formData.content.about.hero, title: e.target.value } })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 outline-none font-bold text-sm" placeholder="Title" />
                      <input type="text" value={formData.content.about.hero.highlight} onChange={(e) => updateSection('about', { hero: { ...formData.content.about.hero, highlight: e.target.value } })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 outline-none font-bold text-sm" placeholder="Highlight" />
                    </div>
                    <textarea value={formData.content.about.hero.description} onChange={(e) => updateSection('about', { hero: { ...formData.content.about.hero, description: e.target.value } })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 outline-none font-bold text-sm h-24 resize-none" placeholder="Description" />
                  </div>
                </SectionWrapper>

                <SectionWrapper title="Our Story" icon={Layers}>
                  <div className="space-y-6">
                    <input type="text" value={formData.content.about.story.heading} onChange={(e) => updateSection('about', { story: { ...formData.content.about.story, heading: e.target.value } })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 outline-none font-bold text-sm" placeholder="Heading" />
                    <textarea value={formData.content.about.story.text} onChange={(e) => updateSection('about', { story: { ...formData.content.about.story, text: e.target.value } })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 outline-none font-bold text-sm h-48 resize-none" placeholder="Story text" />
                  </div>
                </SectionWrapper>

                <SectionWrapper title="Team Members" icon={Type}>
                  <div className="space-y-8">
                    {formData.content.about.team.members.map((member, i) => (
                      <div key={i} className="p-6 bg-[#f5f1e8]/30 rounded-2xl border border-black/5 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input type="text" value={member.name} onChange={(e) => updateNestedList('about', 'team', i, { name: e.target.value })} className="px-4 py-2 bg-white rounded-lg border border-black/5 font-bold text-sm" placeholder="Name" />
                          <input type="text" value={member.role} onChange={(e) => updateNestedList('about', 'team', i, { role: e.target.value })} className="px-4 py-2 bg-white rounded-lg border border-black/5 text-sm" placeholder="Role" />
                        </div>
                        <textarea value={member.bio} onChange={(e) => updateNestedList('about', 'team', i, { bio: e.target.value })} className="w-full px-4 py-2 bg-white rounded-lg border border-black/5 text-sm h-20 resize-none" placeholder="Bio" />
                      </div>
                    ))}
                  </div>
                </SectionWrapper>
              </>
            )}

            {activePage === 'contact' && (
              <>
                <SectionWrapper title="Contact Header" icon={Sparkles} defaultOpen>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <input type="text" value={formData.content.contact?.header?.title || ''} onChange={(e) => updateSection('contact', { header: { ...formData.content.contact.header, title: e.target.value } })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 outline-none font-bold text-sm" placeholder="Title" />
                      <input type="text" value={formData.content.contact?.header?.highlight || ''} onChange={(e) => updateSection('contact', { header: { ...formData.content.contact.header, highlight: e.target.value } })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 outline-none font-bold text-sm" placeholder="Highlight" />
                    </div>
                    <textarea value={formData.content.contact?.header?.description || ''} onChange={(e) => updateSection('contact', { header: { ...formData.content.contact.header, description: e.target.value } })} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 outline-none font-bold text-sm h-24 resize-none" placeholder="Description" />
                  </div>
                </SectionWrapper>

                <SectionWrapper title="Office Locations" icon={MapPin}>
                  <div className="space-y-8">
                    {formData.content.contact?.locations?.map((loc, i) => (
                      <div key={i} className="p-6 bg-[#f5f1e8]/30 rounded-2xl border border-black/5 space-y-4">
                        <p className="text-[10px] font-black uppercase text-[#c84b21]">Location 0{i+1}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input type="text" value={loc.city} onChange={(e) => updateNestedList('contact', 'locations', i, { city: e.target.value })} className="px-4 py-2 bg-white rounded-lg border border-black/5 font-bold text-sm" placeholder="City Name" />
                          <input type="text" value={loc.phone} onChange={(e) => updateNestedList('contact', 'locations', i, { phone: e.target.value })} className="px-4 py-2 bg-white rounded-lg border border-black/5 text-sm" placeholder="Phone Number" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input type="text" value={loc.address} onChange={(e) => updateNestedList('contact', 'locations', i, { address: e.target.value })} className="px-4 py-2 bg-white rounded-lg border border-black/5 text-sm" placeholder="Address" />
                          <input type="email" value={loc.email} onChange={(e) => updateNestedList('contact', 'locations', i, { email: e.target.value })} className="px-4 py-2 bg-white rounded-lg border border-black/5 text-sm" placeholder="Email" />
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionWrapper>
              </>
            )}

            {['privacy-policy', 'terms-of-service', 'cookie-policy'].includes(activePage) && (
              <>
                <SectionWrapper title="Legal Header" icon={Sparkles} defaultOpen>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <input type="text" value={formData.content.title || ''} onChange={(e) => setFormData({...formData, content: {...formData.content, title: e.target.value}})} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 outline-none font-bold text-sm" placeholder="Title (e.g. Privacy)" />
                      <input type="text" value={formData.content.highlight || ''} onChange={(e) => setFormData({...formData, content: {...formData.content, highlight: e.target.value}})} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 outline-none font-bold text-sm" placeholder="Highlight (e.g. Policy.)" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Last Updated</label>
                      <input type="text" value={formData.content.lastUpdated || ''} onChange={(e) => setFormData({...formData, content: {...formData.content, lastUpdated: e.target.value}})} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 outline-none font-bold text-sm" placeholder="May 18, 2026" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Intro Text</label>
                      <textarea value={formData.content.intro || ''} onChange={(e) => setFormData({...formData, content: {...formData.content, intro: e.target.value}})} className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 outline-none font-bold text-sm h-24 resize-none" placeholder="Intro description" />
                    </div>
                  </div>
                </SectionWrapper>

                <SectionWrapper title="Content Sections" icon={Layers}>
                  <div className="space-y-8">
                    {formData.content.sections?.map((section, i) => (
                      <div key={i} className="p-6 bg-[#f5f1e8]/30 rounded-2xl border border-black/5 space-y-4 relative">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-[10px] font-black uppercase text-[#c84b21]">Section 0{i+1}</p>
                          <button onClick={() => {
                            const newSections = [...formData.content.sections];
                            newSections.splice(i, 1);
                            setFormData({...formData, content: {...formData.content, sections: newSections}});
                          }} className="text-red-500 text-xs font-bold hover:underline">Remove</button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input type="text" value={section.id || ''} onChange={(e) => {
                            const newSections = [...formData.content.sections];
                            newSections[i].id = e.target.value;
                            setFormData({...formData, content: {...formData.content, sections: newSections}});
                          }} className="px-4 py-2 bg-white rounded-lg border border-black/5 font-bold text-sm" placeholder="Section ID (e.g. data-collection)" />
                          <input type="text" value={section.title || ''} onChange={(e) => {
                            const newSections = [...formData.content.sections];
                            newSections[i].title = e.target.value;
                            setFormData({...formData, content: {...formData.content, sections: newSections}});
                          }} className="px-4 py-2 bg-white rounded-lg border border-black/5 font-bold text-sm" placeholder="Section Title" />
                        </div>
                        <textarea value={section.content || ''} onChange={(e) => {
                            const newSections = [...formData.content.sections];
                            newSections[i].content = e.target.value;
                            setFormData({...formData, content: {...formData.content, sections: newSections}});
                        }} className="w-full px-4 py-2 bg-white rounded-lg border border-black/5 text-sm h-48 resize-none font-mono" placeholder="HTML Content" />
                      </div>
                    ))}
                    <button onClick={() => {
                      const newSections = formData.content.sections ? [...formData.content.sections] : [];
                      newSections.push({ id: '', title: '', content: '' });
                      setFormData({...formData, content: {...formData.content, sections: newSections}});
                    }} className="w-full py-4 border-2 border-dashed border-black/10 rounded-2xl text-xs font-bold text-gray-500 hover:border-[#c84b21] hover:text-[#c84b21] transition-colors">
                      + Add New Section
                    </button>
                  </div>
                </SectionWrapper>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Pages;
