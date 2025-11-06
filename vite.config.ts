import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'react-hook-form': fileURLToPath(
        new URL('./src/vendor/react-hook-form.ts', import.meta.url),
      ),
      '@hookform/resolvers/zod': fileURLToPath(
        new URL('./src/vendor/hookform-resolvers/zod.ts', import.meta.url),
      ),
      zod: fileURLToPath(new URL('./src/vendor/zod.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
    },
  },
});
