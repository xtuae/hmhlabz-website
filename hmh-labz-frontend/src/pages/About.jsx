import { useState, useEffect } from 'react';
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
      <div className="min-h-screen flex items-center justify-center bg-[#F4F1EA]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C2410C]" />
      </div>
    );
  }

  const defaultAboutData = {
    heroTitle: "A studio that <span class=\"frauncesItalic text-terra\">tells&nbsp;you</span> what to do, and then does it.",
    heroBadge: "WE BUILD SYSTEMS.",
    heroText: "HMH Labz is a small strategy & build studio for legal, recruitment and professional-services firms. We diagnose, recommend, and ship — under one roof, on one contract.",
    heroStats: [
      { id: "1", value: "2023", label: "Founded · Dubai" },
      { id: "2", value: "38", label: "Engagements shipped" },
      { id: "3", value: "06", label: "Active clients · hard cap" },
      { id: "4", value: "02", label: "Hubs · Dubai & Chennai" }
    ],
    thesisTitle: "01 · Thesis",
    thesisHeading: "Most transformation work fails the same way. A strategy team writes the deck. An implementation team inherits it. The deck and the build never quite agree on the same problem, and twelve weeks in, the rollout is <span class=\"text-terra not-italic font-sans font-medium\" style=\"font-style: normal;\">\"in&nbsp;phase&nbsp;two.\"</span>",
    thesisParagraphs: [
      "We started HMH Labz because the model is broken. Diagnosis and delivery should live in the same room — same people, same contract, same incentive to get the thing actually used by month three.",
      "Everything else on this page is a consequence of that one decision."
    ],
    linesOfWorkHeading: "Three lines of work, <span class=\"frauncesItalic text-terra\">one&nbsp;team.</span>",
    linesOfWorkSubtext: "Engagements usually start on one line and grow into the next. The team doesn't change when they do.",
    linesOfWork: [
      { id: "1", line: "01", title: "AI & opportunity audits.", description: "A two-week diagnostic across one team or one workflow. The output is a scored, written roadmap — not a slide deck — that ranks every opportunity by impact, effort, and risk of stalling.", duration: "2 weeks", output: "Written roadmap", tier: "01 · Wedge" },
      { id: "2", line: "02", title: "Implementation sprints.", description: "Eight to twelve weeks shipping one workflow into production. RAG systems, intake automation, internal tools — built on your stack, handed back on day one, with adoption baked in.", duration: "8–12 weeks", output: "Production system", tier: "02 · Sprint" },
      { id: "3", line: "03", title: "Digital transformation, long-form.", description: "Twelve-month engagements for firms reshaping a practice area or a function. We sit alongside the operating team, ship in monthly cycles, and write the playbook as we go.", duration: "12 months", output: "Embedded team", tier: "03 · Embed" }
    ],
    opinionsHeading: "Five opinions <br class=\"hidden md:block\">that show up in <span class=\"frauncesItalic text-terra\">every</span> engagement.",
    opinions: [
      { id: "1", num: "i.", title: "Strategy without delivery is theatre.", description: "A recommendation that nobody can implement is a sentence with a chart attached. We don't write anything we wouldn't be willing to ship ourselves the following Monday." },
      { id: "2", num: "ii.", title: "The wedge matters more than the vision.", description: "Most rollouts die in month three because they tried to do everything at once. We pick the smallest workflow that still matters, ship it in eight weeks, then earn the right to do more." },
      { id: "3", num: "iii.", title: "Name one owner, or don't start.", description: "Every engagement names one person on the client side who is accountable for the outcome. If they don't exist in the first meeting, we walk. It's the most reliable predictor we have." },
      { id: "4", num: "iv.", title: "Write the memo before you sign.", description: "Two paragraphs, before any code: what this looks like at week four, and what it looks like at week twelve. Conservative numbers. If we hit them, we extend. If we don't, we say so." },
      { id: "5", num: "v.", title: "Hand it back on day one.", description: "Your repo, your accounts, your model keys. We don't lock anyone in, and we never have a commercial reason to slow down a handover." }
    ],
    phasesHeading: "Twelve weeks, <span class=\"frauncesItalic text-terra\">four&nbsp;movements.</span>",
    phasesSubtext: "A wedge engagement runs roughly like this. Phase boundaries are written into the contract — and so are the kill criteria.",
    phasesFigLabel: "Fig. 01",
    phasesFigSub: "Wedge engagement · weeks 01–12",
    phases: [
      { id: "1", timeframe: "Wk 01–02", title: "Diagnose", description: "Two weeks inside the workflow. Interviews, shadowing, scoring. Output: a written roadmap and a kill memo." },
      { id: "2", timeframe: "Wk 03–05", title: "Wedge", description: "The smallest version of the system that produces real numbers. Daily standups, weekly demos." },
      { id: "3", timeframe: "Wk 06–10", title: "Ship & adopt", description: "Production rollout to one team. Adoption sessions, change loops, edge-case triage. Friday memo every week." },
      { id: "4", timeframe: "Wk 11–12", title: "Hand over", description: "Repo, accounts, runbook. A scored decision on whether to extend, expand, or kill — written, never spoken." }
    ],
    capabilitiesHeading: "What we can put <span class=\"frauncesItalic text-terra\">in&nbsp;the&nbsp;room.</span>",
    capabilitiesSubtext: "The studio is deliberately narrow. We say no to anything that doesn't sit cleanly inside these capabilities.",
    capabilitiesFooter: "→  Things we don't do: pure brand work, pure decks, vendor reselling, anything where we can't sign for the outcome.",
    capabilities: [
      { id: "1", number: "01", title: "Operational strategy", description: "Workflow mapping, opportunity scoring, written roadmaps. The diagnostic muscle." },
      { id: "2", number: "02", title: "Applied AI & RAG", description: "Retrieval systems, evaluation harnesses, model selection. Production-grade, not demoware." },
      { id: "3", number: "03", title: "Product engineering", description: "Internal tools and customer-facing apps. TypeScript, Python, your existing stack where it's sane." },
      { id: "4", number: "04", title: "Product & service design", description: "Interface design, workflow design, the boring forms that decide whether a system gets used." },
      { id: "5", number: "05", title: "Change & adoption", description: "Rollout, training, the unglamorous work of getting humans to actually open the thing." },
      { id: "6", number: "06", title: "Data & evaluation", description: "Eval suites, dashboards, the numbers the kill memo gets measured against." }
    ],
    casesHeading: "Three engagements, <span class=\"frauncesItalic text-terra\">told&nbsp;sparely.</span>",
    casesSubtext: "Clients prefer not to be named. We prefer the work to be specific. Below: shape, scope, and the number we hit.",
    cases: [
      { id: "1", caseLetter: "Case · A", year: "2024", type: "RAG", location: "Mid-size law firm · Dubai", title: "An intake-triage RAG, shipped in nine weeks.", description: "Replaced a six-step manual triage with a retrieval-backed assistant trained on six years of matter files. Lawyers review, not type.", wedge: "Intake", result: "12 hrs / lawyer / wk saved", resultLabel: "Wk 12 result" },
      { id: "2", caseLetter: "Case · B", year: "2025", type: "Pipeline", location: "Recruitment group · MENA", title: "Mapping the handoff before automating it.", description: "Two-week diagnostic, then a six-six build of the sourcing-to-shortlist pipeline. We refused to start until one named owner existed.", wedge: "Sourcing", result: "3.4× shortlist throughput", resultLabel: "Wk 08 result" },
      { id: "3", caseLetter: "Case · C", year: "2025", type: "Embed", location: "Professional services · India", title: "A twelve-month embed inside a 200-person practice.", description: "Three workflows reshaped in monthly cycles, a written playbook handed over at month twelve, and an internal team trained to run the next three without us.", wedge: "Doc review", result: "28% gross-margin lift", resultLabel: "Yr 01 result" }
    ],
    driftText: "Diagnose · Recommend · Ship · Hand over · ",
    whereWeWorkHeading: "Two cities, <span class=\"frauncesItalic text-terra\">one&nbsp;team.</span>",
    whereWeWorkSubtext: "Remote-first studio with two physical hubs. Most engagements run hybrid — one site visit at week one, weekly working sessions on a call, a second visit at launch.",
    whereWeWorkDetails: [
      { id: "1", label: "Languages", value: "English · Arabic · Tamil" },
      { id: "2", label: "Coverage", value: "GMT +4 to +5:30" },
      { id: "3", label: "Travel", value: "Included in fee" }
    ],
    hubs: [
      { id: "1", number: "Hub · 01", timezone: "GMT +4", name: "Dubai", label: "Strategy & design", description: "DIFC, Index Tower. Discovery, design and most fit calls happen here." },
      { id: "2", number: "Hub · 02", timezone: "GMT +5:30", name: "Chennai", label: "Build & ops", description: "Nungambakkam, third floor. Engineering bench, daily standups, and an unreasonable filter coffee setup." }
    ],
    fitCallIntro: "If you've read this far",
    fitCallHeading: "You probably want to <span class=\"frauncesItalic text-terra\">talk&nbsp;to&nbsp;us.</span>",
    fitCallText: "20 minutes. No deck. No pitch. We tell you whether AI or digital systems would actually move the needle for a firm like yours — and whether we're the right team to do it.",
    fitCallButtonText: "Book a 20-min Fit Call →",
    fitCallButtonLink: "/#book"
  };

  const aboutData = {
    ...defaultAboutData,
    ...data,
    heroStats: (data.heroStats && data.heroStats.length > 0) ? data.heroStats : defaultAboutData.heroStats,
    thesisParagraphs: (data.thesisParagraphs && data.thesisParagraphs.length > 0) ? data.thesisParagraphs : defaultAboutData.thesisParagraphs,
    linesOfWork: (data.linesOfWork && data.linesOfWork.length > 0) ? data.linesOfWork : defaultAboutData.linesOfWork,
    opinions: (data.opinions && data.opinions.length > 0) ? data.opinions : defaultAboutData.opinions,
    phases: (data.phases && data.phases.length > 0) ? data.phases : defaultAboutData.phases,
    capabilities: (data.capabilities && data.capabilities.length > 0) ? data.capabilities : defaultAboutData.capabilities,
    cases: (data.cases && data.cases.length > 0) ? data.cases : defaultAboutData.cases,
    whereWeWorkDetails: (data.whereWeWorkDetails && data.whereWeWorkDetails.length > 0) ? data.whereWeWorkDetails : defaultAboutData.whereWeWorkDetails,
    hubs: (data.hubs && data.hubs.length > 0) ? data.hubs : defaultAboutData.hubs
  };

  // Custom Inline SVG Renderer for Case Vignettes
  const renderCaseSvg = (type) => {
    switch (type) {
      case 'RAG':
        return (
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
            <rect width="400" height="300" fill="#EDE6D3"></rect>
            <g transform="translate(60 50)">
              <rect width="280" height="200" fill="#F4F1EA" stroke="#161513" strokeWidth=".8"></rect>
              <rect x="20" y="22" width="120" height="3" fill="#C2410C"></rect>
              <rect x="20" y="40" width="220" height="2" fill="#161513" opacity=".25"></rect>
              <rect x="20" y="52" width="200" height="2" fill="#161513" opacity=".25"></rect>
              <rect x="20" y="64" width="160" height="2" fill="#161513" opacity=".25"></rect>
              <rect x="20" y="90" width="40" height="40" fill="#C2410C" opacity=".18" stroke="#C2410C"></rect>
              <rect x="70" y="90" width="40" height="40" fill="none" stroke="#161513" opacity=".25"></rect>
              <rect x="120" y="90" width="40" height="40" fill="none" stroke="#161513" opacity=".25"></rect>
              <rect x="170" y="90" width="40" height="40" fill="none" stroke="#161513" opacity=".25"></rect>
              <rect x="220" y="90" width="40" height="40" fill="none" stroke="#161513" opacity=".25"></rect>
              <rect x="20" y="150" width="220" height="2" fill="#161513" opacity=".25"></rect>
              <rect x="20" y="162" width="180" height="2" fill="#161513" opacity=".25"></rect>
            </g>
          </svg>
        );
      case 'Pipeline':
        return (
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
            <rect width="400" height="300" fill="#EDE6D3"></rect>
            <g transform="translate(40 60)">
              <circle cx="30" cy="90" r="22" fill="#C2410C"></circle>
              <line x1="56" y1="90" x2="110" y2="90" stroke="#161513" strokeWidth="1.2"></line>
              <rect x="110" y="68" width="56" height="44" fill="#F4F1EA" stroke="#161513"></rect>
              <line x1="166" y1="90" x2="220" y2="90" stroke="#161513" strokeWidth="1.2"></line>
              <rect x="220" y="68" width="56" height="44" fill="#F4F1EA" stroke="#161513"></rect>
              <line x1="276" y1="90" x2="320" y2="90" stroke="#161513" strokeWidth="1.2"></line>
              <polygon points="320,90 314,84 314,96" fill="#161513"></polygon>
              <rect x="110" y="120" width="56" height="2" fill="#161513" opacity=".25"></rect>
              <rect x="220" y="120" width="56" height="2" fill="#161513" opacity=".25"></rect>
              <rect x="0" y="160" width="320" height="2" fill="#161513" opacity=".25"></rect>
              <rect x="0" y="170" width="280" height="2" fill="#161513" opacity=".15"></rect>
            </g>
          </svg>
        );
      case 'Embed':
        return (
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
            <rect width="400" height="300" fill="#EDE6D3"></rect>
            <g transform="translate(40 200)">
              <rect x="0" y="-40" width="36" height="40" fill="#161513" opacity=".25"></rect>
              <rect x="50" y="-60" width="36" height="60" fill="#161513" opacity=".4"></rect>
              <rect x="100" y="-80" width="36" height="80" fill="#161513" opacity=".55"></rect>
              <rect x="150" y="-100" width="36" height="100" fill="#C2410C" opacity=".55"></rect>
              <rect x="200" y="-130" width="36" height="130" fill="#C2410C" opacity=".75"></rect>
              <rect x="250" y="-150" width="36" height="150" fill="#C2410C"></rect>
              <line x1="-10" y1="0" x2="320" y2="0" stroke="#161513" strokeWidth=".8"></line>
            </g>
            <text x="40" y="240" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#161513" opacity=".5">WK 02   WK 06   WK 10   WK 14   WK 20   WK 26</text>
          </svg>
        );
      default:
        return null;
    }
  };

  // Custom Inline SVG Renderer for physical Hubs
  const renderHubSvg = (cityName) => {
    if (cityName?.toLowerCase() === 'dubai') {
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
          <rect width="400" height="300" fill="#EDE6D3"></rect>
          <rect x="40" y="200" width="22" height="60" fill="#161513" opacity=".75"></rect>
          <polygon points="80,140 90,260 70,260" fill="#161513" opacity=".85"></polygon>
          <rect x="100" y="170" width="18" height="90" fill="#161513" opacity=".7"></rect>
          <rect x="124" y="190" width="30" height="70" fill="#161513" opacity=".75"></rect>
          <polygon points="180,60 200,260 160,260" fill="#161513"></polygon>
          <line x1="190" y1="40" x2="190" y2="60" stroke="#161513" strokeWidth="2"></line>
          <rect x="210" y="150" width="28" height="110" fill="#161513" opacity=".8"></rect>
          <rect x="244" y="180" width="22" height="80" fill="#161513" opacity=".7"></rect>
          <polygon points="280,120 296,260 264,260" fill="#161513" opacity=".85"></polygon>
          <rect x="306" y="170" width="20" height="90" fill="#161513" opacity=".7"></rect>
          <rect x="332" y="190" width="32" height="70" fill="#161513" opacity=".75"></rect>
          <rect x="0" y="258" width="400" height="42" fill="#C2410C" opacity=".18"></rect>
          <circle cx="320" cy="80" r="22" fill="#C2410C"></circle>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
          <rect width="400" height="300" fill="#EDE6D3"></rect>
          <polygon points="60,180 90,180 80,210 70,210" fill="#161513" opacity=".8"></polygon>
          <rect x="55" y="210" width="40" height="50" fill="#161513" opacity=".8"></rect>
          <polygon points="115,150 165,150 155,200 125,200" fill="#161513"></polygon>
          <rect x="110" y="200" width="60" height="60" fill="#161513"></rect>
          <rect x="125" y="220" width="10" height="40" fill="#EDE6D3"></rect>
          <rect x="145" y="220" width="10" height="40" fill="#EDE6D3"></rect>
          <path d="M0 260 Q200 240 400 268 L400 300 L0 300 Z" fill="#C2410C" opacity=".22"></path>
          <rect x="220" y="120" width="44" height="140" fill="#161513" opacity=".85"></rect>
          <rect x="228" y="130" width="6" height="6" fill="#EDE6D3"></rect>
          <rect x="240" y="130" width="6" height="6" fill="#EDE6D3"></rect>
          <rect x="252" y="130" width="6" height="6" fill="#EDE6D3"></rect>
          <rect x="228" y="150" width="6" height="6" fill="#EDE6D3"></rect>
          <rect x="240" y="150" width="6" height="6" fill="#EDE6D3"></rect>
          <rect x="252" y="150" width="6" height="6" fill="#EDE6D3"></rect>
          <rect x="280" y="170" width="36" height="90" fill="#161513" opacity=".75"></rect>
          <rect x="330" y="190" width="40" height="70" fill="#161513" opacity=".7"></rect>
          <circle cx="80" cy="80" r="20" fill="#C2410C"></circle>
        </svg>
      );
    }
  };

  return (
    <div className="bg-[#F4F1EA] text-[#161513] selection:bg-[#C2410C] selection:text-[#F4F1EA] min-h-screen relative font-sans">
      {/* Dynamic styles to inject fonts, principles animation, and rules */}
      <style dangerouslySetInnerHTML={{ __html: `
        .mono { font-family: 'Geist Mono', monospace; text-transform: uppercase; letter-spacing: 0.22em; font-size: 11px; font-weight: 600; }
        .frauncesItalic { font-family: 'Fraunces', serif; font-style: italic; font-variation-settings: "opsz" 144; }
        .rule {
          display: inline-block;
          width: 28px;
          height: 1px;
          background: #C2410C;
          vertical-align: middle;
          margin-right: 12px;
        }
        @keyframes drift {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .drift { animation: drift 80s linear infinite; }
      `}} />

      {/* Noise background overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 mix-blend-multiply" 
        style={{
          backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMjAiIGhlaWdodD0iMjIwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjA4ICAwIDAgMCAwIDAuMDcgIDAgMCAwIDAgMC4wNiAgMCAwIDAgMC4wNCAwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIi8+PC9zdmc+")`,
          backgroundSize: '220px 220px'
        }}
      />

      <Navbar />

      <main className="relative z-20">
        {/* HERO SECTION */}
        <header className="px-6 md:px-10 lg:px-14 pt-[120px] sm:pt-[140px] pb-20 sm:pb-28 border-b border-[#161513]/12">
          <div className="flex items-center gap-3 text-[13px] mb-10 sm:mb-14">
            <span className="mono text-[#161513]/45">File · 00</span>
            <span className="text-[#161513]/25">/</span>
            <span className="mono text-[#C2410C]">About the studio</span>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-8 items-end">
            <h1 
              className="col-span-12 lg:col-span-9 font-sans font-bold text-[#161513] tracking-[-0.035em] leading-[0.92] [&>span]:frauncesItalic [&>span]:text-[#C2410C]" 
              style={{ fontSize: 'clamp(48px, 9.2vw, 148px)', textWrap: 'balance' }}
              dangerouslySetInnerHTML={{ __html: aboutData.heroTitle }}
            />
            <div className="col-span-12 lg:col-span-3 lg:pb-4">
              <div className="mono text-[#161513]/45 mb-4">{aboutData.heroBadge}</div>
              <p className="text-[14px] text-[#161513]/65 leading-[1.6]" style={{ textWrap: 'pretty' }}>
                {aboutData.heroText}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-20 sm:mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-[#161513]/12 divide-x divide-[#161513]/12">
            {(aboutData.heroStats || []).map((stat) => (
              <div key={stat.id} className="px-3 md:px-6 py-7">
                <div className="font-serif italic text-[#C2410C] leading-none" style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}>
                  {stat.value}
                </div>
                <div className="mt-3 mono text-[#161513]/45">{stat.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* 01 — THE THESIS */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-[#161513]/12">
          <div className="mono text-[#C2410C] mb-10">
            <span className="rule"></span>
            {aboutData.thesisTitle}
          </div>

          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-7">
              <p 
                className="font-serif italic text-[#161513] leading-[1.18] tracking-[-0.015em] [&>span]:text-[#C2410C] [&>span]:not-italic [&>span]:font-sans [&>span]:font-medium" 
                style={{ fontSize: 'clamp(32px, 4.6vw, 64px)', textWrap: 'balance' }}
                dangerouslySetInnerHTML={{ __html: aboutData.thesisHeading }}
              />
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <div className="lg:pt-6 space-y-6 text-[17px] leading-[1.7] text-[#161513]/72" style={{ textWrap: 'pretty' }}>
                {(aboutData.thesisParagraphs || []).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 — WHAT WE DO (Lines of Work) */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-[#161513]/12 bg-[#EDE6D3]/45">
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12 lg:col-span-5">
              <div className="mono text-[#C2410C] mb-6">
                <span className="rule"></span>02 · What we do
              </div>
              <h2 
                className="font-sans font-bold tracking-[-0.025em] leading-[1.02] [&>span]:frauncesItalic [&>span]:text-[#C2410C]" 
                style={{ fontSize: 'clamp(34px, 4.8vw, 64px)' }}
                dangerouslySetInnerHTML={{ __html: aboutData.linesOfWorkHeading }}
              />
            </div>
            <p className="col-span-12 lg:col-span-5 lg:col-start-8 text-[16px] leading-[1.7] text-[#161513]/72 self-end" style={{ textWrap: 'pretty' }}>
              {aboutData.linesOfWorkSubtext}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
            {(aboutData.linesOfWork || []).map((item) => (
              <article key={item.id} className="rounded-2xl border border-[#161513]/12 bg-[#F4F1EA] overflow-hidden flex flex-col">
                <div className="px-6 py-3 border-b border-[#161513]/12 flex items-center justify-between">
                  <span className="mono text-[#C2410C]">Line · {item.line}</span>
                  <span className="mono text-[#161513]/40">Diagnose</span>
                </div>
                <div className="p-7 sm:p-9 flex-1 flex flex-col">
                  <div className="font-serif italic text-[#161513]/15 leading-none" style={{ fontSize: '96px' }}>
                    {item.line}
                  </div>
                  <h3 className="mt-2 font-sans font-semibold text-[24px] tracking-[-0.015em] leading-[1.15]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.65] text-[#161513]/70 flex-1" style={{ textWrap: 'pretty' }}>
                    {item.description}
                  </p>
                  <div className="mt-7 pt-5 border-t border-[#161513]/10 grid grid-cols-2 gap-y-3 text-[13px]">
                    <span className="mono text-[#161513]/45">Duration</span>
                    <span className="text-[#161513]/80 text-right">{item.duration}</span>
                    <span className="mono text-[#161513]/45">Output</span>
                    <span className="text-[#161513]/80 text-right">{item.output}</span>
                    <span className="mono text-[#161513]/45">Tier</span>
                    <span className="text-[#C2410C] text-right">{item.tier}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 03 — PRINCIPLES (Opinions) */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-[#161513]/12">
          <div className="grid grid-cols-12 gap-8 mb-20">
            <div className="col-span-12 lg:col-span-7">
              <div className="mono text-[#C2410C] mb-6">
                <span className="rule"></span>03 · How we think
              </div>
              <h2 
                className="font-sans font-bold tracking-[-0.028em] leading-[0.98] [&>span]:frauncesItalic [&>span]:text-[#C2410C]" 
                style={{ fontSize: 'clamp(40px, 6.4vw, 92px)' }}
                dangerouslySetInnerHTML={{ __html: aboutData.opinionsHeading }}
              />
            </div>
          </div>

          <ol className="space-y-0 divide-y divide-[#161513]/12 border-y border-[#161513]/12">
            {(aboutData.opinions || []).map((opinion) => (
              <li key={opinion.id} className="grid grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-12">
                <div className="col-span-2 md:col-span-1">
                  <div className="font-serif italic text-[#C2410C] leading-none" style={{ fontSize: 'clamp(40px, 4vw, 64px)' }}>
                    {opinion.num}
                  </div>
                </div>
                <h3 className="col-span-10 md:col-span-6 font-sans font-semibold tracking-[-0.02em] leading-[1.08]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', textWrap: 'balance' }}>
                  {opinion.title}
                </h3>
                <p className="col-span-12 md:col-span-5 text-[16px] leading-[1.65] text-[#161513]/68 md:pt-2" style={{ textWrap: 'pretty' }}>
                  {opinion.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 04 — SHAPE OF AN ENGAGEMENT (Phases) */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-[#161513]/12 bg-[#EDE6D3]/45">
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12 lg:col-span-7">
              <div className="mono text-[#C2410C] mb-6">
                <span className="rule"></span>04 · The shape of an engagement
              </div>
              <h2 
                className="font-sans font-bold tracking-[-0.025em] leading-[1.02] [&>span]:frauncesItalic [&>span]:text-[#C2410C]" 
                style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
                dangerouslySetInnerHTML={{ __html: aboutData.phasesHeading }}
              />
            </div>
            <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[16px] leading-[1.7] text-[#161513]/72 self-end" style={{ textWrap: 'pretty' }}>
              {aboutData.phasesSubtext}
            </p>
          </div>

          {/* Phase ruler */}
          <div className="rounded-2xl border border-[#161513]/12 bg-[#F4F1EA] overflow-hidden">
            <div className="px-6 py-3 border-b border-[#161513]/12 flex items-center justify-between">
              <span className="mono text-[#C2410C]">{aboutData.phasesFigLabel}</span>
              <span className="mono text-[#161513]/40">{aboutData.phasesFigSub}</span>
            </div>
            <div className="relative">
              <div className="grid grid-cols-12 border-b border-[#161513]/12 text-center">
                {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((wk, idx) => (
                  <div key={idx} className={`py-2 mono text-[#161513]/40 ${idx < 11 ? 'border-r border-[#161513]/10' : ''}`}>
                    {wk}
                  </div>
                ))}
              </div>
              {/* Colored bands */}
              <div className="grid grid-cols-12 h-12 border-b border-[#161513]/12">
                <div className="col-span-2 bg-[#C2410C]/85"></div>
                <div className="col-span-3 bg-[#C2410C]/55"></div>
                <div className="col-span-5 bg-[#C2410C]/35"></div>
                <div className="col-span-2 bg-[#C2410C]/70"></div>
              </div>
            </div>

            {/* Phase Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#161513]/12">
              {(aboutData.phases || []).map((phase) => (
                <div key={phase.id} className="px-7 py-8">
                  <div className="mono text-[#C2410C] mb-2">{phase.timeframe}</div>
                  <h4 className="font-sans font-semibold text-[19px] tracking-[-0.01em]">
                    {phase.title}
                  </h4>
                  <p className="mt-3 text-[14px] leading-[1.6] text-[#161513]/65" style={{ textWrap: 'pretty' }}>
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 — CAPABILITIES (The Bench) */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-[#161513]/12">
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12 lg:col-span-7">
              <div className="mono text-[#C2410C] mb-6">
                <span className="rule"></span>05 · The bench
              </div>
              <h2 
                className="font-sans font-bold tracking-[-0.025em] leading-[1.02] [&>span]:frauncesItalic [&>span]:text-[#C2410C]" 
                style={{ fontSize: 'clamp(34px, 4.8vw, 64px)' }}
                dangerouslySetInnerHTML={{ __html: aboutData.capabilitiesHeading }}
              />
            </div>
            <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[16px] leading-[1.7] text-[#161513]/72 self-end" style={{ textWrap: 'pretty' }}>
              {aboutData.capabilitiesSubtext}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#161513]/12">
            {(aboutData.capabilities || []).map((cap) => (
              <div key={cap.id} className="border-r border-b border-[#161513]/12 px-7 py-9 hover:bg-stone-200/20 transition-colors">
                <div className="mono text-[#C2410C] mb-4">{cap.number}</div>
                <h4 className="font-sans font-semibold text-[20px] tracking-[-0.01em] leading-[1.15]">
                  {cap.title}
                </h4>
                <p className="mt-3 text-[14px] leading-[1.65] text-[#161513]/65">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-[14px] mono text-[#161513]/45">
            {aboutData.capabilitiesFooter}
          </p>
        </section>

        {/* 06 — SELECTED WORK (Anonymized Vignettes) */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-[#161513]/12 bg-[#EDE6D3]/45">
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12 lg:col-span-7">
              <div className="mono text-[#C2410C] mb-6">
                <span className="rule"></span>06 · Selected work
              </div>
              <h2 
                className="font-sans font-bold tracking-[-0.025em] leading-[1.02] [&>span]:frauncesItalic [&>span]:text-[#C2410C]" 
                style={{ fontSize: 'clamp(34px, 4.8vw, 64px)' }}
                dangerouslySetInnerHTML={{ __html: aboutData.casesHeading }}
              />
            </div>
            <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[16px] leading-[1.7] text-[#161513]/72 self-end" style={{ textWrap: 'pretty' }}>
              {aboutData.casesSubtext}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(aboutData.cases || []).map((item) => (
              <article key={item.id} className="rounded-2xl border border-[#161513]/12 bg-[#F4F1EA] overflow-hidden flex flex-col">
                <div className="px-6 py-3 border-b border-[#161513]/12 flex items-center justify-between">
                  <span className="mono text-[#C2410C]">{item.caseLetter}</span>
                  <span className="mono text-[#161513]/40">{item.year}</span>
                </div>
                <div className="aspect-[4/3] bg-[#EDE6D3] relative overflow-hidden">
                  {renderCaseSvg(item.type)}
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mono text-[#161513]/40 mb-3">{item.location}</div>
                    <h4 className="font-sans font-semibold text-[20px] tracking-[-0.01em] leading-[1.2]">
                      {item.title}
                    </h4>
                    <p className="mt-4 text-[14px] leading-[1.65] text-[#161513]/65" style={{ textWrap: 'pretty' }}>
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-[#161513]/10 grid grid-cols-2 gap-3 text-[13px]">
                    <span className="mono text-[#161513]/45">Wedge</span>
                    <span className="text-[#161513]/80 text-right">{item.wedge}</span>
                    <span className="mono text-[#161513]/45">{item.resultLabel}</span>
                    <span className="text-[#C2410C] text-right font-medium">{item.result}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 07 — DRIFT STRIP (Mantra) */}
        <section className="border-y border-[#161513]/12 bg-[#161513] text-[#F4F1EA] py-10 overflow-hidden">
          <div className="flex whitespace-nowrap drift" style={{ width: 'max-content' }}>
            <span 
              className="font-sans font-bold tracking-[-0.02em] pr-16 [&>span]:frauncesItalic [&>span]:text-[#C2410C]" 
              style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
              dangerouslySetInnerHTML={{ __html: aboutData.driftText }}
            />
            <span 
              className="font-sans font-bold tracking-[-0.02em] pr-16 [&>span]:frauncesItalic [&>span]:text-[#C2410C]" 
              aria-hidden="true" 
              style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}
              dangerouslySetInnerHTML={{ __html: aboutData.driftText }}
            />
          </div>
        </section>

        {/* 08 — WHERE WE WORK */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 border-b border-[#161513]/12">
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-5">
              <div className="mono text-[#C2410C] mb-6">
                <span className="rule"></span>07 · Where we work
              </div>
              <h2 
                className="font-sans font-bold tracking-[-0.025em] leading-[1.02] [&>span]:frauncesItalic [&>span]:text-[#C2410C]" 
                style={{ fontSize: 'clamp(34px, 4.6vw, 60px)' }}
                dangerouslySetInnerHTML={{ __html: aboutData.whereWeWorkHeading }}
              />
              <p className="mt-7 text-[16px] leading-[1.7] text-[#161513]/72 max-w-md" style={{ textWrap: 'pretty' }}>
                {aboutData.whereWeWorkSubtext}
              </p>
              <div className="mt-10 pt-6 border-t border-[#161513]/12 grid grid-cols-2 gap-y-4 max-w-md">
                {(aboutData.whereWeWorkDetails || []).map((detail) => (
                  <span key={detail.id} className="contents">
                    <span className="mono text-[#161513]/45">{detail.label}</span>
                    <span className="text-[14px] text-right">{detail.value}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(aboutData.hubs || []).map((hub) => (
                <article key={hub.id} className="rounded-2xl border border-[#161513]/12 bg-[#F4F1EA] overflow-hidden flex flex-col">
                  <div className="px-6 py-3 border-b border-[#161513]/12 flex items-center justify-between">
                    <span className="mono text-[#C2410C]">{hub.number}</span>
                    <span className="mono text-[#161513]/40">{hub.timezone}</span>
                  </div>
                  <div className="aspect-[4/3] bg-[#EDE6D3] relative overflow-hidden">
                    {renderHubSvg(hub.name)}
                  </div>
                  <div className="px-6 py-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-sans font-semibold text-[22px] tracking-[-0.01em]">
                        {hub.name}
                      </h4>
                      <p className="mt-1 mono text-[#161513]/45">{hub.label}</p>
                      <p className="mt-4 text-[14px] text-[#161513]/65 leading-[1.6]">
                        {hub.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 09 — FIT CALL CTA BANNER */}
        <section className="px-6 md:px-10 lg:px-14 py-24 sm:py-32 bg-[#EDE6D3]">
          <div className="max-w-5xl mx-auto text-center">
            <span className="mono text-[#161513]/50">{aboutData.fitCallIntro}</span>
            <h3 
              className="mt-8 font-sans font-bold tracking-[-0.028em] leading-[1.04] [&>span]:frauncesItalic [&>span]:text-[#C2410C]" 
              style={{ fontSize: 'clamp(36px, 5.4vw, 72px)', textWrap: 'balance' }}
              dangerouslySetInnerHTML={{ __html: aboutData.fitCallHeading }}
            />
            <p className="mt-6 max-w-[52ch] mx-auto text-[#161513]/65 text-[17px] leading-[1.6]">
              {aboutData.fitCallText}
            </p>
            <a 
              href={aboutData.fitCallButtonLink} 
              className="mt-12 inline-flex items-center gap-3 bg-[#C2410C] hover:bg-[#9A330A] text-[#F4F1EA] px-12 py-5 rounded-full font-mono font-bold text-[11px] uppercase tracking-[0.28em] transition-colors"
            >
              {aboutData.fitCallButtonText}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
