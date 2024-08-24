/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E34A32', // Orange
        secondary: '#141618', // Black
        tertiary: '#FFFFFF', // White
        secondary2: '#3E444A', // Dark Gray
        sec_accent: '#BAC1B8', // Light Gray
        tertiary2: '#E5EEE2', // Lighter Gray
        primary_acc: '#FFF8F2', // Orange Lite
        search: '#F1F1F1D6', // Search-bar Gray #f1f1f1d6
        tertiary_acc: '#FBFBFB', // White light
      },
      fontFamily: {
        'sans': ['Rubik', 'sans-serif']
      },
    },
  },
  plugins: [],
}
