import React from 'react';
import Reveal from '../ui/Reveal';

const HowWeWork = ({ content }) => {
  const defaultTiers = [
    {
      title: "AI Opportunity Audit",
      desc: "Clarity, before commitment. We identify the high-ROI leverage points in your business.",
      timeline: "2-12 wks",
      shape: "Fixed fee",
      walkAway: "A prioritised list of buildable opportunities.",
      color: "bg-paper"
    },
    {
      title: "Implementation Sprint",
      desc: "Shipping the roadmap. One sprint, one specific system or automation launched.",
      timeline: "4-12 wks",
      shape: "Fixed fee",
      walkAway: "A live, fully operational system.",
      color: "bg-cream",
      highlight: true
    },
    {
      title: "Embedded Studio",
      desc: "Your dedicated build team. We become your fractional product and engineering arm.",
      timeline: "Ongoing",
      shape: "Monthly",
      walkAway: "Continuous operational transformation.",
      color: "bg-paper"
    }
  ];

  const tiers = content?.tiers || defaultTiers;

  return (
    <section className="bg-paper px-6 md:px-10 lg:px-14 py-24 sm:py-32">
      <Reveal className="max-w-4xl mb-20 sm:mb-24 mx-auto text-center flex flex-col items-center">
        <span className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-ink/55">02 — Engagement Models</span>
        <h2 className="mt-8 font-sans font-bold text-ink leading-[1.04] tracking-[-0.028em]" style={{ fontSize: "clamp(36px, 5.4vw, 64px)" }}>
          {content?.title || "Three ways we work"} <em className="font-serif italic font-normal not-italic text-terra">{content?.highlight || "with you."}</em>
        </h2>
        <p className="mt-8 max-w-[56ch] font-sans text-[16px] sm:text-[18px] leading-[1.6] text-ink/65 mx-auto">
          {content?.description || "Each engagement stands alone. No long-term lock-ins. We ship value, then you decide what's next."}
        </p>
      </Reveal>

      <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
        {tiers.map((tier, i) => (
          <Reveal key={tier.title} delay={i * 0.1} className={`relative flex flex-col rounded-[2rem] overflow-hidden border border-ink/10 ${tier.color || 'bg-paper'} p-10 sm:p-12 transition-transform hover:scale-[1.01]`}>
            {tier.highlight && (
              <div className="absolute top-0 left-0 right-0 h-2 bg-terra"></div>
            )}
            <h3 className="font-sans font-bold text-2xl sm:text-3xl tracking-tight mb-6">{tier.title}</h3>
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-ink/70 mb-12 flex-grow">
              {tier.desc}
            </p>
            
            <div className="space-y-6 pt-10 border-t border-ink/5">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">Timeline</span>
                <span className="font-sans font-bold text-[13px]">{tier.timeline}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">Shape</span>
                <span className="font-sans font-bold text-[13px]">{tier.shape}</span>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">You walk away with</span>
                <span className="font-serif italic text-[15px] text-terra leading-tight">{tier.walkAway}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;
