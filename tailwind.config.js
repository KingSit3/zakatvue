const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'trueGray': colors.trueGray,
        'emerald': colors.emerald,
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
