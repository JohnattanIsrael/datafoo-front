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
        "p-eye": "url('../src/assets/eye.svg')",
        "p-vw": "url('../src/assets/vw.png')",
        "p-audi": "url('../src/assets/audi.png')",
        "p-hyundai": "url('../src/assets/hyundai.png')",
        "p-program-3": "url('../src/assets/program-3.svg')",
        "p-program-4": "url('../src/assets/program-4.svg')",
        "p-program-5": "url('../src/assets/program-5.svg')",
        "p-program-6": "url('../src/assets/program-6.svg')",
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

