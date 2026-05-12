import prisma from '../../lib/db';
import { withAuth } from '../../lib/auth';
import { allowCors } from '../../lib/cors';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const insights = await prisma.insight.findMany({
        where: { published: true },
        include: {
          author: {
            select: { name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(insights);
    } catch (error) {
      console.error('Fetch insights error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    return withAuth(async (req, res) => {
      const { title, slug, excerpt, content, coverImage, published } = req.body;

      if (!title || !slug || !content) {
        return res.status(400).json({ message: 'Title, slug, and content are required' });
      }

      try {
        const insight = await prisma.insight.create({
          data: {
            title,
            slug,
            excerpt,
            content,
            coverImage,
            published: published || false,
            authorId: req.user.id
          }
        });
        return res.status(201).json(insight);
      } catch (error) {
        if (error.code === 'P2002') {
          return res.status(400).json({ message: 'Slug already exists' });
        }
        console.error('Create insight error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }, ['SUPERADMIN', 'ADMIN', 'MODERATOR'])(req, res);
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default allowCors(handler);
