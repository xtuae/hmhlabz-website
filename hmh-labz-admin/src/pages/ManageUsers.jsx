import { useState, useEffect } from 'react';
import client from '../api/client';
import { Shield, ShieldAlert, UserPlus, Search, Loader2, Edit, Trash2, UserCheck, UserX, X } from 'lucide-react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'ADMIN', status: 'ACTIVE' });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await client.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([
        { id: '1', name: 'Alex Thompson', email: 'alex@hmhlabz.com', role: 'SUPERADMIN', status: 'ACTIVE', createdAt: '2026-01-12' },
        { id: '2', name: 'Sarah Lund', email: 'sarah@hmhlabz.com', role: 'ADMIN', status: 'ACTIVE', createdAt: '2026-02-15' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedUser(null);
    setFormData({ name: '', email: '', password: '', role: 'ADMIN', status: 'ACTIVE' });
    setFormError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setFormData({ name: user.name || '', email: user.email || '', password: '', role: user.role || 'ADMIN', status: user.status || 'ACTIVE' });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    try {
      if (modalMode === 'create') {
        await client.post('/admin/users', formData);
      } else {
        const updatePayload = { name: formData.name, email: formData.email, role: formData.role, status: formData.status };
        if (formData.password) updatePayload.password = formData.password;
        await client.put(`/admin/users/${selectedUser.id}`, updatePayload);
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save user.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      const newStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
      await client.put(`/admin/users/${user.id}`, { status: newStatus });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (user) => {
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return;
    try {
      await client.delete(`/admin/users/${user.id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h3 className="text-3xl font-bold tracking-tighter">Identity <span className="font-serif italic text-[#c84b21]">Control.</span></h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Global user management</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter users..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-black/5 rounded-2xl outline-none focus:border-[#c84b21] transition-all font-bold text-sm"
            />
          </div>
          <button onClick={handleOpenCreate} className="bg-[#1a1a1a] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#c84b21] transition-all flex items-center gap-2 shadow-lg shadow-black/10">
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
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Registered</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <Loader2 className="animate-spin text-[#c84b21] mx-auto" size={32} />
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-gray-400 font-medium">No users found matching filter.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className={`hover:bg-[#f5f1e8]/30 transition-colors ${user.status === 'SUSPENDED' ? 'opacity-60' : ''}`}>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#EDE6D3] flex items-center justify-center font-black text-[#1a1a1a] text-lg uppercase border border-black/5">
                          {user.name?.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-[#1a1a1a]">{user.name}</p>
                          <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                        user.role === 'SUPERADMIN' ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 
                        user.role === 'ADMIN' ? 'bg-[#c84b21]/10 text-[#c84b21] border-[#c84b21]/20' : 
                        'bg-gray-50 text-gray-600 border-gray-100'
                      }`}>
                        {user.role === 'SUPERADMIN' ? <ShieldAlert size={14} /> : <Shield size={14} />}
                        <span className="text-[10px] font-black uppercase tracking-widest">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                        user.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {user.status || 'ACTIVE'}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-sm font-bold text-[#1a1a1a]">{new Date(user.createdAt).toLocaleDateString()}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active System Node</p>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenEdit(user)} title="Edit User" className="p-2.5 text-gray-400 hover:text-[#c84b21] hover:bg-[#c84b21]/10 rounded-xl transition-all">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleToggleStatus(user)} title={user.status === 'ACTIVE' ? 'Suspend User' : 'Activate User'} className={`p-2.5 rounded-xl transition-all ${user.status === 'ACTIVE' ? 'text-gray-400 hover:text-amber-600 hover:bg-amber-50' : 'text-amber-600 bg-amber-50 hover:bg-amber-100'}`}>
                          {user.status === 'ACTIVE' ? <UserX size={18} /> : <UserCheck size={18} />}
                        </button>
                        <button onClick={() => handleDelete(user)} title="Delete User" className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full border border-black/5 shadow-2xl space-y-8 relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setModalOpen(false)} className="absolute top-8 right-8 p-2 text-gray-400 hover:text-[#1a1a1a] rounded-full hover:bg-gray-100 transition-colors">
              <X size={20} />
            </button>
            
            <div>
              <h3 className="text-2xl font-black tracking-tight uppercase">{modalMode === 'create' ? 'Add New' : 'Edit'} <span className="font-serif italic text-[#c84b21]">User</span></h3>
              <p className="text-xs text-gray-400 font-mono uppercase tracking-widest mt-1">Configure system credentials & access</p>
            </div>

            {formError && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-xs font-bold uppercase tracking-widest">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Display Name</label>
                <input 
                  required 
                  type="text" 
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                <input 
                  required 
                  type="email" 
                  placeholder="jane@hmhlabz.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{modalMode === 'create' ? 'Password' : 'New Password (Optional)'}</label>
                <input 
                  required={modalMode === 'create'} 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Access Role</label>
                  <select 
                    value={formData.role} 
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm appearance-none cursor-pointer"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPERADMIN">SUPERADMIN</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Status</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-[#f5f1e8]/50 border border-black/5 focus:border-[#c84b21] outline-none font-bold text-sm appearance-none cursor-pointer"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setModalOpen(false)} className="px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] text-gray-500 hover:bg-gray-100 transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={formLoading} className="bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#c84b21] transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-black/10">
                  {formLoading && <Loader2 size={14} className="animate-spin" />}
                  {modalMode === 'create' ? 'Create User' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
