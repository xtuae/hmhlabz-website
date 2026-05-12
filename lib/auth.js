import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
 * Middleware wrapper to enforce authentication and roles
 * @param {Function} handler - The Vercel API handler
 * @param {Array} roles - Allowed roles for this endpoint
 */
export const withAuth = (handler, roles = []) => async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  // Get user from DB to verify role
  const user = await global.prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  // If roles are specified, check if user has permission
  if (roles.length > 0 && !roles.includes(user.role)) {
    return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
  }

  // Attach user to request for use in handler
  req.user = user;

  return handler(req, res);
};
