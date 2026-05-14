import React from 'react';

const TechStack = () => {
  const items = [
    "RAG assistants", 
    "Document automation", 
    "Client portals", 
    "Internal tools", 
    "Workflow orchestration", 
    "AI lead scoring", 
    "Intake triage", 
    "Knowledge bases"
  ];

  return (
    <section className="bg-paper px-6 md:px-10 lg:px-14 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto text-left">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono uppercase tracking-[0.16em] text-[11px] sm:text-[12px] text-ink/55 ">
            <span className="text-ink/40">B —</span> Currently shipping
          </span>
          <span className="font-mono uppercase tracking-[0.16em] text-[11px] sm:text-[12px] text-ink/55 ">
            <span className="text-ink/40">→</span> Scroll
          </span>
        </div>
        
        <div className="relative overflow-hidden border-y border-ink/15 py-4 sm:py-5">
          <div className="flex animate-marquee whitespace-nowrap">
            <div className="flex items-center gap-10 shrink-0 pr-10">
              {items.map((it, k) => (
                <span key={k} className="flex items-center gap-10">
                  <span className="font-serif italic text-[18px] sm:text-[20px] text-ink/80 leading-none">
                    {it}
                  </span>
                  <span className="inline-block w-1 h-1 rounded-full bg-terra shrink-0"></span>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-10 shrink-0 pr-10">
              {items.map((it, k) => (
                <span key={k + 'd'} className="flex items-center gap-10">
                  <span className="font-serif italic text-[18px] sm:text-[20px] text-ink/80 leading-none">
                    {it}
                  </span>
                  <span className="inline-block w-1 h-1 rounded-full bg-terra shrink-0"></span>
                </span>
              ))}
            </div>
          </div>
          
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-paper to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-paper to-transparent"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>
  );
};

export default TechStack;
