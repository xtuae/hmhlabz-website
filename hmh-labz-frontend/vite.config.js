import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Polyfill require for ESM compatibility of third-party plugins
globalThis.require = createRequire(import.meta.url);

// Dynamically import to ensure polyfill is initialized first
const vitePrerender = (await import('vite-plugin-prerender')).default;
const PuppeteerRenderer = vitePrerender.PuppeteerRenderer;

async function getInsightRoutes() {
  try {
    const res = await fetch('https://api.hmhlabz.com/api/insights');
    const posts = await res.json();
    return posts.map(post => `/insights/${post.slug}`);
  } catch (err) {
    console.warn('Could not fetch insight slugs for prerendering — falling back to static routes only.', err);
    return [];
  }
}

// https://vite.dev/config/
export default defineConfig(async () => {
  const insightRoutes = await getInsightRoutes();

  return {
    plugins: [
      react(),
      vitePrerender({
        staticDir: path.join(__dirname, 'dist'),
        routes: [
          '/', '/about', '/insights', '/contact',
          '/services', '/services/audit', '/services/sprint', '/services/transform',
          ...insightRoutes
        ],
        renderer: new PuppeteerRenderer({
          headless: true,
          renderAfterTime: 8000, // Wait 8s for React to mount and fetch live API data
          executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
        })
      })
    ],
    base: '/',
  };
});
