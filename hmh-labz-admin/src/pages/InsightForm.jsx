// VERSION_VERIFICATION_TAG: 2026-05-18-NUCLEAR-v1
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../api/client';
import ImageUpload from '../components/common/ImageUpload';
import InsightEditor from '../components/common/InsightEditor';
import { ArrowLeft, Save, Globe, Loader2 } from 'lucide-react';

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

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: null,
    category: 'Field Notes',
    tag: 'Field Notes',
    readTime: '5 min read',
    seoTitle: '',
    seoDescription: '',
    status: 'DRAFT',
  });

  useEffect(() => {
    if (!isEditing) return;
    const fetchInsight = async () => {
      try {
        const res = await client.get(`/insights/${id}?admin=true`);
        setFormData({
          title: res.data.title || '',
          slug: res.data.slug || '',
          excerpt: res.data.excerpt || '',
          content: res.data.content || '',
          coverImage: res.data.coverImage || null,
          category: res.data.category || 'Field Notes',
          tag: res.data.tag || res.data.category || 'Field Notes',
          readTime: res.data.readTime || '5 min read',
          seoTitle: res.data.seoTitle || '',
          seoDescription: res.data.seoDescription || '',
          status: res.data.status || 'DRAFT',
        });
        setSlugEdited(true);
      } catch (err) {
        console.error('Failed to load insight:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsight();
  }, [id, isEditing]);

  const handleTitleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: slugEdited ? prev.slug : slugify(value),
    }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) return alert('Title is required.');

    const payload = { 
      ...formData,
      category: formData.category || formData.tag || 'Field Notes',
      tag: formData.tag || formData.category || 'Field Notes',
      seoTitle: formData.seoTitle || '',
      seoDescription: formData.seoDescription || ''
    };

    if (!payload.slug || !payload.slug.trim()) {
      payload.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    setSaving(true);
    try {
      if (isEditing) {
        await client.put(`/insights/${id}`, payload);
      } else {
        await client.post('/insights', payload);
      }
      navigate('/insights');
    } catch (error) {
      alert("Save Failed: " + (error.response?.data?.error || error.message));
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
          <button
            type="button"
            onClick={() => handleChange('status', formData.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
              formData.status === 'PUBLISHED'
                ? 'bg-green-50 text-green-600 border-green-200'
                : 'bg-yellow-50 text-yellow-600 border-yellow-200'
            }`}
          >
            <Globe size={14} />
            {formData.status === 'PUBLISHED' ? 'Published' : 'Draft'}
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-[#1a1a1a] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#c84b21] transition-all flex items-center gap-2 shadow-xl shadow-black/10 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
            {saving ? 'Saving...' : 'Save Report'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
            Report Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter a compelling title..."
            className="w-full p-6 bg-white rounded-2xl border border-black/5 outline-none focus:border-[#c84b21] transition-all text-2xl font-bold placeholder:text-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
            URL Slug
          </label>
          <div className="flex items-center bg-white rounded-2xl border border-black/5 overflow-hidden focus-within:border-[#c84b21] transition-all shadow-sm">
            <span className="pl-5 pr-2 text-gray-300 font-bold text-sm">/insights/</span>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => {
                setSlugEdited(true);
                handleChange('slug', slugify(e.target.value));
              }}
              placeholder="auto-generated-slug"
              className="flex-grow p-5 pl-0 outline-none font-bold text-sm text-[#1a1a1a] placeholder:text-gray-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
            Excerpt (Summary)
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            placeholder="A brief summary for the blog listing page..."
            rows={3}
            className="w-full p-5 bg-white rounded-2xl border border-black/5 outline-none focus:border-[#c84b21] transition-all font-bold text-sm resize-none placeholder:text-gray-300 shadow-sm"
          />
        </div>

        {/* Category / Tag Combo Box */}
        <div className="mb-4">
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Category</label>
          <input 
            list="category-options" 
            className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none"
            value={formData.category || formData.tag || ''} 
            onChange={(e) => setFormData({ ...formData, category: e.target.value, tag: e.target.value })} 
            placeholder="Select or type a new category..."
          />
          <datalist id="category-options">
            <option value="Operations" />
            <option value="AI Workflows" />
            <option value="Engineering" />
            <option value="Playbooks" />
          </datalist>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
            Read Time
          </label>
          <input
            type="text"
            value={formData.readTime}
            onChange={(e) => handleChange('readTime', e.target.value)}
            placeholder="e.g., 5 min read"
            className="w-full p-5 bg-white rounded-2xl border border-black/5 outline-none focus:border-[#c84b21] transition-all font-bold text-sm placeholder:text-gray-300 shadow-sm"
          />
        </div>

        <ImageUpload
          value={formData.coverImage}
          onChange={(url) => handleChange('coverImage', url)}
        />

        {/* Note: Project relies on Tiptap (InsightEditor) internally instead of ReactQuill. */}
        <InsightEditor
          value={formData.content || ''}
          onChange={(val) => setFormData({ ...formData, content: val })}
        />

        {/* SEO Settings Panel */}
        <div className="mt-8 p-4 border border-black/10 bg-black/5">
          <h3 className="text-xs font-black uppercase tracking-widest text-ink mb-4">SEO Settings</h3>
          <div className="mb-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">SEO Title</label>
            <input 
              type="text"
              className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none"
              value={formData.seoTitle || ''} 
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} 
            />
          </div>
          <div className="mb-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">SEO Description</label>
            <textarea 
              className="w-full bg-transparent border-b border-black/20 p-2 text-ink focus:border-terra outline-none resize-y"
              value={formData.seoDescription || ''} 
              onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightForm;
