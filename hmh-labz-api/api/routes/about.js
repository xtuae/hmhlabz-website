import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

const sanitizeAbout = (about) => {
  if (!about) return about;
  
  const cleanStr = (val) => typeof val === 'string' ? val.replace(/·/g, '.') : val;
  
  if (about.thesisTitle) about.thesisTitle = cleanStr(about.thesisTitle);
  if (about.phasesFigSub) about.phasesFigSub = cleanStr(about.phasesFigSub);
  if (about.driftText) {
    let cleanedDrift = cleanStr(about.driftText);
    if (!cleanedDrift.includes('frauncesItalic') && cleanedDrift.toLowerCase().includes('recommend')) {
      cleanedDrift = cleanedDrift.replace(/Recommend/g, '<span class="frauncesItalic text-terra">Recommend</span>');
    }
    about.driftText = cleanedDrift;
  }
  
  if (Array.isArray(about.heroStats)) {
    about.heroStats = about.heroStats.map(stat => ({
      ...stat,
      label: cleanStr(stat.label)
    }));
  }
  
  if (Array.isArray(about.linesOfWork)) {
    const defaultSublabels = { '01': 'DIAGNOSE', '02': 'BUILD', '03': 'EMBED' };
    about.linesOfWork = about.linesOfWork.map(item => ({
      ...item,
      tier: cleanStr(item.tier),
      sublabel: item.sublabel || defaultSublabels[item.line] || (item.line === '01' ? 'DIAGNOSE' : item.line === '02' ? 'BUILD' : 'EMBED')
    }));
  }
  
  if (Array.isArray(about.phases)) {
    about.phases = about.phases.map(item => ({
      ...item,
      timeframe: cleanStr(item.timeframe)
    }));
  }
  
  if (Array.isArray(about.cases)) {
    about.cases = about.cases.map(item => ({
      ...item,
      caseLetter: cleanStr(item.caseLetter),
      location: cleanStr(item.location)
    }));
  }
  
  if (Array.isArray(about.whereWeWorkDetails)) {
    about.whereWeWorkDetails = about.whereWeWorkDetails.map(item => ({
      ...item,
      label: cleanStr(item.label),
      value: cleanStr(item.value)
    }));
  }
  
  if (Array.isArray(about.hubs)) {
    about.hubs = about.hubs.map(item => {
      let description = item.description;
      if (item.name === 'Dubai' && (!description || !description.includes('Al Quasis'))) {
        description = "Al Quasis 2,\nDubai, United Arab Emirates";
      } else if (item.name === 'Chennai' && (!description || !description.includes('W-32/117'))) {
        description = "W-32/117, Plot No. C-10,\n2nd Floor, 3rd Avenue,\nAnna Nagar, Chennai,\nTamil Nadu, India 600040.";
      }
      return {
        ...item,
        number: cleanStr(item.number),
        description: cleanStr(description)
      };
    });
  }
  
  return about;
};

