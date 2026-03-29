import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// 🔧 Get last modified date from Git
function getGitLastModified(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;

    const result = execSync(
      `git log -1 --format=%cI "${filePath}"`,
      { stdio: ['pipe', 'pipe', 'ignore'] }
    )
      .toString()
      .trim();

    return result || null;
  } catch {
    return null;
  }
}

// 🔧 Convert full URL → pathname
function getPathFromUrl(url) {
  return url.replace('https://delhiconcierge.in', '');
}

// 🔧 Normalize trailing slash
function normalizePath(pathname) {
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export default defineConfig({
  site: 'https://delhiconcierge.in',

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  integrations: [
    mdx(),

    sitemap({
      async serialize(item) {
        const rawPath = getPathFromUrl(item.url);
        const pathname = normalizePath(rawPath);

        let filePath = null;
        let lastmod = null;

        // =========================
        // 1. BLOG (MDX)
        // =========================
        if (pathname.startsWith('/blog/')) {
          const slug = pathname.replace('/blog/', '');

          filePath = path.join(
            process.cwd(),
            'src/content/blog',
            `${slug}.mdx`
          );
        }

        // =========================
        // 2. STATIC ASTRO PAGES
        // =========================
        if (!filePath) {
          if (pathname === '/') {
            filePath = path.join(process.cwd(), 'src/pages/index.astro');
          } else {
            filePath = path.join(
              process.cwd(),
              'src/pages',
              `${pathname}.astro`
            );
          }
        }

        // =========================
        // 3. GET GIT LASTMOD
        // =========================
        if (filePath) {
          lastmod = getGitLastModified(filePath);
        }

        // =========================
        // 4. FALLBACK (important)
        // =========================
        if (!lastmod) {
          lastmod = new Date().toISOString();
        }

        return {
          url: item.url,
          lastmod,
          priority: pathname === '/' ? 1.0 : 0.7,
          changefreq: pathname === '/' ? 'daily' : 'weekly',
        };
      },

      // Optional cleanup
      filter: (page) => !page.includes('/404'),
    }),
  ],
});