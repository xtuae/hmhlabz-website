import { useState, useEffect } from 'react';
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
      alert('About page updated successfully');
    } catch (error) {
      console.error('Failed to save about data', error);
      alert('Failed to save changes');
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

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-xl font-bold text-[#c84b21]">⏳ Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-24">
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
          {saving ? '⏳ Saving...' : '💾 Save Changes'}
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

        {/* Lines of Work Section */}
        <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c84b21]"></span>
              Lines of Work
            </h2>
            <button
              type="button"
              onClick={() => addItem('linesOfWork', { line: '', title: '', description: '', duration: '', output: '', tier: '' })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#c84b21] bg-[#c84b21]/10 rounded-lg hover:bg-[#c84b21]/20 transition-colors"
            >
              + Add Line
            </button>
          </div>
          <div className="space-y-4">
            {(formData.linesOfWork || []).map((item, index) => (
              <div key={item.id || index} className="p-4 border border-black/10 rounded-xl relative bg-[#f5f1e8]/10">
                <button
                  type="button"
                  onClick={() => removeItem('linesOfWork', index)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-xs font-bold"
                >
                  ❌ Remove
                </button>
                <div className="grid grid-cols-2 gap-4 mt-4 pr-10">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Line (e.g. 01)</label>
                    <input
                      type="text"
                      placeholder="Line (e.g. 01)"
                      value={item.line || ''}
                      onChange={(e) => handleArrayChange('linesOfWork', index, 'line', e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-terra outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="Title"
                      value={item.title || ''}
                      onChange={(e) => handleArrayChange('linesOfWork', index, 'title', e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-terra outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Duration</label>
                    <input
                      type="text"
                      placeholder="Duration"
                      value={item.duration || ''}
                      onChange={(e) => handleArrayChange('linesOfWork', index, 'duration', e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-terra outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Tier</label>
                    <input
                      type="text"
                      placeholder="Tier"
                      value={item.tier || ''}
                      onChange={(e) => handleArrayChange('linesOfWork', index, 'tier', e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-terra outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Description</label>
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description || ''}
                      onChange={(e) => handleArrayChange('linesOfWork', index, 'description', e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-terra outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Output</label>
                    <input
                      type="text"
                      placeholder="Output"
                      value={item.output || ''}
                      onChange={(e) => handleArrayChange('linesOfWork', index, 'output', e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-terra outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
            {(formData.linesOfWork || []).length === 0 && <p className="text-sm text-gray-400 italic">No lines of work added yet.</p>}
          </div>
        </section>

        {/* Phases Section */}
        <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c84b21]"></span>
              Phases (The Shape of an Engagement)
            </h2>
            <button
              type="button"
              onClick={() => addItem('phases', { timeframe: '', title: '', description: '' })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#c84b21] bg-[#c84b21]/10 rounded-lg hover:bg-[#c84b21]/20 transition-colors"
            >
              + Add Phase
            </button>
          </div>
          <div className="space-y-4">
            {(formData.phases || []).map((item, index) => (
              <div key={item.id || index} className="p-4 border border-black/10 rounded-xl relative bg-[#f5f1e8]/10">
                <button
                  type="button"
                  onClick={() => removeItem('phases', index)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-xs font-bold"
                >
                  ❌ Remove
                </button>
                <div className="grid grid-cols-2 gap-4 mt-4 pr-10">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Timeframe (e.g. Wk 01-02)</label>
                    <input
                      type="text"
                      placeholder="Timeframe (e.g. Wk 01-02)"
                      value={item.timeframe || ''}
                      onChange={(e) => handleArrayChange('phases', index, 'timeframe', e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-terra outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="Title"
                      value={item.title || ''}
                      onChange={(e) => handleArrayChange('phases', index, 'title', e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-terra outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Description</label>
                    <textarea
                      placeholder="Description"
                      value={item.description || ''}
                      onChange={(e) => handleArrayChange('phases', index, 'description', e.target.value)}
                      rows={2}
                      className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-terra outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
            {(formData.phases || []).length === 0 && <p className="text-sm text-gray-400 italic">No phases added yet.</p>}
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c84b21]"></span>
              Capabilities (The Bench)
            </h2>
            <button
              type="button"
              onClick={() => addItem('capabilities', { number: '', title: '', description: '' })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#c84b21] bg-[#c84b21]/10 rounded-lg hover:bg-[#c84b21]/20 transition-colors"
            >
              + Add Capability
            </button>
          </div>
          <div className="space-y-4">
            {(formData.capabilities || []).map((item, index) => (
              <div key={item.id || index} className="p-4 border border-black/10 rounded-xl relative bg-[#f5f1e8]/10">
                <button
                  type="button"
                  onClick={() => removeItem('capabilities', index)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-xs font-bold"
                >
                  ❌ Remove
                </button>
                <div className="grid grid-cols-2 gap-4 mt-4 pr-10">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Number (e.g. 01)</label>
                    <input
                      type="text"
                      placeholder="Number (e.g. 01)"
                      value={item.number || ''}
                      onChange={(e) => handleArrayChange('capabilities', index, 'number', e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-terra outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="Title"
                      value={item.title || ''}
                      onChange={(e) => handleArrayChange('capabilities', index, 'title', e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-terra outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Description</label>
                    <textarea
                      placeholder="Description"
                      value={item.description || ''}
                      onChange={(e) => handleArrayChange('capabilities', index, 'description', e.target.value)}
                      rows={2}
                      className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-terra outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
            {(formData.capabilities || []).length === 0 && <p className="text-sm text-gray-400 italic">No capabilities added yet.</p>}
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white rounded-xl font-bold hover:bg-[#c84b21] transition-colors disabled:opacity-50 text-base shadow-md"
          >
            {saving ? '⏳ Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAbout;
