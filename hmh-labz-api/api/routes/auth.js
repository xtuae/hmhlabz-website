import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { hashPassword, generateToken } = await import('../../lib/auth.js');
    const { sendWelcomeEmail } = await import('../../lib/brevo.js');
    const { syncUserToHubSpot } = await import('../../lib/hubspot.js');

    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: 'USER' }
    });

    try {
      await sendWelcomeEmail(email, name || "User");
      await syncUserToHubSpot(email, name || "User");
    } catch (sdkError) {
      console.error('SDK Sync Warning:', sdkError);
    }

    const token = generateToken(user.id);
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { comparePassword, generateToken } = await import('../../lib/auth.js');

    const { email, password } = req.body;
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

export default router;
