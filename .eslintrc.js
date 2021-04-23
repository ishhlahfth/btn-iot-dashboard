module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/max-attributes-per-line': 'off',
    'max-len': [1, 100, 2, { ignorePattern: 'd="([\\s\\S]*?)"' }],
    'no-nested-ternary': 'off',
    'no-obj-calls': 'off',
    'no-prototype-builtins': 'off',
    'no-restricted-syntax': 'off',
    'prefer-destructuring': 'off',
    'prefer-arrow-callback': 'off',
    'no-await-in-loop': 'off',
    'no-param-reassign': 'off',
    'import/no-cycle': 'off',
  },
};
