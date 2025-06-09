// eslint.config.js
import parserTs from '@typescript-eslint/parser';
import pluginTs from '@typescript-eslint/eslint-plugin';
import svelteParser from 'svelte-eslint-parser';
import sveltePlugin from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';

/** Gemeenschappelijke globals voor alle contexts */
const sharedGlobals = {
  fetch: 'readonly',
  localStorage: 'readonly',
  window: 'readonly',
  document: 'readonly',
  navigator: 'readonly',
  Response: 'readonly',
  Request: 'readonly',
  FormData: 'readonly',
  Headers: 'readonly',
};

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: sharedGlobals,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },

  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: sharedGlobals,
    },
    plugins: {
      '@typescript-eslint': pluginTs,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
    },
  },

  {
    files: ['src/**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: parserTs,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.svelte'],
      },
      globals: sharedGlobals,
    },
    plugins: {
      svelte: sveltePlugin,
    },
    processor: sveltePlugin.processors.svelte,
    rules: {
      ...sveltePlugin.configs.recommended.rules,
    },
  },

  {
    ignores: ['node_modules/', 'dist/', 'build/', '.svelte-kit/', '.vercel/', '.netlify/'],
  },

  prettier,
];
