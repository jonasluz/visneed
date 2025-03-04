/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik-Regular', 'sans-serif'],
        "rubik-bold": ['Rubik-Bold', 'sans-serif'],
        "rubik-extrabold": ['Rubik-ExtraBold', 'sans-serif'],
        "rubik-medium": ['Rubik-Medium', 'sans-serif'],
        "rubik-semibold": ['Rubik-SemiBold', 'sans-serif'],
        "rubik-light": ['Rubik-Light', 'sans-serif'],
      },
      colors: {
        background: {
          white: {
            100: '#FEFEFA'
          },
          black: {
            100: '#1E1E1E',
          },
          green: {
            100: '#2F3E46',
            200: '#354F52',
            300: '#CAD2C5',
            400: '#84A98C',
            500: '#52796F',
          }
        }
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

