/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        court: {
          parchment: '#FBF9F5', // Light Mode Primary BG
          paper: '#FFFFFF',     // Floating White Paper Cards
          border: '#E7E5E4',    // Soft Stone Border
          text: '#1C1917',      // Deep Espresso Typography
          muted: '#78716C',     // Muted Text
          gold: '#D97706',      // Royal Amber Accent
          goldLight: '#F59E0B',
          bronze: '#92400E',
          objection: '#E11D48', // Red Objection
          objectionBg: '#FFF1F2',
          amberBg: '#FFFBEB',
          verdict: '#059669',   // Emerald Verdict
          verdictBg: '#ECFDF5',
          dark: '#0F0D0E',      // Dark Mode Fallback
          mahogany: '#1A1618',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        'clean': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(28, 25, 23, 0.05)',
        'glow-gold': '0 0 25px -4px rgba(217, 119, 6, 0.2)',
      }
    },
  },
  plugins: [],
}
