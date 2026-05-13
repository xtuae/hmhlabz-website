import { useState, useRef } from 'react';
import client from '../../api/client';
import { Upload, X, Loader2, ImageIcon, CheckCircle } from 'lucide-react';

const ImageUpload = ({ value, onChange, label = 'Cover Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File must be under 5MB.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const response = await client.put(
        `/api/upload?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`,
        file,
        {
          headers: { 'Content-Type': file.type },
        }
      );
      onChange(response.data.url);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
        {label}
      </label>

      {value ? (
        <div className="relative rounded-[24px] overflow-hidden border border-black/5 group">
          <img
            src={value}
            alt="Cover preview"
            className="w-full h-56 object-cover"
          />
          <div className="absolute inset-0 bg-brand-charcoal/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-white text-red-500 p-3 rounded-xl hover:bg-red-50 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="absolute top-3 right-3 bg-green-500 text-white p-1.5 rounded-full">
            <CheckCircle size={14} />
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`
            relative cursor-pointer rounded-[24px] border-2 border-dashed p-12
            flex flex-col items-center justify-center gap-4 transition-all
            ${dragOver
              ? 'border-brand-orange bg-brand-orange/5'
              : 'border-gray-200 hover:border-brand-orange hover:bg-brand-orange/5'
            }
            ${uploading ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          {uploading ? (
            <>
              <Loader2 className="animate-spin text-brand-orange" size={32} />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Uploading to CDN...
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300">
                <ImageIcon size={32} />
              </div>
              <p className="text-sm font-bold text-brand-charcoal">
                Drop an image here, or <span className="text-brand-orange">browse</span>
              </p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                PNG, JPG, WebP — Max 5MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {error && (
        <p className="mt-3 text-xs font-bold text-red-500 uppercase tracking-tight">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
