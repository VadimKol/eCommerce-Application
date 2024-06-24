import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, './src'), 'node-fetch': 'isomorphic-fetch' },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.{css,scss} --quiet-deprecation-warnings',
      },
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
});
