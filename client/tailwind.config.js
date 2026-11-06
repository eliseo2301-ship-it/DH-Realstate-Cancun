/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bronze: {
          50: '#FAF6F2',
          100: '#F5ECE2',
          200: '#E8D5C4',
          300: '#D8B89E',
          400: '#C59268',
          500: '#B57E52',
          600: '#8D6346',
          700: '#6B472F',
          800: '#4D311F',
          900: '#311D12',
        },
        caribbean: {
          50: '#F0FBFC',
          100: '#D6F4F8',
          200: '#ADE9F2',
          300: '#67D4E7',
          400: '#00B4D8',
          500: '#0096C7',
          600: '#0077B6',
          700: '#023E8A',
          800: '#03045E',
          900: '#0A192F',
        },
        sand: {
          50: '#FAF7F2',
          100: '#F4EFE6',
          200: '#E9E0D3',
          300: '#D8CAB8',
          400: '#C3B19A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(10, 25, 47, 0.08), 0 0 1px 1px rgba(197, 146, 104, 0.2)',
        'luxury-hover': '0 25px 50px -12px rgba(10, 25, 47, 0.16), 0 0 1px 1px rgba(197, 146, 104, 0.4)',
        'medallion': '0 10px 30px rgba(141, 99, 70, 0.35)',
      }
    },
  },
  plugins: [],
}
