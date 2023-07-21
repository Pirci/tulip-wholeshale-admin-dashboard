/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('postcss-import'),
    require('postcss-nesting'), // make sure this comes before tailwind
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
