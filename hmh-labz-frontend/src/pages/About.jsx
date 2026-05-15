import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/ui/Reveal';
import MonoLabel from '../components/ui/MonoLabel';
import SEO from '../components/seo/SEO';
import api from '../api/client';

const About = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await api.get('/pages/about');
        setPageData(response.data);
      } catch (error) {
        console.error('Failed to fetch about page data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const content = pageData?.content?.about;

  return (
    <div className="bg-paper selection:bg-terra selection:text-paper min-h-screen relative">
      <SEO 
        title={pageData?.title || 'About | HMH Labz'}
        description={pageData?.metaDescription || 'Strategy + build, in one team. We founded HMH Labz to kill the traditional agency hand-off.'}
      />
      
      <Navbar />
      
      <main className="pt-20 text-left">
        <header className="px-6 md:px-10 lg:px-14 pt-16 sm:pt-24 pb-20 sm:pb-32 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <MonoLabel>N° 01 — Mission</MonoLabel>
                <h1 className="mt-10 sm:mt-12 font-sans font-bold text-ink tracking-tight leading-[0.94]" style={{ fontSize: "clamp(42px, 7vw, 100px)" }}>
                  {content?.hero?.title || 'Strategy + build,'} <span className="font-serif italic text-terra font-normal">{content?.hero?.highlight || 'in one team.'}</span>
                </h1>
                <p className="mt-10 max-w-[48ch] text-ink/65 text-xl sm:text-2xl leading-relaxed">
                  {content?.hero?.description || 'We founded HMH Labz to kill the traditional agency hand-off. The architects who diagnose your problems are the engineers who build the solutions.'}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5 relative">
              <Reveal delay={0.2} direction="left">
                <div className="aspect-[4/5] rounded-[3rem] bg-cream border border-ink/10 overflow-hidden relative">
                  <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full">
                    <rect width="400" height="500" fill="#EDE6D3" />
                    <g transform="translate(100 150)">
                      <circle cx="100" cy="80" r="60" fill="#161513" opacity="0.1" />
                      <path d="M40 250 Q100 200 160 250 L160 350 L40 350 Z" fill="#161513" opacity="0.1" />
                    </g>
                    <text x="200" y="460" fontFamily="Fraunces" fontStyle="italic" fontSize="14" fill="#C2410C" textAnchor="middle">EST. 2024</text>
                  </svg>
                </div>
              </Reveal>
            </div>
          </div>
        </header>

        <section className="bg-ink text-paper py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 sm:gap-20 items-start">
              <div className="md:col-span-5">
                <Reveal>
                  <MonoLabel color="terra">The Philosophy</MonoLabel>
                  <h2 className="mt-8 text-4xl sm:text-6xl font-black leading-tight tracking-tight">
                    {content?.story?.heading || "Scale shouldn't mean bloat."}
                  </h2>
                </Reveal>
              </div>
              <div className="md:col-span-7">
                <Reveal delay={0.2}>
                  <div className="space-y-10 text-paper/60 text-lg sm:text-xl leading-relaxed font-light">
                    <p>{content?.story?.text || "At HMH Labz, we hire only senior technical leads. When you discuss your architecture with us, you're talking to the person who will be writing the PRs. This model reclaimed 84% of ops time for our clients last year."}</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {content?.team?.members && content.team.members.length > 0 && (
          <section className="bg-paper py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <Reveal>
                <MonoLabel color="terra">The Team</MonoLabel>
                <h2 className="mt-8 text-4xl sm:text-6xl font-black leading-tight tracking-tight text-ink mb-20">
                  {content?.team?.heading || "The Operators"}
                </h2>
              </Reveal>
              <div className="grid md:grid-cols-3 gap-12">
                {content.team.members.map((member, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="space-y-6">
                      <div className="aspect-square bg-cream rounded-3xl border border-ink/10" />
                      <div>
                        <h4 className="text-2xl font-bold text-ink">{member.name}</h4>
                        <p className="text-terra font-mono text-xs uppercase tracking-widest mt-1">{member.role}</p>
                      </div>
                      <p className="text-ink/65 leading-relaxed">{member.bio}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default About;
