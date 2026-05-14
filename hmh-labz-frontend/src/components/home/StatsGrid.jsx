import React from 'react';
import Reveal from '../ui/Reveal';

const StatsGrid = () => {
  return (
    <section className="px-6 md:px-10 lg:px-14 pb-20 sm:pb-28">
      <div className="grid grid-cols-12 gap-4 sm:gap-5 items-stretch max-w-7xl mx-auto">
        <Reveal className="relative flex flex-col rounded-2xl overflow-hidden bg-ink text-paper border-2 border-ink col-span-12 sm:col-span-6 lg:col-span-4 text-left">
          <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-paper/20">
            <span className="font-mono uppercase tracking-[0.16em] text-[11px] sm:text-[12px] text-paper/70 ">Ops time reclaimed</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/45">FIG. 01</span>
          </div>
          <div className="flex-1 px-5 sm:px-6 py-6 sm:py-7 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="font-sans font-bold leading-none tracking-[-0.04em] text-paper" style={{ fontSize: "clamp(72px, 10vw, 132px)" }}>
                84<span className="text-terra">%</span>
              </div>
            </div>
            <p className="mt-4 font-sans text-[13px] sm:text-[14px] leading-[1.5] text-paper/65 max-w-[24ch]">
              average reduction in manual workflow time after a sprint.
            </p>
          </div>
          <div className="px-5 sm:px-6 py-3 border-t border-paper/20 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/45 flex items-center justify-between gap-3">
            <span>Post-sprint</span>
            <span className="text-terra">↓ 84%</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative flex flex-col rounded-2xl overflow-hidden bg-cream text-ink border-2 border-ink col-span-12 sm:col-span-6 lg:col-span-4 text-left">
          <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-ink/20">
            <span className="font-mono uppercase tracking-[0.16em] text-[11px] sm:text-[12px] text-ink/55 ">Unlocked '24 — '26</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">FIG. 02</span>
          </div>
          <div className="flex-1 px-5 sm:px-6 py-6 sm:py-7 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif italic text-terra leading-none" style={{ fontSize: "clamp(34px, 4vw, 56px)" }}>$</span>
                <span className="font-sans font-bold text-ink leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(72px, 10vw, 132px)" }}>2.4</span>
                <span className="font-serif italic text-ink leading-none ml-0.5" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>M</span>
              </div>
            </div>
            <p className="mt-4 font-sans text-[13px] sm:text-[14px] leading-[1.5] text-ink/70 max-w-[26ch]">
              unlocked across client engagements, cumulative.
            </p>
          </div>
          <div className="px-5 sm:px-6 py-3 border-t border-ink/20 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45 flex items-center justify-between gap-3">
            <span>Cumulative</span>
            <span className="text-terra">Q2 '26 →</span>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="relative flex flex-col rounded-2xl overflow-hidden bg-paper text-ink border-2 border-ink col-span-12 lg:col-span-4 text-left">
          <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-ink/20">
            <span className="font-mono uppercase tracking-[0.16em] text-[11px] sm:text-[12px] text-ink/55 ">What we ship in</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">FIG. 03</span>
          </div>
          <div className="flex-1 px-5 sm:px-6 py-6 sm:py-7 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-baseline gap-2 flex-wrap justify-center">
                <span className="font-sans font-bold text-ink leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(72px, 10vw, 132px)" }}>2</span>
                <span className="font-serif italic text-terra leading-none" style={{ fontSize: "clamp(44px, 6vw, 80px)" }}>—</span>
                <span className="font-sans font-bold text-ink leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(72px, 10vw, 132px)" }}>12</span>
                <span className="font-serif italic text-ink/70 leading-none ml-1" style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}>weeks</span>
              </div>
            </div>
            <p className="mt-4 font-sans text-[13px] sm:text-[14px] leading-[1.5] text-ink/70 max-w-[26ch]">
              from first diagnostic to shipped systems.
            </p>
          </div>
          <div className="px-5 sm:px-6 py-3 border-t border-ink/20 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45 flex items-center justify-between gap-3">
            <span>Wk 02</span>
            <span className="text-terra">Wk 12 ✓</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default StatsGrid;
