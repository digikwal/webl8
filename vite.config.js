import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5173,
    strictPort: true
  },
  preview: {
    port: 4173,
    strictPort: true
  },
  resolve: {
    alias: {
      $lib: '/src/lib',
      $components: '/src/lib/components',
      $routes: '/src/routes'
    }
  }
});
