import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: process.env.ASTRO_URL || 'http://localhost:4321',
  integrations: [sitemap()],
});
