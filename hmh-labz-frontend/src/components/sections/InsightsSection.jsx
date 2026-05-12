import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

const InsightsSection = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await api.get('/insights');
        // Take only the first 3 for the home page preview
        setInsights(response.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch insights:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  return (
    <section className="py-32 bg-brand-cream relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-brand-dark/5 hidden lg:block"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
          <div>
            <h2 className="text-sm font-black tracking-[0.3em] uppercase text-brand-orange mb-6">Knowledge Base</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-brand-dark leading-none">
              Lab <span className="italic font-serif">Insights.</span>
            </h3>
          </div>
          <Link to="/insights" className="mt-8 md:mt-0 flex items-center gap-3 text-brand-dark font-bold hover:text-brand-orange transition-all group">
            View All Articles <div className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition-all"><ArrowRight size={20} /></div>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-orange" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {insights.map((insight, i) => (
              <motion.article 
                key={insight.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col group"
              >
                <Link to={`/insights/${insight.slug}`} className="block">
                  <div className="aspect-[4/5] overflow-hidden rounded-[32px] mb-8 relative">
                    <img 
                      src={insight.coverImage || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80'} 
                      alt={insight.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-brand-cream/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-brand-dark">
                      Technology
                    </div>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4 leading-tight group-hover:text-brand-orange transition-colors">
                    {insight.title}
                  </h4>
                  <p className="text-brand-dark/50 font-medium line-clamp-2 mb-6 leading-relaxed">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-brand-dark font-black text-xs uppercase tracking-widest">
                    Read Report <div className="w-6 h-[1px] bg-brand-dark/20 group-hover:w-12 group-hover:bg-brand-orange transition-all duration-500"></div>
                  </div>
                </Link>
              </motion.article>
            ))}
            
            {insights.length === 0 && !loading && (
              <div className="lg:col-span-3 py-20 text-center border-2 border-dashed border-brand-dark/5 rounded-[40px]">
                <p className="text-brand-dark/40 font-bold text-xl uppercase tracking-widest italic">Research in progress...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default InsightsSection;
