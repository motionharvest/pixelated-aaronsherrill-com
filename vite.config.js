import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000, // Default port
    strictPort: true, // Throws an error if port is in use
    hmr: true,
  },
  build: {
    outDir: 'dist',
  },
  logLevel: 'info', // Show only errors (set to 'info' or 'debug' for more details)
  clearScreen: false,
  // support for JSX 
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
});