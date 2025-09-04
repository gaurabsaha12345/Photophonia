import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // Base path is important for GitHub Pages project sites. We allow overriding via env.
      // For user/organization pages (username.github.io), this should remain '/'.
      // For project pages, set BASE_PATH to '/<repo-name>/' at build time.
      base: env.BASE_PATH || '/',
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
