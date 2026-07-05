import express from 'express';
import { requireRole } from '../lib/auth.js';
import { put } from '@vercel/blob';

const router = express.Router();

router.post('/', requireRole(['SUPERADMIN', 'ADMIN', 'MODERATOR']), async (req, res) => {
  try {
    const { filename, contentType } = req.query;
    if (!filename) {
      return res.status(400).json({ message: 'Filename is required' });
    }
    const blob = await put(filename, req, { access: 'public', contentType });
    return res.status(200).json({ url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

export default router;
