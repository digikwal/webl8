import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  // Required for GitHub Pages to load assets correctly
  base: './',

  plugins: [svelte()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  server: {
    port: 5173,
    open: true,
    strictPort: true
  },

  preview: {
    port: 4173,
    strictPort: true
  }
});
