import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Tailored for standard shared hosting
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Adjust if running local backend
        changeOrigin: true,
      },
    },
  },
})
