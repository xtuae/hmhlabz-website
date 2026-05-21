import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

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
          heroTitle: "A studio that tells you what to do, and then <em>does it.</em>",
          heroBadge: "WE BUILD SYSTEMS.",
          heroText: "HMH Labz is a small strategy & build studio for legal, recruitment and professional-services firms. We diagnose, recommend, and ship — under one roof, on one contract.",
          linesOfWork: [
            { id: "1", line: "01", title: "Diagnose", description: "AI & opportunity audits.", duration: "2 weeks", output: "Written roadmap", tier: "01 · Wedge" },
            { id: "2", line: "02", title: "Build", description: "Implementation sprints.", duration: "8–12 weeks", output: "Production system", tier: "02 · Sprint" },
            { id: "3", line: "03", title: "Embed", description: "Digital transformation, long-form.", duration: "12 months", output: "Embedded team", tier: "03 · Embed" }
          ],
          phases: [
            { id: "1", timeframe: "Wk 01–02", title: "Diagnose", description: "Two weeks inside the workflow. Interviews, shadowing, scoring. Output: a written roadmap and a kill memo." },
            { id: "2", timeframe: "Wk 03–05", title: "Wedge", description: "The smallest version of the system that produces real numbers. Daily standups, weekly demos." },
            { id: "3", timeframe: "Wk 06–10", title: "Ship & adopt", description: "Production rollout to one team. Adoption sessions, change loops, edge-case triage. Friday memo every week." },
            { id: "4", timeframe: "Wk 11–12", title: "Hand over", description: "Repo, accounts, runbook. A scored decision on whether to extend, expand, or kill — written, never spoken." }
          ],
          capabilities: [
            { id: "1", number: "01", title: "Operational strategy", description: "Workflow mapping, opportunity scoring, written roadmaps. The diagnostic muscle." },
            { id: "2", number: "02", title: "Applied AI & RAG", description: "Retrieval systems, evaluation harnesses, model selection. Production-grade, not demoware." },
            { id: "3", number: "03", title: "Product engineering", description: "Internal tools and customer-facing apps. TypeScript, Python, your existing stack where it's sane." },
            { id: "4", number: "04", title: "Product & service design", description: "Interface design, workflow design, the boring forms that decide whether a system gets used." },
            { id: "5", number: "05", title: "Change & adoption", description: "Rollout, training, the unglamorous work of getting humans to actually open the thing." },
            { id: "6", number: "06", title: "Data & evaluation", description: "Eval suites, dashboards, the numbers the kill memo gets measured against." }
          ]
        }
      });
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
    const { heroTitle, heroBadge, heroText, linesOfWork, phases, capabilities } = req.body;
    
    const about = await prisma.aboutContent.upsert({
      where: { id: 'global' },
      update: { 
        heroTitle, 
        heroBadge,
        heroText, 
        linesOfWork: linesOfWork || [], 
        phases: phases || [], 
        capabilities: capabilities || [] 
      },
      create: { 
        id: 'global', 
        heroTitle, 
        heroBadge,
        heroText, 
        linesOfWork: linesOfWork || [], 
        phases: phases || [], 
        capabilities: capabilities || [] 
      }
    });
    
    res.json(about);
  } catch (error) {
    console.error('Error updating about content:', error);
    res.status(500).json({ error: 'Failed to update about content' });
  }
});

export default router;
