import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import client from '../api/client';
import HtmlEditor from '../components/ui/HtmlEditor';
import ImageUploader from '../components/ui/ImageUploader';
import { ArrowLeft, Save, Eye, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

const ManageContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });
  
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '<!-- Start writing your Cyber-Lab content here -->\n<div class="lab-container">\n  <h2>Title Here</h2>\n  <p>Content goes here...</p>\n</div>',
    coverImage: null,
    published: false,
    category: 'Field Notes'
  });

  useEffect(() => {
    if (!isEditing) return;
    const fetchContent = async () => {
      try {
        const response = await client.get(`/api/insights/${id}`);
        setForm(response.data);
      } catch (err) {
        setStatus({ type: 'error', message: 'Failed to load content' });
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [id, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updates = { [name]: value };
      if (name === 'title' && !isEditing) {
        updates.slug = slugify(value);
      }
      return { ...prev, ...updates };
    });
  };

  const handleSave = async (publishOverride = null) => {
    const isPublished = publishOverride !== null ? publishOverride : form.published;
    
    setSaving(true);
    setStatus({ type: null, message: '' });

    try {
      const payload = { ...form, published: isPublished };
      if (isEditing) {
        await client.put(`/api/insights/${id}`, payload);
      } else {
        await client.post('/api/insights', payload);
      }
      
      setStatus({ type: 'success', message: `Content ${isPublished ? 'published' : 'saved as draft'} successfully!` });
      setTimeout(() => navigate('/insights'), 1500);
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to save content' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#00ff00] animate-spin mb-4" />
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#00ff00]/60">Initializing Editor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-6">
          <Link to="/insights" className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white hover:border-[#00ff00]/30 transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">
              {isEditing ? 'Edit' : 'Create'} <span className="font-serif italic text-[#C2410C]">Insight.</span>
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-1">
              Phase 2 — Advanced Content Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 font-mono text-[10px] uppercase tracking-widest text-white/60 hover:bg-white/10 transition-all disabled:opacity-50"
          >
            Save Draft
          </button>
          <button 
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-[#C2410C] font-mono text-[10px] uppercase tracking-widest text-white font-bold hover:bg-[#D9480F] transition-all flex items-center gap-2 shadow-lg shadow-[#C2410C]/20 disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isEditing ? 'Update & Publish' : 'Publish to Lab'}
          </button>
        </div>
      </div>

      {status.message && (
        <div className={`mb-8 p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2
          ${status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}
        `}>
          {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-medium">{status.message}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Title Input */}
          <div className="space-y-3">
            <label className="font-mono text-[10px] uppercase tracking-widest text-[#00ff00]/60 font-bold ml-1">
              Article Title
            </label>
            <input 
              type="text"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              placeholder="e.g. The Future of AI in Service Operations"
              className="w-full bg-black/40 border-2 border-white/10 rounded-2xl p-6 text-2xl font-bold placeholder:text-white/10 focus:border-[#00ff00]/40 outline-none transition-all shadow-inner"
            />
          </div>

          {/* HTML Editor */}
          <div className="space-y-3">
            <label className="font-mono text-[10px] uppercase tracking-widest text-[#00ff00]/60 font-bold ml-1">
              Markup Content (HTML)
            </label>
            <HtmlEditor 
              value={form.content}
              onChange={(val) => setForm(prev => ({ ...prev, content: val }))}
            />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4 space-y-8">
          {/* Metadata Card */}
          <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-8 space-y-6">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 border-b border-white/5 pb-4 mb-2">
              Article Metadata
            </h3>
            
            {/* Slug */}
            <div className="space-y-2">
              <label className="font-mono text-[9px] uppercase tracking-widest text-white/30">URL Slug</label>
              <input 
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-[#00ff00]/80 focus:border-[#00ff00]/40 outline-none transition-all"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="font-mono text-[9px] uppercase tracking-widest text-white/30">Category</label>
              <select 
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/80 focus:border-[#00ff00]/40 outline-none transition-all appearance-none"
              >
                <option>Field Notes</option>
                <option>Playbook</option>
                <option>Case Note</option>
              </select>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label className="font-mono text-[9px] uppercase tracking-widest text-white/30">Excerpt</label>
              <textarea 
                name="excerpt"
                value={form.excerpt}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/60 focus:border-[#00ff00]/40 outline-none transition-all resize-none"
                placeholder="Brief summary for listings..."
              />
            </div>
          </div>

          {/* Media Card */}
          <ImageUploader 
            onUploadSuccess={(url) => setForm(prev => ({ ...prev, coverImage: url }))}
            value={form.coverImage}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageContent;
