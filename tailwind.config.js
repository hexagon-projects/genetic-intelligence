export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'myFont': ['Rethink'],
        'poppins': ['Poppins']
      },
      colors: {
        'primary': '#4361ee',
        'secondary': '#91e3c5',
        'success': '#00ab55',
        'info': '#2196f3',
        'warning': '#e2a03f',
        'danger': '#e7515a',
        'light': '#f7fcfc',
        'dark': '#3b3f5c',
        'accent': '#38419D',
        'options': '#200E3A'
      },
    },
  },
  plugins: [],
}

