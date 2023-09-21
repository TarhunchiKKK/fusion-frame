/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html'],
  theme: {
    extend: {
      colors:{
        mainColor:'#959CBA'
      },
      padding:{
        big: '50px'
      },
      screens:{
        sm: "480px",
        md: "768px",
        lg: "1028px",
        xl: "1440px"
      }
    },
  },
  plugins: [],
}

