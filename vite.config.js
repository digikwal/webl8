import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  // Required for GitHub Pages – update if your repo name is different
  base: '/webl8/',

  plugins: [svelte()],

  resolve: {
    alias: {
      // Shortcut '@' points to the src folder
      '@': path.resolve(__dirname, 'src')
    }
  },

  server: {
    port: 5173,        // Dev server: npm run dev
    open: true,        // Automatically opens in browser
    strictPort: true   // Fails if port 5173 is in use (no fallback)
  },

  preview: {
    port: 4173,        // Preview server: npm run preview
    strictPort: true   // Fails if port 4173 is in use (no fallback)
  },

  build: {
    sourcemap: true,   // Useful for debugging production builds
    outDir: 'dist',    // Optional: explicit output directory
    emptyOutDir: true  // Clears old files from dist before build
  }
});
