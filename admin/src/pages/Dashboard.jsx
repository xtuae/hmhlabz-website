import { motion } from 'framer-motion';
import { Users, FileText, Eye, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,284', icon: <Users />, color: 'bg-blue-500' },
    { label: 'Published Blogs', value: '42', icon: <FileText />, color: 'bg-indigo-500' },
    { label: 'Total Views', value: '12.5k', icon: <Eye />, color: 'bg-purple-500' },
    { label: 'Growth', value: '+12%', icon: <TrendingUp />, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-slate-400 text-lg">Welcome back! Here's what's happening with your platform today.</p>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-[2rem] bg-slate-900 border border-white/5 hover:border-indigo-500/30 transition-all group"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center mb-6 shadow-lg shadow-black/20`}>
              {stat.icon}
            </div>
            <p className="text-slate-400 font-medium mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 h-96 flex items-center justify-center">
        <p className="text-slate-500 text-lg">Activity Chart Placeholder</p>
      </div>
    </div>
  );
};

export default Dashboard;
