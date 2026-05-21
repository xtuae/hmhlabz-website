import React, { useState, useEffect } from 'react';
import client from '../api/client';

const ManageAbout = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroBadge: '',
    heroText: '',
    heroStats: [],
    thesisTitle: '',
    thesisHeading: '',
    thesisParagraphs: [],
    linesOfWorkHeading: '',
    linesOfWorkSubtext: '',
    linesOfWork: [],
    opinionsHeading: '',
    opinions: [],
    phasesHeading: '',
    phasesSubtext: '',
    phasesFigLabel: '',
    phasesFigSub: '',
    phases: [],
    capabilitiesHeading: '',
    capabilitiesSubtext: '',
    capabilitiesFooter: '',
    capabilities: [],
    casesHeading: '',
    casesSubtext: '',
    cases: [],
    driftText: '',
    whereWeWorkHeading: '',
    whereWeWorkSubtext: '',
    whereWeWorkDetails: [],
    hubs: [],
    fitCallIntro: '',
    fitCallHeading: '',
    fitCallText: '',
    fitCallButtonText: '',
    fitCallButtonLink: ''
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
        heroStats: Array.isArray(data.heroStats) ? data.heroStats : [],
        thesisTitle: data.thesisTitle || '',
        thesisHeading: data.thesisHeading || '',
        thesisParagraphs: Array.isArray(data.thesisParagraphs) ? data.thesisParagraphs : [],
        linesOfWorkHeading: data.linesOfWorkHeading || '',
        linesOfWorkSubtext: data.linesOfWorkSubtext || '',
        linesOfWork: Array.isArray(data.linesOfWork) ? data.linesOfWork : [],
        opinionsHeading: data.opinionsHeading || '',
        opinions: Array.isArray(data.opinions) ? data.opinions : [],
        phasesHeading: data.phasesHeading || '',
        phasesSubtext: data.phasesSubtext || '',
        phasesFigLabel: data.phasesFigLabel || '',
        phasesFigSub: data.phasesFigSub || '',
        phases: Array.isArray(data.phases) ? data.phases : [],
        capabilitiesHeading: data.capabilitiesHeading || '',
        capabilitiesSubtext: data.capabilitiesSubtext || '',
        capabilitiesFooter: data.capabilitiesFooter || '',
        capabilities: Array.isArray(data.capabilities) ? data.capabilities : [],
        casesHeading: data.casesHeading || '',
        casesSubtext: data.casesSubtext || '',
        cases: Array.isArray(data.cases) ? data.cases : [],
        driftText: data.driftText || '',
        whereWeWorkHeading: data.whereWeWorkHeading || '',
        whereWeWorkSubtext: data.whereWeWorkSubtext || '',
        whereWeWorkDetails: Array.isArray(data.whereWeWorkDetails) ? data.whereWeWorkDetails : [],
        hubs: Array.isArray(data.hubs) ? data.hubs : [],
        fitCallIntro: data.fitCallIntro || '',
        fitCallHeading: data.fitCallHeading || '',
        fitCallText: data.fitCallText || '',
        fitCallButtonText: data.fitCallButtonText || '',
        fitCallButtonLink: data.fitCallButtonLink || ''
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

  const handleStringArrayChange = (field, index, value) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addStringArrayItem = (field) => {
    const newArray = [...(formData[field] || []), ''];
    setFormData({ ...formData, [field]: newArray });
  };

  const removeStringArrayItem = (field, index) => {
    const newArray = (formData[field] || []).filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  if (loading) return <div className="p-10 text-center font-bold">⏳ Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-serif italic font-bold text-ink">Manage About Page</h1>
          <p className="text-black/50 mt-1">Control and design sections for the dynamic About page.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-orange-600 transition-colors self-start sm:self-center">
          {saving ? '⏳ Saving...' : '💾 Save Changes'}
        </button>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-black/5 pb-4">
        {[
          { id: 'hero', label: '1. Hero & Thesis' },
          { id: 'work', label: '2. Work & Opinions' },
          { id: 'phases', label: '3. Phases & Capabilities' },
          { id: 'cases', label: '4. Cases & Drift' },
          { id: 'locations', label: '5. Locations & Fit Call' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold transition-colors ${
              activeTab === tab.id
                ? 'bg-orange-600 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {/* TAB 1: HERO & THESIS */}
        {activeTab === 'hero' && (
          <>
            <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <h2 className="text-xl font-bold border-b border-black/5 pb-3">Hero Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Hero Title</label>
                  <input type="text" value={formData.heroTitle} onChange={(e) => setFormData({...formData, heroTitle: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                  <p className="text-[11px] text-black/40 mt-1">Tip: Wrap words in <code>&lt;span class="frauncesItalic text-terra"&gt;word&lt;/span&gt;</code> for italic styling.</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Hero Badge</label>
                  <input type="text" value={formData.heroBadge} onChange={(e) => setFormData({...formData, heroBadge: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Hero Description</label>
                  <textarea value={formData.heroText} onChange={(e) => setFormData({...formData, heroText: e.target.value})} rows={3} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 resize-none" />
                </div>
              </div>

              {/* Hero Stats (4 numbers row) */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">Hero Stats Card Items (Row of 4 recommended)</h3>
                  <button type="button" onClick={() => addItem('heroStats', { value: '', label: '' })} className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg">➕ Add Stat</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(formData.heroStats || []).map((item, index) => (
                    <div key={item.id || index} className="p-4 border border-black/10 rounded-xl bg-stone-50 relative">
                      <button type="button" onClick={() => removeItem('heroStats', index)} className="absolute top-2 right-2 text-red-500 font-bold text-xs">❌</button>
                      <div className="space-y-3 mt-4">
                        <input placeholder="Value (e.g. 2023)" value={item.value || ''} onChange={(e) => handleArrayChange('heroStats', index, 'value', e.target.value)} className="w-full bg-transparent border-b border-black/20 p-2 text-sm focus:border-orange-500 outline-none font-bold" />
                        <input placeholder="Label (e.g. Founded · Dubai)" value={item.label || ''} onChange={(e) => handleArrayChange('heroStats', index, 'label', e.target.value)} className="w-full bg-transparent border-b border-black/20 p-2 text-xs focus:border-orange-500 outline-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <h2 className="text-xl font-bold border-b border-black/5 pb-3">01 · Thesis Settings</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Thesis Title Label</label>
                  <input type="text" value={formData.thesisTitle} onChange={(e) => setFormData({...formData, thesisTitle: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Thesis Main Heading (Big Serif Quote)</label>
                  <textarea value={formData.thesisHeading} onChange={(e) => setFormData({...formData, thesisHeading: e.target.value})} rows={3} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 resize-none" />
                </div>
                
                {/* Paragraphs list */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-black/40">Thesis Supporting Paragraphs (Right Column)</label>
                    <button type="button" onClick={() => addStringArrayItem('thesisParagraphs')} className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg">➕ Add Paragraph</button>
                  </div>
                  <div className="space-y-3">
                    {(formData.thesisParagraphs || []).map((paragraph, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <textarea value={paragraph} onChange={(e) => handleStringArrayChange('thesisParagraphs', index, e.target.value)} rows={3} className="flex-1 bg-stone-50 border border-black/10 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500 resize-none" placeholder="Enter paragraph content..." />
                        <button type="button" onClick={() => removeStringArrayItem('thesisParagraphs', index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg text-sm">❌</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* TAB 2: WORK & OPINIONS */}
        {activeTab === 'work' && (
          <>
            <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <h2 className="text-xl font-bold border-b border-black/5 pb-3">02 · Lines of Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Section Heading</label>
                  <input type="text" value={formData.linesOfWorkHeading} onChange={(e) => setFormData({...formData, linesOfWorkHeading: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Section Subtext</label>
                  <textarea value={formData.linesOfWorkSubtext} onChange={(e) => setFormData({...formData, linesOfWorkSubtext: e.target.value})} rows={2} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 resize-none" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">Lines list</h3>
                  <button type="button" onClick={() => addItem('linesOfWork', { line: '', title: '', description: '', duration: '', output: '', tier: '' })} className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg">➕ Add Line</button>
                </div>
                <div className="space-y-4">
                  {(formData.linesOfWork || []).map((item, index) => (
                    <div key={item.id || index} className="p-5 border border-black/10 rounded-xl relative bg-stone-50">
                      <button type="button" onClick={() => removeItem('linesOfWork', index)} className="absolute top-4 right-4 text-red-500 font-bold text-xs">❌ Remove</button>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pr-16">
                        <input placeholder="Line Number (e.g. 01)" value={item.line || ''} onChange={(e) => handleArrayChange('linesOfWork', index, 'line', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none" />
                        <input placeholder="Title" value={item.title || ''} onChange={(e) => handleArrayChange('linesOfWork', index, 'title', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none" />
                        <input placeholder="Tier (e.g. 01 · Wedge)" value={item.tier || ''} onChange={(e) => handleArrayChange('linesOfWork', index, 'tier', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none" />
                        <input placeholder="Duration (e.g. 2 weeks)" value={item.duration || ''} onChange={(e) => handleArrayChange('linesOfWork', index, 'duration', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none" />
                        <input placeholder="Output (e.g. Written roadmap)" value={item.output || ''} onChange={(e) => handleArrayChange('linesOfWork', index, 'output', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none" />
                        <textarea placeholder="Description" value={item.description || ''} onChange={(e) => handleArrayChange('linesOfWork', index, 'description', e.target.value)} rows={2} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none md:col-span-3 resize-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <h2 className="text-xl font-bold border-b border-black/5 pb-3">03 · How We Think (Opinions)</h2>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Opinions Section Heading</label>
                <input type="text" value={formData.opinionsHeading} onChange={(e) => setFormData({...formData, opinionsHeading: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">Opinions List (5 items recommended)</h3>
                  <button type="button" onClick={() => addItem('opinions', { num: '', title: '', description: '' })} className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg">➕ Add Opinion</button>
                </div>
                <div className="space-y-4">
                  {(formData.opinions || []).map((item, index) => (
                    <div key={item.id || index} className="p-5 border border-black/10 rounded-xl relative bg-stone-50">
                      <button type="button" onClick={() => removeItem('opinions', index)} className="absolute top-4 right-4 text-red-500 font-bold text-xs">❌ Remove</button>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pr-16">
                        <input placeholder="Roman Numeral (e.g. i.)" value={item.num || ''} onChange={(e) => handleArrayChange('opinions', index, 'num', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none" />
                        <input placeholder="Opinion Title" value={item.title || ''} onChange={(e) => handleArrayChange('opinions', index, 'title', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none md:col-span-3" />
                        <textarea placeholder="Description / Rationale" value={item.description || ''} onChange={(e) => handleArrayChange('opinions', index, 'description', e.target.value)} rows={3} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none md:col-span-4 resize-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* TAB 3: PHASES & CAPABILITIES */}
        {activeTab === 'phases' && (
          <>
            <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <h2 className="text-xl font-bold border-b border-black/5 pb-3">04 · Shape of an Engagement (Phases)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Section Heading</label>
                  <input type="text" value={formData.phasesHeading} onChange={(e) => setFormData({...formData, phasesHeading: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Section Subtext</label>
                  <textarea value={formData.phasesSubtext} onChange={(e) => setFormData({...formData, phasesSubtext: e.target.value})} rows={2} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 resize-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Figure Label (e.g. Fig. 01)</label>
                  <input type="text" value={formData.phasesFigLabel} onChange={(e) => setFormData({...formData, phasesFigLabel: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Figure Subtitle</label>
                  <input type="text" value={formData.phasesFigSub} onChange={(e) => setFormData({...formData, phasesFigSub: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">Phases List (4 phases recommended)</h3>
                  <button type="button" onClick={() => addItem('phases', { timeframe: '', title: '', description: '' })} className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg">➕ Add Phase</button>
                </div>
                <div className="space-y-4">
                  {(formData.phases || []).map((item, index) => (
                    <div key={item.id || index} className="p-5 border border-black/10 rounded-xl relative bg-stone-50">
                      <button type="button" onClick={() => removeItem('phases', index)} className="absolute top-4 right-4 text-red-500 font-bold text-xs">❌ Remove</button>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pr-16">
                        <input placeholder="Timeframe (e.g. Wk 01–02)" value={item.timeframe || ''} onChange={(e) => handleArrayChange('phases', index, 'timeframe', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none" />
                        <input placeholder="Phase Title" value={item.title || ''} onChange={(e) => handleArrayChange('phases', index, 'title', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none md:col-span-2" />
                        <textarea placeholder="Description" value={item.description || ''} onChange={(e) => handleArrayChange('phases', index, 'description', e.target.value)} rows={2} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none md:col-span-3 resize-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <h2 className="text-xl font-bold border-b border-black/5 pb-3">05 · Capabilities (The Bench)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Section Heading</label>
                  <input type="text" value={formData.capabilitiesHeading} onChange={(e) => setFormData({...formData, capabilitiesHeading: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Section Subtext</label>
                  <textarea value={formData.capabilitiesSubtext} onChange={(e) => setFormData({...formData, capabilitiesSubtext: e.target.value})} rows={2} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 resize-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Footer Notice / Things we don't do</label>
                  <input type="text" value={formData.capabilitiesFooter} onChange={(e) => setFormData({...formData, capabilitiesFooter: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">Capabilities List</h3>
                  <button type="button" onClick={() => addItem('capabilities', { number: '', title: '', description: '' })} className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg">➕ Add Capability</button>
                </div>
                <div className="space-y-4">
                  {(formData.capabilities || []).map((item, index) => (
                    <div key={item.id || index} className="p-5 border border-black/10 rounded-xl relative bg-stone-50">
                      <button type="button" onClick={() => removeItem('capabilities', index)} className="absolute top-4 right-4 text-red-500 font-bold text-xs">❌ Remove</button>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pr-16">
                        <input placeholder="Capability Number (e.g. 01)" value={item.number || ''} onChange={(e) => handleArrayChange('capabilities', index, 'number', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none" />
                        <input placeholder="Capability Title" value={item.title || ''} onChange={(e) => handleArrayChange('capabilities', index, 'title', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none md:col-span-2" />
                        <textarea placeholder="Description" value={item.description || ''} onChange={(e) => handleArrayChange('capabilities', index, 'description', e.target.value)} rows={2} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-sm focus:border-orange-500 outline-none md:col-span-3 resize-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* TAB 4: CASES & DRIFT */}
        {activeTab === 'cases' && (
          <>
            <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <h2 className="text-xl font-bold border-b border-black/5 pb-3">06 · Selected Work (Cases)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Section Heading</label>
                  <input type="text" value={formData.casesHeading} onChange={(e) => setFormData({...formData, casesHeading: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Section Subtext</label>
                  <textarea value={formData.casesSubtext} onChange={(e) => setFormData({...formData, casesSubtext: e.target.value})} rows={2} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 resize-none" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">Cases List (3 cases recommended)</h3>
                  <button type="button" onClick={() => addItem('cases', { caseLetter: '', year: '', type: 'RAG', location: '', title: '', description: '', wedge: '', result: '', resultLabel: '' })} className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg">➕ Add Case</button>
                </div>
                <div className="space-y-4">
                  {(formData.cases || []).map((item, index) => (
                    <div key={item.id || index} className="p-5 border border-black/10 rounded-xl relative bg-stone-50">
                      <button type="button" onClick={() => removeItem('cases', index)} className="absolute top-4 right-4 text-red-500 font-bold text-xs">❌ Remove</button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 pr-16">
                        <input placeholder="Letter Group (e.g. Case · A)" value={item.caseLetter || ''} onChange={(e) => handleArrayChange('cases', index, 'caseLetter', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2 text-xs focus:border-orange-500 outline-none font-bold" />
                        <input placeholder="Year (e.g. 2024)" value={item.year || ''} onChange={(e) => handleArrayChange('cases', index, 'year', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2 text-xs focus:border-orange-500 outline-none" />
                        <div className="flex flex-col">
                          <select value={item.type || 'RAG'} onChange={(e) => handleArrayChange('cases', index, 'type', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2 text-xs focus:border-orange-500 outline-none">
                            <option value="RAG">RAG (Intake & Triage SVG)</option>
                            <option value="Pipeline">Pipeline (Arrow Handoff SVG)</option>
                            <option value="Embed">Embed (Bar Chart SVG)</option>
                          </select>
                        </div>
                        <input placeholder="Location / Client Size" value={item.location || ''} onChange={(e) => handleArrayChange('cases', index, 'location', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2 text-xs focus:border-orange-500 outline-none" />
                        
                        <input placeholder="Vignette Title" value={item.title || ''} onChange={(e) => handleArrayChange('cases', index, 'title', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2 text-xs focus:border-orange-500 outline-none sm:col-span-2 md:col-span-4" />
                        <textarea placeholder="Description" value={item.description || ''} onChange={(e) => handleArrayChange('cases', index, 'description', e.target.value)} rows={2} className="w-full bg-white border border-black/10 rounded-lg p-2 text-xs focus:border-orange-500 outline-none sm:col-span-2 md:col-span-4 resize-none" />

                        <input placeholder="Wedge (e.g. Intake)" value={item.wedge || ''} onChange={(e) => handleArrayChange('cases', index, 'wedge', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2 text-xs focus:border-orange-500 outline-none" />
                        <input placeholder="Result label (e.g. Wk 12 result)" value={item.resultLabel || ''} onChange={(e) => handleArrayChange('cases', index, 'resultLabel', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2 text-xs focus:border-orange-500 outline-none" />
                        <input placeholder="Result value (e.g. 12 hrs saved)" value={item.result || ''} onChange={(e) => handleArrayChange('cases', index, 'result', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2 text-xs focus:border-orange-500 outline-none sm:col-span-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <h2 className="text-xl font-bold border-b border-black/5 pb-3">07 · Drift Strip (Mantra)</h2>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Marquee Text (Looping strip contents)</label>
                <input type="text" value={formData.driftText} onChange={(e) => setFormData({...formData, driftText: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 font-mono text-sm" />
                <p className="text-[11px] text-black/40 mt-1">Tip: Wrap words in <code>&lt;span class="frauncesItalic text-terra"&gt;word&lt;/span&gt;</code> to italicize parts.</p>
              </div>
            </section>
          </>
        )}

        {/* TAB 5: LOCATIONS & FIT CALL */}
        {activeTab === 'locations' && (
          <>
            <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <h2 className="text-xl font-bold border-b border-black/5 pb-3">08 · Where We Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Section Heading</label>
                  <input type="text" value={formData.whereWeWorkHeading} onChange={(e) => setFormData({...formData, whereWeWorkHeading: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Section Subtext</label>
                  <textarea value={formData.whereWeWorkSubtext} onChange={(e) => setFormData({...formData, whereWeWorkSubtext: e.target.value})} rows={2} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 resize-none" />
                </div>
              </div>

              {/* Work details table rows */}
              <div className="mt-6 border-t border-black/5 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">Studio Specs (e.g. Languages, Coverage)</h3>
                  <button type="button" onClick={() => addItem('whereWeWorkDetails', { label: '', value: '' })} className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg">➕ Add Spec</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(formData.whereWeWorkDetails || []).map((item, index) => (
                    <div key={item.id || index} className="p-4 border border-black/10 rounded-xl bg-stone-50 relative">
                      <button type="button" onClick={() => removeItem('whereWeWorkDetails', index)} className="absolute top-2 right-2 text-red-500 font-bold text-xs">❌</button>
                      <div className="space-y-3 mt-4">
                        <input placeholder="Label (e.g. Languages)" value={item.label || ''} onChange={(e) => handleArrayChange('whereWeWorkDetails', index, 'label', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2 text-xs focus:border-orange-500 outline-none" />
                        <input placeholder="Value (e.g. English · Tamil)" value={item.value || ''} onChange={(e) => handleArrayChange('whereWeWorkDetails', index, 'value', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2 text-xs focus:border-orange-500 outline-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hubs (Dubai & Chennai cards) */}
              <div className="mt-8 border-t border-black/5 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">Physical Hubs (2 cards recommended)</h3>
                  <button type="button" onClick={() => addItem('hubs', { number: '', timezone: '', name: '', label: '', description: '' })} className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 rounded-lg">➕ Add Hub</button>
                </div>
                <div className="space-y-4">
                  {(formData.hubs || []).map((item, index) => (
                    <div key={item.id || index} className="p-5 border border-black/10 rounded-xl relative bg-stone-50">
                      <button type="button" onClick={() => removeItem('hubs', index)} className="absolute top-4 right-4 text-red-500 font-bold text-xs">❌ Remove</button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 pr-16">
                        <input placeholder="Hub number (e.g. Hub · 01)" value={item.number || ''} onChange={(e) => handleArrayChange('hubs', index, 'number', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-xs focus:border-orange-500 outline-none" />
                        <input placeholder="Timezone (e.g. GMT +4)" value={item.timezone || ''} onChange={(e) => handleArrayChange('hubs', index, 'timezone', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-xs focus:border-orange-500 outline-none" />
                        <input placeholder="City Name" value={item.name || ''} onChange={(e) => handleArrayChange('hubs', index, 'name', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-xs focus:border-orange-500 outline-none font-bold" />
                        <input placeholder="Label (e.g. Strategy & design)" value={item.label || ''} onChange={(e) => handleArrayChange('hubs', index, 'label', e.target.value)} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-xs focus:border-orange-500 outline-none" />
                        <textarea placeholder="Description" value={item.description || ''} onChange={(e) => handleArrayChange('hubs', index, 'description', e.target.value)} rows={2} className="w-full bg-white border border-black/10 rounded-lg p-2.5 text-xs focus:border-orange-500 outline-none sm:col-span-2 md:col-span-4 resize-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <h2 className="text-xl font-bold border-b border-black/5 pb-3">09 · Fit Call CTA Banner</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Intro Label (e.g. If you've read this far)</label>
                  <input type="text" value={formData.fitCallIntro} onChange={(e) => setFormData({...formData, fitCallIntro: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Main Call-To-Action Heading</label>
                  <input type="text" value={formData.fitCallHeading} onChange={(e) => setFormData({...formData, fitCallHeading: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                  <p className="text-[11px] text-black/40 mt-1">Tip: Wrap words in <code>&lt;span class="frauncesItalic text-terra"&gt;word&lt;/span&gt;</code> to italicize parts.</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Supporting Text</label>
                  <textarea value={formData.fitCallText} onChange={(e) => setFormData({...formData, fitCallText: e.target.value})} rows={3} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500 resize-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Button Label</label>
                  <input type="text" value={formData.fitCallButtonText} onChange={(e) => setFormData({...formData, fitCallButtonText: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">Button Action Link</label>
                  <input type="text" value={formData.fitCallButtonLink} onChange={(e) => setFormData({...formData, fitCallButtonLink: e.target.value})} className="w-full bg-stone-100 border border-black/5 rounded-xl p-4 focus:outline-none focus:border-orange-500" />
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageAbout;
