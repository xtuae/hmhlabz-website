process.on('uncaughtException', (err) => {
  console.error('CRITICAL UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION at:', promise, 'reason:', reason);
});

console.log("API Booting: Checking environment...");

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// --- Root Route (Terminal UI) ---
// This route is purely static and DOES NOT import any database or complex SDKs.
// This ensures it works even if the Prisma client or other modules fail to load.
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>HMH LABZ API SYSTEM</title>
        <style>
          body { background: #000; color: #00ff00; font-family: 'Courier New', monospace; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .terminal { border: 1px solid #00ff00; padding: 3rem; box-shadow: 0 0 20px rgba(0, 255, 0, 0.2); max-width: 90%; }
          .cursor { display: inline-block; width: 12px; height: 1.2em; background: #00ff00; margin-left: 5px; animation: blink 1s infinite; vertical-align: middle; }
          .line { margin-bottom: 0.5rem; }
          .highlight { color: #fff; font-weight: bold; }
          @keyframes blink { 50% { opacity: 0; } }
        </style>
      </head>
      <body>
        <div class="terminal">
          <div class="line">HMH LABZ API SYSTEM <span class="highlight">v1.0.0</span></div>
          <div class="line">STATUS: <span class="highlight text-green-400">ONLINE</span></div>
          <div class="line">&nbsp;</div>
          <div class="line">ACCESS: <span style="color: #ff3333">RESTRICTED - DIRECT ACCESS DENIED</span></div>
          <div class="line">WAITING FOR AUTHENTICATED REQUESTS...<span class="cursor"></span></div>
        </div>
      </body>
    </html>
  `);
});

// --- Dynamic API Routes ---
// We use dynamic imports to ensure the API can boot and serve the root page 
// even if complex dependencies (like Prisma or SDKs) have issues.

app.post('/api/upload', async (req, res) => {
  try {
    const { requireRole } = await import('../lib/auth.js');
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

app.post('/api/auth/register', async (req, res) => {
  try {
    const { getPrisma } = await import('../lib/db.js');
    const { hashPassword, generateToken } = await import('../lib/auth.js');
    const { sendWelcomeEmail } = await import('../lib/brevo.js');
    const { syncUserToHubSpot } = await import('../lib/hubspot.js');

    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const prisma = getPrisma();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: 'USER' }
    });

    sendWelcomeEmail(email, name || "User");
    syncUserToHubSpot(email, name || "User");

    const token = generateToken(user.id);
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { getPrisma } = await import('../lib/db.js');
    const { comparePassword, generateToken } = await import('../lib/auth.js');

    const { email, password } = req.body;
    const prisma = getPrisma();
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

app.get('/api/insights', async (req, res) => {
  try {
    const { getPrisma } = await import('../lib/db.js');
    const prisma = getPrisma();
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

app.get('/api/insights/:slugOrId', async (req, res) => {
  try {
    const { getPrisma } = await import('../lib/db.js');
    const prisma = getPrisma();
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
    console.error('Fetch Insight Error:', error);
    res.status(500).json({ message: 'Error fetching insight' });
  }
});

// ... Other routes would also use dynamic imports for lib/db.js and lib/auth.js ...

export default app;
