// ./prettierrc.js
/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',

  // ✨ Svelte support
  plugins: ['prettier-plugin-svelte'],
  svelteSortOrder: 'options-scripts-markup-styles',
  svelteStrictMode: false,
  svelteAllowShorthand: true,

  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        tabWidth: 2,
      },
    },
  ],
};
