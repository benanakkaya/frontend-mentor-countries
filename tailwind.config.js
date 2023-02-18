/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        nunito : ['Nunito Sans', 'sans-serif']
      },
      colors: {
        darkElement: "hsl(209, 23%, 22%)",
        darkBG : "hsl(207, 26%, 17%)",
        lightText: "hsl(200, 15%, 8%)",
        lightInput: "hsl(0, 0%, 52%)",
        lightBG : "hsl(0, 0%, 98%)",
        darkText: "hsl(0, 0%, 100%)",
        lightElement: "#e4e7ed"
      },
      container:{
        center: true
      }
    },
  },
  plugins: [],
}

