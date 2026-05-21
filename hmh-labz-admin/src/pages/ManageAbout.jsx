import { useState, useEffect } from 'react';
import client from '../api/client';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Loader2 } from 'lucide-react';

const ManageAbout = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    heroTitle: 'About HMH Labz',
    heroBadge: 'WE BUILD SYSTEMS.',
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
        heroBadge: data.heroBadge || 'WE BUILD SYSTEMS.',
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

  const handleArrayChange = (field, index, key, value) => {
    const newArray = [...formData[field]];
    newArray[index][key] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addItem = (field, defaultObj) => {
    setFormData({ ...formData, [field]: [...formData[field], { id: Date.now().toString(), ...defaultObj }] });
  };

  const removeItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
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
            Hero Settings
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
              <p className="text-[11px] text-gray-400 mt-1">
                Tip: Wrap words in <code>&lt;em&gt; &lt;/em&gt;</code> to apply the serif italic styling (e.g., and then <code>&lt;em&gt;does it.&lt;/em&gt;</code>).
              </p>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Hero Badge</label>
              <input
                type="text"
                value={formData.heroBadge}
                onChange={(e) => setFormData({...formData, heroBadge: e.target.value})}
                className="w-full bg-[#f5f1e8]/50 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-[#c84b21]/30 transition-colors"
                placeholder="WE BUILD SYSTEMS."
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Hero Description</label>
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
              onClick={() => addItem('linesOfWork', { line: '', title: '', description: '', duration: '', output: '', tier: '' })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#c84b21] bg-[#c84b21]/10 rounded-lg hover:bg-[#c84b21]/20 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Line of Work
            </button>
          </div>
          
          <div className="space-y-4">
            {(formData.linesOfWork || []).map((item, index) => (
              <div key={item.id || index} className="p-4 border border-black/10 mb-4 rounded-xl relative bg-[#f5f1e8]/10">
                <button 
                  onClick={() => removeItem('linesOfWork', index)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-10">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Line (e.g. 01)</label>
                    <input 
                      type="text" 
                      value={item.line} 
                      onChange={(e) => handleArrayChange('linesOfWork', index, 'line', e.target.value)} 
                      className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={item.title} 
                      onChange={(e) => handleArrayChange('linesOfWork', index, 'title', e.target.value)} 
                      className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none" 
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Description</label>
                  <textarea 
                    rows={2} 
                    value={item.description} 
                    onChange={(e) => handleArrayChange('linesOfWork', index, 'description', e.target.value)} 
                    className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none resize-none" 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Duration</label>
                    <input 
                      type="text" 
                      value={item.duration} 
                      onChange={(e) => handleArrayChange('linesOfWork', index, 'duration', e.target.value)} 
                      className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Output</label>
                    <input 
                      type="text" 
                      value={item.output} 
                      onChange={(e) => handleArrayChange('linesOfWork', index, 'output', e.target.value)} 
                      className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Tier</label>
                    <input 
                      type="text" 
                      value={item.tier} 
                      onChange={(e) => handleArrayChange('linesOfWork', index, 'tier', e.target.value)} 
                      className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none" 
                    />
                  </div>
                </div>
              </div>
            ))}
            {(formData.linesOfWork || []).length === 0 && <p className="text-sm text-gray-400 italic">No lines of work added yet.</p>}
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
              onClick={() => addItem('phases', { timeframe: '', title: '', description: '' })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#c84b21] bg-[#c84b21]/10 rounded-lg hover:bg-[#c84b21]/20 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Phase
            </button>
          </div>
          
          <div className="space-y-4">
            {(formData.phases || []).map((item, index) => (
              <div key={item.id || index} className="p-4 border border-black/10 mb-4 rounded-xl relative bg-[#f5f1e8]/10">
                <button 
                  onClick={() => removeItem('phases', index)} 
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-10">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Timeframe (e.g. Wk 01-02)</label>
                    <input 
                      type="text" 
                      value={item.timeframe} 
                      onChange={(e) => handleArrayChange('phases', index, 'timeframe', e.target.value)} 
                      className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={item.title} 
                      onChange={(e) => handleArrayChange('phases', index, 'title', e.target.value)} 
                      className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Description</label>
                  <textarea 
                    rows={2} 
                    value={item.description} 
                    onChange={(e) => handleArrayChange('phases', index, 'description', e.target.value)} 
                    className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none resize-none" 
                  />
                </div>
              </div>
            ))}
            {(formData.phases || []).length === 0 && <p className="text-sm text-gray-400 italic">No phases added yet.</p>}
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
              onClick={() => addItem('capabilities', { number: '', title: '', description: '' })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#c84b21] bg-[#c84b21]/10 rounded-lg hover:bg-[#c84b21]/20 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Capability
            </button>
          </div>
          
          <div className="space-y-4">
            {(formData.capabilities || []).map((item, index) => (
              <div key={item.id || index} className="p-4 border border-black/10 mb-4 rounded-xl relative bg-[#f5f1e8]/10">
                <button 
                  onClick={() => removeItem('capabilities', index)} 
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex flex-col md:flex-row gap-4 mb-4 pr-10">
                  <div className="w-full md:w-32">
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Number (e.g. 01)</label>
                    <input 
                      type="text" 
                      value={item.number} 
                      onChange={(e) => handleArrayChange('capabilities', index, 'number', e.target.value)} 
                      className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none" 
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={item.title} 
                      onChange={(e) => handleArrayChange('capabilities', index, 'title', e.target.value)} 
                      className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Description</label>
                  <textarea 
                    rows={2} 
                    value={item.description} 
                    onChange={(e) => handleArrayChange('capabilities', index, 'description', e.target.value)} 
                    className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none resize-none" 
                  />
                </div>
              </div>
            ))}
            {(formData.capabilities || []).length === 0 && <p className="text-sm text-gray-400 italic">No capabilities added yet.</p>}
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default ManageAbout;
