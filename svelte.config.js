// ./svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    paths: {
      base: '/webl8', // pas aan als je repo anders heet
    },
    alias: {
      $lib: path.resolve('src/lib'),
      $components: path.resolve('src/lib/components'),
      $routes: path.resolve('src/routes'),
    },
  },
};

export default config;
