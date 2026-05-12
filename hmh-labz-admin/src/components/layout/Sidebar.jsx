import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  RefreshCw, 
  LogOut, 
  Settings,
  Circle
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/' },
    { name: 'Insights (Blog)', icon: FileText, path: '/insights' },
    { name: 'Manage Users', icon: Users, path: '/users', roles: ['SUPERADMIN'] },
    { name: 'HubSpot Sync', icon: RefreshCw, path: '/sync' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-[#f0ede4] border-r border-black/5 flex flex-col p-8 transition-transform duration-300 ease-in-out lg:translate-x-0 -translate-x-full">
      <div className="mb-12">
        <h1 className="text-2xl font-extrabold tracking-tighter uppercase leading-tight">
          S <span className="text-brand-orange">+</span> B <br />
          <span className="font-serif italic text-lg normal-case tracking-normal text-brand-charcoal">Admin Terminal.</span>
        </h1>
      </div>

      <nav className="flex-grow space-y-2">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 ml-4">System Core</p>
        {navItems.map((item) => (
          (!item.roles || item.roles.includes(user?.role)) && (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center space-x-3 p-4 rounded-2xl font-bold text-sm transition-all ${
                  isActive 
                    ? 'bg-brand-charcoal text-white shadow-lg' 
                    : 'text-gray-500 hover:bg-white hover:text-brand-charcoal'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          )
        ))}
      </nav>

      <div className="mt-auto p-6 bg-white rounded-3xl border border-black/5">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-brand-charcoal">Terminal Online</span>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full py-3 bg-brand-orange text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={14} /> Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
