import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://delhiconcierge.in/', // <-- NOTE trailing slash (IMPORTANT)
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !!page, // safety fix
    }),
  ],
});