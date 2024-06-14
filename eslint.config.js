import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,
  {
    files: ['src/**/*.js', 'utils/**/*.js'], // Додано utils
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    env: {
      node: true,
      es2021: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      semi: 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
    },
  },
];
