import React from 'react';
import Reveal from '../ui/Reveal';
import { useModal } from '../../App';

const Contact = () => {
  const { openFitCall } = useModal();

  return (
    <section id="contact" className="bg-cream border-y border-ink/10 px-6 md:px-10 lg:px-14 py-32 sm:py-40">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="font-sans font-bold leading-[1.04] tracking-[-0.03em] text-ink" style={{ fontSize: "clamp(42px, 6.8vw, 96px)" }}>
            Not sure if your business is<br /><em className="font-serif italic font-normal not-italic text-terra" style={{ fontStyle: 'italic' }}>ready?</em>
          </h2>
          <p className="mt-10 max-w-[52ch] mx-auto text-ink/65 text-[17px] sm:text-[19px] leading-[1.6]">
            That's exactly what the Fit Call is for. 20 minutes. No deck. No pitch. Just a clear answer about whether AI or digital systems would actually move the needle for a business like yours.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8">
          <button 
            onClick={openFitCall}
            className="bg-terra hover:bg-terra-deep text-paper px-12 py-5 rounded-full font-mono font-bold text-[11px] uppercase tracking-[0.3em] transition-colors shadow-lg shadow-terra/20 active:scale-95"
          >
            Book a 20-min Fit Call →
          </button>
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/45">No sales pitch.</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/45">Just reality.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
