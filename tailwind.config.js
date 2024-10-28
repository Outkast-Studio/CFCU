/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lavendar: '#AB40FF',
        purple: '#3C1053',
        orange: '#F56600',
        yellow: '#FFC600',
        green: '#008566',
        neutralBlack: '#575656',
        neutralLightGrey: '#EDEDED',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      fontFamily: {
        regular: ['Aeonik-Regular', 'sans-serif'],
        thin: ['Aeonik-Thin', 'sans-serif'],
      },
      spacing: {
        gutter: 'var(--gutter)',
        columnGap: 'var(--columnGap)',
      },
      lineHeight: {
        tight: 1.2,
      },

      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
