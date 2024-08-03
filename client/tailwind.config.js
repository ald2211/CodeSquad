/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs-custom': '0.625rem', // 10px
        
      },
      width:{
        '95':'95%'
      },
      width: {
        '22p': '22%',
        '15p': '15%',
      },
      
    },
  },
  plugins: [require('tailwind-scrollbar')],
}