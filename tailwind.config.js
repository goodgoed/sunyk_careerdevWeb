/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkcyan: '#067CBD',
        lightsteelblue: '#CCDBE3',
        oldrose: '#894D69',
        emerald: '#10b981',
        violet: '#8b5cf6',
      },
    },
  },
  plugins: [],
};
