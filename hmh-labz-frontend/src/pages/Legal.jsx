import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import client from '../api/client';
import { Loader2 } from 'lucide-react';

const Legal = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    client.get(`/pages/${slug}`)
      .then(res => {
        if (res.data && res.data.content) {
          setData(res.data.content);
        } else {
          setData(null);
        }
      })
      .catch(err => {
        console.error(err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (loading || !data?.sections) return;

    const sections = document.querySelectorAll('.legal-content section');
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute('id'));
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(section => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, data]);

  if (loading) return (
    <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#C2410C]" size={32} />
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col items-center justify-center text-[#161513] space-y-4">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-3xl font-black">Page Not Found</h1>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EA] text-[#161513] font-sans selection:bg-[#C2410C] selection:text-[#F4F1EA]">
      <style dangerouslySetInnerHTML={{__html: `
        .legal-content section { scroll-margin-top: 120px; }
        .legal-content h2 { font-family: 'Fraunces', serif; font-size: 2.25rem; margin-top: 4rem; margin-bottom: 1.5rem; color: #161513; line-height: 1.2; }
        .legal-content section:first-of-type h2 { margin-top: 0; }
        .legal-content section > p { margin-bottom: 1.5rem; color: rgba(22, 21, 19, 0.7); font-size: 1.125rem; line-height: 1.75; font-weight: 300; }
        .legal-content section > ul { margin-bottom: 1.5rem; padding-left: 1.5rem; list-style-type: none; }
        .legal-content section > ul > li { position: relative; margin-bottom: 0.75rem; color: rgba(22, 21, 19, 0.7); font-size: 1.125rem; line-height: 1.75; font-weight: 300; }
        .legal-content section > ul > li::before { content: "—"; position: absolute; left: -1.5rem; color: #C2410C; }
        .legal-content a { color: #161513; text-decoration: underline; text-decoration-color: rgba(194, 65, 12, 0.3); text-underline-offset: 4px; transition: text-decoration-color 0.2s; }
        .legal-content a:hover { text-decoration-color: #C2410C; }
      `}} />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 md:pt-40 md:pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Header */}
          <div className="mb-16 md:mb-24">
            <p className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-[#C2410C] mb-6 block">Last Updated: {data.lastUpdated}</p>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#161513] mb-8">
              {data.title} <em className="font-serif italic font-normal text-[#C2410C]">{data.highlight}</em>
            </h1>
            <div className="mt-8 max-w-2xl">
              <p className="text-xl text-[#161513]/60 font-light leading-relaxed">
                {data.intro}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

            {/* Sticky Sidebar (Table of Contents) */}
            <aside className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-32 space-y-4">
                <p className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-[#161513]/40 mb-8">Contents</p>
                <nav className="flex flex-col space-y-5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#161513]/50">
                  {data.sections?.map((sec, idx) => (
                    <a 
                      key={idx} 
                      href={`#${sec.id}`} 
                      className={`hover:text-[#161513] transition-all ${activeSection === sec.id ? 'text-[#C2410C] pl-4 border-l-2 border-[#C2410C]' : 'border-l-2 border-transparent pl-4 -ml-4'}`}
                    >
                      0{idx + 1}. {sec.title}
                    </a>
                  ))}
                </nav>

                {/* Contact Helper Box */}
                <div className="mt-16 p-8 bg-[#EDE6D3] rounded-3xl border border-[#161513]/5">
                  <p className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-[#C2410C] mb-3">Need Help?</p>
                  <p className="text-sm leading-relaxed text-[#161513]/70 font-light mb-6">Questions about your data? Our compliance team is here to help.</p>
                  <a href="mailto:hello@hmhlabz.com" className="font-mono text-[10px] font-bold uppercase tracking-widest border-b border-[#C2410C] pb-1 hover:text-[#C2410C] transition-colors">hello@hmhlabz.com</a>
                </div>
              </div>
            </aside>

            {/* Legal Content Body */}
            <div className="lg:w-3/4 legal-content">
              {data.sections?.map((sec, idx) => (
                <section key={idx} id={sec.id}>
                  <h2>{sec.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: sec.content }} />
                </section>
              ))}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
