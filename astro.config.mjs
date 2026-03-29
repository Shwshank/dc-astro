import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx'; // ✅ ADD THIS

export default defineConfig({
  site: 'https://delhiconcierge.in/',
  output: 'static',

  integrations: [
    mdx(), // ✅ ADD THIS LINE
    sitemap({
      filter: (page) => !!page,
    }),
  ],
});