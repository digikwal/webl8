import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  // Required for GitHub Pages - change 'webl8' for repo name if different
  base: '/webl8/',

  plugins: [svelte()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  server: {
    port: 5173,        // development server (npm run dev)
    open: true,
    strictPort: true
  },

  preview: {
    port: 4173,        // preview build (npm run preview)
    strictPort: true
  }
});
