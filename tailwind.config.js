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
  daisyui: {
    themes: [
      {
        mytheme: {
          // "primary": "#FEF08A",
          "primary": "#AF69EF",
          "secondary": "#D926A9",
          "accent": "#FDA4AF",
          "neutral": "#191D24",
          "base-100": "#2A303C",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        }
      },
      "halloween"
    ]
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    require("tailwindcss-animate"),
  ],
}