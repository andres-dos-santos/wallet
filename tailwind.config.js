/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        'inter-light': ['inter-light'],
        'inter-regular': ['inter-regular'],
        'inter-medium': ['inter-medium'],
        'inter-bold': ['inter-bold'],

        'urbanist-light': ['urbanist-light'],
        'urbanist-regular': ['urbanist-regular'],
        'urbanist-medium': ['urbanist-medium'],
        'urbanist-semibold': ['urbanist-semibold'],
        'urbanist-bold': ['urbanist-bold'],
        'urbanist-extrabold': ['urbanist-extrabold'],
        'urbanist-black': ['urbanist-black'],
      },
    },
  },
  plugins: [],
}
