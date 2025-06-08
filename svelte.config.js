// # ./svelte.config.js
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('svelte/compiler').PreprocessorGroup[]} */
const config = {
  preprocess: vitePreprocess(),
};

export default config;
