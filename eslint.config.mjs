import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['**/dist/**', '**/*.js', 'eslint.config.mjs'],
    languageOptions: {
      globals: {
        structuredClone: 'readonly',
      },
      parser: tsparser,
      parserOptions: {
        project: ['./api/tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react': pluginReact,
    },
    rules: {
      'constructor-super': 'error',
      'no-structured-clone': 'off',
    },
  },
  {
    files: ['app/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['**/dist/**', '**/*.js'],
    languageOptions: {
      globals: {
        structuredClone: 'readonly',
      },
      parser: tsparser,
      parserOptions: {
        project: ['./app/tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react': pluginReact,
    },
    rules: {
      'constructor-super': 'error',
      'no-structured-clone': 'off',
    },
  },
];
