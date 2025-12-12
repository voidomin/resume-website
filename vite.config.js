import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // use relative paths in built HTML/assets
  build: {
    // keep default options; you can add rollupOptions if you want to copy extra files
  }
});
