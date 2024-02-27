import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,
  rules: {
    'vue/max-attributes-per-line': ['error', { singleline: { max: 4 }, multiline: { max: 1 } }],
    'array-bracket-newline': ['error', 'consistent'],
  },
})
