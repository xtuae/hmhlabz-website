import { useAuthStore } from '../store/authStore';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Rocket, Users, Settings, LogOut } from 'lucide-react';

const UserDashboard = () => {
  const { user, logout, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, active: true },
    { name: 'Projects', icon: Rocket },
    { name: 'Teams', icon: Users },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-paper flex flex-col md:flex-row">
      {/* Sidebar (Desktop) */}
      <aside className="w-full md:w-72 bg-brand-ink text-white p-8 flex flex-col">
        <div className="mb-16">
          <Link to="/" className="text-2xl font-black tracking-tighter uppercase">
            S <span className="text-brand-terra">+</span> B
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mt-2">Client Portal</p>
        </div>

        <nav className="flex-grow space-y-3">
          {navItems.map((item) => (
            <button 
              key={item.name}
              className={`flex items-center space-x-4 p-4 w-full rounded-2xl transition-all font-bold text-sm ${
                item.active ? 'bg-brand-terra text-white shadow-xl shadow-brand-terra/20' : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/10 mt-8">
          <button 
            onClick={logout}
            className="flex items-center space-x-4 p-4 w-full rounded-2xl text-gray-500 hover:text-brand-terra hover:bg-brand-terra/5 transition-all font-bold text-sm"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow p-6 lg:p-12 space-y-10 overflow-y-auto max-h-screen">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-5xl font-black tracking-tighter leading-tight">
              Project <span className="font-serif italic text-brand-terra">Status.</span>
            </h2>
            <p className="text-gray-500 font-medium">Live operational metrics for your current sprint.</p>
          </div>
          <div className="flex items-center space-x-6 bg-white p-4 rounded-[32px] border border-black/5 shadow-sm">
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Node</p>
              <p className="text-sm font-black">{user?.firstName} {user?.lastName}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-brand-tan flex items-center justify-center font-black text-brand-ink text-xl border border-black/5 shadow-inner">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-brand-ink text-white p-10 rounded-[40px] relative overflow-hidden group border border-white/5 shadow-2xl shadow-brand-ink/10">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Sprint Completion</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-7xl font-black italic">84</span>
              <span className="text-4xl font-bold text-brand-terra">%</span>
            </div>
            <p className="mt-4 text-xs text-gray-500 font-bold uppercase tracking-tight">System Optimal</p>
          </div>

          <div className="bg-brand-tan p-10 rounded-[40px] border border-brand-ink/5 relative overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-6">Value Generated</p>
            <div className="flex items-baseline space-x-1 text-brand-ink">
              <span className="text-4xl font-bold text-brand-terra italic">$</span>
              <span className="text-7xl font-black italic">2.4</span>
              <span className="text-4xl font-bold italic">M</span>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] border border-black/5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Active Tracks</p>
            <div className="flex items-baseline space-x-8">
              <div className="text-7xl font-black italic text-brand-ink">2</div>
              <div className="text-7xl font-black italic text-brand-terra">12</div>
            </div>
            <div className="flex justify-between mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <span>Strategy</span>
              <span>Build</span>
            </div>
          </div>
        </div>

        {/* Tracks Grid */}
        <div>
          <h3 className="text-2xl font-black mb-8 tracking-tight">Active <span className="font-serif italic text-brand-terra">Pipelines.</span></h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[40px] border border-black/5 shadow-sm group hover:border-brand-terra transition-all">
              <span className="text-[10px] font-black text-brand-terra mb-2 block uppercase tracking-[0.2em]">Track 01</span>
              <h4 className="text-2xl font-black mb-6">Implementation Sprint</h4>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 text-gray-500 font-bold text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-terra"></div>
                  Frontend development (React/Vite)
                </div>
                <div className="flex items-center gap-4 text-gray-500 font-bold text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-terra"></div>
                  Infrastructure deployment
                </div>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-terra h-full w-[65%] shadow-[0_0_10px_rgba(200,75,33,0.5)]"></div>
              </div>
            </div>

            <div className="bg-brand-tan/50 p-10 rounded-[40px] border border-brand-ink/5 group hover:border-brand-terra transition-all">
              <span className="text-[10px] font-black text-brand-terra mb-2 block uppercase tracking-[0.2em]">Track 02</span>
              <h4 className="text-2xl font-black mb-6">Strategy Audit</h4>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 text-gray-500 font-bold text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-terra"></div>
                  Market positioning analysis
                </div>
                <div className="flex items-center gap-4 text-gray-500 font-bold text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-terra"></div>
                  Product roadmap sync
                </div>
              </div>
              <div className="w-full bg-white/50 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-ink h-full w-[90%]"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
