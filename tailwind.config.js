import { dynamicIconsPlugin, iconsPlugin } from '@egoist/tailwindcss-icons'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        dark: 'rgb(var(--dark) / <alpha-value>)',
        light: 'rgb(var(--light) / <alpha-value>)',
      },
      fontFamily: {
        anta: ['Anta', 'sans-serif'],
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [
    iconsPlugin(),
    dynamicIconsPlugin(),
    function ({ addUtilities }) {
      const newUtilities = {
        '.grid-auto-columns': {
          gridAutoColumns: '1fr',
        },
        '.grid-auto-rows': {
          gridAutoRows: '1fr',
        },
        '.grid-auto-columns-none': {
          gridAutoColumns: 'unset',
        },
        '.grid-auto-rows-none': {
          gridAutoRows: 'unset',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
