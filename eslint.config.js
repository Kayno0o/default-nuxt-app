import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,

  rules: {
    'node/prefer-global/process': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: { max: 3 }, multiline: { max: 1 } }],
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'consistent'],
  },
})
