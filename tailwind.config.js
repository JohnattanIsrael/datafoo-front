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
        "p-vw": "url('../src/assets/vw.jpeg')",
        "p-audi": "url('../src/assets/audi.jpg')",
        "p-hyundai": "url('../src/assets/hyundai.jpg')",
        "p-program-3": "url('../src/assets/program-3.svg')",
        "p-program-4": "url('../src/assets/program-4.svg')",
        "p-program-5": "url('../src/assets/program-5.svg')",
        "p-program-6": "url('../src/assets/program-6.svg')",
        "p-xola": "url('../src/assets/xola.jpeg')",
        "pimarc": "url('../src/assets/pimarc_2.jpeg')",
        "pimarc3": "url('../src/assets/pimarc3.jpg')",
        "pimarc4": "url('../src/assets/pimarc4.jpeg')",
        "pimarcA": "url('../src/assets/pimarcA.jpeg')",
        "pimarcB": "url('../src/assets/pimarcB.jpeg')",
        "pimarcC": "url('../src/assets/pimarcC.jpeg')",
        "taller1": "url('../src/assets/taller1.jpg')",
        "taller2": "url('../src/assets/taller2.jpeg')", 
        "taller3": "url('../src/assets/taller3.jpg')", 
        "taller4": "url('../src/assets/taller4.jpg')",  
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

