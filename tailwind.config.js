/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#2F3E46'
        }
      }
    },
  },
  plugins: [],
}

