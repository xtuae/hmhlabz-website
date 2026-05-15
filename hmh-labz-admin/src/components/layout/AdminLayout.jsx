import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuthStore } from '../../store/authStore';
import { Menu, X, Bell, User as UserIcon } from 'lucide-react';
import logo from '../../assets/logo.png';

const AdminLayout = () => {
  const { user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f5f1e8] text-[#1a1a1a] overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] lg:hidden animate-in fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <div className={`fixed inset-y-0 left-0 z-[60] transform transition-transform duration-500 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>
      
      <main className="flex-grow flex flex-col h-screen overflow-y-auto lg:ml-72 bg-[#f5f1e8]">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#f5f1e8]/80 backdrop-blur-md px-6 py-6 lg:px-10 flex items-center justify-between border-b border-black/5">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 bg-white rounded-xl border border-black/5 text-[#1a1a1a] hover:border-[#c84b21]/30 transition-all"
            >
              <Menu size={20} />
            </button>
            <div>
              <h2 className="text-xl font-bold tracking-tighter italic font-serif">
                Admin <span className="text-[#c84b21]">Hub.</span>
              </h2>
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Strategy + Build Operational Control</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="p-3 bg-white rounded-xl border border-black/5 text-gray-400 hover:text-[#c84b21] hover:border-[#c84b21]/30 transition-all relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#c84b21] rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center space-x-4 pl-6 border-l border-black/5">
              <div className="hidden md:block text-right">
                <p className="text-xs font-black tracking-tight">{user?.firstName} {user?.lastName}</p>
                <p className="text-[9px] text-[#c84b21] font-black uppercase tracking-widest mt-0.5">{user?.role || 'Strategist'}</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-white border-2 border-black/5 shadow-sm overflow-hidden flex items-center justify-center text-[#1a1a1a] font-black hover:border-[#c84b21]/30 transition-all cursor-pointer group">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <span className="text-sm">{user?.firstName?.[0]}{user?.lastName?.[0]}</span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 lg:p-10 flex-grow max-w-[1600px] mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
