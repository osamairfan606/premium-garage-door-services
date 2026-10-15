/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' }, screens: { '2xl': '1320px' } },
    extend: {
      colors: {
        ink: { DEFAULT: '#0E0F11', 900: '#0E0F11', 800: '#15171A', 700: '#1C1F23', 600: '#272A2F', 500: '#3A3E44' },
        gold: { DEFAULT: '#C9A45C', 50: '#FBF6EC', 100: '#F3E7CC', 200: '#E6CF9A', 300: '#D9B976', 400: '#C9A45C', 500: '#B08A45', 600: '#8E6E35', 700: '#6B5228' },
        stone: { 50: '#FAF8F5', 100: '#F4F1EC', 200: '#E8E3DB', 300: '#D6CFC4', 400: '#A9A196', 500: '#7D766C', 600: '#5B5650' },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['Sora', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'Cambria', 'serif'],
      },
      letterSpacing: { eyebrow: '0.22em' },
      boxShadow: {
        card: '0 1px 2px rgba(14,15,17,.04), 0 8px 24px -12px rgba(14,15,17,.12)',
        lift: '0 2px 4px rgba(14,15,17,.05), 0 24px 48px -20px rgba(14,15,17,.28)',
        gold: '0 10px 30px -10px rgba(201,164,92,.55)',
      },
      keyframes: {
        'loader-out': { '0%,70%': { opacity: '1', visibility: 'visible' }, '100%': { opacity: '0', visibility: 'hidden' } },
        'loader-draw': { '0%': { transform: 'scaleX(0)' }, '100%': { transform: 'scaleX(1)' } },
        'loader-mark': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'none' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'pulse-ring': { '0%': { transform: 'scale(1)', opacity: '.55' }, '100%': { transform: 'scale(1.7)', opacity: '0' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        'loader-out': 'loader-out 1.15s ease-in-out forwards',
        'loader-draw': 'loader-draw .8s cubic-bezier(.65,0,.35,1) .1s both',
        'loader-mark': 'loader-mark .5s ease-out both',
        marquee: 'marquee 40s linear infinite',
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(.2,.6,.3,1) infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};
