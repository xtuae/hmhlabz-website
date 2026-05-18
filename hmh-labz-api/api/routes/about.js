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
          linesOfWork: [],
          phases: [],
          capabilities: []
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
