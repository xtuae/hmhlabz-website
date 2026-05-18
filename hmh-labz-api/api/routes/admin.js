import express from 'express';
import prisma from '../lib/prisma.js';
import { requireRole, hashPassword, comparePassword } from '../lib/auth.js';

const router = express.Router();

// Get all leads
router.get('/leads', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Get all users
router.get('/users', requireRole(['SUPERADMIN', 'ADMIN']), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create User
router.post('/users', requireRole(['SUPERADMIN']), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: role || 'ADMIN',
        status: 'ACTIVE'
      },
      select: { id: true, name: true, email: true, role: true, status: true, createdAt: true }
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update User (Edit/Suspend)
router.put('/users/:id', requireRole(['SUPERADMIN']), async (req, res) => {
  try {
    const { name, email, role, status, password } = req.body;
    const updateData = { name, email, role, status };
    if (password) {
      updateData.password = await hashPassword(password);
    }
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: updateData,
      select: { id: true, name: true, email: true, role: true, status: true, createdAt: true }
    });
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete User
router.delete('/users/:id', requireRole(['SUPERADMIN']), async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Update Profile
router.put('/settings/profile', requireRole(), async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, email }
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Update Security/Password
router.put('/settings/security', requireRole(), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Verify current password
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user || !(await comparePassword(currentPassword, user.password))) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    // Hash and update new password
    const hashed = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashed }
    });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

// Update Brand Assets
router.put('/settings/brand', requireRole(), async (req, res) => {
  try {
    const { logoUrl, faviconUrl } = req.body;
    const updatedBrand = await prisma.siteSettings.upsert({
      where: { id: 'global' },
      update: { logoUrl, faviconUrl },
      create: { id: 'global', logoUrl, faviconUrl }
    });
    res.json(updatedBrand);
  } catch (error) {
    console.error('Error updating brand assets:', error);
    res.status(500).json({ error: 'Failed to update brand assets' });
  }
});

export default router;
