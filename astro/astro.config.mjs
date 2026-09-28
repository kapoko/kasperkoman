import { defineConfig } from 'astro/config';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import sitemap from '@astrojs/sitemap';
import { bookingEmail, promoEmail } from './src/lib/contact.js';

const emails = [bookingEmail, promoEmail].map((address) => [
  address,
  [...`mailto:${address}`].map((character) => `&#${character.codePointAt(0)};`).join(''),
  address.replace(/(\.[^.]+)$/, '<!--.example-->$1'),
]);

const emailObfuscation = () => ({
  name: 'email-obfuscation',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const root = fileURLToPath(dir);
      const pages = (await readdir(root, { recursive: true })).filter((file) => file.endsWith('.html'));
      await Promise.all(pages.map(async (page) => {
        const path = join(root, page);
        const html = await readFile(path, 'utf8');
        const obfuscated = emails.reduce((output, [address, href, text]) => output
          .replaceAll(`href="mailto:${address}"`, `href="${href}"`)
          .replaceAll(address, text), html);
        if (obfuscated !== html) await writeFile(path, obfuscated);
      }));
    },
  },
});

export default defineConfig({
  output: 'static',
  site: process.env.ASTRO_URL || 'http://localhost:4321',
  integrations: [sitemap(), emailObfuscation()],
});
