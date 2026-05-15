import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  RefreshCw, 
  LogOut, 
  Settings,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import logo from '../../assets/logo.png';

const Sidebar = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/' },
    { name: 'Site Pages', icon: zap, path: '/pages', icon: Zap },
    { name: 'HubSpot Sync', icon: RefreshCw, path: '/sync' },
    { name: 'Insights', icon: FileText, path: '/insights' },
    { name: 'Compliance', icon: ShieldAlert, path: '/legal' },
    { name: 'Manage Users', icon: Users, path: '/users', roles: ['SUPERADMIN'] },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-[#f0ede4] border-r border-black/5 flex flex-col p-8 transition-transform duration-300 ease-in-out lg:translate-x-0 -translate-x-full">
      <div className="mb-12">
        <img src={logo} alt="HMH Labz" className="h-8 w-auto mb-2" />
        <p className="font-serif italic text-lg text-[#1a1a1a] ml-1">Admin Hub.</p>
      </div>

      <nav className="flex-grow space-y-1">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-4 ml-4 opacity-50">Operational Core</p>
        {navItems.map((item) => (
          (!item.roles || item.roles.includes(user?.role)) && (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center space-x-3 p-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#1a1a1a] text-white shadow-xl shadow-black/10' 
                    : 'text-gray-500 hover:bg-white hover:text-[#1a1a1a]'
                }`
              }
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          )
        ))}
      </nav>

      <div className="mt-auto">
        <div className="p-6 bg-white rounded-[2rem] border border-black/5 shadow-sm">
          <div className="flex items-center space-x-3 mb-4 px-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] opacity-60">System Online</span>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full py-4 bg-[#c84b21] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c84b21]/10"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
