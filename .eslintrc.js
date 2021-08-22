module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/prettier'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        eslintIntegration: true,
        semi: false,
        singleQuote: true,
        printWidth: 100,
        jsxBracketSameLine: true,
        arrowParens: 'avoid',
        trailingComma: 'none',
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
