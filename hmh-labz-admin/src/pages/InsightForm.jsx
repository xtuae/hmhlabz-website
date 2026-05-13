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

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: null,
    published: false,
  });

  // Fetch existing insight for editing
  useEffect(() => {
    if (!isEditing) return;
    const fetchInsight = async () => {
      try {
        const res = await client.get(`/api/insights/${id}`);
        setForm({
          title: res.data.title || '',
          slug: res.data.slug || '',
          excerpt: res.data.excerpt || '',
          content: res.data.content || '',
          coverImage: res.data.coverImage || null,
          published: res.data.published || false,
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
        await client.put(`/api/insights/${id}`, form);
      } else {
        await client.post('/api/insights', form);
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
        <Loader2 className="animate-spin text-brand-orange" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/insights')}
            className="p-3 rounded-xl bg-white border border-black/5 text-gray-400 hover:text-brand-charcoal hover:border-brand-orange transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h3 className="text-3xl font-bold tracking-tighter">
              {isEditing ? 'Edit' : 'New'}{' '}
              <span className="font-serif italic text-brand-orange">Insight.</span>
            </h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
              {isEditing ? 'Modify existing report' : 'Create a new knowledge report'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Publish Toggle */}
          <button
            type="button"
            onClick={() => handleChange('published', !form.published)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
              form.published
                ? 'bg-green-50 text-green-600 border-green-200'
                : 'bg-gray-50 text-gray-400 border-gray-200'
            }`}
          >
            <Globe size={14} />
            {form.published ? 'Published' : 'Draft'}
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-brand-charcoal text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-orange transition-all flex items-center gap-2 shadow-xl shadow-brand-charcoal/10 disabled:opacity-50"
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
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
            Report Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter a compelling title..."
            className="w-full p-5 bg-white rounded-2xl border border-black/5 outline-none focus:border-brand-orange transition-all text-2xl font-bold placeholder:text-gray-300"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
            URL Slug
          </label>
          <div className="flex items-center bg-white rounded-2xl border border-black/5 overflow-hidden focus-within:border-brand-orange transition-all">
            <span className="pl-5 pr-2 text-gray-300 font-bold text-sm">/insights/</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => {
                setSlugEdited(true);
                handleChange('slug', slugify(e.target.value));
              }}
              placeholder="auto-generated-slug"
              className="flex-grow p-5 pl-0 outline-none font-bold text-sm text-brand-charcoal placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
            Excerpt
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            placeholder="A brief summary for the blog listing page..."
            rows={3}
            className="w-full p-5 bg-white rounded-2xl border border-black/5 outline-none focus:border-brand-orange transition-all font-bold text-sm resize-none placeholder:text-gray-300"
          />
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
