import React, { useState, useEffect } from 'react';
import Reveal from '../ui/Reveal';

const CostOfWaiting = () => {
  const [count, setCount] = useState(2848673);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 5));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-paper px-6 md:px-10 lg:px-14 py-28 sm:py-40 text-center">
      <Reveal className="max-w-5xl mx-auto text-center">
        <div className="flex justify-center">
          <span className="font-mono uppercase tracking-[0.22em] text-[11px] font-semibold text-ink/55">02 — The cost of waiting</span>
        </div>
        <h2 className="mt-10 font-sans font-bold text-ink leading-[1.06] tracking-[-0.028em] max-w-4xl mx-auto" style={{ fontSize: 'clamp(34px, 5vw, 60px)' }}>
          Every hour you spend doing it <em className="font-serif italic font-normal not-italic ">manually</em> is an hour your business <em className="font-serif italic font-normal not-italic text-terra">doesn't grow.</em>
        </h2>
        
        <div className="mt-16 flex items-center justify-center gap-3">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-terra/40 animate-ping"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-terra"></span>
          </span>
          <span className="font-mono uppercase tracking-[0.16em] text-[11px] sm:text-[12px] text-ink/55 ">
            Hours lost to manual work · Live
          </span>
        </div>
        
        <div className="mt-6 font-sans font-bold text-ink tabular-nums tracking-[-0.04em] leading-none" style={{ fontSize: 'clamp(72px, 12vw, 192px)' }}>
          {count.toLocaleString()}
        </div>
        <p className="mt-5 font-serif italic text-ink/45" style={{ fontSize: 'clamp(18px, 1.8vw, 24px)' }}>
          and counting, since you opened this page.
        </p>
      </Reveal>

      <Reveal delay={0.12} className="mt-24 max-w-4xl mx-auto text-left">
        <div className="relative bg-cream rounded-2xl overflow-hidden border border-ink/10">
          <span className="absolute left-0 top-0 bottom-0 w-2 bg-terra"></span>
          <div className="px-10 sm:px-16 py-14 sm:py-20 text-left">
            <span className="block font-serif italic text-terra mb-6" style={{ fontSize: 'clamp(48px, 5vw, 80px)', lineHeight: 0.6 }}>“</span>
            <p className="font-serif italic text-ink leading-[1.18] tracking-[-0.01em]" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)' }}>
              It's all in someone's head is the most expensive sentence in your business.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default CostOfWaiting;
