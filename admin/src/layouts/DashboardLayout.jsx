import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <Sidebar />
      <main className="flex-grow ml-72 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
