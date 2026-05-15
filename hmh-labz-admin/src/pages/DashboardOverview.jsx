import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Activity, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock,
  Zap
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const DashboardOverview = () => {
  const { user } = useAuthStore();

  const stats = [
    { 
      label: 'Sprint Completion', 
      value: '84', 
      suffix: '%', 
      desc: 'Exceeding quarterly target by 12%', 
      color: 'bg-[#1a1a1a]', 
      textColor: 'text-white',
      trend: '+4.2%' 
    },
    { 
      label: 'Value Generated', 
      value: '2.4', 
      suffix: 'M', 
      desc: 'Net revenue from new implementations', 
      color: 'bg-[#e8e1d4]', 
      textColor: 'text-[#1a1a1a]',
      trend: '+18%' 
    },
    { 
      label: 'Active Leads', 
      value: '42', 
      suffix: '', 
      desc: 'High-intent contacts synced from HubSpot', 
      color: 'bg-white', 
      textColor: 'text-[#1a1a1a]',
      trend: '+12' 
    },
  ];

  const tracks = [
    {
      id: '01',
      title: 'Opportunity Audit',
      items: ['Market analysis and positioning', 'Tech stack evaluation'],
      progress: 65,
      color: 'bg-[#1a1a1a]',
      textColor: 'text-white'
    },
    {
      id: '02',
      title: 'Implementation Sprint',
      items: ['Frontend development (Vite/React)', 'Cloud infrastructure setup'],
      progress: 40,
      color: 'bg-white',
      textColor: 'text-[#1a1a1a]'
    },
    {
      id: '03',
      title: 'Digital Transformation',
      items: ['Workflow automation', 'Legacy migration'],
      progress: 90,
      color: 'bg-[#e8e1d4]',
      textColor: 'text-[#1a1a1a]'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter leading-tight">
            Operational <span className="font-serif italic text-[#c84b21]">Intelligence.</span>
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">
            Welcome back, {user?.firstName || 'Strategist'}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#e8e1d4] px-5 py-3 rounded-2xl border border-black/5">
          <Zap size={14} className="text-[#c84b21]" />
          <span className="text-[10px] font-black uppercase tracking-widest">System Status: Optimal</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${stat.color} ${stat.textColor} p-8 rounded-[2.5rem] relative overflow-hidden group border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500`}
          >
            <div className="flex justify-between items-start mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{stat.label}</p>
              <div className="bg-[#c84b21]/10 px-2 py-1 rounded-lg">
                <span className="text-[9px] font-black text-[#c84b21]">{stat.trend}</span>
              </div>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-6xl font-black italic">{stat.value}</span>
              <span className="text-3xl font-bold text-[#c84b21]">{stat.suffix}</span>
            </div>
            <p className="mt-6 text-xs opacity-50 font-medium leading-relaxed">{stat.desc}</p>
            
            {/* Decorative background circle */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#c84b21] rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700"></div>
          </motion.div>
        ))}
      </div>

      {/* Active Tracks */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold tracking-tight px-2">
            Active <span className="font-serif italic text-[#c84b21]">Tracks</span>
          </h3>
          <button className="text-[10px] font-black uppercase tracking-widest text-[#c84b21] hover:underline">View Roadmap</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className={`${track.color} ${track.textColor} p-10 rounded-[2.5rem] border border-black/5 shadow-sm hover:border-[#c84b21]/30 transition-all group`}
            >
              <span className="text-[10px] font-black text-[#c84b21] mb-2 block uppercase tracking-widest">{track.id}</span>
              <h4 className="text-2xl font-bold mb-6 tracking-tight">{track.title}</h4>
              <ul className="space-y-4 mb-10">
                {track.items.map(item => (
                  <li key={item} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c84b21] mt-1.5 shrink-0"></span>
                    <span className="text-xs opacity-60 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-40">
                  <span>Progress</span>
                  <span>{track.progress}%</span>
                </div>
                <div className={`w-full ${track.textColor === 'text-white' ? 'bg-white/10' : 'bg-black/5'} h-1.5 rounded-full overflow-hidden`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${track.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className="bg-[#c84b21] h-full"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Help Banner */}
      <div className="bg-[#1a1a1a] rounded-[3rem] p-12 text-center text-white relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4 tracking-tighter">
            Need help with <span className="font-serif italic text-[#c84b21]">your build?</span>
          </h3>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto text-sm font-medium leading-relaxed">
            Our specialists are available for consultation sessions every Tuesday and Thursday to optimize your operational strategy.
          </p>
          <button className="bg-[#c84b21] px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:brightness-110 transition-all shadow-xl shadow-[#c84b21]/20">
            Connect with Strategist
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c84b21] rounded-full opacity-5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
      </div>
    </div>
  );
};

export default DashboardOverview;
