import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import client from '../api/client';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const About = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await client.get('/about');
        setData(res.data);
      } catch (error) {
        console.error('Failed to fetch about page:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <Loader2 className="w-8 h-8 animate-spin text-terra" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-paper text-ink selection:bg-terra selection:text-paper font-sans overflow-x-hidden relative min-h-screen pt-[68px] sm:pt-[76px]">
        {/* Noise Overlay */}
        <div 
          className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] mix-blend-multiply bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMjAiIGhlaWdodD0iMjIwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjA4ICAwIDAgMCAwIDAuMDcgIDAgMCAwIDAgMC4wNiAgMCAwIDAgMC4wNCAwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+')] bg-[length:220px_220px]"
        />

        <div className="relative z-10">
        {/* HERO SECTION */}
        <header className="px-6 md:px-10 lg:px-14 pt-[120px] sm:pt-[140px] pb-20 sm:pb-28 border-b border-ink/12">
          <div className="flex items-center gap-3 text-[13px] mb-10 sm:mb-14">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">File · 00</span>
            <span className="text-ink/25">/</span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-terra">About the studio</span>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-8 items-end">
            <h1 
              className="col-span-12 lg:col-span-9 font-sans font-bold text-ink text-[40px] md:text-[80px] leading-[0.9] tracking-[-0.04em]" 
              style={{ textWrap: 'balance' }}
              dangerouslySetInnerHTML={{ __html: data.heroTitle.replace(/HMH\sLabz/g, '<span class="font-serif italic text-terra font-normal">HMH Labz</span>') }}
            />
            <div className="col-span-12 lg:col-span-3 lg:pb-4">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45 mb-4">Issue №&nbsp;26.05</div>
              <p className="text-[20px] md:text-[24px] text-ink/65 leading-[1.4] tracking-[-0.02em]" style={{ textWrap: 'pretty' }}>
                {data.heroText}
              </p>
            </div>
          </div>

          {/* Vital stats row */}
          <div className="mt-20 sm:mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-ink/12 divide-x divide-ink/12">
            <div className="px-0 md:px-6 py-7">
              <div className="font-serif italic text-terra leading-none" style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}>2023</div>
              <div className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">Founded · Dubai</div>
            </div>
            <div className="px-6 py-7">
              <div className="font-serif italic text-terra leading-none" style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}>38</div>
              <div className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">Engagements shipped</div>
            </div>
            <div className="px-0 md:px-6 py-7">
              <div className="font-serif italic text-terra leading-none" style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}>06</div>
              <div className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">Active clients · hard cap</div>
            </div>
            <div className="px-6 py-7">
              <div className="font-serif italic text-terra leading-none" style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}>02</div>
              <div className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">Hubs · Dubai & Chennai</div>
            </div>
          </div>
        </header>

        {/* 01 — THE THESIS */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-ink/12">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-terra mb-10 flex items-center">
            <span className="inline-block w-[28px] h-[1px] bg-terra mr-3"></span>01 · Thesis
          </div>

          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-7">
              <p className="font-serif italic text-ink leading-[1.18] tracking-[-0.015em]" style={{ fontSize: 'clamp(32px, 4.6vw, 64px)', textWrap: 'balance' }}>
                Most transformation work fails the same way. A strategy team writes the deck. An implementation team inherits it. The deck and the build never quite agree on the same problem, and twelve weeks in, the rollout is <span className="text-terra not-italic font-sans font-medium">"in phase two."</span>
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <div className="lg:pt-6 space-y-6 text-[17px] leading-[1.7] text-ink/72" style={{ textWrap: 'pretty' }}>
                <p>
                  We started HMH Labz because the model is broken. Diagnosis and delivery should live in the same room — same people, same contract, same incentive to get the thing actually used by month three.
                </p>
                <p>
                  Everything else on this page is a consequence of that one decision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — WHAT WE DO (Lines of Work) */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-ink/12 bg-cream/45">
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12 lg:col-span-5">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-terra mb-6 flex items-center">
                <span className="inline-block w-[28px] h-[1px] bg-terra mr-3"></span>02 · What we do
              </div>
              <h2 className="font-sans font-bold tracking-[-0.025em] leading-[1.02]" style={{ fontSize: 'clamp(34px, 4.8vw, 64px)' }}>
                Three lines of work, <span className="font-serif italic text-terra font-normal">one team.</span>
              </h2>
            </div>
            <p className="col-span-12 lg:col-span-5 lg:col-start-8 text-[16px] leading-[1.7] text-ink/72 self-end" style={{ textWrap: 'pretty' }}>
              Engagements usually start on one line and grow into the next. The team doesn't change when they do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
            {data.linesOfWork?.map((item, i) => (
              <article key={item.id} className="border-t border-b border-black/10 bg-paper flex flex-col pt-4 pb-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-terra">{item.line}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">{item.title.split(' ')[0]}</span>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="font-serif italic text-ink/15 leading-none" style={{ fontSize: '96px' }}>0{i+1}</div>
                  <h3 className="mt-2 font-sans font-semibold text-[24px] tracking-[-0.015em] leading-[1.15]">{item.title}</h3>
                  <p className="mt-4 text-[15px] leading-[1.65] text-ink/70 flex-1" style={{ textWrap: 'pretty' }}>
                    {item.description}
                  </p>
                  <div className="mt-7 pt-5 border-t border-black/10 grid grid-cols-2 gap-y-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/45 flex items-center">Duration</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/80 text-right">{item.duration}</span>
                    
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/45 flex items-center">Output</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/80 text-right">{item.output}</span>
                    
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/45 flex items-center">Tier</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-terra text-right">{item.tier}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 03 — PRINCIPLES */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-ink/12">
          <div className="grid grid-cols-12 gap-8 mb-20">
            <div className="col-span-12 lg:col-span-7">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-terra mb-6 flex items-center">
                <span className="inline-block w-[28px] h-[1px] bg-terra mr-3"></span>03 · How we think
              </div>
              <h2 className="font-sans font-bold tracking-[-0.028em] leading-[0.98]" style={{ fontSize: 'clamp(40px, 6.4vw, 92px)' }}>
                Five opinions <br className="hidden md:block"/>that show up in <span className="font-serif italic text-terra font-normal">every</span> engagement.
              </h2>
            </div>
          </div>

          <ol className="space-y-0 divide-y divide-ink/12 border-y border-ink/12">
            {[
              { num: 'i.', title: 'Strategy without delivery is theatre.', desc: "A recommendation that nobody can implement is a sentence with a chart attached. We don't write anything we wouldn't be willing to ship ourselves the following Monday." },
              { num: 'ii.', title: 'The wedge matters more than the vision.', desc: "Most rollouts die in month three because they tried to do everything at once. We pick the smallest workflow that still matters, ship it in eight weeks, then earn the right to do more." },
              { num: 'iii.', title: 'Name one owner, or don\'t start.', desc: "Every engagement names one person on the client side who is accountable for the outcome. If they don't exist in the first meeting, we walk. It's the most reliable predictor we have." },
              { num: 'iv.', title: 'Write the memo before you sign.', desc: "Two paragraphs, before any code: what this looks like at week four, and what it looks like at week twelve. Conservative numbers. If we hit them, we extend. If we don't, we say so." },
              { num: 'v.', title: 'Hand it back on day one.', desc: "Your repo, your accounts, your model keys. We don't lock anyone in, and we never have a commercial reason to slow down a handover." }
            ].map((principle) => (
              <li key={principle.num} className="grid grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-12">
                <div className="col-span-2 md:col-span-1">
                  <div className="font-serif italic text-terra leading-none" style={{ fontSize: 'clamp(40px, 4vw, 64px)' }}>{principle.num}</div>
                </div>
                <h3 className="col-span-10 md:col-span-6 font-sans font-semibold tracking-[-0.02em] leading-[1.08]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', textWrap: 'balance' }}>
                  {principle.title}
                </h3>
                <p className="col-span-12 md:col-span-5 text-[16px] leading-[1.65] text-ink/68 md:pt-2" style={{ textWrap: 'pretty' }}>
                  {principle.desc}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 04 — THE SHAPE OF AN ENGAGEMENT (Phases) */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-ink/12 bg-cream/45">
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12 lg:col-span-7">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-terra mb-6 flex items-center">
                <span className="inline-block w-[28px] h-[1px] bg-terra mr-3"></span>04 · The shape of an engagement
              </div>
              <h2 className="font-sans font-bold tracking-[-0.025em] leading-[1.02]" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
                Twelve weeks, <span className="font-serif italic text-terra font-normal">four movements.</span>
              </h2>
            </div>
            <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[16px] leading-[1.7] text-ink/72 self-end" style={{ textWrap: 'pretty' }}>
              A wedge engagement runs roughly like this. Phase boundaries are written into the contract — and so are the kill criteria.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/12 bg-paper overflow-hidden">
            <div className="px-6 py-3 border-b border-ink/12 flex items-center justify-between">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-terra">Fig. 01</span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/40 hidden sm:block">Wedge engagement · weeks 01–12</span>
            </div>
            <div className="relative">
              <div className="grid grid-cols-12 border-b border-ink/12 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                {Array.from({length: 12}).map((_, i) => (
                  <div key={i} className={`py-2 ${i < 11 ? 'border-r border-ink/10' : ''}`}>{(i+1).toString().padStart(2, '0')}</div>
                ))}
              </div>
              <div className="grid grid-cols-12 h-12 border-b border-ink/12">
                <div className="col-span-2 bg-terra/85"></div>
                <div className="col-span-3 bg-terra/55"></div>
                <div className="col-span-5 bg-terra/35"></div>
                <div className="col-span-2 bg-terra/70"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {data.phases?.map((phase, i) => (
                <div key={phase.id || i} className="p-6 border border-black/10 bg-paper">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-terra mb-3">{phase.timeframe}</div>
                  <h4 className="font-sans font-semibold text-[19px] tracking-[-0.01em]">{phase.title}</h4>
                  <p className="mt-3 text-[14px] leading-[1.6] text-ink/65" style={{ textWrap: 'pretty' }}>
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 — CAPABILITIES */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-ink/12">
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12 lg:col-span-7">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-terra mb-6 flex items-center">
                <span className="inline-block w-[28px] h-[1px] bg-terra mr-3"></span>05 · The bench
              </div>
              <h2 className="font-sans font-bold tracking-[-0.025em] leading-[1.02]" style={{ fontSize: 'clamp(34px, 4.8vw, 64px)' }}>
                What we can put <span className="font-serif italic text-terra font-normal">in the room.</span>
              </h2>
            </div>
            <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[16px] leading-[1.7] text-ink/72 self-end" style={{ textWrap: 'pretty' }}>
              The studio is deliberately narrow. We say no to anything that doesn't sit cleanly inside these capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-black/10">
            {data.capabilities?.map((cap, i) => (
              <div key={cap.id || i} className="flex flex-col">
                <div className="font-serif italic text-ink/15 leading-none mb-4" style={{ fontSize: '80px' }}>{cap.number}</div>
                <h4 className="font-sans font-semibold text-[20px] tracking-[-0.01em] leading-[1.15]">{cap.title}</h4>
                <p className="mt-3 text-[14px] leading-[1.65] text-ink/65">{cap.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-[14px] font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
            →&nbsp;&nbsp;Things we don't do: pure brand work, pure decks, vendor reselling, anything where we can't sign for the outcome.
          </p>
        </section>

      </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
