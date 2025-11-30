import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      // This is the magic bridge. It tells Vite:
      // "Wherever you see 'process.env.API_KEY' in the code, replace it with the value of VITE_API_KEY"
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
    },
  };
});