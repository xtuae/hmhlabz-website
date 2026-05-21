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

  if (loading || !data) { return ( <div className='min-h-screen flex items-center justify-center bg-paper'><Loader2 className='w-8 h-8 animate-spin text-terra' /></div> ); }
  
  const aboutData = data;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
            <h1 
              style={{ fontSize: "clamp(48px, 9.2vw, 148px)", textWrap: "balance" }} 
              className="leading-[0.9] tracking-[-0.04em] max-w-[14ch] [&>em]:font-fraunces [&>em]:italic [&>em]:font-normal [&>em]:tracking-normal text-ink"
              dangerouslySetInnerHTML={{ __html: aboutData.heroTitle }}
            />
            <div className="flex flex-col gap-8 max-w-[280px] pb-2 md:pb-6">
              <span className="font-mono text-terra text-[12px] uppercase tracking-widest font-semibold">
                {aboutData.heroBadge || "WE BUILD SYSTEMS."}
              </span>
              <p className="text-[18px] text-ink/80 leading-[1.4]">
                {aboutData.heroText}
              </p>
            </div>
          </div>
        </div>

    
    <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-ink/12">
      <div className="mono text-terra mb-10"><span className="rule"></span>01 · Thesis</div>

      <div className="grid grid-cols-12 gap-8 lg:gap-12">
        <div className="col-span-12 lg:col-span-7">
          <p className="font-serif italic text-ink leading-[1.18] tracking-[-0.015em]" style={{ fontSize: 'clamp(32px, 4.6vw, 64px)', textWrap: 'balance' }}>
            Most transformation work fails the same way. A strategy team writes the deck. An implementation team inherits it. The deck and the build never quite agree on the same problem, and twelve weeks in, the rollout is <span className="text-terra not-italic font-sans font-medium" style={{ fontStyle: 'normal' }}>"in&nbsp;phase&nbsp;two."</span>
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

    
    <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-ink/12 bg-cream/45">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-5">
          <div className="mono text-terra mb-6"><span className="rule"></span>02 · What we do</div>
          <h2 className="font-sans font-bold tracking-[-0.025em] leading-[1.02]" style={{ fontSize: 'clamp(34px, 4.8vw, 64px)' }}>
            Three lines of work, <span className="frauncesItalic text-terra">one&nbsp;team.</span>
          </h2>
        </div>
        <p className="col-span-12 lg:col-span-5 lg:col-start-8 text-[16px] leading-[1.7] text-ink/72 self-end" style={{ textWrap: 'pretty' }}>
          Engagements usually start on one line and grow into the next. The team doesn't change when they do.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
        {aboutData.linesOfWork?.map((line, i) => (
          <div key={line.id || i} className="border-t border-black/10 pt-4 pb-2">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[96px] leading-[0.8] tracking-[-0.04em] font-medium text-ink">{line.line}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">{line.tier}</span>
            </div>
            <h3 className="text-[24px] font-medium leading-[1.1] tracking-[-0.02em] text-ink mb-2">{line.title}</h3>
            <p className="text-[15px] text-ink/70 leading-[1.4] mb-8 pr-4">{line.description}</p>
            
            <div className="space-y-2 border-t border-black/5 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">Duration</span>
                <span className="text-[13px] font-medium text-ink/80">{line.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">Output</span>
                <span className="text-[13px] font-medium text-ink/80">{line.output}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    
    <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-ink/12">
      <div className="grid grid-cols-12 gap-8 mb-20">
        <div className="col-span-12 lg:col-span-7">
          <div className="mono text-terra mb-6"><span className="rule"></span>03 · How we think</div>
          <h2 className="font-sans font-bold tracking-[-0.028em] leading-[0.98]" style={{ fontSize: 'clamp(40px, 6.4vw, 92px)' }}>
            Five opinions <br className="hidden md:block" />that show up in <span className="frauncesItalic text-terra">every</span> engagement.
          </h2>
        </div>
      </div>

      <ol className="space-y-0 divide-y divide-ink/12 border-y border-ink/12">
        <li className="grid grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif italic text-terra leading-none" style={{ fontSize: 'clamp(40px, 4vw, 64px)' }}>i.</div>
          </div>
          <h3 className="col-span-10 md:col-span-6 font-sans font-semibold tracking-[-0.02em] leading-[1.08]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', textWrap: 'balance' }}>
            Strategy without delivery is theatre.
          </h3>
          <p className="col-span-12 md:col-span-5 text-[16px] leading-[1.65] text-ink/68 md:pt-2" style={{ textWrap: 'pretty' }}>
            A recommendation that nobody can implement is a sentence with a chart attached. We don't write anything we wouldn't be willing to ship ourselves the following Monday.
          </p>
        </li>
        <li className="grid grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif italic text-terra leading-none" style={{ fontSize: 'clamp(40px, 4vw, 64px)' }}>ii.</div>
          </div>
          <h3 className="col-span-10 md:col-span-6 font-sans font-semibold tracking-[-0.02em] leading-[1.08]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', textWrap: 'balance' }}>
            The wedge matters more than the vision.
          </h3>
          <p className="col-span-12 md:col-span-5 text-[16px] leading-[1.65] text-ink/68 md:pt-2" style={{ textWrap: 'pretty' }}>
            Most rollouts die in month three because they tried to do everything at once. We pick the smallest workflow that still matters, ship it in eight weeks, then earn the right to do more.
          </p>
        </li>
        <li className="grid grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif italic text-terra leading-none" style={{ fontSize: 'clamp(40px, 4vw, 64px)' }}>iii.</div>
          </div>
          <h3 className="col-span-10 md:col-span-6 font-sans font-semibold tracking-[-0.02em] leading-[1.08]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', textWrap: 'balance' }}>
            Name one owner, or don't start.
          </h3>
          <p className="col-span-12 md:col-span-5 text-[16px] leading-[1.65] text-ink/68 md:pt-2" style={{ textWrap: 'pretty' }}>
            Every engagement names one person on the client side who is accountable for the outcome. If they don't exist in the first meeting, we walk. It's the most reliable predictor we have.
          </p>
        </li>
        <li className="grid grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif italic text-terra leading-none" style={{ fontSize: 'clamp(40px, 4vw, 64px)' }}>iv.</div>
          </div>
          <h3 className="col-span-10 md:col-span-6 font-sans font-semibold tracking-[-0.02em] leading-[1.08]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', textWrap: 'balance' }}>
            Write the memo before you sign.
          </h3>
          <p className="col-span-12 md:col-span-5 text-[16px] leading-[1.65] text-ink/68 md:pt-2" style={{ textWrap: 'pretty' }}>
            Two paragraphs, before any code: what this looks like at week four, and what it looks like at week twelve. Conservative numbers. If we hit them, we extend. If we don't, we say so.
          </p>
        </li>
        <li className="grid grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif italic text-terra leading-none" style={{ fontSize: 'clamp(40px, 4vw, 64px)' }}>v.</div>
          </div>
          <h3 className="col-span-10 md:col-span-6 font-sans font-semibold tracking-[-0.02em] leading-[1.08]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', textWrap: 'balance' }}>
            Hand it back on day one.
          </h3>
          <p className="col-span-12 md:col-span-5 text-[16px] leading-[1.65] text-ink/68 md:pt-2" style={{ textWrap: 'pretty' }}>
            Your repo, your accounts, your model keys. We don't lock anyone in, and we never have a commercial reason to slow down a handover.
          </p>
        </li>
      </ol>
    </section>

    
    <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-ink/12 bg-cream/45">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-7">
          <div className="mono text-terra mb-6"><span className="rule"></span>04 · The shape of an engagement</div>
          <h2 className="font-sans font-bold tracking-[-0.025em] leading-[1.02]" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
            Twelve weeks, <span className="frauncesItalic text-terra">four&nbsp;movements.</span>
          </h2>
        </div>
        <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[16px] leading-[1.7] text-ink/72 self-end" style={{ textWrap: 'pretty' }}>
          A wedge engagement runs roughly like this. Phase boundaries are written into the contract — and so are the kill criteria.
        </p>
      </div>

      
      <div className="rounded-2xl border border-ink/12 bg-paper overflow-hidden">
        
        <div className="px-6 py-3 border-b border-ink/12 flex items-center justify-between">
          <span className="mono text-terra">Fig. 01</span>
          <span className="mono text-ink/40">Wedge engagement · weeks 01–12</span>
        </div>
        <div className="relative">
          
          <div className="grid grid-cols-12 border-b border-ink/12 text-center">
            <div className="py-2 mono text-ink/40 border-r border-ink/10">01</div>
            <div className="py-2 mono text-ink/40 border-r border-ink/10">02</div>
            <div className="py-2 mono text-ink/40 border-r border-ink/10">03</div>
            <div className="py-2 mono text-ink/40 border-r border-ink/10">04</div>
            <div className="py-2 mono text-ink/40 border-r border-ink/10">05</div>
            <div className="py-2 mono text-ink/40 border-r border-ink/10">06</div>
            <div className="py-2 mono text-ink/40 border-r border-ink/10">07</div>
            <div className="py-2 mono text-ink/40 border-r border-ink/10">08</div>
            <div className="py-2 mono text-ink/40 border-r border-ink/10">09</div>
            <div className="py-2 mono text-ink/40 border-r border-ink/10">10</div>
            <div className="py-2 mono text-ink/40 border-r border-ink/10">11</div>
            <div className="py-2 mono text-ink/40">12</div>
          </div>
          
          <div className="grid grid-cols-12 h-12 border-b border-ink/12">
            <div className="col-span-2 bg-terra/85"></div>
            <div className="col-span-3 bg-terra/55"></div>
            <div className="col-span-5 bg-terra/35"></div>
            <div className="col-span-2 bg-terra/70"></div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {aboutData.phases?.map((phase, i) => (
            <div key={phase.id || i} className="pt-4 border-t border-black/10">
              <div className="font-mono text-terra text-[11px] font-bold uppercase tracking-widest mb-3">{phase.timeframe}</div>
              <h4 className="text-[18px] font-medium text-ink mb-2">{phase.title}</h4>
              <p className="text-[14px] leading-[1.5] text-ink/70">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    
    <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-ink/12">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-7">
          <div className="mono text-terra mb-6"><span className="rule"></span>05 · The bench</div>
          <h2 className="font-sans font-bold tracking-[-0.025em] leading-[1.02]" style={{ fontSize: 'clamp(34px, 4.8vw, 64px)' }}>
            What we can put <span className="frauncesItalic text-terra">in&nbsp;the&nbsp;room.</span>
          </h2>
        </div>
        <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[16px] leading-[1.7] text-ink/72 self-end" style={{ textWrap: 'pretty' }}>
          The studio is deliberately narrow. We say no to anything that doesn't sit cleanly inside these capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-ink/12">
        {aboutData.capabilities?.map((cap, i) => (
          <div key={cap.id || i} className="p-6 md:p-8 border-r border-b border-ink/12 hover:bg-black/5 transition-colors duration-300">
            <div className="font-mono text-[32px] text-ink/20 mb-6">{cap.number}</div>
            <h4 className="text-[20px] font-medium text-ink mb-3 tracking-[-0.01em]">{cap.title}</h4>
            <p className="text-[14px] leading-[1.5] text-ink/70 max-w-[280px]">{cap.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-[14px] mono text-ink/45">→&nbsp;&nbsp;Things we don't do: pure brand work, pure decks, vendor reselling, anything where we can't sign for the outcome.</p>
    </section>

    
    <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-ink/12 bg-cream/45">
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 lg:col-span-7">
          <div className="mono text-terra mb-6"><span className="rule"></span>06 · Selected work</div>
          <h2 className="font-sans font-bold tracking-[-0.025em] leading-[1.02]" style={{ fontSize: 'clamp(34px, 4.8vw, 64px)' }}>
            Three engagements, <span className="frauncesItalic text-terra">told&nbsp;sparely.</span>
          </h2>
        </div>
        <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[16px] leading-[1.7] text-ink/72 self-end" style={{ textWrap: 'pretty' }}>
          Clients prefer not to be named. We prefer the work to be specific. Below: shape, scope, and the number we hit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article className="rounded-2xl border border-ink/12 bg-paper overflow-hidden">
          <div className="px-6 py-3 border-b border-ink/12 flex items-center justify-between">
            <span className="mono text-terra">Case · A</span>
            <span className="mono text-ink/40">2024</span>
          </div>
          <div className="aspect-[4/3] bg-cream relative">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
              <rect width="400" height="300" fill="#EDE6D3" />
              <g transform="translate(60 50)">
                <rect width="280" height="200" fill="#F4F1EA" stroke="#161513" strokeWidth=".8" />
                <rect x="20" y="22" width="120" height="3" fill="#C2410C" />
                <rect x="20" y="40" width="220" height="2" fill="#161513" opacity=".25" />
                <rect x="20" y="52" width="200" height="2" fill="#161513" opacity=".25" />
                <rect x="20" y="64" width="160" height="2" fill="#161513" opacity=".25" />
                <rect x="20" y="90" width="40" height="40" fill="#C2410C" opacity=".18" stroke="#C2410C" />
                <rect x="70" y="90" width="40" height="40" fill="none" stroke="#161513" opacity=".25" />
                <rect x="120" y="90" width="40" height="40" fill="none" stroke="#161513" opacity=".25" />
                <rect x="170" y="90" width="40" height="40" fill="none" stroke="#161513" opacity=".25" />
                <rect x="220" y="90" width="40" height="40" fill="none" stroke="#161513" opacity=".25" />
                <rect x="20" y="150" width="220" height="2" fill="#161513" opacity=".25" />
                <rect x="20" y="162" width="180" height="2" fill="#161513" opacity=".25" />
              </g>
            </svg>
          </div>
          <div className="p-7">
            <div className="mono text-ink/40 mb-3">Mid-size law firm · Dubai</div>
            <h4 className="font-sans font-semibold text-[20px] tracking-[-0.01em] leading-[1.2]">An intake-triage RAG, shipped in nine weeks.</h4>
            <p className="mt-4 text-[14px] leading-[1.65] text-ink/65" style={{ textWrap: 'pretty' }}>
              Replaced a six-step manual triage with a retrieval-backed assistant trained on six years of matter files. Lawyers review, not type.
            </p>
            <div className="mt-6 pt-5 border-t border-ink/10 grid grid-cols-2 gap-3 text-[13px]">
              <span className="mono text-ink/45">Wedge</span><span className="text-ink/80 text-right">Intake</span>
              <span className="mono text-ink/45">Wk 12 result</span><span className="text-terra text-right">12 hrs / lawyer / wk saved</span>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-ink/12 bg-paper overflow-hidden">
          <div className="px-6 py-3 border-b border-ink/12 flex items-center justify-between">
            <span className="mono text-terra">Case · B</span>
            <span className="mono text-ink/40">2025</span>
          </div>
          <div className="aspect-[4/3] bg-cream relative">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
              <rect width="400" height="300" fill="#EDE6D3" />
              <g transform="translate(40 60)">
                
                <circle cx="30" cy="90" r="22" fill="#C2410C" />
                <line x1="56" y1="90" x2="110" y2="90" stroke="#161513" strokeWidth="1.2" />
                <rect x="110" y="68" width="56" height="44" fill="#F4F1EA" stroke="#161513" />
                <line x1="166" y1="90" x2="220" y2="90" stroke="#161513" strokeWidth="1.2" />
                <rect x="220" y="68" width="56" height="44" fill="#F4F1EA" stroke="#161513" />
                <line x1="276" y1="90" x2="320" y2="90" stroke="#161513" strokeWidth="1.2" />
                <polygon points="320,90 314,84 314,96" fill="#161513" />
                
                <rect x="110" y="120" width="56" height="2" fill="#161513" opacity=".25" />
                <rect x="220" y="120" width="56" height="2" fill="#161513" opacity=".25" />
                
                <rect x="0" y="160" width="320" height="2" fill="#161513" opacity=".25" />
                <rect x="0" y="170" width="280" height="2" fill="#161513" opacity=".15" />
              </g>
            </svg>
          </div>
          <div className="p-7">
            <div className="mono text-ink/40 mb-3">Recruitment group · MENA</div>
            <h4 className="font-sans font-semibold text-[20px] tracking-[-0.01em] leading-[1.2]">Mapping the handoff before automating it.</h4>
            <p className="mt-4 text-[14px] leading-[1.65] text-ink/65" style={{ textWrap: 'pretty' }}>
              Two-week diagnostic, then a six-week build of the sourcing-to-shortlist pipeline. We refused to start until one named owner existed.
            </p>
            <div className="mt-6 pt-5 border-t border-ink/10 grid grid-cols-2 gap-3 text-[13px]">
              <span className="mono text-ink/45">Wedge</span><span className="text-ink/80 text-right">Sourcing</span>
              <span className="mono text-ink/45">Wk 08 result</span><span className="text-terra text-right">3.4× shortlist throughput</span>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-ink/12 bg-paper overflow-hidden">
          <div className="px-6 py-3 border-b border-ink/12 flex items-center justify-between">
            <span className="mono text-terra">Case · C</span>
            <span className="mono text-ink/40">2025</span>
          </div>
          <div className="aspect-[4/3] bg-cream relative">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
              <rect width="400" height="300" fill="#EDE6D3" />
              
              <g transform="translate(40 200)">
                <rect x="0" y="-40" width="36" height="40" fill="#161513" opacity=".25" />
                <rect x="50" y="-60" width="36" height="60" fill="#161513" opacity=".4" />
                <rect x="100" y="-80" width="36" height="80" fill="#161513" opacity=".55" />
                <rect x="150" y="-100" width="36" height="100" fill="#C2410C" opacity=".55" />
                <rect x="200" y="-130" width="36" height="130" fill="#C2410C" opacity=".75" />
                <rect x="250" y="-150" width="36" height="150" fill="#C2410C" />
                <line x1="-10" y1="0" x2="320" y2="0" stroke="#161513" strokeWidth=".8" />
              </g>
              <text x="40" y="240" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#161513" opacity=".5">WK 02   WK 06   WK 10   WK 14   WK 20   WK 26</text>
            </svg>
          </div>
          <div className="p-7">
            <div className="mono text-ink/40 mb-3">Professional services · India</div>
            <h4 className="font-sans font-semibold text-[20px] tracking-[-0.01em] leading-[1.2]">A twelve-month embed inside a 200-person practice.</h4>
            <p className="mt-4 text-[14px] leading-[1.65] text-ink/65" style={{ textWrap: 'pretty' }}>
              Three workflows reshaped in monthly cycles, a written playbook handed over at month twelve, and an internal team trained to run the next three without us.
            </p>
            <div className="mt-6 pt-5 border-t border-ink/10 grid grid-cols-2 gap-3 text-[13px]">
              <span className="mono text-ink/45">Wedge</span><span className="text-ink/80 text-right">Doc review</span>
              <span className="mono text-ink/45">Yr 01 result</span><span className="text-terra text-right">28% gross-margin lift</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    
    <section className="border-y border-ink/12 bg-ink text-paper py-10 overflow-hidden">
      <div className="flex whitespace-nowrap drift" style={{ width: 'max-content' }}>
        <span className="font-sans font-bold tracking-[-0.02em] pr-16" style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
          Diagnose · <span className="frauncesItalic text-terra">Recommend</span> · Ship · Hand over · Diagnose · <span className="frauncesItalic text-terra">Recommend</span> · Ship · Hand over ·
        </span>
        <span className="font-sans font-bold tracking-[-0.02em] pr-16" aria-hidden="true" style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
          Diagnose · <span className="frauncesItalic text-terra">Recommend</span> · Ship · Hand over · Diagnose · <span className="frauncesItalic text-terra">Recommend</span> · Ship · Hand over ·
        </span>
      </div>
    </section>

    
    <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-ink/12">
      <div className="grid grid-cols-12 gap-8 lg:gap-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="mono text-terra mb-6"><span className="rule"></span>07 · Where we work</div>
          <h2 className="font-sans font-bold tracking-[-0.025em] leading-[1.02]" style={{ fontSize: 'clamp(34px, 4.6vw, 60px)' }}>
            Two cities, <span className="frauncesItalic text-terra">one&nbsp;team.</span>
          </h2>
          <p className="mt-7 text-[16px] leading-[1.7] text-ink/72 max-w-md" style={{ textWrap: 'pretty' }}>
            Remote-first studio with two physical hubs. Most engagements run hybrid — one site visit at week one, weekly working sessions on a call, a second visit at launch.
          </p>
          <div className="mt-10 pt-6 border-t border-ink/12 grid grid-cols-2 gap-y-4 max-w-md">
            <span className="mono text-ink/45">Languages</span><span className="text-[14px] text-right">English · Arabic · Tamil</span>
            <span className="mono text-ink/45">Coverage</span><span className="text-[14px] text-right">GMT +4 to +5:30</span>
            <span className="mono text-ink/45">Travel</span><span className="text-[14px] text-right">Included in fee</span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <article className="rounded-2xl border border-ink/12 bg-paper overflow-hidden">
            <div className="px-6 py-3 border-b border-ink/12 flex items-center justify-between">
              <span className="mono text-terra">Hub · 01</span>
              <span className="mono text-ink/40">GMT +4</span>
            </div>
            <div className="aspect-[4/3] bg-cream relative">
              <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
                <rect width="400" height="300" fill="#EDE6D3" />
                <rect x="40" y="200" width="22" height="60" fill="#161513" opacity=".75" />
                <polygon points="80,140 90,260 70,260" fill="#161513" opacity=".85" />
                <rect x="100" y="170" width="18" height="90" fill="#161513" opacity=".7" />
                <rect x="124" y="190" width="30" height="70" fill="#161513" opacity=".75" />
                <polygon points="180,60 200,260 160,260" fill="#161513" />
                <line x1="190" y1="40" x2="190" y2="60" stroke="#161513" strokeWidth="2" />
                <rect x="210" y="150" width="28" height="110" fill="#161513" opacity=".8" />
                <rect x="244" y="180" width="22" height="80" fill="#161513" opacity=".7" />
                <polygon points="280,120 296,260 264,260" fill="#161513" opacity=".85" />
                <rect x="306" y="170" width="20" height="90" fill="#161513" opacity=".7" />
                <rect x="332" y="190" width="32" height="70" fill="#161513" opacity=".75" />
                <rect x="0" y="258" width="400" height="42" fill="#C2410C" opacity=".18" />
                <circle cx="320" cy="80" r="22" fill="#C2410C" />
              </svg>
            </div>
            <div className="px-6 py-6">
              <h4 className="font-sans font-semibold text-[22px] tracking-[-0.01em]">Dubai</h4>
              <p className="mt-1 mono text-ink/45">Strategy &amp; design</p>
              <p className="mt-4 text-[14px] text-ink/65 leading-[1.6]">
                DIFC, Index Tower. Discovery, design and most fit calls happen here.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-ink/12 bg-paper overflow-hidden">
            <div className="px-6 py-3 border-b border-ink/12 flex items-center justify-between">
              <span className="mono text-terra">Hub · 02</span>
              <span className="mono text-ink/40">GMT +5:30</span>
            </div>
            <div className="aspect-[4/3] bg-cream relative">
              <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
                <rect width="400" height="300" fill="#EDE6D3" />
                <polygon points="60,180 90,180 80,210 70,210" fill="#161513" opacity=".8" />
                <rect x="55" y="210" width="40" height="50" fill="#161513" opacity=".8" />
                <polygon points="115,150 165,150 155,200 125,200" fill="#161513" />
                <rect x="110" y="200" width="60" height="60" fill="#161513" />
                <rect x="125" y="220" width="10" height="40" fill="#EDE6D3" />
                <rect x="145" y="220" width="10" height="40" fill="#EDE6D3" />
                <path d="M0 260 Q200 240 400 268 L400 300 L0 300 Z" fill="#C2410C" opacity=".22" />
                <rect x="220" y="120" width="44" height="140" fill="#161513" opacity=".85" />
                <rect x="228" y="130" width="6" height="6" fill="#EDE6D3" />
                <rect x="240" y="130" width="6" height="6" fill="#EDE6D3" />
                <rect x="252" y="130" width="6" height="6" fill="#EDE6D3" />
                <rect x="228" y="150" width="6" height="6" fill="#EDE6D3" />
                <rect x="240" y="150" width="6" height="6" fill="#EDE6D3" />
                <rect x="252" y="150" width="6" height="6" fill="#EDE6D3" />
                <rect x="280" y="170" width="36" height="90" fill="#161513" opacity=".75" />
                <rect x="330" y="190" width="40" height="70" fill="#161513" opacity=".7" />
                <circle cx="80" cy="80" r="20" fill="#C2410C" />
              </svg>
            </div>
            <div className="px-6 py-6">
              <h4 className="font-sans font-semibold text-[22px] tracking-[-0.01em]">Chennai</h4>
              <p className="mt-1 mono text-ink/45">Build &amp; ops</p>
              <p className="mt-4 text-[14px] text-ink/65 leading-[1.6]">
                Nungambakkam, third floor. Engineering bench, daily standups, and an unreasonable filter coffee setup.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    
    <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 bg-cream">
      <div className="max-w-5xl mx-auto text-center">
        <span className="mono text-ink/50">If you've read this far</span>
        <h3 className="mt-8 font-sans font-bold tracking-[-0.028em] leading-[1.04]" style={{ fontSize: 'clamp(36px, 5.4vw, 72px)', textWrap: 'balance' }}>
          You probably want to <span className="frauncesItalic text-terra">talk&nbsp;to&nbsp;us.</span>
        </h3>
        <p className="mt-6 max-w-[52ch] mx-auto text-ink/65 text-[17px] leading-[1.6]">
          20 minutes. No deck. No pitch. We tell you whether AI or digital systems would actually move the needle for a firm like yours — and whether we're the right team to do it.
        </p>
        <a href="../HMH Labz v2.html#book" className="mt-12 inline-flex items-center gap-3 bg-terra hover:bg-terra-deep text-paper px-12 py-5 rounded-full font-mono font-bold text-[11px] uppercase tracking-[0.28em] transition-colors">
          Book a 20-min Fit Call →
        </a>
      </div>
    </section>
  </main>
      <Footer />
    </>
  );
};

export default About;
