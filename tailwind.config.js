/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          black: {
            100: '#1E1E1E',
          },
          green: {
            100: '#2F3E46',
            200: '#354F52',
            300: '#CAD2C5'
          }
        }
      }
    },
  },
  plugins: [],
}

