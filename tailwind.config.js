/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ui: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        accent: '#D4FF00',
        surface: 'rgba(255,255,255,0.035)',
        dim: 'rgba(255,255,255,0.35)',
      },
    },
  },
  plugins: [],
};
