import type { Config } from 'tailwindcss';

/**
 * HOBI Partner Seminar 2026 design tokens.
 * Palette philosophy: warm off-white canvas, near-black ink, and a single
 * restrained cobalt accent used sparingly. No gradients-by-default, no glass.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FBFBF9', // warm off-white page background
        surface: '#FFFFFF', // cards / raised surfaces
        ink: {
          DEFAULT: '#0B0B0C', // near-black primary text
          800: '#1A1A1D',
          700: '#2A2A2E',
          500: '#55555C',
          400: '#7A7A82',
          300: '#A6A6AD',
        },
        line: '#E7E6E1', // hairline borders on warm canvas
        accent: {
          DEFAULT: '#1F3AE0', // restrained cobalt
          600: '#1A31BD',
          50: '#EEF1FE',
        },
        success: '#127A4E',
        danger: '#B42318',
        warning: '#B5620A',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Fraunces',
          'ui-serif',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'serif',
        ],
      },
      fontSize: {
        // Fluid display sizes tuned for a premium editorial hero
        'display-lg': ['clamp(2.75rem, 6vw, 5.25rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 4.2vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.6rem, 3vw, 2.35rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        container: '76rem',
      },
      borderRadius: {
        card: '0.625rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,11,12,0.04), 0 8px 24px -12px rgba(11,11,12,0.10)',
        pop: '0 12px 40px -12px rgba(11,11,12,0.22)',
        focus: '0 0 0 3px rgba(31,58,224,0.18)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
} satisfies Config;
