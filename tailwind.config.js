/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ckb: {
          primary: '#006C4E',
          'primary-hover': '#00553d',
          'primary-light': '#e6f2ee',
          accent: '#EFB034',
          'accent-light': '#fdf6e7',
          dark: '#1D2128',
          muted: '#6C757D',
          light: '#F8F9FA',
          border: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'modal': '0 10px 30px -5px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
