import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Loader2, Share2 } from 'lucide-react';

const InsightDetail = () => {
  const { slug } = useParams();
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const response = await api.get(`/insights/${slug}`);
        setInsight(response.data);
      } catch (error) {
        console.error('Failed to fetch insight:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsight();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold mb-4">Insight Not Found</h1>
        <p className="text-slate-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/insights" className="btn-primary flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/insights" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-12 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>

        <header className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
          >
            {insight.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="w-5 h-5" />
              </div>
              <span>{insight.author?.name || 'HMH Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(insight.createdAt).toLocaleDateString()}</span>
            </div>
            <button className="ml-auto p-2 hover:bg-white/5 rounded-lg transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-video rounded-[40px] overflow-hidden mb-16 shadow-2xl shadow-primary/10"
        >
          <img 
            src={insight.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80'} 
            alt={insight.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 transition-colors">
          <div dangerouslySetInnerHTML={{ __html: insight.content }} />
        </div>

        <div className="mt-20 pt-10 border-t border-white/5">
          <h4 className="text-xl font-bold mb-8">Share this insight</h4>
          <div className="flex gap-4">
            {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
              <button key={platform} className="px-6 py-3 rounded-xl bg-white/5 hover:bg-primary hover:text-white transition-all font-semibold">
                {platform}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default InsightDetail;
