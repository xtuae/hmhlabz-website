import { useState, useEffect } from 'react';
import client from '../api/client';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';

const ManageAbout = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    heroTitle: 'About HMH Labz',
    heroText: 'We build systems.',
    linesOfWork: [],
    phases: [],
    capabilities: []
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const { data } = await client.get('/about');
      setFormData({
        heroTitle: data.heroTitle || 'About HMH Labz',
        heroText: data.heroText || 'We build systems.',
        linesOfWork: Array.isArray(data.linesOfWork) ? data.linesOfWork : [],
        phases: Array.isArray(data.phases) ? data.phases : [],
        capabilities: Array.isArray(data.capabilities) ? data.capabilities : []
      });
    } catch (error) {
      console.error('Failed to fetch about data', error);
      alert('Failed to load About page data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await client.put('/about', formData);
      alert('About page updated successfully');
    } catch (error) {
      console.error('Failed to save about data', error);
      alert('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  // Generic array helpers
  const addItem = (arrayName, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { id: Date.now().toString(), ...defaultItem }]
    }));
  };

  const removeItem = (arrayName, id) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter(item => item.id !== id)
    }));
  };

  const updateItem = (arrayName, id, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#c84b21]" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto pb-24"
    >
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-serif italic font-bold text-[#1a1a1a]">Manage About Page</h1>
          <p className="text-gray-500 mt-2">Control the hero messaging and repeatable sections of the About page.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-xl font-bold hover:bg-[#c84b21] transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-12">
        {/* HERO SECTION */}
        <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c84b21]"></span>
            Hero Section
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Hero Title</label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={(e) => setFormData({...formData, heroTitle: e.target.value})}
                className="w-full bg-[#f5f1e8]/50 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-[#c84b21]/30 transition-colors"
                placeholder="A studio that tells you what to do..."
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Hero Text</label>
              <textarea
                value={formData.heroText}
                onChange={(e) => setFormData({...formData, heroText: e.target.value})}
                rows={3}
                className="w-full bg-[#f5f1e8]/50 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-[#c84b21]/30 transition-colors resize-none"
                placeholder="HMH Labz is a small strategy & build studio..."
              />
            </div>
          </div>
        </section>

        {/* LINES OF WORK */}
        <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c84b21]"></span>
              Lines of Work
            </h2>
            <button
              onClick={() => addItem('linesOfWork', { line: 'Line · 0X', title: '', description: '', duration: '', output: '', tier: '' })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#c84b21] bg-[#c84b21]/10 rounded-lg hover:bg-[#c84b21]/20 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Line
            </button>
          </div>
          
          <div className="space-y-6">
            {formData.linesOfWork.map((item) => (
              <div key={item.id} className="p-6 border border-black/5 rounded-xl bg-[#f5f1e8]/30 relative">
                <button 
                  onClick={() => removeItem('linesOfWork', item.id)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Line Label (e.g. Line · 01)</label>
                    <input type="text" value={item.line} onChange={(e) => updateItem('linesOfWork', item.id, 'line', e.target.value)} className="w-full bg-white border border-black/5 p-2 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Title</label>
                    <input type="text" value={item.title} onChange={(e) => updateItem('linesOfWork', item.id, 'title', e.target.value)} className="w-full bg-white border border-black/5 p-2 rounded-lg" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Description</label>
                  <textarea rows={2} value={item.description} onChange={(e) => updateItem('linesOfWork', item.id, 'description', e.target.value)} className="w-full bg-white border border-black/5 p-2 rounded-lg resize-none" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Duration</label>
                    <input type="text" value={item.duration} onChange={(e) => updateItem('linesOfWork', item.id, 'duration', e.target.value)} className="w-full bg-white border border-black/5 p-2 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Output</label>
                    <input type="text" value={item.output} onChange={(e) => updateItem('linesOfWork', item.id, 'output', e.target.value)} className="w-full bg-white border border-black/5 p-2 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Tier</label>
                    <input type="text" value={item.tier} onChange={(e) => updateItem('linesOfWork', item.id, 'tier', e.target.value)} className="w-full bg-white border border-black/5 p-2 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
            {formData.linesOfWork.length === 0 && <p className="text-sm text-gray-400 italic">No lines of work added yet.</p>}
          </div>
        </section>

        {/* PHASES */}
        <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c84b21]"></span>
              Phases (The Shape of an Engagement)
            </h2>
            <button
              onClick={() => addItem('phases', { timeframe: 'Wk 0X-0Y', title: '', description: '' })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#c84b21] bg-[#c84b21]/10 rounded-lg hover:bg-[#c84b21]/20 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Phase
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.phases.map((item) => (
              <div key={item.id} className="p-5 border border-black/5 rounded-xl bg-[#f5f1e8]/30 flex gap-4 items-start relative">
                <button onClick={() => removeItem('phases', item.id)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="w-1/4">
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Timeframe</label>
                  <input type="text" value={item.timeframe} onChange={(e) => updateItem('phases', item.id, 'timeframe', e.target.value)} className="w-full bg-white border border-black/5 p-2 rounded-lg" />
                </div>
                <div className="w-1/3">
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Title</label>
                  <input type="text" value={item.title} onChange={(e) => updateItem('phases', item.id, 'title', e.target.value)} className="w-full bg-white border border-black/5 p-2 rounded-lg" />
                </div>
                <div className="flex-1 mr-10">
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Description</label>
                  <textarea rows={2} value={item.description} onChange={(e) => updateItem('phases', item.id, 'description', e.target.value)} className="w-full bg-white border border-black/5 p-2 rounded-lg resize-none" />
                </div>
              </div>
            ))}
            {formData.phases.length === 0 && <p className="text-sm text-gray-400 italic">No phases added yet.</p>}
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c84b21]"></span>
              Capabilities (The Bench)
            </h2>
            <button
              onClick={() => addItem('capabilities', { number: '0X', title: '', description: '' })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#c84b21] bg-[#c84b21]/10 rounded-lg hover:bg-[#c84b21]/20 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Capability
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {formData.capabilities.map((item) => (
              <div key={item.id} className="p-5 border border-black/5 rounded-xl bg-[#f5f1e8]/30 relative">
                <button onClick={() => removeItem('capabilities', item.id)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex gap-4 mb-3 pr-8">
                  <div className="w-16">
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Number</label>
                    <input type="text" value={item.number} onChange={(e) => updateItem('capabilities', item.id, 'number', e.target.value)} className="w-full bg-white border border-black/5 p-2 rounded-lg" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Title</label>
                    <input type="text" value={item.title} onChange={(e) => updateItem('capabilities', item.id, 'title', e.target.value)} className="w-full bg-white border border-black/5 p-2 rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Description</label>
                  <textarea rows={2} value={item.description} onChange={(e) => updateItem('capabilities', item.id, 'description', e.target.value)} className="w-full bg-white border border-black/5 p-2 rounded-lg resize-none" />
                </div>
              </div>
            ))}
            {formData.capabilities.length === 0 && <p className="text-sm text-gray-400 italic col-span-2">No capabilities added yet.</p>}
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default ManageAbout;
