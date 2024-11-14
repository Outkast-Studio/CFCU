const plugin = require('tailwindcss/plugin')

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
        lavendar: '#3C1053',
        purple: '#3C1053',
        orange: '#F56600',
        yellow: '#FFC600',
        green: '#008566',
        divider: '#F2F2F2',
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
        'codec-pro': ['var(--font-codec-pro)', 'sans-serif'],
        'codec-bold': ['var(--font-codec-pro-bold)', 'sans-serif'],
        'codec-extra-bold': ['var(--font-codec-extra-bold)', 'sans-serif'],
        'codec-news': ['var(--font-codec-news)', 'sans-serif'],
        'codec-fat': ['var(--font-codec-fat)', 'sans-serif'],
        'codec-heavy': ['var(--font-codec-heavy)', 'sans-serif'],
        'codec-regular': ['var(--font-codec-regular)', 'sans-serif'],
        'codec-ultra': ['var(--font-codec-ultra)', 'sans-serif'],
        'codec-light': ['var(--font-codec-light)', 'sans-serif'],
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
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--font-codec-pro': 'CodecPro, sans-serif',
        },
      })
    },

    function ({ addUtilities, e, theme, variants }) {
      const weights = {
        100: 'Thin',
        200: 'ExtraLight',
        300: 'Light',
        400: 'Regular',
        500: 'Medium',
        600: 'SemiBold',
        700: 'Bolded',
        800: 'ExtraBold',
        900: 'Black',
      }
      const utilities = Object.entries(weights).map(([weight, name]) => ({
        [`.${e(`font-${name.toLowerCase()}`)}`]: {
          fontVariationSettings: `"wght" ${weight}`,
        },
      }))
      addUtilities(utilities, variants('fontWeight'))
    },
    plugin(function ({ addUtilities, theme, e }) {
      const newUtilities = {
        '.w-paragraph': {
          'font-family': 'var(--font-codec-news)',
          'font-size': '16px',
          'line-height': '24px',
        },
        '.subtitle': {
          'font-family': 'var(--font-codec-pro-bold)',
          'font-size': '18px',
          'line-height': '28px',
          'letter-spacing': '-0.32px',
        },
        '.title-s': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '28px',
          'line-height': '34px',
          'letter-spacing': '-0.32px',
        },
        '.title-m': {
          'font-family': 'var(--font-codec-heavy)',
          'font-size': '32px',
          'line-height': '38px',
          'letter-spacing': '-0.32px',
        },
        '.title-l': {
          'font-family': 'var(--font-codec-ultra)',
          'font-size': '40px',
          'line-height': '44px',
          'letter-spacing': '-0.32px',
        },
        '.title-xl': {
          'font-family': 'var(--font-codec-ultra)',
          'font-size': '46px',
          'line-height': '52px',
          'letter-spacing': '-0.32px',
        },
        '.page-title': {
          'font-family': 'var(--font-codec-heavy)',
          'font-size': '48px',
          'line-height': '94px',
          'letter-spacing': '-0.32px',
        },
        '.subtitle-s': {
          'font-family': 'var(--font-codec-news)',
          'text-transform': 'uppercase',
          'font-size': '12px',
          'line-height': '12px',
          'letter-spacing': '1.6px',
        },
        '.subtitle-m': {
          'font-family': 'var(--font-codec-news)',
          'text-transform': 'uppercase',
          'font-size': '14px',
          'line-height': '14px',
          'letter-spacing': '1.6px',
        },
        '.subtitle-l': {
          'font-family': 'var(--font-codec-news)',
          'text-transform': 'uppercase',
          'font-size': '16px',
          'line-height': '16px',
          'letter-spacing': '1.6px',
        },
        '.w-paragraph-desktop': {
          'font-family': 'var(--font-codec-news)',
          'font-size': '21px',
          'line-height': '31.5px',
        },
        '.w-paragraph-s-desktop': {
          'font-family': 'var(--font-codec-news)',
          'font-size': '16px',
          'line-height': '24px',
        },
        '.w-paragraph-l-desktop': {
          'font-size': '21px',
          'line-height': '31.5px',
          'font-family': 'var(--font-codec-news)',
        },
        '.w-paragraph-xl-desktop': {
          'font-size': '24px',
          'line-height': '36px',
          'font-family': 'var(--font-codec-news)',
        },
        '.w-h4-desktop': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '42px;',
          'line-height': '50.4px;',
        },
        '.w-h6-desktop': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '24px',
          'line-height': '28px',
        },
        '.title-s-desktop': {
          'font-family': 'var(--font-codec-extra-bold)',
          'font-size': '50px',
          'line-height': '50px',
          'letter-spacing': '-0.32px',
        },
        '.title-m-desktop': {
          'font-family': 'var(--font-codec-heavy)',
          'font-size': '62px',
          'line-height': '58px',
          'letter-spacing': '-0.32px',
        },
        '.title-l-desktop': {
          'font-family': 'var(--font-codec-ultra)',
          'font-size': '100px',
          'line-height': '100px',
          'letter-spacing': '-0.32px',
        },
        '.title-xl-desktop': {
          'font-family': 'var(--font-codec-ultra)',
          'font-size': '140px',
          'line-height': '140px',
          'letter-spacing': '-0.32px',
        },
        '.page-title-desktop': {
          'font-family': 'var(--font-codec-heavy)',
          'font-size': '90px',
          'line-height': '92px',
          'letter-spacing': '-0.32px',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }),
    require('@tailwindcss/aspect-ratio'),
  ],
}
