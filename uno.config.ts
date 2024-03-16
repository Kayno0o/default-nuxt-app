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
    [/^(ph):([\w\-]+)$/, ([_, set, name]) => `i-${set}-${name}`],
    {
      'content': 'container mx-auto px-8',
      'ttt-square': 'absolute inset-0 b-[0,white] m-auto size-2 bg-white round transition-all-500 no-content',
      'card': 'relative rounded b-1 b-solid bg-dark px-4 b-light/25 py-2 transition-colors-300 before:[absolute,inset-0,pointer-events-none,rounded-inherit,bg-light/5,no-content,transition-colors-300]',
    },
    [/^btn(?:-(.*))?$/, ([_, color]) => `flex gap-2 px-3 h-fit w-fit bg-${color} rounded py-0.5 b-none text-${contrast[color]}`],
    [/^\[([\w\-\/,]+)\]$/, ([_, classes]) => {
      return classes.split(',').map(c => c).join(' ')
    }],
    [/^(bg|text)--([\w\-]+)$/, ([_, type, col]) => `${type}-[var(--${col})]`],
    [/^rounded-([tb])$/, ([_, position]) => `rounded-${position}l rounded-${position}r`],
    [/^rounded-([lr])$/, ([_, position]) => `rounded-t${position} rounded-b${position}`],
  ],
  rules: [
    ['rounded', { 'border-radius': '.375rem' }],
    [/^rounded-([trbl][lr])$/, ([_, position]) => ({ [`border-${positions[position as keyof typeof positions]}-radius`]: '.375rem' })],
    ['round', { 'border-radius': '900rem' }],
    ['no-content', { content: '\'\'' }],

    [
      /^grid-auto-(columns|rows)(-none)?$/,
      ([, type, value]) => ({
        [`grid-auto-${type}`]: value === 'none' ? 'unset' : '1fr',
      }),
    ],

    [/^rd-(\d+)$/, ([, value]) => ({ 'border-radius': `${Number(value) / 4}rem` })],

    /**
     * @see https://regex101.com/r/NxbKrg/1
     */
    [/^b(?:-([trbl]{1,3}))?(?:-(?:([\w-]+)|\[(\d+),(\w+)\]))?$/, ([_, positionLetters, sizeOrColor, sizeBis, colorBis], { theme }) => {
      const items: any = {}
      const borderPositions: string[] = positionLetters
        ? positionLetters
          .split('')
          .filter(letter => letter in positions)
          .reduce((acc, curr) => [...acc, `-${positions[curr as keyof typeof positions]}`], [] as string[])
        : ['']

      let size: number = 1
      if (sizeOrColor) {
        if (Number.isNaN(Number(sizeOrColor))) {
          size = Number(sizeBis)
          colorBis = sizeOrColor
        }
        else {
          size = Number(sizeOrColor)
        }
      }

      borderPositions.forEach((pos) => {
        if (!Number.isNaN(size))
          items[`border${pos}-width`] = sizeOrColor === 'none' ? 'unset' : `${size}px`
        items[`border${pos}-style`] = sizeOrColor === 'none' ? 'unset' : 'solid'

        if (colorBis) {
          if (colorBis.startsWith('-'))
            items[`border${pos}-color`] = `var(-${colorBis})`
          else if (colorBis in (theme as any).colors)
            items[`border${pos}-color`] = (theme as any).colors[colorBis]
          else
            items[`border${pos}-color`] = colorBis
        }
      })

      return items
    }],
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
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        ph: () => import('@iconify-json/ph/icons.json').then(i => i.default),
      },
    }),
  ],
})
