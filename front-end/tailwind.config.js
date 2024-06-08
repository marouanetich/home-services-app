/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f15a26'
        }
      },
      gridTemplateColumns: {
        autoFit: 'repeat(auto-fit, minmax(300px, 1fr))'
      }
    },
  },
  plugins: [],
}
