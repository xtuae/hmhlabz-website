import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/ui/Reveal';
import MonoLabel from '../components/ui/MonoLabel';
import api from '../api';

const Insights = () => {
  const [filter, setFilter] = useState('all');
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

  const filtered = insights.filter(a => filter === 'all' || a.category === filter);

  return (
    <div className="bg-paper selection:bg-terra selection:text-paper min-h-screen relative">
      <Navbar />
      <main className="pt-20 text-left">
        <header className="px-6 md:px-10 lg:px-14 pt-[120px] sm:pt-[140px] pb-16 sm:pb-24 max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <MonoLabel>N° 05 — Insight</MonoLabel>
              <span className="font-mono text-ink/40 uppercase text-xs tracking-widest">
                {insights.length} entries · 2024 → 2026
              </span>
            </div>
            <h1 className="mt-10 sm:mt-12 font-sans font-bold text-ink leading-[0.94] max-w-[22ch]" style={{ fontSize: "clamp(56px, 9vw, 144px)" }}>
              Field notes, <span className="font-serif italic text-terra font-normal">playbooks,</span> and case notes.
            </h1>
            <p className="mt-10 max-w-[58ch] text-ink/65 text-[17px] sm:text-[19px] leading-[1.6]">
              Writing from inside service-business AI engagements. What we see in the wild, what we ship, and what we'd do differently next time.
            </p>
            <div className="mt-14 sm:mt-20 flex items-center flex-wrap gap-3 border-y border-ink/12 py-5">
              <span className="font-mono text-ink/45 mr-3 uppercase text-xs">Filter</span>
              {['all', 'Field Notes', 'Playbook', 'Case Note'].map(t => (
                <button 
                  key={t} 
                  onClick={() => setFilter(t)} 
                  className={`px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest border transition-colors ${filter === t ? 'bg-ink text-paper border-ink' : 'border-ink/15 hover:border-ink'}`}
                >
                  {t === 'all' ? 'All' : t}
                </button>
              ))}
              <span className="ml-auto font-mono text-ink/40 hidden sm:inline">↓ Newest first</span>
            </div>
          </Reveal>
        </header>

        <section className="px-6 md:px-10 lg:px-14 pb-20 sm:pb-28 max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <span className="font-mono text-ink/40 animate-pulse uppercase tracking-[0.3em]">Loading Insights...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map((insight, i) => (
                <Reveal key={insight.id} delay={i * 0.1} className="group block cursor-pointer">
                  <Link to={`/insights/${insight.slug}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-ink/10 bg-cream aspect-[4/5] mb-8">
                      <img 
                        src={insight.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80'} 
                        alt={insight.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <MonoLabel color="terra">{insight.category || 'Field Notes'}</MonoLabel>
                      <span className="w-1 h-1 rounded-full bg-ink/20"></span>
                      <MonoLabel className="text-ink/45">{new Date(insight.createdAt).toLocaleDateString()}</MonoLabel>
                    </div>
                    <h2 className="font-sans font-bold text-ink leading-[1.1] group-hover:text-terra transition-colors text-2xl sm:text-3xl">
                      {insight.title}
                    </h2>
                    <p className="mt-4 text-ink/65 text-lg leading-relaxed line-clamp-2">
                      {insight.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-ink/12 mt-8">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-serif italic text-sm">
                          {insight.author?.name?.charAt(0) || 'H'}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-ink">{insight.author?.name || 'HMH Team'}</div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] uppercase font-bold text-ink/55 group-hover:translate-x-2 transition-transform">Read article →</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
          
          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-ink/5 rounded-[40px]">
              <p className="text-ink/30 font-mono uppercase tracking-widest italic">No articles found in this category.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Insights;
