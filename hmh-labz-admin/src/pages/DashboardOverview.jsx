import { motion } from 'framer-motion';

const DashboardOverview = () => {
  const stats = [
    { label: 'Lead Velocity', value: '42', sub: 'New Hubspot contacts', dark: true },
    { label: 'Total Reach', value: '12.8', unit: 'k', sub: 'Monthly Insight readers', tan: true },
    { label: 'Sync Status', value: 'Healthy', sub: 'All nodes active', status: true },
  ];

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-[32px] p-8 border border-black/5 ${
              stat.dark ? 'bg-brand-charcoal text-white' : 
              stat.tan ? 'bg-brand-tan text-brand-charcoal' : 'bg-white'
            }`}
          >
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${stat.dark ? 'text-gray-400' : 'text-gray-500'}`}>
              {stat.label}
            </p>
            <div className="flex items-baseline gap-1">
              <h3 className={`text-6xl font-black font-serif italic ${stat.dark ? 'text-brand-orange' : 'text-brand-charcoal'}`}>
                {stat.value}
              </h3>
              {stat.unit && <span className="text-2xl font-bold text-brand-orange">{stat.unit}</span>}
            </div>
            <div className="mt-4 flex items-center gap-2">
              {stat.status && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
              <p className={`text-xs font-medium uppercase tracking-tight ${stat.dark ? 'text-gray-500' : 'text-gray-400'}`}>
                {stat.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="bg-white rounded-[40px] p-10 border border-black/5 shadow-sm">
        <h4 className="text-xl font-bold mb-8">Recent <span className="font-serif italic text-brand-orange">Activity</span></h4>
        <div className="space-y-6">
          {[
            { title: 'New Blog Published', meta: '"The Future of Build Logic" — by AT', time: '2h ago', color: 'blue' },
            { title: 'HubSpot Sync Complete', meta: '14 new leads imported to database', time: '5h ago', color: 'orange' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-6 border-b border-gray-50 last:border-0">
              <div className="flex items-center space-x-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  item.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-brand-orange'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </div>
                <div>
                  <p className="font-bold text-brand-charcoal">{item.title}</p>
                  <p className="text-xs text-gray-400 font-medium">{item.meta}</p>
                </div>
              </div>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
