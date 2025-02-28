import { defineConfig } from 'vite';
import path from 'path';

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
  resolve: {
    alias: {
      // Define an alias for your project root
      '@': path.resolve(__dirname, './src'),
    },
  },
  // support for JSX 
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from '@/pragma.js';
    import jssLite from "@/utils/jss-lite";`
  }
});