import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/ui/Reveal';
import SEO from '../components/seo/SEO';
import api from '../api/client';
import { ThumbSvg } from './Insights';

const InsightDetail = () => {
  const { slug } = useParams();
  const [insight, setInsight] = useState(null);
  const [allInsights, setAllInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsightAndAll = async () => {
      try {
        setLoading(true);
        const [detailRes, allRes] = await Promise.all([
          api.get(`/insights/${slug}`),
          api.get('/insights')
        ]);
        setInsight(detailRes.data);
        setAllInsights(allRes.data);
      } catch (error) {
        console.error('Failed to fetch insight:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsightAndAll();
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
        <h1 className="text-4xl font-bold mb-8 text-ink">Article not found</h1>
        <Link to="/insights" className="text-terra underline font-mono uppercase tracking-widest text-sm">Back to Insights</Link>
      </div>
    );
  }

  const relatedInsights = allInsights.filter(a => a.id !== insight.id).slice(0, 3);

  return (
    <div className="bg-paper selection:bg-terra selection:text-paper min-h-screen relative">
      <SEO 
        title={insight.seoTitle || `${insight.title} | HMH Labz Insights`}
        description={insight.seoDescription || insight.excerpt || 'Deep dives into operations, AI, and workflow automation.'}
        image={insight.coverImage}
      />
      
      <Navbar />
      
      <main className="pt-20 text-left">
        {/* BREADCRUMB */}
        <div className="px-6 md:px-10 lg:px-14 pt-[100px] sm:pt-[120px] pb-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 text-[13px]">
            <Link to="/insights" className="font-mono text-ink/45 hover:text-terra uppercase tracking-[0.22em] font-semibold">Insight</Link>
            <span className="text-ink/25">/</span>
            <span className="font-mono text-terra uppercase tracking-[0.22em] font-semibold">{insight.tag || insight.category || 'Field Notes'}</span>
          </div>
        </div>

        {/* HEADER */}
        <header className="px-6 md:px-10 lg:px-14 pt-8 pb-14 sm:pb-20 border-b border-ink/12 max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-[68ch]">
              <h1 className="font-sans font-bold text-ink tracking-[-0.03em] leading-[1.0]" style={{ fontSize: "clamp(40px, 6.4vw, 84px)" }}>
                {insight.title}
              </h1>
              <p className="mt-8 sm:mt-10 font-serif italic text-ink/65 leading-[1.4]" style={{ fontSize: "clamp(20px, 2vw, 26px)" }}>
                {insight.excerpt}
              </p>
            </div>

            <div className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 max-w-4xl">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/40 mb-2">Author</div>
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center font-serif italic text-[15px]">
                    {insight.author?.name?.charAt(0) || 'N'}
                  </span>
                  <div className="leading-tight">
                    <div className="text-[14px] font-medium text-ink">{insight.author?.name || 'Naveen Hari'}</div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">Partner</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/40 mb-2">Published</div>
                <div className="text-[14px] text-ink/80">
                  {new Date(insight.publishedAt || insight.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/40 mb-2">Read time</div>
                <div className="text-[14px] text-ink/80">{insight.readTime || '8 minutes'}</div>
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/40 mb-2">Tag</div>
                <div className="text-[14px] text-terra font-semibold">{insight.tag || insight.category || 'Field Notes'}</div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* COVER */}
        <div className="px-6 md:px-10 lg:px-14 pt-12 sm:pt-16 max-w-7xl mx-auto">
          <Reveal className="relative rounded-2xl overflow-hidden border border-ink/10 bg-cream aspect-[16/8] max-w-6xl mx-auto">
            {insight.coverImage ? (
              <img src={insight.coverImage} alt={insight.title} className="w-full h-full object-cover" />
            ) : (
              <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
                <defs>
                  <radialGradient id="cov" cx="35%" cy="30%"><stop offset="0%" stopColor="#F4F1EA"></stop><stop offset="100%" stopColor="#D9CFB7"></stop></radialGradient>
                </defs>
                <rect width="1200" height="600" fill="url(#cov)"></rect>
                {/* stacked legal files */}
                <g transform="translate(120 100) rotate(-3)">
                  <rect width="300" height="380" fill="#EDE6D3" stroke="#161513" strokeWidth=".8"></rect>
                  <rect x="30" y="40" width="200" height="4" fill="#161513" opacity=".7"></rect>
                  <rect x="30" y="60" width="240" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="72" width="220" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="84" width="180" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="120" width="240" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="132" width="200" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="144" width="220" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="180" width="100" height="20" fill="#C2410C"></rect>
                  <rect x="30" y="220" width="240" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="232" width="220" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="244" width="180" height="2" fill="#161513" opacity=".25"></rect>
                </g>
                <g transform="translate(400 80) rotate(4)">
                  <rect width="320" height="400" fill="#F4F1EA" stroke="#161513" strokeWidth=".8"></rect>
                  <rect x="30" y="40" width="120" height="3" fill="#C2410C"></rect>
                  <rect x="30" y="60" width="260" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="72" width="240" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="84" width="200" height="2" fill="#161513" opacity=".25"></rect>
                  <circle cx="270" cy="350" r="22" fill="none" stroke="#C2410C" strokeWidth="2"></circle>
                  <path d="M258 350 L268 360 L284 340" fill="none" stroke="#C2410C" strokeWidth="2"></path>
                  <rect x="30" y="130" width="260" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="142" width="220" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="170" width="80" height="14" fill="#161513" opacity=".15"></rect>
                  <rect x="30" y="195" width="260" height="2" fill="#161513" opacity=".25"></rect>
                  <rect x="30" y="207" width="240" height="2" fill="#161513" opacity=".25"></rect>
                </g>
                {/* coffee + pen */}
                <g transform="translate(800 280)">
                  <ellipse cx="80" cy="0" rx="78" ry="14" fill="#161513"></ellipse>
                  <path d="M4 0 L12 140 Q80 152 148 140 L156 0 Z" fill="#EDE6D3" stroke="#161513" strokeWidth=".8"></path>
                  <ellipse cx="80" cy="0" rx="68" ry="10" fill="#5a3a2b"></ellipse>
                </g>
                <g transform="translate(960 200) rotate(20)">
                  <rect width="200" height="10" fill="#161513"></rect>
                  <polygon points="200,0 220,5 200,10" fill="#C2410C"></polygon>
                </g>
              </svg>
            )}
          </Reveal>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/40 text-center">
            Fig. 01 — {insight.title}
          </p>
        </div>

        {/* BODY + TOC */}
        <section className="px-6 md:px-10 lg:px-14 py-20 sm:py-28 max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* TOC */}
            <aside className="hidden lg:block col-span-3 sticky top-[110px]">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/45 mb-5">In this piece</div>
              <nav className="flex flex-col space-y-1 border-l border-ink/12 pl-4 py-1 font-sans text-[14px] text-ink/65">
                <a href="#article-content" className="hover:text-terra transition-colors py-1 block font-medium text-ink">01 — Article Body</a>
                <a href="#related-writing" className="hover:text-terra transition-colors py-1 block">02 — Related Writing</a>
              </nav>

              <div className="mt-10 pt-6 border-t border-ink/12">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/45 mb-4">Share</div>
                <div className="flex gap-2">
                  <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(insight.title)}`, '_blank')} className="w-10 h-10 rounded-full border border-ink/15 hover:border-ink hover:bg-ink hover:text-paper transition-colors text-[13px] flex items-center justify-center font-mono" title="Twitter">𝕏</button>
                  <button onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(insight.title)}`, '_blank')} className="w-10 h-10 rounded-full border border-ink/15 hover:border-ink hover:bg-ink hover:text-paper transition-colors text-[13px] flex items-center justify-center font-mono" title="LinkedIn">in</button>
                  <button onClick={() => { navigator.clipboard?.writeText(window.location.href); alert("Link copied to clipboard!"); }} className="w-10 h-10 rounded-full border border-ink/15 hover:border-ink hover:bg-ink hover:text-paper transition-colors text-[13px] flex items-center justify-center font-mono" title="Copy link">⌗</button>
                </div>
              </div>
            </aside>

            {/* ARTICLE BODY */}
            <article id="article-content" className="col-span-12 lg:col-span-9 max-w-[68ch] text-ink">
              <Reveal>
                <div 
                  className="text-ink/80 leading-[1.8] text-[16px] sm:text-[18px] 
                  [&>p]:mb-6 
                  [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:text-ink 
                  [&>h3]:text-[20px] [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-ink 
                  [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 
                  [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-6 
                  [&>strong]:text-ink [&>strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: insight.content }} 
                />
              </Reveal>
            </article>
          </div>
        </section>

        {/* RELATED WRITING */}
        {relatedInsights.length > 0 && (
          <section id="related-writing" className="px-6 md:px-10 lg:px-14 py-20 sm:py-28 border-t border-ink/10 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/45">Continue reading</span>
                <h3 className="mt-5 font-sans font-bold tracking-[-0.025em] leading-[1.04]" style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}>
                  Related <span className="font-serif italic text-terra font-normal">writing.</span>
                </h3>
              </div>
              <Link to="/insights" className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink hover:text-terra hidden sm:inline">All articles →</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
              {relatedInsights.map((rel, i) => {
                const kind = i % 3 === 0 ? 'screen' : i % 3 === 1 ? 'hands' : 'desk';
                return (
                  <Reveal key={rel.id} delay={i * 0.1} className="group block cursor-pointer">
                    <Link to={`/insights/${rel.slug}`}>
                      <div className="relative rounded-2xl overflow-hidden border border-ink/10 bg-cream aspect-[4/3]">
                        {rel.coverImage ? (
                          <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        ) : (
                          <ThumbSvg kind={kind} id={`rel-${rel.id}`} />
                        )}
                        <span className="absolute top-4 left-4 font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-paper bg-ink/90 px-3 py-1 rounded-full">{rel.tag || rel.category || 'Playbook'}</span>
                      </div>
                      <div className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] font-semibold">
                        <span className="text-ink/45">
                          {new Date(rel.publishedAt || rel.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-ink/20"></span>
                        <span className="text-ink/45">{rel.readTime || '7 min'}</span>
                      </div>
                      <h4 className="mt-3 font-sans font-semibold text-[20px] leading-[1.2] tracking-[-0.01em] group-hover:text-terra transition-colors text-ink">{rel.title}</h4>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </section>
        )}

        {/* FIT CALL STRIP */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 bg-cream border-y border-ink/10">
          <div className="max-w-5xl mx-auto text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/50">If this resonated</span>
            <h3 className="mt-8 font-sans font-bold tracking-[-0.028em] leading-[1.04]" style={{ fontSize: "clamp(36px, 5.4vw, 64px)" }}>
              We'd rather diagnose <span className="font-serif italic text-terra font-normal">your</span> pilot than write about ours.
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

export default InsightDetail;

