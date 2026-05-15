import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// GET /api/pages/:slug - Fetch page data
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const page = await prisma.page.findUnique({
      where: { slug }
    });
    
    if (!page) {
      return res.status(404).json({ error: 'Page configuration not found' });
    }
    
    res.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ error: 'Failed to fetch page data' });
  }
});

// PUT /api/pages/:slug - Upsert page data (SEO + Structured Content)
router.put('/:slug', async (req, res) => {
  const { slug } = req.params;
  const { title, metaDescription, content } = req.body;

  try {
    const page = await prisma.page.upsert({
      where: { slug },
      update: {
        title,
        metaDescription,
        content
      },
      create: {
        slug,
        title,
        metaDescription,
        content
      }
    });
    
    res.json(page);
  } catch (error) {
    console.error('Error saving page:', error);
    res.status(500).json({ error: 'Failed to synchronize page changes' });
  }
});

export default router;
