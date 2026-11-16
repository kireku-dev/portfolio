import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kireku.dev',
  output: 'static',
  // The CV used to live at /cv; it is now the landing page.
  redirects: {
    '/cv': '/',
  },
});
