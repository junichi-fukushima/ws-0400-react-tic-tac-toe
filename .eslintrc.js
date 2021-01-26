module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    // インデント幅が2でなければLinterエラー。
    indent: ['error', 2],
    'no-unused-vars': 'off',
  },
};
