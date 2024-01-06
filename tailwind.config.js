export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'myFont': ['Rethink'],
        // 'poppins': ['Poppins']
      },
      colors: {
        'primary': '#52D3D8',
        'secondary': '#3887BE',
        'accent': '#38419D',
        'options': '#200E3A'
      },
    },
  },
  plugins: [],
}

