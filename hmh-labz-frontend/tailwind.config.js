/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: '#F4F1EA',
        cream: '#EDE6D3',
        ink: '#161513',
        terra: '#C2410C',
        'terra-deep': '#9A330A',
        brand: {
          paper: "#f5f2e8",
          terra: "#c84b21",
          ink: "#1a1a1a",
          tan: "#e8e1d4",
        }
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
