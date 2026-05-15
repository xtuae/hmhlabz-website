import React from 'react';
import Reveal from '../ui/Reveal';
import { useModal } from '../../App';

const Hero = () => {
  const { openFitCall } = useModal();
  return (
    <section id="top" className="relative px-6 md:px-10 lg:px-14 pt-[108px] sm:pt-[124px] pb-10 sm:pb-14">
      <Reveal className="mt-4 sm:mt-8 relative">
        <h1 className="font-sans font-bold text-ink tracking-[-0.04em] leading-[0.88] text-center break-words" style={{ fontSize: "clamp(60px, 10.5vw, 180px)" }}>
          Strategy<span className="text-terra px-1 sm:px-2">+</span>build,<br />
          <span className="whitespace-nowrap">
            in <span className="relative inline-block">
              <em className="font-serif italic font-normal not-italic text-terra">one team.</em>
              <svg aria-hidden="true" viewBox="0 0 360 22" preserveAspectRatio="none" className="absolute left-[2%] right-0 -bottom-[0.05em] w-[96%] h-[0.2em] pointer-events-none">
                <path d="M 4 14 Q 60 4, 120 11 T 240 10 T 356 8" fill="none" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" opacity="0.85"></path>
              </svg>
            </span>
          </span>
        </h1>
      </Reveal>
      
      <Reveal delay={0.2} className="mt-12 sm:mt-16 max-w-3xl mx-auto text-center">
        <div className="w-14 h-[2px] bg-terra mx-auto mb-7 sm:mb-9"></div>
        <p className="font-sans text-ink/70 leading-[1.55] font-light" style={{ fontSize: "clamp(17px, 1.6vw, 21px)" }}>
          We tell you what to do, then we ship it. For service businesses where operations have broken under growth — too much manual work, too many duct-taped tools, too much depending on people remembering things.
        </p>
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <button 
            type="button" 
            onClick={openFitCall}
            className="bg-terra hover:bg-terra-deep text-paper px-10 sm:px-12 py-5 rounded-full font-mono font-bold text-[11px] uppercase tracking-[0.28em] transition-colors shadow-lg shadow-terra/20"
          >
            Book a 20-min Fit Call →
          </button>
          <div className="flex items-center gap-3 font-mono uppercase tracking-[0.22em] text-[10px] font-bold text-ink/40 whitespace-nowrap">
            <span>No Deck</span>
            <span className="w-1 h-1 bg-ink/15 rounded-full"></span>
            <span>No Pitch</span>
            <span className="w-1 h-1 bg-ink/15 rounded-full"></span>
            <span>20 Minutes</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;
