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

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/about', '/insights', '/contact', '/services'],
      renderer: new PuppeteerRenderer({
        headless: true,
        renderAfterTime: 3000, // Wait 3s for React to mount and fetch live API data
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })
    })
  ],
  base: '/',
});
