import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/seo/SEO';
import { useModal } from '../App';
import { servicesData } from '../data/servicesData';

const ServiceDetail = () => {
  const { slug } = useParams();
  const { openModal } = useModal();

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const service = servicesData[slug];

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-[#0c0a09] text-[#f3ede4] selection:bg-terra selection:text-[#f3ede4] min-h-screen relative font-sans">
      <SEO 
        title={`${service.title} | HMH Labz`} 
        description={service.lede} 
      />
      
      {/* Paper Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMjAiIGhlaWdodD0iMjIwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjA4ICAwIDAgMCAwIDAuMDcgIDAgMCAwIDAgMC4wNiAgMCAwIDAgMC4wNCAwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+')] bg-[length:220px_220px]"></div>

      <Navbar />

      <main className="relative z-20 max-w-[1080px] mx-auto px-6 md:px-10 lg:px-14 pt-[130px] pb-24 text-left">
        {/* Back Button */}
        <Link 
          to="/#how-we-work" 
          className="inline-flex items-center gap-2 text-[#8a8178] hover:text-[#d2693f] transition-colors font-mono uppercase tracking-[0.14em] text-[11px] mb-8"
        >
          ← All services
        </Link>
        
        {/* Hero Section */}
        <header className="pb-10 border-b border-[#2e2925]">
          <span className="text-terra font-mono uppercase tracking-[0.18em] text-[11.5px] font-semibold">
            {service.tierLabel}
          </span>
          <h1 
            style={{ fontSize: "clamp(34px, 5.8vw, 74px)" }} 
            className="text-white font-bold leading-[1.04] tracking-[-0.025em] mt-4 mb-2"
          >
            {service.title}
          </h1>
          <p className="italic text-[#d2693f] text-2xl font-serif mt-2">
            {service.tagline}
          </p>
          <p className="text-[#8a8178] text-lg sm:text-[20px] leading-[1.65] max-w-[680px] mt-6 font-serif">
            {service.lede}
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
            {service.meta.map((m, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-mono uppercase tracking-[0.14em] text-[10px] text-[#5c544c]">
                  {m.label}
                </span>
                <span className="text-[#f3ede4] text-lg sm:text-[20px] font-medium mt-1">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* Who it's for Section */}
        <section className="mt-16">
          <div className="text-terra font-mono uppercase tracking-[0.18em] text-[11px] font-semibold flex items-center gap-4 mb-8 after:content-[''] after:flex-1 after:h-px after:bg-[#2e2925]">
            Who it's for
          </div>
          <h2 className="text-white font-bold text-2xl sm:text-3xl tracking-[-0.015em] leading-tight mb-4">
            Choose this when you need a {service.slug === 'audit' ? 'map before you spend' : service.slug === 'sprint' ? 'system that actually ships' : 'whole operating system to change'}.
          </h2>
          <p className="text-[#8a8178] text-[16px] sm:text-[18px] leading-[1.7] max-w-[720px] mb-8">
            {service.slug === 'audit' 
              ? "The Audit is the right entry point if AI is on your agenda but you're not yet ready to commit budget to a build. It's deliberately low-risk — a way to find out what's real before anything bigger is on the table."
              : service.slug === 'sprint'
              ? "The Sprint is the right call when the opportunity is already clear — whether you've done an Audit with us or simply know your own bottleneck. The scope is deliberately narrow so the result is deliberately real."
              : "Transformation is for organisations ready to treat operations as a strategic priority — not patch one workflow, but rebuild the way work moves through the business. It's a significant commitment, and it's scoped accordingly."
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-[#1a1715] border border-[#2e2925] rounded-2xl p-6 sm:p-8 flex flex-col">
              <h3 className="font-mono uppercase tracking-[0.12em] text-[11.5px] font-semibold text-[#d2693f] mb-6">
                A strong fit if
              </h3>
              <ul>
                {service.fit.yes.map((fitItem, i) => (
                  <li 
                    key={i} 
                    className="relative pl-6 py-3 text-[15px] sm:text-[16px] leading-[1.5] text-[#8a8178] border-t border-[#2e2925] first:border-0 before:content-['→'] before:absolute before:left-0 before:text-terra font-medium"
                  >
                    {fitItem}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#1a1715] border border-[#2e2925] rounded-2xl p-6 sm:p-8 flex flex-col">
              <h3 className="font-mono uppercase tracking-[0.12em] text-[11.5px] font-semibold text-[#5c544c] mb-6">
                Probably not yet if
              </h3>
              <ul>
                {service.fit.no.map((fitItem, i) => (
                  <li 
                    key={i} 
                    className="relative pl-6 py-3 text-[15px] sm:text-[16px] leading-[1.5] text-[#8a8178]/60 border-t border-[#2e2925] first:border-0 before:content-['×'] before:absolute before:left-0 before:text-[#5c544c] font-medium"
                  >
                    {fitItem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="mt-16">
          <div className="text-terra font-mono uppercase tracking-[0.18em] text-[11px] font-semibold flex items-center gap-4 mb-8 after:content-[''] after:flex-1 after:h-px after:bg-[#2e2925]">
            What we do
          </div>
          <h2 className="text-white font-bold text-2xl sm:text-3xl tracking-[-0.015em] leading-tight mb-4">
            The process, step by step.
          </h2>
          <p className="text-[#8a8178] text-[16px] sm:text-[18px] leading-[1.7] max-w-[720px] mb-8">
            {service.slug === 'audit'
              ? "Two weeks, four stages. Light on your time, heavy on our analysis — you'll be involved at the start and the end, and largely left alone in the middle."
              : service.slug === 'sprint'
              ? "A fixed sprint with clear checkpoints. You stay close enough to steer, while we own delivery — and nothing ships without your sign-off."
              : "A phased programme rather than a single sprint. Each phase delivers working value, so you're never months from a result — and we embed with your team throughout."
            }
          </p>
          
          <div className="mt-8">
            {service.process.map((step, i) => (
              <div 
                key={i} 
                className="grid grid-cols-1 md:grid-cols-[70px_1fr] gap-4 md:gap-8 py-8 border-t border-[#2e2925] last:border-b"
              >
                <div className="font-serif italic text-4xl sm:text-5xl text-terra leading-none font-normal">
                  {step.number}
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="text-white font-semibold text-[20px] tracking-[-0.015em]">
                    {step.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#5c544c] mt-1.5">
                    {step.timeframe}
                  </span>
                  <p className="text-[#8a8178] text-[15px] sm:text-[16px] leading-[1.65] mt-3 max-w-[720px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="mt-16">
          <div className="text-terra font-mono uppercase tracking-[0.18em] text-[11px] font-semibold flex items-center gap-4 mb-8 after:content-[''] after:flex-1 after:h-px after:bg-[#2e2925]">
            What you get
          </div>
          <h2 className="text-white font-bold text-2xl sm:text-3xl tracking-[-0.015em] leading-tight mb-8">
            Concrete deliverables.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((deliv, i) => (
              <div key={i} className="bg-[#15110f] border border-[#2e2925] rounded-2xl p-6 sm:p-8 flex flex-col text-left">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-terra font-semibold">
                  {deliv.tag}
                </span>
                <h4 className="text-white font-semibold text-lg sm:text-[20px] mt-2">
                  {deliv.title}
                </h4>
                <p className="text-[#8a8178] text-[14px] sm:text-[15px] leading-[1.55] mt-2">
                  {deliv.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Outcomes Section */}
        <section className="mt-16">
          <div className="text-terra font-mono uppercase tracking-[0.18em] text-[11px] font-semibold flex items-center gap-4 mb-8 after:content-[''] after:flex-1 after:h-px after:bg-[#2e2925]">
            Outcomes &amp; impact
          </div>
          <h2 className="text-white font-bold text-2xl sm:text-3xl tracking-[-0.015em] leading-tight mb-8">
            How this changes things.
          </h2>
          
          <div className="bg-[#1a1715] border border-[#2e2925] border-l-4 border-l-terra rounded-2xl overflow-hidden">
            {service.outcomes.beforeAfter.map((row, i) => (
              <div 
                key={i} 
                className="grid grid-cols-1 md:grid-cols-2 border-t border-[#2e2925] first:border-0"
              >
                <div className="p-6 sm:p-8 flex flex-col text-left border-b md:border-b-0 md:border-r border-[#2e2925] bg-[#15110f]/50">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#5c544c] mb-2 block">
                    Before
                  </span>
                  <p className="text-[#5c544c] text-[15px] sm:text-[16px] leading-relaxed">
                    {row.before}
                  </p>
                </div>
                <div className="p-6 sm:p-8 flex flex-col text-left bg-[#1a1715]">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#d2693f] mb-2 block">
                    After
                  </span>
                  <p className="text-[#f3ede4] text-[15px] sm:text-[16px] leading-relaxed">
                    {row.after}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-8 border-t border-[#2e2925]">
            {service.outcomes.impact.map((imp, i) => (
              <li 
                key={i} 
                className="relative pl-8 py-5 text-[15px] sm:text-[16px] leading-relaxed text-[#f3ede4] border-b border-[#2e2925] last:border-b-0 before:content-['—'] before:absolute before:left-0 before:text-terra text-left"
              >
                <strong className="font-semibold text-white">{imp.title}</strong> — <span className="text-[#8a8178]">{imp.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA Section */}
        <section className="mt-20 bg-[#211d1a] border border-[#2e2925] rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-white font-semibold text-2xl sm:text-3xl tracking-[-0.015em] mb-4">
            {service.slug === 'audit' 
              ? "Not sure if the Audit is the right start?" 
              : service.slug === 'sprint' 
              ? "Have a use case in mind?" 
              : "Ready to rebuild how your operations run?"
            }
          </h2>
          <p className="text-[#8a8178] text-[16px] sm:text-[17px] leading-relaxed max-w-[50ch] mx-auto mb-8 font-serif">
            {service.slug === 'audit'
              ? "Tell us a little about your business and we'll point you to the right tier — even if it isn't this one."
              : service.slug === 'sprint'
              ? "Bring us the process you'd most like to fix and we'll tell you honestly whether a Sprint can deliver it."
              : "Transformation engagements start with a conversation about scope, sequencing, and fit. Let's have it."
            }
          </p>
          <button 
            onClick={() => openModal(service.tierLabel)}
            className="inline-flex items-center gap-3 bg-terra hover:bg-terra-deep text-white px-10 py-4 rounded-full font-mono font-bold text-xs uppercase tracking-[0.25em] transition-colors focus:outline-none"
          >
            Discuss this →
          </button>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
