/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss"),
    require("precss"),
    require("autoprefixer"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

// theme: {
//   extend: {
//     height: {
//       'almost-screen': 'calc(-16rem + 100vh)',
//       '308px': '19.25rem',
//     },
//     width: {
//       '308px': '19.25rem',
//       '600px': '37.5rem',
//     },
//   },
// },
