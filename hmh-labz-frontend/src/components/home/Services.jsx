import React from 'react';
import Reveal from '../ui/Reveal';
import { useModal } from '../../App';

const Services = ({ content }) => {
  const { openFitCall } = useModal();
  const tiers = [
    { n: "01", tag: "Tier 01 · Wedge", title: "AI Opportunity Audit", sub: "Clarity, before commitment.", walk: "A prioritised list of what to fix, and what to ignore.", scale: "● ○ ○" },
    { n: "02", tag: "Tier 02 · Build", title: "Implementation Sprint", sub: "One system. Shipped.", walk: "One high-impact system live in production, owned by you.", scale: "● ● ○", featured: true },
    { n: "03", tag: "Tier 03 · Flagship", title: "Digital Transformation", sub: "Operations, end to end.", walk: "A system designed around your operations, not a template.", scale: "● ● ●" }
  ];

  return (
    <section id="how-we-work" className="bg-ink text-paper px-6 md:px-10 lg:px-14 py-28 sm:py-36">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-20 sm:mb-24 max-w-4xl text-left flex flex-col items-start mr-auto">
          <span className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-terra">03 — Services</span>
          <h2 className="mt-8 font-sans font-bold leading-[1.04] tracking-[-0.028em]" style={{ fontSize: "clamp(36px, 5.4vw, 68px)" }}>
            {content?.title || "Three ways we work"}<br /><em className="font-serif italic font-normal not-italic text-terra" style={{ fontStyle: 'italic' }}>{content?.highlight || "with you."}</em>
          </h2>
          <p className="mt-6 text-paper/55 text-[16px] sm:text-[18px] font-sans leading-[1.6] max-w-[60ch]">
            {content?.description || "Each engagement stands alone. Most clients start with the Audit."}
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch text-left">
          {tiers.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.1} className={`relative rounded-2xl overflow-hidden flex flex-col ${t.featured ? 'bg-paper/[0.07] border-2 border-terra lg:scale-[1.03] lg:-translate-y-2 shadow-2xl z-10' : 'bg-paper/[0.04] border border-paper/15'}`}>
              {t.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-terra text-paper px-5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.22em] rounded-b-full whitespace-nowrap">
                  Most common entry
                </div>
              )}
              <div className="flex items-center justify-between px-7 pt-7 pb-3 border-b border-paper/10 ">
                <span className="font-mono uppercase tracking-[0.16em] text-[11px] sm:text-[12px] text-terra ">{t.tag}</span>
                <span className="font-serif italic text-paper/15" style={{ fontSize: '44px', lineHeight: 1 }}>{t.n}</span>
              </div>
              <div className="px-7 py-8 flex-1 flex flex-col">
                <h3 className="font-serif text-paper" style={{ fontSize: "clamp(28px, 2.6vw, 34px)", lineHeight: 1.1 }}>{t.title}</h3>
                <p className="mt-2 font-serif italic text-terra text-[18px]">{t.sub}</p>
                
                <div className="mt-8 grid grid-cols-3 gap-4 py-5 border-y border-paper/10">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40 mb-2">Timeline</div>
                    <div className="text-[14px] font-medium text-paper">2-12 wks</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40 mb-2">Shape</div>
                    <div className="text-[14px] font-medium text-paper">Fixed fee</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40 mb-2">Scale</div>
                    <div className="text-[14px] font-medium text-paper">{t.scale}</div>
                  </div>
                </div>

                <div className={`mt-8 p-5 rounded-xl border-l-2 border-terra ${t.featured ? 'bg-terra/10' : 'bg-paper/[0.04]'}`}>
                  <h4 className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-2 ${t.featured ? 'text-terra' : 'text-paper/40'}`}>
                    You walk away with
                  </h4>
                  <p className="text-[14px] text-paper leading-[1.5]">
                    {t.walk}
                  </p>
                </div>

                <div className="flex-1"></div>
                <button 
                  onClick={openFitCall}
                  className={`mt-8 w-full py-4 rounded-full font-mono text-[10px] uppercase tracking-[0.22em] font-semibold transition-all ${t.featured ? 'bg-terra text-paper hover:bg-terra-deep' : 'border border-paper/25 text-paper hover:bg-paper hover:text-ink'}`}
                >
                  Discuss this →
                </button>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-20 text-center text-paper/45 text-[15px] font-sans">
          Not sure which one fits? <button onClick={openFitCall} className="text-paper underline underline-offset-8 decoration-terra/50 hover:decoration-terra">That's exactly what the Fit Call is for →</button>
        </p>
      </div>
    </section>
  );
};

export default Services;
