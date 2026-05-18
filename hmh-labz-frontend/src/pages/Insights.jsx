import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/ui/Reveal';
import MonoLabel from '../components/ui/MonoLabel';
import InsightSkeleton from '../components/ui/InsightSkeleton';
import SEO from '../components/seo/SEO';
import api from '../api/client';

export const ThumbSvg = ({ kind, id = 'thumb' }) => {
  if (kind === "desk") return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
      <defs>
        <radialGradient id={`d-${id}`} cx="30%" cy="25%">
          <stop offset="0%" stopColor="#F4F1EA"/>
          <stop offset="100%" stopColor="#D9CFB7"/>
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="#EDE6D3"/>
      <g transform="translate(60 60) rotate(-5)">
        <rect width="150" height="180" fill="#F4F1EA" stroke="#161513" strokeWidth=".5"/>
        <rect x="18" y="24" width="100" height="2.5" fill="#C2410C"/>
        <rect x="18" y="36" width="110" height="1.2" fill="#161513" opacity=".3"/>
        <rect x="18" y="44" width="80" height="1.2" fill="#161513" opacity=".3"/>
        <rect x="18" y="60" width="120" height="1.2" fill="#161513" opacity=".3"/>
        <rect x="18" y="68" width="100" height="1.2" fill="#161513" opacity=".3"/>
      </g>
      <g transform="translate(180 50) rotate(6)">
        <rect width="160" height="200" fill="#EDE6D3" stroke="#161513" strokeWidth=".5"/>
        <rect x="18" y="24" width="60" height="2.5" fill="#161513"/>
        <rect x="18" y="40" width="120" height="1.2" fill="#161513" opacity=".25"/>
        <rect x="18" y="50" width="110" height="1.2" fill="#161513" opacity=".25"/>
        <rect x="18" y="60" width="80" height="1.2" fill="#161513" opacity=".25"/>
      </g>
    </svg>
  );

  if (kind === "screen") return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
      <rect width="400" height="280" fill="#161513"/>
      <g transform="translate(40 40)">
        <rect width="320" height="200" rx="6" fill="#F4F1EA" stroke="#C2410C" strokeWidth="1"/>
        <rect x="0" y="0" width="320" height="22" fill="#EDE6D3"/>
        <circle cx="14" cy="11" r="3" fill="#C2410C"/><circle cx="26" cy="11" r="3" fill="#161513" opacity=".2"/><circle cx="38" cy="11" r="3" fill="#161513" opacity=".2"/>
        <rect x="20" y="40" width="120" height="6" fill="#161513"/>
        <rect x="20" y="56" width="200" height="2" fill="#161513" opacity=".25"/>
        <rect x="20" y="64" width="180" height="2" fill="#161513" opacity=".25"/>
        <rect x="20" y="72" width="160" height="2" fill="#161513" opacity=".25"/>
        <rect x="20" y="92" width="80" height="40" fill="#C2410C" opacity=".15" stroke="#C2410C"/>
        <rect x="110" y="92" width="80" height="40" fill="none" stroke="#161513" opacity=".25"/>
        <rect x="200" y="92" width="80" height="40" fill="none" stroke="#161513" opacity=".25"/>
        <rect x="20" y="148" width="260" height="2" fill="#161513" opacity=".2"/>
        <rect x="20" y="156" width="240" height="2" fill="#161513" opacity=".2"/>
        <rect x="20" y="172" width="60" height="14" rx="7" fill="#C2410C"/>
      </g>
    </svg>
  );

  // hands
  return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
      <defs>
        <radialGradient id={`h-${id}`} cx="50%" cy="40%">
          <stop offset="0%" stopColor="#F4F1EA"/>
          <stop offset="100%" stopColor="#C2410C" stopOpacity=".25"/>
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill={`url(#h-${id})`}/>
      {/* coffee cup */}
      <g transform="translate(70 110)">
        <ellipse cx="50" cy="0" rx="48" ry="10" fill="#161513"/>
        <path d="M2 0 L8 90 Q50 100 92 90 L98 0 Z" fill="#EDE6D3" stroke="#161513" strokeWidth=".5"/>
        <ellipse cx="50" cy="0" rx="40" ry="7" fill="#5a3a2b"/>
        <path d="M98 20 Q120 25 120 50 Q120 75 98 80" fill="none" stroke="#161513" strokeWidth="2"/>
      </g>
      {/* notebook */}
      <g transform="translate(200 70)">
        <rect width="170" height="160" fill="#F4F1EA" stroke="#161513" strokeWidth=".5" transform="rotate(-3)"/>
        <g transform="rotate(-3)">
          <line x1="22" y1="18" x2="22" y2="146" stroke="#C2410C" strokeWidth="1"/>
          <line x1="30" y1="36" x2="150" y2="36" stroke="#161513" strokeWidth=".5" opacity=".25"/>
          <line x1="30" y1="54" x2="150" y2="54" stroke="#161513" strokeWidth=".5" opacity=".25"/>
          <line x1="30" y1="72" x2="150" y2="72" stroke="#161513" strokeWidth=".5" opacity=".25"/>
          <line x1="30" y1="90" x2="150" y2="90" stroke="#161513" strokeWidth=".5" opacity=".25"/>
          <line x1="30" y1="108" x2="150" y2="108" stroke="#161513" strokeWidth=".5" opacity=".25"/>
          <line x1="30" y1="126" x2="150" y2="126" stroke="#161513" strokeWidth=".5" opacity=".25"/>
          <text x="36" y="32" fontFamily="Caveat, cursive" fontSize="14" fill="#161513" opacity=".85">ops audit · q2</text>
        </g>
      </g>
    </svg>
  );
};

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

  const filtered = insights.filter(a => filter === 'all' || a.tag === filter || a.category === filter);

  const featured = filtered.length > 0 ? filtered[0] : null;
  const gridPosts = filtered.length > 1 ? filtered.slice(1) : [];

  return (
    <div className="bg-paper selection:bg-terra selection:text-paper min-h-screen relative">
      <SEO 
        title="Insights & Field Notes | HMH Labz"
        description="Deep dives into AI strategy, workflow automation, and the systems driving modern service businesses."
      />
      
      <Navbar />
      
      <main className="pt-20 text-left">
        {/* HEADER */}
        <header className="px-6 md:px-10 lg:px-14 pt-[120px] sm:pt-[140px] pb-16 sm:pb-24 max-w-7xl mx-auto">
          <Reveal className="flex flex-col items-start w-full">
            <div className="flex items-center justify-between flex-wrap gap-4 w-full">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/55">N° 05 — Insight</span>
              <span className="font-mono text-ink/40 uppercase text-[11px] tracking-[0.22em] font-semibold">
                {insights.length} entries · 2024 → 2026
              </span>
            </div>
            <h1 className="mt-10 sm:mt-12 font-sans font-bold text-ink leading-[0.94] max-w-[22ch] tracking-[-0.035em]" style={{ fontSize: "clamp(56px, 9vw, 144px)" }}>
              Field notes, <span className="font-serif italic text-terra font-normal">playbooks,</span> and case notes.
            </h1>
            <p className="mt-10 max-w-[58ch] text-ink/65 text-[17px] sm:text-[19px] leading-[1.6]">
              Writing from inside service-business AI engagements. What we see in the wild, what we ship, and what we'd do differently next time.
            </p>
            {/* filter row */}
            <div className="mt-14 sm:mt-20 flex items-center flex-wrap gap-3 border-y border-ink/12 py-5 w-full">
              <span className="font-mono text-ink/45 mr-3 uppercase text-[11px] tracking-[0.22em] font-semibold">Filter</span>
              {['all', 'Field Notes', 'Playbook', 'Case Note'].map(t => (
                <button 
                  key={t} 
                  onClick={() => setFilter(t)} 
                  className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.22em] font-semibold border transition-colors ${filter === t ? 'bg-ink text-paper border-ink' : 'border-ink/15 hover:border-ink text-ink'}`}
                >
                  {t === 'all' ? 'All' : t === 'Playbook' ? 'Playbooks' : t === 'Case Note' ? 'Case Notes' : t}
                </button>
              ))}
              <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/40 hidden sm:inline">↓ Newest first</span>
            </div>
          </Reveal>
        </header>

        {/* FEATURED */}
        <section className="px-6 md:px-10 lg:px-14 pb-20 sm:pb-28 max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3].map(i => <InsightSkeleton key={i} />)}
            </div>
          ) : featured ? (
            <Reveal className="group block cursor-pointer">
              <Link to={`/insights/${featured.slug}`}>
                <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-stretch">
                  {/* visual */}
                  <div className="md:col-span-7 relative rounded-2xl overflow-hidden border border-ink/10 bg-cream aspect-[5/4] md:aspect-[16/10]">
                    {featured.coverImage ? (
                      <img 
                        src={featured.coverImage} 
                        alt={featured.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    ) : (
                      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
                        <defs>
                          <radialGradient id="lt1" cx="30%" cy="25%"><stop offset="0%" stopColor="#F4F1EA"></stop><stop offset="100%" stopColor="#D9CFB7"></stop></radialGradient>
                        </defs>
                        <rect width="400" height="300" fill="url(#lt1)"></rect>
                        {/* stack of papers */}
                        <g transform="translate(60 70) rotate(-4)"><rect width="160" height="200" fill="#EDE6D3" stroke="#161513" strokeWidth="0.5"></rect>
                          <rect x="20" y="22" width="100" height="2" fill="#161513" opacity=".6"></rect>
                          <rect x="20" y="34" width="120" height="1.5" fill="#161513" opacity=".25"></rect>
                          <rect x="20" y="42" width="110" height="1.5" fill="#161513" opacity=".25"></rect>
                          <rect x="20" y="50" width="80" height="1.5" fill="#161513" opacity=".25"></rect>
                          <rect x="20" y="74" width="120" height="1.5" fill="#161513" opacity=".25"></rect>
                          <rect x="20" y="82" width="100" height="1.5" fill="#161513" opacity=".25"></rect>
                        </g>
                        <g transform="translate(180 60) rotate(5)"><rect width="160" height="210" fill="#F4F1EA" stroke="#161513" strokeWidth="0.5"></rect>
                          <rect x="20" y="22" width="120" height="3" fill="#C2410C"></rect>
                          <rect x="20" y="38" width="120" height="1.5" fill="#161513" opacity=".3"></rect>
                          <rect x="20" y="46" width="110" height="1.5" fill="#161513" opacity=".3"></rect>
                          <rect x="20" y="54" width="80" height="1.5" fill="#161513" opacity=".3"></rect>
                          <rect x="20" y="78" width="120" height="1.5" fill="#161513" opacity=".3"></rect>
                          <circle cx="135" cy="180" r="14" fill="none" stroke="#C2410C" strokeWidth="1.5"></circle>
                          <path d="M127 180 L134 187 L145 173" fill="none" stroke="#C2410C" strokeWidth="1.5"></path>
                        </g>
                        {/* annotation tag */}
                        <g transform="translate(280 28)">
                          <rect width="92" height="22" fill="#161513"></rect>
                          <text x="46" y="14" fontFamily="ui-monospace, monospace" fontSize="8" fill="#F4F1EA" letterSpacing="2" textAnchor="middle">FEATURED</text>
                        </g>
                      </svg>
                    )}
                  </div>

                  {/* meta */}
                  <div className="md:col-span-5 flex flex-col justify-between gap-10">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] font-semibold">
                        <span className="text-terra">{featured.tag || featured.category || 'Field Notes'}</span>
                        <span className="w-1 h-1 rounded-full bg-ink/20"></span>
                        <span className="text-ink/45">
                          {new Date(featured.publishedAt || featured.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-ink/20"></span>
                        <span className="text-ink/45">{featured.readTime || '8 min read'}</span>
                      </div>
                      <h2 className="mt-8 font-sans font-bold text-ink tracking-[-0.025em] leading-[1.02] group-hover:text-terra transition-colors" style={{ fontSize: "clamp(34px, 4.4vw, 56px)" }}>
                        {featured.title}
                      </h2>
                      <p className="mt-6 text-ink/65 text-[16px] sm:text-[17px] leading-[1.6] max-w-[42ch]">
                        {featured.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-ink/12">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center font-serif italic text-[15px]">
                          {featured.author?.name?.charAt(0) || 'N'}
                        </span>
                        <div className="leading-tight">
                          <div className="text-[14px] font-medium text-ink">{featured.author?.name || 'Naveen Hari'}</div>
                          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">Partner</div>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/55 group-hover:text-terra transition-colors">Read article →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ) : null}
        </section>

        {/* GRID */}
        {!loading && (
          <section className="px-6 md:px-10 lg:px-14 pb-28 sm:pb-40 border-t border-ink/10 pt-16 sm:pt-20 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <h3 className="font-serif italic text-ink/85" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>More writing.</h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/45 hidden sm:inline">{gridPosts.length} more →</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-y-16">
              {gridPosts.map((insight, i) => {
                const kind = i % 3 === 0 ? 'desk' : i % 3 === 1 ? 'screen' : 'hands';
                return (
                  <Reveal key={insight.id} delay={i * 0.05} className="group block cursor-pointer">
                    <Link to={`/insights/${insight.slug}`}>
                      <div className="relative rounded-2xl overflow-hidden border border-ink/10 bg-cream aspect-[4/3]">
                        {insight.coverImage ? (
                          <img 
                            src={insight.coverImage} 
                            alt={insight.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          />
                        ) : (
                          <ThumbSvg kind={kind} id={insight.id} />
                        )}
                        <span className="absolute top-4 left-4 font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-paper bg-ink/90 px-3 py-1 rounded-full">
                          {insight.tag || insight.category || 'Field Notes'}
                        </span>
                      </div>
                      <div className="mt-6 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] font-semibold">
                        <span className="text-ink/45">
                          {new Date(insight.publishedAt || insight.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-ink/20"></span>
                        <span className="text-ink/45">{insight.readTime || '5 min read'}</span>
                      </div>
                      <h3 className="mt-3 font-sans font-semibold text-ink leading-[1.2] tracking-[-0.012em] text-[20px] sm:text-[22px] max-w-[28ch] group-hover:text-terra transition-colors">
                        {insight.title}
                      </h3>
                      <p className="mt-3 text-ink/60 text-[14px] sm:text-[15px] leading-[1.55] max-w-[36ch] line-clamp-2">
                        {insight.excerpt}
                      </p>
                      <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/55 group-hover:text-terra transition-colors">
                        Read →
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>

            {gridPosts.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-ink/5 rounded-[40px]">
                <p className="text-ink/30 font-mono uppercase tracking-widest italic">No additional articles found in this category.</p>
              </div>
            )}
          </section>
        )}

        {/* FIT CALL STRIP */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 bg-cream border-y border-ink/10">
          <div className="max-w-5xl mx-auto text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/50">Have an engagement in mind?</span>
            <h3 className="mt-8 font-sans font-bold tracking-[-0.028em] leading-[1.04]" style={{ fontSize: "clamp(36px, 5.4vw, 64px)" }}>
              Skip the blog. <span className="font-serif italic text-terra font-normal">Book a Fit Call.</span>
            </h3>
            <p className="mt-6 max-w-[48ch] mx-auto text-ink/65 text-[17px] leading-[1.6]">
              20 minutes. No deck. No pitch. We tell you whether AI or digital systems would actually move the needle for a business like yours.
            </p>
            <a href="/#book" className="mt-12 inline-flex items-center gap-3 bg-terra hover:bg-terra-deep text-paper px-12 py-5 rounded-full font-mono font-bold text-[11px] uppercase tracking-[0.28em] transition-colors">
              Book a 20-min Fit Call →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Insights;
