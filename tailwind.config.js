/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: false,
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  fontFamily: {
    body: ['Roboto'],
  },
  theme: {
    extend: {
      colors: {
        'btn-color': '#60b29c',
        'btn-hover-color': '#51c699',
        'btn-waiting-color': '#579180',
        'waiting-font-color': '#98BEB1',
        'warning-color': '#ec3dcc',
        'selected-color': '#007d48',
        'selected-box-color': '#e5f8ff',
      },
    },
  },
  plugins: [],
};
