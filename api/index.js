import express from 'express';
import cors from 'cors';
import prisma from '../lib/db';
import { hashPassword, comparePassword, generateToken, requireRole } from '../lib/auth';

const app = express();

app.use(cors());
app.use(express.json());

// --- Auth Routes ---

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: 'USER' }
    });

    const token = generateToken(user.id);
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user.id);
    res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// --- Insights Routes ---

app.get('/api/insights', async (req, res) => {
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

app.get('/api/insights/:id', async (req, res) => {
  try {
    const insight = await prisma.insight.findUnique({
      where: { id: req.params.id },
      include: { author: { select: { name: true } } }
    });
    if (!insight) return res.status(404).json({ message: 'Not found' });
    res.json(insight);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insight' });
  }
});

app.post('/api/insights', requireRole(['SUPERADMIN', 'ADMIN', 'MODERATOR']), async (req, res) => {
  const { title, slug, excerpt, content, coverImage, published } = req.body;
  try {
    const insight = await prisma.insight.create({
      data: { title, slug, excerpt, content, coverImage, published, authorId: req.user.id }
    });
    res.status(201).json(insight);
  } catch (error) {
    res.status(500).json({ message: 'Error creating insight' });
  }
});

app.put('/api/insights/:id', requireRole(['SUPERADMIN', 'ADMIN', 'MODERATOR']), async (req, res) => {
  try {
    const insight = await prisma.insight.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(insight);
  } catch (error) {
    res.status(500).json({ message: 'Error updating insight' });
  }
});

app.delete('/api/insights/:id', requireRole(['SUPERADMIN', 'ADMIN']), async (req, res) => {
  try {
    await prisma.insight.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting insight' });
  }
});

export default app;
