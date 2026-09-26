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
        // LexiClear Design System — Slate/Indigo SaaS Theme
        slate: {
          950: '#020617',
        },
        brand: {
          bg:        '#0F172A', // Deep Charcoal Slate — primary background
          surface:   '#1E293B', // Clean surface card background
          border:    '#334155', // Slate-700 border
          borderMid: '#475569', // Slightly lighter border
          indigo:    '#6366F1', // Royal Indigo accent
          indigoHov: '#4F46E5', // Indigo hover
          emerald:   '#10B981', // Emerald accent
          emeraldHov:'#059669', // Emerald hover
        },
        risk: {
          highBg:    'rgba(239,68,68,0.10)',   // #EF4444 10% opacity
          highBorder:'rgba(239,68,68,0.25)',
          highText:  '#F87171',                // rose-400
          highSolid: '#EF4444',
          midBg:     'rgba(245,158,11,0.10)',  // #F59E0B 10% opacity
          midBorder: 'rgba(245,158,11,0.25)',
          midText:   '#FCD34D',                // amber-300
          midSolid:  '#F59E0B',
          safeBg:    'rgba(16,185,129,0.10)',  // #10B981 10% opacity
          safeBorder:'rgba(16,185,129,0.25)',
          safeText:  '#6EE7B7',                // emerald-300
          safeSolid: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'card':       '0 1px 3px 0 rgba(0,0,0,0.3), 0 1px 2px -1px rgba(0,0,0,0.3)',
        'card-md':    '0 4px 20px -2px rgba(0,0,0,0.4)',
        'indigo-glow':'0 0 20px -4px rgba(99,102,241,0.35)',
        'emerald-glow':'0 0 20px -4px rgba(16,185,129,0.30)',
        'risk-high':  '0 0 16px -4px rgba(239,68,68,0.30)',
      },
      animation: {
        'fade-in':    'fadeIn 0.15s ease-out',
        'slide-up':   'slideUp 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '.6' } },
      },
    },
  },
  plugins: [],
}
