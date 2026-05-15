import React, { useState, useCallback } from 'react';
import client from '../../api/client';
import { Upload, Loader2, Image as ImageIcon, X } from 'lucide-react';

const ImageUploader = ({ onUploadSuccess, label = "Cover Image" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = useCallback(async (file) => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);

    try {
      // Create form data for multipart upload
      const formData = new FormData();
      formData.append('file', file);

      const response = await client.post(`/api/upload?filename=${file.name}&contentType=${file.type}`, file, {
        headers: {
          'Content-Type': file.type
        }
      });

      const url = response.data.url;
      setPreview(url);
      onUploadSuccess(url);
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Check your connection or file size.');
    } finally {
      setIsUploading(false);
    }
  }, [onUploadSuccess]);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    handleUpload(file);
  };

  const clearPreview = (e) => {
    e.preventDefault();
    setPreview(null);
    onUploadSuccess(null);
  };

  return (
    <div className="space-y-3">
      <label className="font-mono text-[10px] uppercase tracking-widest text-[#00ff00]/60 font-bold ml-1">
        {label}
      </label>
      
      <div className={`relative group border-2 border-dashed transition-all duration-500 rounded-2xl h-48 flex flex-col items-center justify-center overflow-hidden
        ${preview ? 'border-[#00ff00]/40 bg-[#111]' : 'border-white/10 hover:border-[#00ff00]/30 bg-black/40'}
      `}>
        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-[#00ff00] animate-spin" />
            <span className="font-mono text-[10px] uppercase text-[#00ff00]/60">Uploading to Labz...</span>
          </div>
        ) : preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
            <button 
              onClick={clearPreview}
              className="absolute top-4 right-4 p-2 bg-black/60 rounded-full hover:bg-red-500/80 transition-colors border border-white/10"
            >
              <X size={16} className="text-white" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="bg-black/60 px-4 py-2 rounded-full border border-[#00ff00]/20 font-mono text-[10px] uppercase text-[#00ff00]">Image Ready</span>
            </div>
          </>
        ) : (
          <>
            <input 
              type="file" 
              accept="image/*" 
              className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              onChange={onFileChange}
            />
            <div className="flex flex-col items-center gap-3 group-hover:translate-y-[-5px] transition-transform">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00ff00]/10 group-hover:border-[#00ff00]/20 transition-colors">
                <Upload size={20} className="text-white/40 group-hover:text-[#00ff00] transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-white/60 group-hover:text-white">Drop image or click</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mt-1">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </>
        )}
      </div>
      {error && <p className="font-mono text-[10px] text-red-500 mt-2 ml-1">Error: {error}</p>}
    </div>
  );
};

export default ImageUploader;
