import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../api/client';
import ImageUpload from '../components/common/ImageUpload';
import InsightEditor from '../components/common/InsightEditor';
import { ArrowLeft, Save, Globe, Loader2, Tag, Search } from 'lucide-react';

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

const InsightForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: null,
    category: 'Field Notes',
    seoTitle: '',
    seoDescription: '',
    status: 'DRAFT',
  });

  // Fetch existing insight for editing
  useEffect(() => {
    if (!isEditing) return;
    const fetchInsight = async () => {
      try {
        const res = await client.get(`/insights/${id}?admin=true`);
        setForm({
          title: res.data.title || '',
          slug: res.data.slug || '',
          excerpt: res.data.excerpt || '',
          content: res.data.content || '',
          coverImage: res.data.coverImage || null,
          category: res.data.category || 'Field Notes',
          seoTitle: res.data.seoTitle || '',
          seoDescription: res.data.seoDescription || '',
          status: res.data.status || 'DRAFT',
        });
        setSlugEdited(true); // Don't auto-overwrite existing slug
      } catch (err) {
        console.error('Failed to load insight:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsight();
  }, [id, isEditing]);

  // Auto-generate slug from title
  const handleTitleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugEdited ? prev.slug : slugify(value),
    }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) return alert('Title is required.');
    if (!form.slug.trim()) return alert('Slug is required.');

    setSaving(true);
    try {
      if (isEditing) {
        await client.put(`/insights/${id}`, form);
      } else {
        await client.post('/insights', form);
      }
      navigate('/insights');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save insight.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin text-[#c84b21]" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/insights')}
            className="p-3 rounded-xl bg-white border border-black/5 text-gray-400 hover:text-[#1a1a1a] hover:border-[#c84b21] transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h3 className="text-3xl font-bold tracking-tighter">
              {isEditing ? 'Edit' : 'New'}{' '}
              <span className="font-serif italic text-[#c84b21]">Insight.</span>
            </h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
              {isEditing ? 'Modify existing report' : 'Create a new knowledge report'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Status Toggle */}
          <button
            type="button"
            onClick={() => handleChange('status', form.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
              form.status === 'PUBLISHED'
                ? 'bg-green-50 text-green-600 border-green-200'
                : 'bg-yellow-50 text-yellow-600 border-yellow-200'
            }`}
          >
            <Globe size={14} />
            {form.status === 'PUBLISHED' ? 'Published' : 'Draft'}
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#1a1a1a] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#c84b21] transition-all flex items-center gap-2 shadow-xl shadow-black/10 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
            {saving ? 'Saving...' : 'Save Report'}
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
            Report Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter a compelling title..."
            className="w-full p-6 bg-white rounded-2xl border border-black/5 outline-none focus:border-[#c84b21] transition-all text-2xl font-bold placeholder:text-gray-300 shadow-sm"
          />
        </div>

        {/* Category & Slug */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
              Category
            </label>
            <div className="relative">
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full p-5 bg-white rounded-2xl border border-black/5 outline-none focus:border-[#c84b21] transition-all font-bold text-sm appearance-none cursor-pointer shadow-sm"
              >
                <option value="Field Notes">Field Notes</option>
                <option value="Playbook">Playbook</option>
                <option value="Case Note">Case Note</option>
              </select>
              <Tag size={16} className="absolute right-5 top-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="md:col-span-8">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
              URL Slug
            </label>
            <div className="flex items-center bg-white rounded-2xl border border-black/5 overflow-hidden focus-within:border-[#c84b21] transition-all shadow-sm">
              <span className="pl-5 pr-2 text-gray-300 font-bold text-sm">/insights/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => {
                  setSlugEdited(true);
                  handleChange('slug', slugify(e.target.value));
                }}
                placeholder="auto-generated-slug"
                className="flex-grow p-5 pl-0 outline-none font-bold text-sm text-[#1a1a1a] placeholder:text-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
            Excerpt (Summary)
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            placeholder="A brief summary for the blog listing page..."
            rows={3}
            className="w-full p-5 bg-white rounded-2xl border border-black/5 outline-none focus:border-[#c84b21] transition-all font-bold text-sm resize-none placeholder:text-gray-300 shadow-sm"
          />
        </div>

        {/* SEO Section */}
        <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-black/5 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Search size={18} className="text-[#c84b21]" />
            <h4 className="font-bold text-base tracking-tight">Search Engine Optimization</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
                SEO Title
              </label>
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => handleChange('seoTitle', e.target.value)}
                placeholder="Custom SEO Title (optional)"
                className="w-full p-5 bg-white rounded-2xl border border-black/5 outline-none focus:border-[#c84b21] transition-all font-bold text-sm placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
                SEO Description
              </label>
              <input
                type="text"
                value={form.seoDescription}
                onChange={(e) => handleChange('seoDescription', e.target.value)}
                placeholder="Custom SEO Description (optional)"
                className="w-full p-5 bg-white rounded-2xl border border-black/5 outline-none focus:border-[#c84b21] transition-all font-bold text-sm placeholder:text-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <ImageUpload
          value={form.coverImage}
          onChange={(url) => handleChange('coverImage', url)}
        />

        {/* Rich Text Content */}
        <InsightEditor
          content={form.content}
          onChange={(html) => handleChange('content', html)}
        />
      </div>
    </div>
  );
};

export default InsightForm;
