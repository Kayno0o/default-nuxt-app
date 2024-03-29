import { defineConfig, presetIcons, presetUno } from 'unocss'

const positions = {
  t: 'top',
  r: 'right',
  b: 'bottom',
  l: 'left',
  bl: 'bottom-left',
  br: 'bottom-right',
  tl: 'top-left',
  tr: 'top-right',
}

const contrast: any = {
  accent: 'dark',
  light: 'dark',
  dark: 'light',
}

export default defineConfig({
  shortcuts: [
    [/^(ph|material-symbols):([\w\-]+)$/, ([_, set, name]) => `i-${set}-${name}`],
    {
      'content': 'container mx-auto px-8',
      'ttt-square': 'absolute inset-0 b-[0,white] m-auto size-2 bg-white round transition-all-500 no-content',
      'card': 'relative rounded b-1 b-solid bg-dark px-4 b-light/25 py-2 transition-colors-300 before:absolute,inset-0,pointer-events-none,rounded-inherit,bg-light/5,no-content,transition-colors-300',
    },
    [/^btn(?:-(.*))?$/, ([_, color]) => `flex gap-2 px-3 h-fit w-fit bg-${color} rounded py-0.5 b-none text-${contrast[color]}`],
    [/^([\w\-\.\/%]+,[\w\-\.\/%,]+)$/, ([_, classes]) => {
      return classes.split(',').map(c => c).join(' ')
    }],
    [/^(bg|text)--([\w\-]+)$/, ([_, type, col]) => `${type}-[var(--${col})]`],
    [/^rounded-([tb])$/, ([_, position]) => `rounded-${position}l rounded-${position}r`],
    [/^rounded-([lr])$/, ([_, position]) => `rounded-t${position} rounded-b${position}`],
    [/^(b|outline)(?:-([tlrb]{1,3}))?-(\[[\w\-,]+\]|\w+)$/, ([_, type, directionsStr, attributesStr]) => {
      const attributes = attributesStr.replaceAll(/[\[\]]/g, '').split(',')
      const directions = directionsStr?.split('') || []

      return attributes.map(a => directions.map(d => `${type}-${d}-${a}`).join(' ') || `${type}-${a}`).join(' ')
    }],
    [/^max-size-(\w+)$/, ([_, size]) => `max-w-${size} max-h-${size}`],
  ],
  rules: [
    ['rounded', { 'border-radius': '.375rem' }],
    [/^rounded-([trbl][lr])$/, ([_, position]) => ({ [`border-${positions[position as keyof typeof positions]}-radius`]: '.375rem' })],
    ['round', { 'border-radius': '900rem' }],
    ['no-content', { content: '\'\'' }],

    [
      /^grid-auto-(cols|rows)(-none)?$/,
      ([, type, value]) => ({
        [`grid-auto-${type === 'cols' ? 'columns' : type}`]: value === 'none' ? 'unset' : '1fr',
      }),
    ],
  ],
  theme: {
    colors: {
      accent: 'rgb(var(--accent))',
      dark: 'rgb(var(--dark))',
      light: 'rgb(var(--light))',
    },
    fontFamily: {
      anta: 'Anta',
    },
  },
  variants: [
    (matcher) => {
      if (!matcher.startsWith('around:'))
        return matcher
      return {
        matcher: matcher.slice(7),
        selector: s => `${s}:before, ${s}:after`,
      }
    },
  ],
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        'ph': () => import('@iconify-json/ph/icons.json').then(i => i.default),
        'material-symbols': () => import('@iconify-json/material-symbols/icons.json').then(i => i.default),
      },
    }),
  ],
})
