import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Loader2 } from 'lucide-react';

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
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-terra" size={48} />
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-brand-paper flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-black mb-4">Report Not Found</h2>
        <Link to="/insights" className="text-brand-terra font-bold hover:underline uppercase tracking-widest">Return to Base</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-paper min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/insights" className="inline-flex items-center gap-2 text-brand-terra font-black text-xs uppercase tracking-[0.2em] mb-12 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft size={14} /> Back to Insights
          </Link>

          <header className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-2 bg-brand-terra text-white text-[10px] font-black uppercase tracking-widest rounded-full">Report</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">v1.0.48</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-brand-ink mb-10">
              {insight.title}
            </h1>

            <div className="flex flex-wrap items-center gap-10 py-8 border-y border-brand-ink/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-tan flex items-center justify-center text-brand-ink">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Analyst</p>
                  <p className="text-sm font-bold">{insight.author?.firstName || 'HMH Labz'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-tan flex items-center justify-center text-brand-ink">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Deployed</p>
                  <p className="text-sm font-bold">{new Date(insight.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-tan flex items-center justify-center text-brand-ink">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Complexity</p>
                  <p className="text-sm font-bold">12 min read</p>
                </div>
              </div>
            </div>
          </header>

          <div className="aspect-video w-full rounded-[40px] overflow-hidden mb-16 shadow-2xl shadow-brand-ink/5">
            <img 
              src={insight.coverImage || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80'} 
              alt={insight.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>

          <article className="prose prose-xl prose-brand max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:font-medium prose-p:text-brand-ink/70 prose-p:leading-relaxed prose-strong:text-brand-terra">
            <div dangerouslySetInnerHTML={{ __html: insight.content }} />
          </article>

          <footer className="mt-24 pt-12 border-t border-brand-ink/5">
            <div className="bg-brand-ink text-white p-12 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-2">Ready to implement these strategies?</h4>
                <p className="text-gray-400">Initialize a consultation with our build specialists.</p>
              </div>
              <button className="bg-brand-terra text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all whitespace-nowrap">
                Initialize Connection
              </button>
            </div>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InsightDetail;
