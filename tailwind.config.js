/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#34a4b8',
      },
      fontFamily: {
        header: ['"Russo One"', 'sans-serif'],
        body: ['"Roboto"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
