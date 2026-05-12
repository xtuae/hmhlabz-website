import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';

const Insights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await api.get('/insights');
        setInsights(response.data);
      } catch (error) {
        console.error('Failed to fetch insights:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4">Latest <span className="gradient-text">Insights</span></h1>
          <p className="text-slate-400 max-w-2xl text-lg">Exploring the intersection of technology, strategy, and business growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {insights.map((insight, i) => (
            <motion.article 
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col group cursor-pointer"
            >
              <Link to={`/insights/${insight.slug}`}>
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6">
                  <img 
                    src={insight.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80'} 
                    alt={insight.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 font-semibold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(insight.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {insight.author?.name || 'HMH Team'}</span>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                  {insight.title}
                </h3>
                
                <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                  {insight.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-2 text-primary font-bold">
                  Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        
        {insights.length === 0 && (
          <div className="text-center py-20 glass rounded-3xl">
            <p className="text-slate-400 text-lg">No insights published yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
