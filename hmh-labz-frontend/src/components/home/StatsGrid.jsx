import React from 'react';
import Reveal from '../ui/Reveal';

const StatsGrid = ({ stats }) => {
  const defaultStats = [
    { prefix: "", number: "84", suffix: "%", desc: "average reduction in manual workflow time after a sprint." },
    { prefix: "$", number: "2.4", suffix: "M", desc: "unlocked across client engagements, cumulative." },
    { prefix: "", number: "2-12", suffix: "weeks", desc: "from first diagnostic to shipped systems." }
  ];

  const displayStats = stats || defaultStats;

  return (
    <section className="px-6 md:px-10 lg:px-14 pb-20 sm:pb-28">
      <div className="grid grid-cols-12 gap-4 sm:gap-5 items-stretch max-w-7xl mx-auto">
        {displayStats.map((s, i) => (
          <Reveal key={i} delay={i * 0.1} className={`relative flex flex-col rounded-2xl overflow-hidden border-2 border-ink col-span-12 sm:col-span-6 lg:col-span-4 text-left ${i === 0 ? 'bg-ink text-paper' : i === 1 ? 'bg-cream text-ink' : 'bg-paper text-ink'}`}>
            <div className={`flex items-center justify-between px-5 sm:px-6 py-3 border-b ${i === 0 ? 'border-paper/20' : 'border-ink/20'}`}>
              <span className={`font-mono uppercase tracking-[0.16em] text-[11px] sm:text-[12px] ${i === 0 ? 'text-paper/70' : 'text-ink/55'}`}>
                {i === 0 ? 'Ops time reclaimed' : i === 1 ? "Unlocked '24 — '26" : "What we ship in"}
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${i === 0 ? 'text-paper/45' : 'text-ink/45'}`}>FIG. 0{i+1}</span>
            </div>
            <div className="flex-1 px-5 sm:px-6 py-6 sm:py-7 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-baseline gap-1.5">
                  {s.prefix && <span className="font-serif italic text-terra leading-none" style={{ fontSize: "clamp(34px, 4vw, 56px)" }}>{s.prefix}</span>}
                  <span className={`font-sans font-bold leading-none tracking-[-0.04em] ${i === 0 ? 'text-paper' : 'text-ink'}`} style={{ fontSize: "clamp(72px, 10vw, 132px)" }}>
                    {s.number}
                  </span>
                  {s.suffix && <span className={`font-serif italic leading-none ml-0.5 ${i === 2 ? 'text-ink/70' : i === 0 ? 'text-terra' : 'text-ink'}`} style={{ fontSize: i === 2 ? "clamp(22px, 2.4vw, 28px)" : "clamp(44px, 5vw, 72px)" }}>{s.suffix}</span>}
                </div>
              </div>
              <p className={`mt-4 font-sans text-[13px] sm:text-[14px] leading-[1.5] max-w-[26ch] ${i === 0 ? 'text-paper/65' : 'text-ink/70'}`}>
                {s.desc}
              </p>
            </div>
            <div className={`px-5 sm:px-6 py-3 border-t ${i === 0 ? 'border-paper/20' : 'border-ink/20'} font-mono text-[10px] uppercase tracking-[0.16em] ${i === 0 ? 'text-paper/45' : 'text-ink/45'} flex items-center justify-between gap-3`}>
              <span>{i === 0 ? 'Post-sprint' : i === 1 ? 'Cumulative' : 'Wk 02'}</span>
              <span className="text-terra">{i === 0 ? `↓ ${s.number}%` : i === 1 ? "Q2 '26 →" : "Wk 12 ✓"}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default StatsGrid;
