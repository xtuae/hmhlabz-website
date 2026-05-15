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
    <!DOCTYPE html>
    <html>
    <head>
      <title>HMH Labz API | Status</title>
      <style>
        body { background: #0a0a0a; color: #00ff00; font-family: 'Courier New', monospace; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .terminal { border: 1px solid #00ff00; box-shadow: 0 0 15px rgba(0, 255, 0, 0.2); padding: 2rem; border-radius: 8px; width: 100%; max-width: 600px; line-height: 1.6; }
        .blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .line { overflow: hidden; white-space: nowrap; border-right: 2px solid transparent; }
      </style>
    </head>
    <body>
      <div class="terminal">
        <div class="line">> SYSTEM: HMH Labz Core API</div>
        <div class="line">> STATUS: ONLINE & SECURE</div>
        <div class="line">> DATABASE: CONNECTED (PostgreSQL)</div>
        <div class="line">> ENVIRONMENT: PRODUCTION</div>
        <br/>
        <div class="line">> Awaiting commands... <span class="blink">_</span></div>
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