// GET global AboutContent
router.get('/', async (req, res) => {
  try {
    let about = await prisma.aboutContent.findUnique({
      where: { id: 'global' }
    });
    
    if (!about) {
      about = await prisma.aboutContent.create({
        data: {
          id: 'global',
          heroTitle: "A studio that<br class=\"hidden md:block\" /> <span class=\"frauncesItalic text-terra\">tells&nbsp;you</span> what to do,<br class=\"hidden md:block\" /> and then does it.",
          heroBadge: "ISSUE # 26.05",
          heroText: "HMH Labz is a small strategy & build studio for legal, recruitment and professional-services firms. We diagnose, recommend, and ship — under one roof, on one contract.",
          heroStats: [
            { id: "1", value: "2023", label: "FOUNDED . DUBAI" },
            { id: "2", value: "38", label: "ENGAGEMENTS SHIPPED" },
            { id: "3", value: "06", label: "ACTIVE CLIENTS - HARD CAP" },
            { id: "4", value: "02", label: "HUBS - DUBAI & CHENNAI" }
          ],
          thesisTitle: "01 . Thesis",
          thesisHeading: "Most transformation work fails the same way. A strategy team writes the deck. An implementation team inherits it. The deck and the build never quite agree on the same problem, and twelve weeks in, the rollout is <span class=\"text-terra not-italic font-sans font-medium\" style=\"font-style: normal;\">\"in&nbsp;phase&nbsp;two.\"</span>",
          thesisParagraphs: [
            "We started HMH Labz because the model is broken. Diagnosis and delivery should live in the same room — same people, same contract, same incentive to get the thing actually used by month three.",
            "Everything else on this page is a consequence of that one decision."
          ],
          linesOfWorkHeading: "Three lines of work, <span class=\"frauncesItalic text-terra\">one&nbsp;team.</span>",
          linesOfWorkSubtext: "Engagements usually start on one line and grow into the next. The team doesn't change when they do.",
          linesOfWork: [
            { id: "1", line: "01", sublabel: "DIAGNOSE", title: "AI & opportunity audits.", description: "A two-week diagnostic across one team or one workflow. The output is a scored, written roadmap — not a slide deck — that ranks every opportunity by impact, effort, and risk of stalling.", duration: "2 weeks", output: "Written roadmap", tier: "01 . Wedge" },
            { id: "2", line: "02", sublabel: "BUILD", title: "Implementation sprints.", description: "Eight to twelve weeks shipping one workflow into production. RAG systems, intake automation, internal tools — built on your stack, handed back on day one, with adoption baked in.", duration: "8–12 weeks", output: "Production system", tier: "02 . Sprint" },
            { id: "3", line: "03", sublabel: "EMBED", title: "Digital transformation, long-form.", description: "Twelve-month engagements for firms reshaping a practice area or a function. We sit alongside the operating team, ship in monthly cycles, and write the playbook as we go.", duration: "12 months", output: "Embedded team", tier: "03 . Embed" }
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
          phasesFigSub: "Wedge engagement . weeks 01–12",
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
            { id: "1", caseLetter: "Case . A", year: "2024", type: "RAG", location: "Mid-size law firm . Dubai", title: "An intake-triage RAG, shipped in nine weeks.", description: "Replaced a six-step manual triage with a retrieval-backed assistant trained on six years of matter files. Lawyers review, not type.", wedge: "Intake", result: "12 hrs / lawyer / wk saved", resultLabel: "Wk 12 result" },
            { id: "2", caseLetter: "Case . B", year: "2025", type: "Pipeline", location: "Recruitment group . MENA", title: "Mapping the handoff before automating it.", description: "Two-week diagnostic, then a six-week build of the sourcing-to-shortlist pipeline. We refused to start until one named owner existed.", wedge: "Sourcing", result: "3.4× shortlist throughput", resultLabel: "Wk 08 result" },
            { id: "3", caseLetter: "Case . C", year: "2025", type: "Embed", location: "Professional services . India", title: "A twelve-month embed inside a 200-person practice.", description: "Three workflows reshaped in monthly cycles, a written playbook handed over at month twelve, and an internal team trained to run the next three without us.", wedge: "Doc review", result: "28% gross-margin lift", resultLabel: "Yr 01 result" }
          ],
          driftText: "Diagnose . <span class=\"frauncesItalic text-terra\">Recommend</span> . Ship . Hand over . Diagnose . <span class=\"frauncesItalic text-terra\">Recommend</span> . Ship . Hand over . ",
          whereWeWorkHeading: "Two cities, <span class=\"frauncesItalic text-terra\">one&nbsp;team.</span>",
          whereWeWorkSubtext: "Remote-first studio with two physical hubs. Most engagements run hybrid — one site visit at week one, weekly working sessions on a call, a second visit at launch.",
          whereWeWorkDetails: [
            { id: "1", label: "Languages", value: "English . Arabic . Tamil" },
            { id: "2", label: "Coverage", value: "GMT +4 to +5:30" },
            { id: "3", label: "Travel", value: "Included in fee" }
          ],
          hubs: [
            { id: "1", number: "Hub . 01", timezone: "GMT +4", name: "Dubai", label: "Strategy & design", description: "Al Quasis 2,\nDubai, United Arab Emirates" },
            { id: "2", number: "Hub . 02", timezone: "GMT +5:30", name: "Chennai", label: "Build & ops", description: "W-32/117, Plot No. C-10,\n2nd Floor, 3rd Avenue,\nAnna Nagar, Chennai,\nTamil Nadu, India 600040." }
          ],
          fitCallIntro: "If you've read this far",
          fitCallHeading: "You probably want to <span class=\"frauncesItalic text-terra\">talk&nbsp;to&nbsp;us.</span>",
          fitCallText: "20 minutes. No deck. No pitch. We tell you whether AI or digital systems would actually move the needle for a firm like yours — and whether we're the right team to do it.",
          fitCallButtonText: "Book a 20-min Fit Call →",
          fitCallButtonLink: "/#book"
        }
      });
    } else {
      const serialized = JSON.stringify(about);
      const hasMiddleDots = serialized.includes('·');
      const missingSublabels = Array.isArray(about.linesOfWork) && about.linesOfWork.some(item => !item.sublabel);
      const missingStyling = about.driftText && !about.driftText.includes('frauncesItalic') && about.driftText.toLowerCase().includes('recommend');
      const hasOldAddresses = Array.isArray(about.hubs) && about.hubs.some(hub => 
        (hub.name === 'Dubai' && !hub.description.includes('Al Quasis')) ||
        (hub.name === 'Chennai' && !hub.description.includes('W-32/117'))
      );
      
      if (hasMiddleDots || missingSublabels || missingStyling || hasOldAddresses) {
        about = sanitizeAbout(about);
        about = await prisma.aboutContent.update({
          where: { id: 'global' },
          data: {
            thesisTitle: about.thesisTitle,
            phasesFigSub: about.phasesFigSub,
            driftText: about.driftText,
            heroStats: about.heroStats,
            linesOfWork: about.linesOfWork,
            phases: about.phases,
            cases: about.cases,
            whereWeWorkDetails: about.whereWeWorkDetails,
            hubs: about.hubs
          }
        });
      }
    }
    
    res.json(about);
  } catch (error) {
    console.error('Error fetching about content:', error);
    res.status(500).json({ error: 'Failed to fetch about content' });
  }
});

