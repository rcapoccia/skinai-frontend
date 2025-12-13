/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D1A78C',
        secondary: '#E8D9C5',
        tertiary: '#B78A72',
        dark: '#886349',
        light: '#FAF3EB',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}
