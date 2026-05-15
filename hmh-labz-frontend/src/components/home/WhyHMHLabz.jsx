import React from 'react';
import Reveal from '../ui/Reveal';

const WhyHMHLabz = ({ content }) => {
  const defaultPrinciples = [
    { n: "01", t: "We don't pitch from a template.", b: "Every engagement starts with diagnosis. If we can't articulate the problem clearly, we don't propose a solution.", r: "i." },
    { n: "02", t: "Strategy and build live in the same team.", b: "The person who recommends the system is responsible for shipping it. No handoffs to a separate delivery team.", r: "ii." },
    { n: "03", t: "We tell you when AI is the wrong answer.", b: "Often the highest-ROI move is a process fix or a hiring change. We'll say so, even when it's not in our interest.", r: "iii." },
    { n: "04", t: "Built for the long term.", b: "We document, we hand over, and we leave you with a system your team can actually own — not a black box.", r: "iv." }
  ];

  const principles = content?.principles?.map((p, i) => ({
    ...p,
    n: `0${i + 1}`,
    r: i === 0 ? "i." : i === 1 ? "ii." : i === 2 ? "iii." : "iv."
  })) || defaultPrinciples;

  return (
    <section className="bg-paper px-6 md:px-10 lg:px-14 py-28 sm:py-36">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-4xl mb-20 sm:mb-24 text-left flex flex-col items-start mr-auto">
          <span className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-ink/55">04 — Why HMH Labz</span>
          <h2 className="mt-8 font-sans font-bold leading-[1.06] tracking-[-0.028em] text-ink" style={{ fontSize: "clamp(36px, 5.2vw, 64px)" }}>
            {content?.title || "Strategy and build"} <em className="font-serif italic font-normal not-italic text-terra">{content?.highlight || "in the same team."}</em>
          </h2>
          <p className="mt-8 max-w-[60ch] text-ink/60 text-[16px] sm:text-[18px] leading-[1.6]">
            {content?.description || "Four principles we hold to, even when it's commercially inconvenient."}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} className="bg-cream rounded-2xl overflow-hidden border border-ink/10 transition-transform hover:scale-[1.01] text-left">
              <div className="flex items-center justify-between px-7 py-3 border-b border-ink/10">
                <span className="font-mono uppercase tracking-[0.16em] text-[11px] sm:text-[12px] text-terra ">Principle {p.n}</span>
                <span className="font-serif italic text-terra text-[22px]">{p.r}</span>
              </div>
              <div className="px-7 py-9">
                <h4 className="font-sans font-semibold text-ink text-[22px] sm:text-[24px] tracking-[-0.01em] leading-[1.25]">{p.title || p.t}</h4>
                <p className="mt-4 text-ink/65 text-[14px] sm:text-[15px] leading-[1.6]">{p.desc || p.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHMHLabz;
