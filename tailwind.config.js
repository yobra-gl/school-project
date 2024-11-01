/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1E3A8A',      // Deep Blue
        'custom-orange': '#F97316',    // Bright Orange
        'custom-gray': '#F3F4F6',      // Light Gray for background
        'custom-dark-gray': '#374151', // Dark Gray for text
        'custom-light-blue': '#3B82F6' // Light Blue for accents
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
