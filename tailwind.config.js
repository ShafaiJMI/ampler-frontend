// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      nunito: ['"Nunito"', 'serif'],
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
],
}
