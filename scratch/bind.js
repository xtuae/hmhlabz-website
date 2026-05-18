const fs = require('fs');

let jsx = fs.readFileSync('/Volumes/Mac-HMH/Desktop/hmhlabz-new/scratch/converted.jsx', 'utf8');

// 1. Hero Binding
jsx = jsx.replace(
  /<h1 className="col-span-12 lg:col-span-9 font-sans font-bold text-ink tracking-\[-0\.035em\] leading-\[0\.92\]"([^>]+)>([\s\S]*?)<\/h1>/,
  '<h1 className="col-span-12 lg:col-span-9 font-sans font-bold text-ink tracking-[-0.035em] leading-[0.92]"$1>{data.heroTitle}</h1>'
);
jsx = jsx.replace(
  /<p className="text-\[14px\] text-ink\/65 leading-\[1\.6\]"([^>]+)>([\s\S]*?)<\/p>/,
  '<p className="text-[14px] text-ink/65 leading-[1.6]"$1>{data.heroText}</p>'
);

// 2. Lines of Work Binding
const linesRegex = /<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">([\s\S]*?)<\/section>/;
const linesMatch = jsx.match(linesRegex);

const linesReplacement = `<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
        {data.linesOfWork?.map((item, i) => (
        <article key={item.id || i} className="rounded-2xl border border-ink/12 bg-paper overflow-hidden flex flex-col">
          <div className="px-6 py-3 border-b border-ink/12 flex items-center justify-between">
            <span className="mono text-terra">Line · 0{i + 1}</span>
            <span className="mono text-ink/40">{item.title.split(' ')[0]}</span>
          </div>
          <div className="p-7 sm:p-9 flex-1 flex flex-col">
            <div className="font-serif italic text-ink/15 leading-none" style={{ fontSize: '96px' }}>0{i + 1}</div>
            <h3 className="mt-2 font-sans font-semibold text-[24px] tracking-[-0.015em] leading-[1.15]">{item.title}</h3>
            <p className="mt-4 text-[15px] leading-[1.65] text-ink/70 flex-1" style={{ textWrap: 'pretty' }}>
              {item.description}
            </p>
            <div className="mt-7 pt-5 border-t border-ink/10 grid grid-cols-2 gap-y-3 text-[13px]">
              <span className="mono text-ink/45">Duration</span><span className="text-ink/80 text-right">{item.duration}</span>
              <span className="mono text-ink/45">Output</span><span className="text-ink/80 text-right">{item.output}</span>
              <span className="mono text-ink/45">Tier</span><span className="text-terra text-right">{item.tier}</span>
            </div>
          </div>
        </article>
        ))}
      </div>
    </section>`;

if (linesMatch) {
  jsx = jsx.replace(linesMatch[0], linesReplacement);
}

// 3. Phases Binding
const phasesRegex = /<div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-ink\/12">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;
const phasesReplacement = `<div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-ink/12">
          {data.phases?.map((phase, i) => (
          <div key={phase.id || i} className="px-7 py-8">
            <div className="mono text-terra mb-2">{phase.timeframe}</div>
            <h4 className="font-sans font-semibold text-[19px] tracking-[-0.01em]">{phase.title}</h4>
            <p className="mt-3 text-[14px] leading-[1.6] text-ink/65" style={{ textWrap: 'pretty' }}>
              {phase.description}
            </p>
          </div>
          ))}
        </div>
      </div>
    </section>`;
jsx = jsx.replace(phasesRegex, phasesReplacement);


// 4. Capabilities (Bench) Binding
const capsRegex = /<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-ink\/12">([\s\S]*?)<\/div>\s*<p className="mt-10/;
const capsReplacement = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-ink/12">
        {data.capabilities?.map((cap, i) => (
        <div key={cap.id || i} className="border-r border-b border-ink/12 px-7 py-9">
          <div className="mono text-terra mb-4">{cap.number}</div>
          <h4 className="font-sans font-semibold text-[20px] tracking-[-0.01em] leading-[1.15]">{cap.title}</h4>
          <p className="mt-3 text-[14px] leading-[1.65] text-ink/65">{cap.description}</p>
        </div>
        ))}
      </div>\n      <p className="mt-10`;
jsx = jsx.replace(capsRegex, capsReplacement);

// Generate About.jsx
let aboutCode = fs.readFileSync('/Volumes/Mac-HMH/Desktop/hmhlabz-new/hmh-labz-frontend/src/pages/About.jsx', 'utf8');

// Replace everything between <Navbar /> and <Footer /> with our new jsx wrapped inside
// Wait, the new jsx is `<main>...</main>`. We want to wrap it inside the layout correctly.
const newReturn = `
  return (
    <>
      <Navbar />
      ${jsx}
      <Footer />
    </>
  );
};
`;

aboutCode = aboutCode.replace(/return \([\s\S]*?\);\n\};/, newReturn.trim());

fs.writeFileSync('/Volumes/Mac-HMH/Desktop/hmhlabz-new/hmh-labz-frontend/src/pages/About.jsx', aboutCode);
console.log("Binding success!");
