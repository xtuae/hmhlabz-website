import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import leadsRoutes from './routes/leads.js';

const app = express();

// --- Middleware ---
const allowedOrigins = [
  'https://hmhlabz.com',
  'https://demo.hmhlabz.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// --- Root Route (Terminal UI) ---
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
          <div class="line">HMH LABZ API SYSTEM <span class="highlight">v2.0.0</span></div>
          <div class="line">STATUS: <span class="highlight">ONLINE</span></div>
          <div class="line">MODE: <span class="highlight text-blue-400">DECOUPLED HEADLESS</span></div>
          <div class="line">&nbsp;</div>
          <div class="line">ACCESS: <span style="color: #ff3333">RESTRICTED - DIRECT ACCESS DENIED</span></div>
          <div class="line">ROUTING ENABLED...<span class="cursor"></span></div>
        </div>
      </body>
    </html>
  `);
});

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api', contentRoutes);
app.use('/api/leads', leadsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

export default app;
