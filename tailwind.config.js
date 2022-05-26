const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/components/**/*.{js,jsx,ts,tsx}',
      './public/index.html',
    ]
  },
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
  plugins: [
    require('daisyui'),
  ],
}