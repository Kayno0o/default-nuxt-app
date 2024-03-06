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
        title: ['Anta', 'sans-serif'],
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [iconsPlugin(), dynamicIconsPlugin()],
}
