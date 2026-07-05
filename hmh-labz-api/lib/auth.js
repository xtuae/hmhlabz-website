import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Express middleware to enforce authentication and roles
 * @param {Array} roles - Allowed roles for this endpoint
 */
export const requireRole = (roles = []) => async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  // Use the centralized prisma instance
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
  }

  req.user = user;
  next();
};
