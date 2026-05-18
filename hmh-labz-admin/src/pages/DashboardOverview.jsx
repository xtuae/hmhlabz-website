import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Activity, 
  Zap,
  Loader2,
  Calendar,
  Building2,
  UserCheck
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import client from '../api/client';

const DashboardOverview = () => {
  const { user } = useAuthStore();
  const [data, setData] = useState({
    totalLeads: 0,
    totalInsights: 0,
    totalUsers: 0,
    recentLeads: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/admin/dashboard-stats')
      .then(res => {
        if (res.data) setData(res.data);
      })
      .catch(err => console.error('Failed to fetch dashboard stats:', err))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { 
      label: 'Total Leads', 
      value: data.totalLeads, 
      desc: 'High-intent submissions from Fit Call & Contact', 
      color: 'bg-[#1a1a1a]', 
      textColor: 'text-white',
      icon: Activity
    },
    { 
      label: 'Published Insights', 
      value: data.totalInsights, 
      desc: 'Live field notes and operational playbooks', 
      color: 'bg-[#e8e1d4]', 
      textColor: 'text-[#1a1a1a]',
      icon: FileText
    },
    { 
      label: 'Active Users', 
      value: data.totalUsers, 
      desc: 'Authorized strategists and administrators', 
      color: 'bg-white', 
      textColor: 'text-[#1a1a1a]',
      icon: Users
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter leading-tight">
            Operational <span className="font-serif italic text-[#c84b21]">Intelligence.</span>
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">
            Welcome back, {user?.name || 'Strategist'}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#e8e1d4] px-5 py-3 rounded-2xl border border-black/5">
          <Zap size={14} className="text-[#c84b21]" />
          <span className="text-[10px] font-black uppercase tracking-widest">System Status: Optimal</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-[#c84b21]" size={48} />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${stat.color} ${stat.textColor} p-8 rounded-[2.5rem] relative overflow-hidden group border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{stat.label}</p>
                    <div className="bg-[#c84b21]/10 p-2.5 rounded-2xl">
                      <Icon size={18} className="text-[#c84b21]" />
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-6xl font-black italic">{stat.value}</span>
                  </div>
                  <p className="mt-6 text-xs opacity-50 font-medium leading-relaxed">{stat.desc}</p>
                  
                  {/* Decorative background circle */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#c84b21] rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700"></div>
                </motion.div>
              );
            })}
          </div>

          {/* Recent Leads Table */}
          <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm p-10 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold tracking-tight">
                Recent <span className="font-serif italic text-[#c84b21]">Submissions</span>
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Activity Feed</span>
            </div>

            {data.recentLeads.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">No lead submissions recorded yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Lead Name</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Business / Entity</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data.recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 font-bold text-sm text-[#1a1a1a]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-serif italic text-xs text-[#c84b21]">
                              {lead.name.charAt(0)}
                            </div>
                            {lead.name}
                          </div>
                        </td>
                        <td className="py-5 text-sm text-gray-600 font-medium">
                          <div className="flex items-center gap-2">
                            <Building2 size={14} className="text-gray-400" />
                            {lead.businessName || 'N/A'}
                          </div>
                        </td>
                        <td className="py-5 text-xs text-gray-400 font-mono uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

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
