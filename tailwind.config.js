/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        300: ['light'],
        400: ['regular'],
        500: ['medium'],
        700: ['bold'],
        'mono-regular': ['mono-regular'],
        'urbanist-light': ['urbanist-light'],
        'urbanist-regular': ['urbanist-regular'],
      },
    },
  },
  plugins: [],
}
