// ./svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      fallback: 'index.html',
      strict: true
    }),
    paths: {
      base: dev ? '' : '/webl8',
    },
    alias: {
      $lib: path.resolve('src/lib'),
      $components: path.resolve('src/components'),
      $routes: path.resolve('src/routes'),
    },
  },
};

export default config;
