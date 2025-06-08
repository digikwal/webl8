// ./svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    paths: {
      base: '/webl8',
    },
    alias: {
      $lib: path.resolve('src/lib'),
      $components: path.resolve('src/lib/components'),
      $routes: path.resolve('src/routes'),
    },
  },
};

export default config;
