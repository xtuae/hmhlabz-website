import React, { useState, useEffect } from 'react';
import client from '../api/client';

const ManageAbout = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroBadge: '',
    heroText: '',
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
        heroTitle: data.heroTitle || '',
        heroBadge: data.heroBadge || '',
        heroText: data.heroText || '',
        linesOfWork: Array.isArray(data.linesOfWork) ? data.linesOfWork : [],
        phases: Array.isArray(data.phases) ? data.phases : [],
        capabilities: Array.isArray(data.capabilities) ? data.capabilities : []
      });
    } catch (error) {
      console.error('Failed to fetch about data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await client.put('/about', formData);
      alert('About page updated successfully!');
    } catch (error) {
      console.error('Failed to save', error);
      alert('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleArrayChange = (field, index, key, value) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = { ...newArray[index], [key]: value };
    setFormData({ ...formData, [field]: newArray });
  };

  const addItem = (field, defaultObj) => {
    const newArray = [...(formData[field] || []), { id: Date.now().toString(), ...defaultObj }];
    setFormData({ ...formData, [field]: newArray });
  };

  const removeItem = (field, index) => {
    const newArray = (formData[field] || []).filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  if (loading) return <div className="p-10 text-center font-bold">⏳ Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-serif italic font-bold text-ink">Manage About Page</h1>
          <p className="text-black/50 mt-2">Control the hero messaging and repeatable sections.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-orange-600 transition-colors">
          {saving ? '⏳ Saving...' : '💾 Save Changes'}
        </button>
      </div>

      <div className="space-y-12">
        {/* HERO SECTION */}
        <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Hero Settings</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Hero Title</label>
              <input type="text" value={formData.heroTitle} onChange={(e) => setFormData({...formData, heroTitle: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
              <p className="text-[11px] text-black/40 mt-1">Tip: Wrap words in <code>&lt;em&gt;&lt;/em&gt;</code> to apply the serif italic styling.</p>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Hero Badge</label>
              <input type="text" value={formData.heroBadge} onChange={(e) => setFormData({...formData, heroBadge: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Hero Description</label>
              <textarea value={formData.heroText} onChange={(e) => setFormData({...formData, heroText: e.target.value})} rows={3} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 resize-none" />
            </div>
          </div>
        </section>

        {/* LINES OF WORK */}
        <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Lines of Work (02)</h2>
            <button type="button" onClick={() => addItem('linesOfWork', { line: '', title: '', description: '', duration: '', output: '', tier: '' })} className="px-4 py-2 text-sm font-bold text-orange-600 bg-orange-50 rounded-lg">➕ Add Line</button>
          </div>
          <div className="space-y-4">
            {(formData.linesOfWork || []).map((item, index) => (
              <div key={item.id || index} className="p-4 border border-black/10 rounded-xl relative bg-stone-50">
                <button type="button" onClick={() => removeItem('linesOfWork', index)} className="absolute top-4 right-4 p-2 text-red-500 font-bold text-xs">❌ Remove</button>
                <div className="grid grid-cols-2 gap-4 mt-4 pr-16">
                  <input placeholder="Line (e.g. 01)" value={item.line || ''} onChange={(e) => handleArrayChange('linesOfWork', index, 'line', e.target.value)} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none" />
                  <input placeholder="Title" value={item.title || ''} onChange={(e) => handleArrayChange('linesOfWork', index, 'title', e.target.value)} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none" />
                  <input placeholder="Duration" value={item.duration || ''} onChange={(e) => handleArrayChange('linesOfWork', index, 'duration', e.target.value)} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none" />
                  <input placeholder="Tier" value={item.tier || ''} onChange={(e) => handleArrayChange('linesOfWork', index, 'tier', e.target.value)} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none" />
                  <input placeholder="Description" value={item.description || ''} onChange={(e) => handleArrayChange('linesOfWork', index, 'description', e.target.value)} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none col-span-2" />
                  <input placeholder="Output" value={item.output || ''} onChange={(e) => handleArrayChange('linesOfWork', index, 'output', e.target.value)} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none col-span-2" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PHASES */}
        <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Phases (04)</h2>
            <button type="button" onClick={() => addItem('phases', { timeframe: '', title: '', description: '' })} className="px-4 py-2 text-sm font-bold text-orange-600 bg-orange-50 rounded-lg">➕ Add Phase</button>
          </div>
          <div className="space-y-4">
            {(formData.phases || []).map((item, index) => (
              <div key={item.id || index} className="p-4 border border-black/10 rounded-xl relative bg-stone-50">
                <button type="button" onClick={() => removeItem('phases', index)} className="absolute top-4 right-4 p-2 text-red-500 font-bold text-xs">❌ Remove</button>
                <div className="grid grid-cols-2 gap-4 mt-4 pr-16">
                  <input placeholder="Timeframe (e.g. Wk 01-02)" value={item.timeframe || ''} onChange={(e) => handleArrayChange('phases', index, 'timeframe', e.target.value)} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none" />
                  <input placeholder="Title" value={item.title || ''} onChange={(e) => handleArrayChange('phases', index, 'title', e.target.value)} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none" />
                  <textarea placeholder="Description" value={item.description || ''} onChange={(e) => handleArrayChange('phases', index, 'description', e.target.value)} rows={2} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none col-span-2 resize-none" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Capabilities (05)</h2>
            <button type="button" onClick={() => addItem('capabilities', { number: '', title: '', description: '' })} className="px-4 py-2 text-sm font-bold text-orange-600 bg-orange-50 rounded-lg">➕ Add Capability</button>
          </div>
          <div className="space-y-4">
            {(formData.capabilities || []).map((item, index) => (
              <div key={item.id || index} className="p-4 border border-black/10 rounded-xl relative bg-stone-50">
                <button type="button" onClick={() => removeItem('capabilities', index)} className="absolute top-4 right-4 p-2 text-red-500 font-bold text-xs">❌ Remove</button>
                <div className="grid grid-cols-2 gap-4 mt-4 pr-16">
                  <input placeholder="Number (e.g. 01)" value={item.number || ''} onChange={(e) => handleArrayChange('capabilities', index, 'number', e.target.value)} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none" />
                  <input placeholder="Title" value={item.title || ''} onChange={(e) => handleArrayChange('capabilities', index, 'title', e.target.value)} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none" />
                  <textarea placeholder="Description" value={item.description || ''} onChange={(e) => handleArrayChange('capabilities', index, 'description', e.target.value)} rows={2} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none col-span-2 resize-none" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManageAbout;
