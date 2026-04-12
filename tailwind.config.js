/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* Brand — PRD palette (legacy ski-* kept for compatibility) */
        'ski-black': '#1d1d1d',
        'ski-accent': '#f56702',
        'ski-gray': '#f5f5f4',
        zen: {
          beige: '#f5f2ef',
          muted: '#737373',
          line: '#e7e5e4',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(29, 29, 29, 0.04), 0 8px 24px rgba(29, 29, 29, 0.06)',
        'card-hover': '0 4px 12px rgba(29, 29, 29, 0.08), 0 16px 40px rgba(29, 29, 29, 0.08)',
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
