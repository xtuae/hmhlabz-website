import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuthStore } from '../../store/authStore';

const AdminLayout = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-brand-cream text-brand-charcoal overflow-hidden font-sans">
      <Sidebar />
      
      <main className="flex-grow flex flex-col h-screen overflow-y-auto lg:ml-72 bg-brand-cream">
        <header className="sticky top-0 z-40 bg-brand-cream/90 backdrop-blur-md px-6 py-6 lg:px-10 flex items-center justify-between border-b border-black/5">
          <div>
            <h2 id="page-title" className="text-xl font-bold">
              Control <span className="font-serif italic text-brand-orange">Center</span>
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">HMH Labz v1.0.4</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-xs font-bold">{user?.firstName} {user?.lastName}</p>
              <p className="text-[10px] text-brand-orange font-bold uppercase tracking-tighter">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-charcoal text-white flex items-center justify-center font-black border-2 border-white shadow-md">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
