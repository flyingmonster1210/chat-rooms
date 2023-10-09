/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        "josefin-sans": ['Josefin Sans', 'sans-serif']
      },
      colors: {
        lightBlue: '#3333ff',
        darkPurple: '#333399',
        darkerBlue: '#131339',
        darkBlue: '#19194d',
        veryDarkBlue: '#00001a',
        lightPurple: '#ccccff',
        hoverShadow: '#3B3B3B',
      },
    },
  },
  plugins: [],
}

