import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import blogPlugin from './vite-plugin-blog';

export default defineConfig({
  plugins: [react(), blogPlugin()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: { target: 'es2020', cssCodeSplit: true },
  ssr: { noExternal: ['react-helmet-async'] },
});
