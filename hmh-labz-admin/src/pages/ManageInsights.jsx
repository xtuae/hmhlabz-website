import { useState, useEffect } from 'react';
import client from '../api/client';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Loader2, Image as ImageIcon } from 'lucide-react';

const ManageInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const response = await client.get('/insights');
      setInsights(response.data);
    } catch (error) {
      console.error('Failed to fetch insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this insight?')) {
      try {
        await client.delete(`/insights/${id}`);
        setInsights(insights.filter(i => i.id !== id));
      } catch (error) {
        alert('Failed to delete insight');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-bold tracking-tighter">Insight <span className="font-serif italic text-brand-orange">Editorial.</span></h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Manage your knowledge base</p>
        </div>
        <button className="bg-brand-charcoal text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-orange transition-all flex items-center gap-2 shadow-xl shadow-brand-charcoal/10">
          <Plus size={16} /> New Draft
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-brand-orange" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, i) => (
            <motion.div 
              key={insight.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[32px] overflow-hidden border border-black/5 hover:border-brand-orange transition-all group"
            >
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                {insight.coverImage ? (
                  <img src={insight.coverImage} alt={insight.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon size={48} />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-brand-charcoal shadow-sm">
                  Technology
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-bold mb-2 line-clamp-2 min-h-[3.5rem]">{insight.title}</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                  <Circle size={8} className="fill-green-500 text-green-500" /> Published 4 days ago
                </p>
                <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-brand-orange transition-colors"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(insight.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-brand-orange hover:underline">Edit Content</button>
                </div>
              </div>
            </motion.div>
          ))}
          
          <button className="border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center p-12 hover:border-brand-orange hover:bg-brand-orange/5 transition-all group min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-brand-orange group-hover:text-white transition-all">
              <Plus size={32} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-brand-orange">Create New Report</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageInsights;
