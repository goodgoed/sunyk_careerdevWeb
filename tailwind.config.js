/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      darkcyan: 'rgb(var(--color-darkcyan)',
      lightsteelblue: 'rgb(var(--color-lightsteelblue)',
      oldrose: 'rgb(var(--color-oldrose)',
      emerald: '#10b981',
      violet: '#8b5cf6',
    },
  },
  plugins: [],
};
