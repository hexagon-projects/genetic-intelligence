export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      fontFamily: {
        'myFont': ['Rethink'],
        'poppins': ['Poppins'],
        'sora': ['Sora'],
        'roboto': ['Roboto']
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
        'options': '#200E3A',
        'biru': '#0b40f4'
      },
      backgroundImage: (theme) => ({
        'gradient-primary': 'linear-gradient(162deg, rgba(11,64,244,1) 26%, rgba(2,178,255,1) 82%)',
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

