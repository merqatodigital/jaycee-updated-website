import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // Allow the sandbox preview host (and any *.e2b.app proxy host) to load.
      allowedHosts: ['.e2b.app', 'localhost'],
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Proxy API calls to the Express + Neon backend so the browser only ever
      // talks to same-origin relative URLs (never directly to Postgres).
      proxy: {
        '/api': {
          target: `http://localhost:${process.env.API_PORT || 8787}`,
          changeOrigin: true,
        },
      },
    },
  };
});
