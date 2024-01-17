/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: '#D1AE45',
        purple: '#171635',
        orange: '#D75725'
      }
    }
  },
  plugins: []
}
