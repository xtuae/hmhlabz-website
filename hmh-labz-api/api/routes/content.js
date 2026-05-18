import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// --- Insights ---
router.get('/insights', async (req, res) => {
  try {
    const { admin } = req.query;
    const whereClause = admin === 'true' ? {} : { status: 'PUBLISHED' };

    const insights = await prisma.insight.findMany({
      where: whereClause,
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(insights);
  } catch (error) {
    console.error('Error fetching insights:', error);
    res.status(500).json({ message: 'Error fetching insights' });
  }
});

router.get('/insights/:slugOrId', async (req, res) => {
  try {
    const { admin } = req.query;
    const whereClause = {
      OR: [
        { id: req.params.slugOrId },
        { slug: req.params.slugOrId }
      ]
    };
    
    if (admin !== 'true') {
      whereClause.status = 'PUBLISHED';
    }

    const insight = await prisma.insight.findFirst({
      where: whereClause,
      include: { author: { select: { name: true } } }
    });
    
    if (!insight) return res.status(404).json({ message: 'Not found' });
    res.json(insight);
  } catch (error) {
    console.error('Error fetching insight:', error);
    res.status(500).json({ message: 'Error fetching insight' });
  }
});

router.post('/insights', async (req, res) => {
  try {
    const { requireRole } = await import('../lib/auth.js');

    return requireRole(['SUPERADMIN', 'ADMIN'])(req, res, async () => {
      const { title, slug, excerpt, content, coverImage, category, tag, readTime, seoTitle, seoDescription, status } = req.body;

      if (!title || !slug) return res.status(400).json({ message: 'Title and slug are required.' });

      const insightStatus = status || 'DRAFT';
      const publishedAt = insightStatus === 'PUBLISHED' ? new Date() : null;

      const insight = await prisma.insight.create({
        data: {
          title, 
          slug, 
          excerpt: excerpt || '', 
          content: content || '',
          coverImage: coverImage || null, 
          category: category || 'Field Notes',
          tag: tag || 'Operations',
          readTime: readTime || '5 min read',
          seoTitle: seoTitle || null, 
          seoDescription: seoDescription || null,
          status: insightStatus, 
          publishedAt,
          authorId: req.user?.id || null,
        },
      });
      res.status(201).json(insight);
    });
  } catch (error) {
    console.error('Error creating insight:', error);
    res.status(500).json({ message: 'Error creating insight' });
  }
});

router.put('/insights/:id', async (req, res) => {
  try {
    const { requireRole } = await import('../lib/auth.js');

    return requireRole(['SUPERADMIN', 'ADMIN'])(req, res, async () => {
      const { title, slug, excerpt, content, coverImage, category, tag, readTime, seoTitle, seoDescription, status } = req.body;
      
      const existing = await prisma.insight.findUnique({ where: { id: req.params.id } });
      if (!existing) return res.status(404).json({ message: 'Not found' });

      const insightStatus = status || existing.status;
      let publishedAt = existing.publishedAt;
      if (insightStatus === 'PUBLISHED' && existing.status !== 'PUBLISHED') {
        publishedAt = new Date();
      }

      const insight = await prisma.insight.update({
        where: { id: req.params.id },
        data: {
          title, 
          slug, 
          excerpt: excerpt || '', 
          content: content || '',
          coverImage: coverImage || null, 
          category: category || 'Field Notes',
          tag: tag || existing.tag || 'Operations',
          readTime: readTime || existing.readTime || '5 min read',
          seoTitle: seoTitle || null, 
          seoDescription: seoDescription || null,
          status: insightStatus, 
          publishedAt
        }
      });
      res.status(200).json(insight);
    });
  } catch (error) {
    console.error('Error updating insight:', error);
    res.status(500).json({ message: 'Error updating insight' });
  }
});

router.delete('/insights/:id', async (req, res) => {
  try {
    const { requireRole } = await import('../lib/auth.js');

    return requireRole(['SUPERADMIN', 'ADMIN'])(req, res, async () => {
      await prisma.insight.delete({ where: { id: req.params.id } });
      res.status(200).json({ message: 'Insight deleted.' });
    });
  } catch (error) {
    console.error('Error deleting insight:', error);
    res.status(500).json({ message: 'Error deleting insight' });
  }
});

export default router;
