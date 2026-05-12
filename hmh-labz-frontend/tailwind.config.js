/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          paper: "#f5f2e8",
          terra: "#c84b21",
          ink: "#1a1a1a",
          tan: "#e8e1d4",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
