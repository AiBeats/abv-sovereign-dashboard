/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sovereign: {
          bg: '#0a0e1a',
          surface: '#111827',
          card: '#151c2c',
          border: '#1e293b',
          'border-light': '#2d3a4f',
          text: '#e2e8f0',
          'text-muted': '#64748b',
          green: '#00ff88',
          orange: '#ff6b35',
          red: '#ef4444',
          yellow: '#eab308',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