// PUT update global AboutContent
router.put('/', async (req, res) => {
  try {
    const sanitizedBody = sanitizeAbout(req.body);
    const { 
      heroTitle, heroBadge, heroText, heroStats,
      thesisTitle, thesisHeading, thesisParagraphs,
      linesOfWorkHeading, linesOfWorkSubtext, linesOfWork,
      opinionsHeading, opinions,
      phasesHeading, phasesSubtext, phasesFigLabel, phasesFigSub, phases,
      capabilitiesHeading, capabilitiesSubtext, capabilitiesFooter, capabilities,
      casesHeading, casesSubtext, cases,
      driftText,
      whereWeWorkHeading, whereWeWorkSubtext, whereWeWorkDetails, hubs,
      fitCallIntro, fitCallHeading, fitCallText, fitCallButtonText, fitCallButtonLink
    } = sanitizedBody;
    
    const about = await prisma.aboutContent.upsert({
      where: { id: 'global' },
      update: { 
        heroTitle, heroBadge, heroText, heroStats: heroStats || [],
        thesisTitle, thesisHeading, thesisParagraphs: thesisParagraphs || [],
        linesOfWorkHeading, linesOfWorkSubtext, linesOfWork: linesOfWork || [],
        opinionsHeading, opinions: opinions || [],
        phasesHeading, phasesSubtext, phasesFigLabel, phasesFigSub, phases: phases || [],
        capabilitiesHeading, capabilitiesSubtext, capabilitiesFooter, capabilities: capabilities || [],
        casesHeading, casesSubtext, cases: cases || [],
        driftText,
        whereWeWorkHeading, whereWeWorkSubtext, whereWeWorkDetails: whereWeWorkDetails || [], hubs: hubs || [],
        fitCallIntro, fitCallHeading, fitCallText, fitCallButtonText, fitCallButtonLink
      },
      create: { 
        id: 'global', 
        heroTitle, heroBadge, heroText, heroStats: heroStats || [],
        thesisTitle, thesisHeading, thesisParagraphs: thesisParagraphs || [],
        linesOfWorkHeading, linesOfWorkSubtext, linesOfWork: linesOfWork || [],
        opinionsHeading, opinions: opinions || [],
        phasesHeading, phasesSubtext, phasesFigLabel, phasesFigSub, phases: phases || [],
        capabilitiesHeading, capabilitiesSubtext, capabilitiesFooter, capabilities: capabilities || [],
        casesHeading, casesSubtext, cases: cases || [],
        driftText,
        whereWeWorkHeading, whereWeWorkSubtext, whereWeWorkDetails: whereWeWorkDetails || [], hubs: hubs || [],
        fitCallIntro, fitCallHeading, fitCallText, fitCallButtonText, fitCallButtonLink
      }
    });
    
    res.json(about);
  } catch (error) {
    console.error('Error updating about content:', error);
    res.status(500).json({ error: 'Failed to update about content' });
  }
});

export default router;

