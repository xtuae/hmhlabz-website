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
    res.status(500).json({ error: 'Error fetching insights' });
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
    
    if (!insight) return res.status(404).json({ error: 'Not found' });
    res.json(insight);
  } catch (error) {
    console.error('Error fetching insight:', error);
    res.status(500).json({ error: 'Error fetching insight' });
  }
});

router.post('/insights', async (req, res) => {
  try {
    const { requireRole } = await import('../lib/auth.js');

    return requireRole(['SUPERADMIN', 'ADMIN'])(req, res, async () => {
      try {
        const { title, slug, excerpt, content, coverImage, category, tag, readTime, seoTitle, seoDescription, status, publishedAt } = req.body;

        if (!title || !slug) return res.status(400).json({ error: 'Title and slug are required.' });

        // Check if slug already exists
        const existingSlug = await prisma.insight.findUnique({ where: { slug } });
        if (existingSlug) return res.status(400).json({ error: 'Slug must be unique. This slug is already in use.' });

        let publishedDate = null;
        if (req.body.status === 'PUBLISHED') {
          publishedDate = req.body.publishedAt ? new Date(req.body.publishedAt) : new Date();
        }

        const safeTag = req.body.category || req.body.tag || 'Operations';

        const insight = await prisma.insight.create({
          data: {
            title: title || 'Untitled', 
            slug, 
            excerpt: excerpt || '', 
            content: content || '',
            coverImage: coverImage || null, 
            category: category || 'Field Notes',
            tag: safeTag,
            readTime: readTime || '5 min read',
            seoTitle: seoTitle || null, 
            seoDescription: seoDescription || null,
            status: status || 'DRAFT', 
            publishedAt: publishedDate,
            authorId: req.user?.id || null,
          },
        });
        res.status(201).json(insight);
      } catch (error) {
        console.error('Prisma Error creating insight:', error);
        res.status(400).json({ error: error.message || "Database error occurred" });
      }
    });
  } catch (error) {
    console.error('Middleware Error:', error);
    res.status(500).json({ error: error.message || 'Error creating insight' });
  }
});

router.put('/insights/:id', async (req, res) => {
  try {
    const { requireRole } = await import('../lib/auth.js');

    return requireRole(['SUPERADMIN', 'ADMIN'])(req, res, async () => {
      try {
        const { title, slug, excerpt, content, coverImage, category, tag, readTime, seoTitle, seoDescription, status, publishedAt } = req.body;
        
        const existing = await prisma.insight.findUnique({ where: { id: req.params.id } });
        if (!existing) return res.status(404).json({ error: 'Insight not found' });

        if (slug && slug !== existing.slug) {
          const existingSlug = await prisma.insight.findUnique({ where: { slug } });
          if (existingSlug) return res.status(400).json({ error: 'Slug must be unique. This slug is already in use.' });
        }

        let publishedDate = existing.publishedAt;
        if (req.body.status === 'PUBLISHED') {
          publishedDate = req.body.publishedAt ? new Date(req.body.publishedAt) : (existing.publishedAt || new Date());
        } else if (req.body.status === 'DRAFT') {
          publishedDate = null;
        }

        const safeTag = req.body.category || req.body.tag || existing.tag || 'Operations';

        const insight = await prisma.insight.update({
          where: { id: req.params.id },
          data: {
            title: title || existing.title, 
            slug: slug || existing.slug, 
            excerpt: excerpt !== undefined ? excerpt : existing.excerpt, 
            content: content !== undefined ? content : existing.content,
            coverImage: coverImage !== undefined ? coverImage : existing.coverImage, 
            category: category !== undefined ? category : existing.category,
            tag: safeTag,
            readTime: readTime !== undefined ? readTime : existing.readTime,
            seoTitle: seoTitle !== undefined ? seoTitle : existing.seoTitle, 
            seoDescription: seoDescription !== undefined ? seoDescription : existing.seoDescription,
            status: status || existing.status, 
            publishedAt: publishedDate
          }
        });
        res.status(200).json(insight);
      } catch (error) {
        console.error('Prisma Error updating insight:', error);
        res.status(400).json({ error: error.message || "Database error occurred" });
      }
    });
  } catch (error) {
    console.error('Middleware Error:', error);
    res.status(500).json({ error: error.message || 'Error updating insight' });
  }
});

router.delete('/insights/:id', async (req, res) => {
  try {
    const { requireRole } = await import('../lib/auth.js');

    return requireRole(['SUPERADMIN', 'ADMIN'])(req, res, async () => {
      try {
        await prisma.insight.delete({ where: { id: req.params.id } });
        res.status(200).json({ message: 'Insight deleted.' });
      } catch (err) {
        res.status(400).json({ error: err.message || 'Error deleting insight' });
      }
    });
  } catch (error) {
    console.error('Error deleting insight:', error);
    res.status(500).json({ error: error.message || 'Error deleting insight' });
  }
});

export default router;
