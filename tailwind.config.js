/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Premium brand palette
        ink:      '#0F0F0E',
        brand:    '#E8650A',
        'off-white': '#FAFAF8',
        surface:  '#F3F1EE',
        'orange-tint': '#FEF0E7',
        muted:    '#6B6966',

        // Legacy aliases (keeps old references working)
        'ski-black':  '#0F0F0E',
        'ski-accent': '#E8650A',
        'ski-gray':   '#F3F1EE',
        'zen-muted':  '#6B6966',
        'zen-line':   '#E5E2DE',
      },
      boxShadow: {
        card:       '0 1px 3px rgba(15,15,14,0.05), 0 4px 12px rgba(15,15,14,0.06)',
        'card-hover': '0 4px 16px rgba(15,15,14,0.08), 0 16px 48px rgba(15,15,14,0.10)',
        glow:       '0 4px 20px rgba(232,101,10,0.40), 0 8px 40px rgba(232,101,10,0.25)',
        'glow-lg':  '0 8px 40px rgba(232,101,10,0.55), 0 16px 80px rgba(232,101,10,0.30)',
        pill:       '0 4px 24px rgba(15,15,14,0.12), 0 1px 4px rgba(15,15,14,0.08)',
        glass:      '0 1px 0 rgba(255,255,255,0.8) inset, 0 4px 24px rgba(15,15,14,0.06)',
      },
      animation: {
        marquee:       'marquee 40s linear infinite',
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
        'spin-slow':   'slow-spin 20s linear infinite',
        'spin-reverse':'slow-spin 30s linear infinite reverse',
        'gradient':    'gradient-flow 5s ease infinite',
        'badge-shimmer':'badge-shimmer 4s ease-in-out infinite',
        'cta-pulse':   'cta-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        marquee:     { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float:       { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        'slow-spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        'gradient-flow': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'badge-shimmer': {
          '0%':   { transform: 'translateX(-100%)' },
          '40%':  { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'cta-pulse': {
          '0%,100%': { opacity: '0', transform: 'scale(1)' },
          '40%':     { opacity: '0.2', transform: 'scale(1.04)' },
          '60%':     { opacity: '0', transform: 'scale(1.06)' },
        },
      },
    },
  },
  plugins: [],
};
