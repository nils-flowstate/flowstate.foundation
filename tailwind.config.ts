import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1A3C6E',
        ocean: '#2E6FBF',
        orange: '#F07020',
        fire: '#E03515',
        green: '#3DAA45',
        surface: '#F7F8FA',
        'hero-bg': '#0B1E38',
        text: '#111827',
        muted: '#6B7280',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
