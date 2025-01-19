import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "p-eye": "url('/assets/eye.svg')",
        "p-vw": "url('/assets/vw.png')",
        "p-audi": "url('/assets/audi.png')",
        "p-hyundai": "url('/assets/hyundai.png')",
        "p-program-3": "url('/assets/program-3.svg')",
        "p-program-4": "url('/assets/program-4.svg')",
        "p-program-5": "url('/assets/program-5.svg')",
        "p-program-6": "url('/assets/program-6.svg')",
      },
      fontFamily: {
        inter: ['var(--font-inter)', ...fontFamily.sans],
        arch: ['var(--font-archivo)', ...fontFamily.sans],
      },
      colors: {
        'p-yellow': '#F9CA00',
        'p-dark': '#183140',
      },
    },
  },
  plugins: [],
}

