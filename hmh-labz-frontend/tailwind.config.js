/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#F4F1EA",
          orange: "#C2410C",
          dark: "#161513",
        },
        primary: "#C2410C", // Legacy support if needed
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
      }
    },
  },
  plugins: [],
}
