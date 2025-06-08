// ./vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],

  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
      $components: path.resolve('./src/lib/components'),
      $routes: path.resolve('./src/routes'),
    },
  },

  server: {
    port: 5173,
    strictPort: true,
  },

  preview: {
    port: 4173,
    strictPort: true,
  },
});
