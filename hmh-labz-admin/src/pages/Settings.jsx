import React, { useState } from 'react';
import { User, Shield, Key, Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import client from '../api/client';

const Settings = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await client.put('/admin/settings/profile', {
        name: formData.name,
        email: formData.email
      });
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
      // Update local auth context if needed
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

  return (
    <div className="max-w-4xl space-y-10 pb-20">
      <header className="px-4">
        <h2 className="text-3xl font-black tracking-tighter uppercase">Account <span className="font-serif italic text-terra">Settings</span></h2>
        <p className="text-gray-500 text-sm mt-2 font-mono uppercase tracking-widest">
          User ID: {user?.id?.substring(0, 8)}... // Role: <span className="text-terra">{user?.role}</span>
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
          <div className="p-3 bg-terra/5 rounded-xl text-terra"><User size={20} /></div>
          <h3 className="text-xl font-bold tracking-tight">Profile Information</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Display Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-paper/50 border border-black/5 focus:border-terra outline-none font-bold text-sm" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl bg-paper/50 border border-black/5 focus:border-terra outline-none font-bold text-sm" 
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="bg-ink text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-terra transition-all flex items-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Changes
          </button>
        </div>
      </form>

      {/* Security Section */}
      <form onSubmit={handlePasswordUpdate} className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm p-10 space-y-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-terra/5 rounded-xl text-terra"><Shield size={20} /></div>
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
              className="w-full px-6 py-4 rounded-2xl bg-paper/50 border border-black/5 focus:border-terra outline-none font-bold text-sm" 
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
                className="w-full px-6 py-4 rounded-2xl bg-paper/50 border border-black/5 focus:border-terra outline-none font-bold text-sm" 
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
                className="w-full px-6 py-4 rounded-2xl bg-paper/50 border border-black/5 focus:border-terra outline-none font-bold text-sm" 
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-black/5 flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="bg-ink text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-terra transition-all flex items-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Key size={14} />}
            Update Security
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
