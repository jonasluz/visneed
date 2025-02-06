/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          green: {
            100: '#2F3E46',
            200: '#354F52'
          }
        }
      }
    },
  },
  plugins: [],
}

