/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx,mdx}',
    './src/components/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#5A1827',
          light: '#7A2236',
          dark: '#3A0D18',
          darkest: '#1A0A0F',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#E8C782',
          dark: '#9B7A38',
        },
        alabaster: '#FAFAFA',
        pearl: '#F3F1ED',
        sand: '#E6E0D4',
        charcoal: '#2D2825',
        muted: '#7A726A',
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Cinzel', 'serif'],
        body: ['var(--font-lora)', 'Lora', 'serif'],
      },
      boxShadow: {
        divine: '0 10px 40px rgba(90, 24, 39, 0.08)',
        'divine-hover': '0 15px 50px rgba(197, 160, 89, 0.18)',
      },
      borderRadius: {
        'curve-tl': '0 60px 0 60px',
        'curve-tr': '60px 0 60px 0',
      },
    },
  },
  plugins: [],
};
