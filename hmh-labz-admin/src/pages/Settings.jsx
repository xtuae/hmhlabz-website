import React, { useState, useEffect } from 'react';
import { User, Shield, Key, Save, Loader2, CheckCircle2, AlertCircle, Image } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import client from '../api/client';
import ImageUpload from '../components/common/ImageUpload';

const Settings = () => {
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [brandData, setBrandData] = useState({
    logoUrl: 'https://www.hmhlabz.com/wp-content/uploads/hmh-labz-black.png',
    faviconUrl: 'https://www.hmhlabz.com/wp-content/uploads/hmh-icon.webp'
  });

  useEffect(() => {
    client.get('/settings/brand')
      .then(res => {
        if (res.data) {
          setBrandData({
            logoUrl: res.data.logoUrl || 'https://www.hmhlabz.com/wp-content/uploads/hmh-labz-black.png',
            faviconUrl: res.data.faviconUrl || 'https://www.hmhlabz.com/wp-content/uploads/hmh-icon.webp'
          });
        }
      })
      .catch(err => console.error('Failed to fetch brand assets:', err));
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await client.put('/admin/settings/profile', {
        name: formData.name,
        email: formData.email
      });
      if (res.data) {
        updateUser({ ...user, name: res.data.name, email: res.data.email });
      }
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return setMessage({ type: 'error', text: 'New passwords do not match.' });
    }
    setLoading(true);
    setMessage(null);
    try {
      await client.put('/admin/settings/security', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      setMessage({ type: 'success', text: 'Password changed successfully.' });
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to change password.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBrandUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await client.put('/admin/settings/brand', brandData);
      setMessage({ type: 'success', text: 'Brand assets updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update brand assets.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-10 pb-20">
      <header className="px-4">
        <h2 className="text-3xl font-black tracking-tighter uppercase">Account <span className="font-serif italic text-[#c84b21]">Settings</span></h2>
        <p className="text-gray-500 text-sm mt-2 font-mono uppercase tracking-widest">
          User ID: {user?.id?.substring(0, 8)}... // Role: <span className="text-[#c84b21]">{user?.role}</span>
        </p>
      </header>

      {message && (
        <div className={`mx-4 p-4 rounded-2xl border flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-xs font-bold uppercase tracking-widest">{message.text}</span>
        </div>
      )}

      {/* Profile Section */}
      <form onSubmit={handleProfileUpdate} className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm p-10 space-y-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-[#c84b21]/5 rounded-xl text-[#c84b21]"><User size={20} /></div>
          <h3 className="text-xl font-bold tracking-tight">Profile Information</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Display Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" 
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="bg-[#1a1a1a] text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#c84b21] transition-all flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-black/10"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Profile
          </button>
        </div>
      </form>

      {/* Security Section */}
      <form onSubmit={handlePasswordUpdate} className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm p-10 space-y-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-[#c84b21]/5 rounded-xl text-[#c84b21]"><Shield size={20} /></div>
          <h3 className="text-xl font-bold tracking-tight">Security & Credentials</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Current Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={formData.currentPassword}
              onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" 
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">New Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Confirm New Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm" 
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-black/5 flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="bg-[#1a1a1a] text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#c84b21] transition-all flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-black/10"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Key size={14} />}
            Update Password
          </button>
        </div>
      </form>

      {/* Brand Assets Section */}
      <form onSubmit={handleBrandUpdate} className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm p-10 space-y-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-[#c84b21]/5 rounded-xl text-[#c84b21]"><Image size={20} /></div>
          <h3 className="text-xl font-bold tracking-tight">Brand Assets</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ImageUpload 
            label="Logo Image" 
            value={brandData.logoUrl} 
            onChange={(url) => setBrandData({...brandData, logoUrl: url})} 
          />
          <ImageUpload 
            label="Favicon Image" 
            value={brandData.faviconUrl} 
            onChange={(url) => setBrandData({...brandData, faviconUrl: url})} 
          />
        </div>

        <div className="pt-6 border-t border-black/5 flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="bg-[#1a1a1a] text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#c84b21] transition-all flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-black/10"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Brand Assets
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
