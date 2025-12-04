import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // Use relative paths for your local setup
  build: {
    outDir: 'dist',
    rollupOptions: {
        input: {
            main: resolve(__dirname, 'src/main.js')
        }
    }
  }
});