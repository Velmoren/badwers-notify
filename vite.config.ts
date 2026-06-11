/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'BadwersNotify',
      formats: ['es', 'iife'],
      fileName: (format) =>
        format === 'es' ? 'badwers-notify.js' : 'badwers-notify.min.js',
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
