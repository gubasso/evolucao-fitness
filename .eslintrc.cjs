module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
  plugins: ['svelte', 'googleappsscript'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte', '.gs']
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
    'googleappsscript/googleappsscript': true
  },
  rules: {
    semi: ['error', 'never'],
    'svelte/no-at-html-tags': 'off'
  },
  overrides: [
    {
      files: ['*.gs'], // Target your Google Apps Script files
      rules: {
        // You can disable or adjust rules specifically for .gs files if needed
      }
    }
  ]
}
