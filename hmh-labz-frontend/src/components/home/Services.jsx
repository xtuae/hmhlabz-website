import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import { useModal } from '../../App';

const Services = ({ content }) => {
  const { openModal } = useModal();
  const tiers = [
    { n: "01", tag: "Tier 01 · Wedge", title: "AI Opportunity Audit", sub: "Clarity, before commitment.", walk: "A prioritised list of what to fix, and what to ignore.", scale: "● ○ ○" },
    { n: "02", tag: "Tier 02 · Build", title: "Implementation Sprint", sub: "One system. Shipped.", walk: "One high-impact system live in production, owned by you.", scale: "● ● ○", featured: true },
    { n: "03", tag: "Tier 03 · Flagship", title: "Digital Transformation", sub: "Operations, end to end.", walk: "A system designed around your operations, not a template.", scale: "● ● ●" }
  ];

  return (
    <section id="how-we-work" className="bg-paper text-ink px-6 md:px-10 lg:px-14 py-28 sm:py-36">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-20 sm:mb-24 max-w-4xl text-left flex flex-col items-start mr-auto">
          <span className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-terra">03 — Services</span>
          <h2 className="mt-8 font-sans font-bold leading-[1.04] tracking-[-0.028em] text-ink" style={{ fontSize: "clamp(36px, 5.4vw, 68px)" }}>
            {content?.title || "Three ways we work"}<br /><em className="font-serif italic font-normal not-italic text-terra" style={{ fontStyle: 'italic' }}>{content?.highlight || "with you."}</em>
          </h2>
          <p className="mt-6 text-ink/60 text-[16px] sm:text-[18px] font-sans leading-[1.6] max-w-[60ch]">
            {content?.description || "Each engagement stands alone. Most clients start with the Audit."}
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch text-left">
          {tiers.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.1} className={`relative rounded-2xl overflow-hidden flex flex-col ${t.featured ? 'bg-cream border-2 border-terra lg:scale-[1.03] lg:-translate-y-2 shadow-xl shadow-terra/5 z-10 text-ink' : 'bg-paper border border-ink/10 text-ink'}`}>
              {t.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-terra text-white px-5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.22em] rounded-b-full whitespace-nowrap">
                  Most common entry
                </div>
              )}
              <div className="flex items-center justify-between px-7 pt-7 pb-3 border-b border-ink/10 ">
                <span className="font-mono uppercase tracking-[0.16em] text-[11px] sm:text-[12px] text-terra ">{t.tag}</span>
                <span className="font-serif italic text-ink/10" style={{ fontSize: '44px', lineHeight: 1 }}>{t.n}</span>
              </div>
              <div className="px-7 py-8 flex-1 flex flex-col">
                <h3 className="font-serif text-ink" style={{ fontSize: "clamp(28px, 2.6vw, 34px)", lineHeight: 1.1 }}>{t.title}</h3>
                <p className="mt-2 font-serif italic text-terra text-[18px]">{t.sub}</p>
                
                <div className="mt-8 grid grid-cols-3 gap-4 py-5 border-y border-ink/10">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40 mb-2">Timeline</div>
                    <div className="text-[14px] font-medium text-ink">{t.n === "01" ? "1-2 wks" : t.n === "02" ? "3-6 wks" : "3-6 mths"}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40 mb-2">Shape</div>
                    <div className="text-[14px] font-medium text-ink">{t.n === "03" ? "Phased" : "Fixed fee"}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40 mb-2">Scale</div>
                    <div className="text-[14px] font-medium text-ink">
                      <div className="flex gap-1 mt-1">
                        {t.scale.split(' ').map((p, idx) => (
                          <div 
                            key={idx} 
                            className={`w-2.5 h-2.5 rounded-full ${p === '●' ? 'bg-ink' : 'border border-ink/30 bg-transparent'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-5 rounded-r-xl border-l-2 border-terra bg-cream">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2 text-terra">
                    You walk away with
                  </h4>
                  <p className="text-[14px] text-ink leading-[1.5]">
                    {t.walk}
                  </p>
                </div>

                <div className="flex-1"></div>
                <div className="mt-8 flex flex-col gap-3 w-full">
                  <Link 
                    to={`/services/${t.n === "01" ? "audit" : t.n === "02" ? "sprint" : "transform"}`}
                    className="w-full py-3 bg-terra text-white hover:bg-terra-deep rounded-full text-xs font-mono uppercase tracking-widest font-bold text-center block transition-colors"
                  >
                    View full service →
                  </Link>
                  <button 
                    onClick={() => openModal(t.tag)}
                    className="w-full py-3 text-ink/60 hover:text-terra text-xs font-mono uppercase tracking-widest font-bold text-center transition-colors focus:outline-none"
                  >
                    Discuss this →
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-20 text-center text-ink/65 text-[15px] font-sans">
          Not sure which one fits? <button onClick={() => openModal()} className="text-ink underline underline-offset-8 decoration-terra/50 hover:decoration-terra font-medium">That's exactly what the Fit Call is for →</button>
        </p>
      </div>
    </section>
  );
};

export default Services;
