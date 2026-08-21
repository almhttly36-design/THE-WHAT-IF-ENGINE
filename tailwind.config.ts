import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#04060A',
          surface: '#090D16',
          panel: '#0E1524',
          border: '#1E293B',
          glow: '#06B6D4',
          emerald: '#10B981',
          accent: '#38BDF8',
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(circle at 50% 30%, rgba(6, 182, 212, 0.12) 0%, rgba(4, 6, 10, 0.98) 75%)',
      },
      backgroundSize: {
        grid: '32px 32px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        scan: 'scan 2.4s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(100%)', opacity: '1' },
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 35px -5px rgba(6, 182, 212, 0.3)',
        'cyan-glow-lg': '0 0 60px -10px rgba(6, 182, 212, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
