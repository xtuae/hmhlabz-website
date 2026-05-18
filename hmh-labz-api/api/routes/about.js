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
          heroTitle: "About HMH Labz",
          heroText: "We build systems.",
          linesOfWork: [
            { id: "1", line: "01", title: "Diagnose", description: "Audit & Architecture", duration: "2-3 Weeks", output: "Blueprint / Tech Stack / ROI Analysis", tier: "Tier 1" },
            { id: "2", line: "02", title: "Build", description: "Core Implementation", duration: "6-12 Weeks", output: "Production Systems / Portals / AI Integration", tier: "Tier 2" },
            { id: "3", line: "03", title: "Transform", description: "Retained Ops", duration: "12+ Months", output: "Continuous Deployment / Workflow Automation", tier: "Tier 3" }
          ],
          phases: [
            { id: "1", timeframe: "Wk 01-02", title: "Discovery", description: "System mapping and architecture design." },
            { id: "2", timeframe: "Wk 03-08", title: "Development", description: "Core infrastructure and feature builds." },
            { id: "3", timeframe: "Wk 09-10", title: "Testing", description: "QA, security audits, and edge-case testing." },
            { id: "4", timeframe: "Wk 11-12", title: "Deployment", description: "Production launch and team handover." }
          ],
          capabilities: [
            { id: "1", number: "01", title: "AI Integration", description: "LLMs, RAG, and automated reasoning." },
            { id: "2", number: "02", title: "Cloud Architecture", description: "Serverless scaling and secure deployments." },
            { id: "3", number: "03", title: "Custom Workflows", description: "API plumbing and data pipelines." },
            { id: "4", number: "04", title: "Legal Tech", description: "Secure portals and document automation." }
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
    const { heroTitle, heroText, linesOfWork, phases, capabilities } = req.body;
    
    const about = await prisma.aboutContent.upsert({
      where: { id: 'global' },
      update: { 
        heroTitle, 
        heroText, 
        linesOfWork: linesOfWork || [], 
        phases: phases || [], 
        capabilities: capabilities || [] 
      },
      create: { 
        id: 'global', 
        heroTitle, 
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
