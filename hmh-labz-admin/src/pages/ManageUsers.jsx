import { useState, useEffect } from 'react';
import client from '../api/client';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, UserPlus, MoreVertical, Search, Loader2 } from 'lucide-react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Note: This endpoint needs to be implemented/accessible for SUPERADMIN
      const response = await client.get('/auth/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      // Fallback/Mock for demonstration if API is not fully ready
      setUsers([
        { id: 1, firstName: 'Alex', lastName: 'Thompson', email: 'alex@hmhlabz.com', role: 'SUPERADMIN', createdAt: '2026-01-12' },
        { id: 2, firstName: 'Sarah', lastName: 'Lund', email: 'sarah@hmhlabz.com', role: 'ADMIN', createdAt: '2026-02-15' },
        { id: 3, firstName: 'James', lastName: 'Chen', email: 'james@hmhlabz.com', role: 'MODERATOR', createdAt: '2026-03-20' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h3 className="text-3xl font-bold tracking-tighter">Identity <span className="font-serif italic text-brand-orange">Control.</span></h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Global user management</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter users..." 
              className="w-full pl-12 pr-6 py-4 bg-white border border-black/5 rounded-2xl outline-none focus:border-brand-orange transition-all font-bold text-sm"
            />
          </div>
          <button className="bg-brand-charcoal text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-orange transition-all flex items-center gap-2">
            <UserPlus size={16} /> Add User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] overflow-hidden border border-black/5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Identity</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Access Level</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Registered</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <Loader2 className="animate-spin text-brand-orange mx-auto" size={32} />
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-brand-cream/30 transition-colors">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-tan flex items-center justify-center font-black text-brand-charcoal text-lg">
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-brand-charcoal">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                        user.role === 'SUPERADMIN' ? 'bg-brand-charcoal text-white border-brand-charcoal' : 
                        user.role === 'ADMIN' ? 'bg-orange-50 text-brand-orange border-orange-100' : 
                        'bg-gray-50 text-gray-600 border-gray-100'
                      }`}>
                        {user.role === 'SUPERADMIN' ? <ShieldAlert size={14} /> : <Shield size={14} />}
                        <span className="text-[10px] font-black uppercase tracking-widest">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-sm font-bold text-brand-charcoal">{user.createdAt}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active System Node</p>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button className="p-2 text-gray-400 hover:text-brand-charcoal transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
