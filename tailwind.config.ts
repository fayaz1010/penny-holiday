import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: { 950: '#2a3a2f', 900: '#3d5245', 800: '#5a6f5a', 700: '#6d8570' },
        terra: { 500: '#c9764f', 400: '#d4906b', 300: '#e0a881' },
        cream: '#faf7f2',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 8px 28px rgba(93, 111, 90, 0.12)',
        terra: '0 4px 16px rgba(201, 118, 79, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;

