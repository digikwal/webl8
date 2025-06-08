import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      fallback: null,
      precompress: false,
    }),
    paths: {
      base: '/webl8',
    },
  },
  preprocess: vitePreprocess(),
};

export default config;
