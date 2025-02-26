import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures relative paths for assets
  server: {
    port: 3000, // Run on localhost:3000
    strictPort: true, // Ensures Vite throws an error if port 3000 is in use
    hmr: true, // Hot Module Replacement (HMR) ensures real-time error updates
  },
  build: {
    outDir: 'dist',
  },
  logLevel: 'error', // Show only errors (set to 'info' or 'debug' for more details)
  clearScreen: false, // Prevents Vite from clearing error messages in the terminal
});