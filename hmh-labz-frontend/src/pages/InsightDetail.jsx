import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/ui/Reveal';
import MonoLabel from '../components/ui/MonoLabel';
import api from '../api';

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
      <div className="bg-paper min-h-screen flex items-center justify-center">
        <span className="font-mono text-ink/40 animate-pulse uppercase tracking-[0.3em]">Loading Article...</span>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="bg-paper min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Article not found</h1>
        <Link to="/insights" className="text-terra underline">Back to Insights</Link>
      </div>
    );
  }

  return (
    <div className="bg-paper selection:bg-terra selection:text-paper min-h-screen relative">
      <Navbar />
      <main className="pt-20 text-left">
        <header className="px-6 md:px-10 lg:px-14 pt-16 sm:pt-24 pb-20 sm:pb-32 max-w-7xl mx-auto">
          <Reveal>
            <Link to="/insights" className="font-mono text-ink/40 hover:text-terra transition-colors text-xs uppercase tracking-widest mb-10 block">
              ← Back to insights
            </Link>
            <MonoLabel color="terra">{insight.category || 'Field Notes'}</MonoLabel>
            <h1 className="mt-10 font-sans font-bold text-ink tracking-tight leading-[0.94] max-w-[20ch]" style={{ fontSize: "clamp(42px, 7vw, 92px)" }}>
              {insight.title}
            </h1>
            <p className="mt-12 max-w-[44ch] text-ink/65 text-xl sm:text-2xl leading-relaxed font-light">
              {insight.excerpt}
            </p>
          </Reveal>
        </header>

        <section className="px-6 md:px-10 lg:px-14 pb-32 max-w-7xl mx-auto border-t border-ink/10 pt-16 sm:pt-24">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <Reveal>
                <div 
                  className="prose prose-lg prose-ink max-w-none prose-headings:font-sans prose-headings:font-bold prose-p:text-ink/80 prose-p:leading-relaxed prose-p:font-light"
                  dangerouslySetInnerHTML={{ __html: insight.content }}
                />
              </Reveal>
            </div>
            
            <aside className="lg:col-span-4 sticky top-32">
              <Reveal delay={0.2}>
                <div className="p-8 rounded-[2.5rem] bg-ink text-paper text-left">
                  <MonoLabel color="terra">Next engagement</MonoLabel>
                  <h4 className="text-xl font-bold mt-4 mb-6 leading-tight">Ready to ship your own AI system?</h4>
                  <button className="w-full py-4 bg-terra text-paper rounded-full font-mono text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-terra/20">
                    Book a fit call →
                  </button>
                </div>
              </Reveal>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InsightDetail;
