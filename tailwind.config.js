const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: colors.orange
      },
      sepia: {
        0: '0',
        25: '.25',
        75: '.75',
      }
    },
  },
  plugins: [],
}