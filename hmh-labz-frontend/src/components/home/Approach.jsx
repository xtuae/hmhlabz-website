import React from 'react';
import Reveal from '../ui/Reveal';

const Approach = () => {
  const steps = [
    { n: "01", tag: "Diagnose", t: "Find what's actually broken.", b: "We map your workflows, interview your team, and isolate the bottlenecks worth fixing first. Not a generic audit — a real one.", out: "Workflow map" },
    { n: "02", tag: "Recommend", t: "Score the highest-ROI fix.", b: "Every opportunity gets a clear number — impact, feasibility, cost, time. You walk away knowing what to do first, and why.", out: "Scored roadmap" },
    { n: "03", tag: "Ship", t: "Build the system that solves it.", b: "Custom platforms, client portals, AI workflows, document automation. The same team that diagnosed it ships it. No handoffs.", out: "Live system", dark: true }
  ];

  return (
    <section id="approach" className="bg-cream border-y border-ink/10 px-6 md:px-10 lg:px-14 py-24 sm:py-32">
      <Reveal className="max-w-3xl mb-20 sm:mb-24 mx-auto text-left">
        <span className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-ink/55">01 — Approach</span>
        <h2 className="mt-8 font-sans font-bold text-ink leading-[1.04] tracking-[-0.028em]" style={{ fontSize: "clamp(36px, 5.4vw, 64px)" }}>
          Most studios <em className="font-serif italic font-normal not-italic ">talk.</em><br />
          Most consultants <em className="font-serif italic font-normal not-italic text-terra">vanish.</em><br />
          We do both — <em className="font-serif italic font-normal not-italic ">properly.</em>
        </h2>
        <p className="mt-8 max-w-[56ch] font-sans text-[16px] sm:text-[18px] leading-[1.6] text-ink/65">
          One linear process. The same team carries every step — so nothing gets lost between strategy and shipping.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-7xl mx-auto">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1} className={`bg-${s.dark ? 'ink' : 'paper'} text-${s.dark ? 'paper' : 'ink'} rounded-2xl overflow-hidden border border-ink/12 flex flex-col transition-transform hover:scale-[1.02] text-left`}>
            <div className={`flex items-center justify-between px-7 py-3 border-b border-${s.dark ? 'paper/15' : 'ink/12'}`}>
              <span className="font-mono uppercase tracking-[0.16em] text-[11px] sm:text-[12px] text-ink/55 ">{s.tag}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">FIG. {s.n}</span>
            </div>
            <div className="px-7 py-9 flex-1 flex flex-col">
              <div className="flex items-baseline gap-3">
                <span className="font-serif italic text-terra" style={{ fontSize: "clamp(48px, 4.6vw, 64px)", lineHeight: 1 }}>{s.n}</span>
              </div>
              <h3 className="mt-6 font-sans font-semibold text-[22px] sm:text-[24px] tracking-[-0.01em] leading-[1.2]">{s.t}</h3>
              <p className={`mt-4 text-[14px] sm:text-[15px] leading-[1.6] ${s.dark ? 'text-paper/65' : 'text-ink/65'}`}>
                {s.b}
              </p>
            </div>
            <div className={`px-7 py-3 border-t border-${s.dark ? 'paper/15' : 'ink/12'} flex items-center justify-between`}>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">Output</span>
              <span className="font-serif italic text-[15px] text-terra">{s.out}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Approach;
