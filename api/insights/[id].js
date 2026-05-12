import prisma from '../../lib/db';
import { withAuth } from '../../lib/auth';
import { allowCors } from '../../lib/cors';

const handler = async (req, res) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const insight = await prisma.insight.findUnique({
        where: { id: String(id) },
        include: {
          author: {
            select: { name: true, email: true }
          }
        }
      });

      if (!insight) {
        return res.status(404).json({ message: 'Insight not found' });
      }

      return res.status(200).json(insight);
    } catch (error) {
      console.error('Fetch insight error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'PUT') {
    return withAuth(async (req, res) => {
      const { title, slug, excerpt, content, coverImage, published } = req.body;

      try {
        const insight = await prisma.insight.update({
          where: { id: String(id) },
          data: {
            title,
            slug,
            excerpt,
            content,
            coverImage,
            published
          }
        });
        return res.status(200).json(insight);
      } catch (error) {
        console.error('Update insight error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }, ['SUPERADMIN', 'ADMIN', 'MODERATOR'])(req, res);
  }

  if (req.method === 'DELETE') {
    return withAuth(async (req, res) => {
      try {
        await prisma.insight.delete({
          where: { id: String(id) }
        });
        return res.status(200).json({ message: 'Insight deleted successfully' });
      } catch (error) {
        console.error('Delete insight error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }, ['SUPERADMIN', 'ADMIN'])(req, res);
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default allowCors(handler);
