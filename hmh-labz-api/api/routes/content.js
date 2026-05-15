import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// --- Upload ---
router.post('/upload', async (req, res) => {
  try {
    const { requireRole } = await import('../../lib/auth.js');
    const { put } = await import('@vercel/blob');
    
    return requireRole(['SUPERADMIN', 'ADMIN', 'MODERATOR'])(req, res, async () => {
      const { filename, contentType } = req.query;
      try {
        const blob = await put(filename, req, { access: 'public', contentType });
        return res.status(200).json(blob);
      } catch (error) {
        return res.status(500).json({ message: 'Upload failed', error });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal error loading dependencies' });
  }
});

// --- Insights ---
router.get('/insights', async (req, res) => {
  try {
    const insights = await prisma.insight.findMany({
      where: { published: true },
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insights' });
  }
});

router.get('/insights/:slugOrId', async (req, res) => {
  try {
    const insight = await prisma.insight.findFirst({
      where: {
        OR: [
          { id: req.params.slugOrId },
          { slug: req.params.slugOrId }
        ],
        published: true
      },
      include: { author: { select: { name: true } } }
    });
    if (!insight) return res.status(404).json({ message: 'Not found' });
    res.json(insight);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insight' });
  }
});

router.post('/insights', async (req, res) => {
  try {
    const { requireRole } = await import('../../lib/auth.js');

    return requireRole(['SUPERADMIN', 'ADMIN'])(req, res, async () => {
      const { title, slug, excerpt, content, coverImage, published } = req.body;

      if (!title || !slug) return res.status(400).json({ message: 'Title and slug are required.' });

      const insight = await prisma.insight.create({
        data: {
          title, slug, excerpt: excerpt || null, content: content || '',
          coverImage: coverImage || null, published: published || false,
          authorId: req.user.id,
        },
      });
      res.status(201).json(insight);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating insight' });
  }
});

router.put('/insights/:id', async (req, res) => {
  try {
    const { requireRole } = await import('../../lib/auth.js');

    return requireRole(['SUPERADMIN', 'ADMIN'])(req, res, async () => {
      const data = req.body;
      const insight = await prisma.insight.update({
        where: { id: req.params.id },
        data
      });
      res.status(200).json(insight);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating insight' });
  }
});

router.delete('/insights/:id', async (req, res) => {
  try {
    const { requireRole } = await import('../../lib/auth.js');

    return requireRole(['SUPERADMIN', 'ADMIN'])(req, res, async () => {
      await prisma.insight.delete({ where: { id: req.params.id } });
      res.status(200).json({ message: 'Insight deleted.' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting insight' });
  }
});

export default router;
