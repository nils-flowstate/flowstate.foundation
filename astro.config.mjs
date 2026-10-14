import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Weiterleitungen aus Bauplan 5.2. Die statische Ausgabe erzeugt dafuer Seiten mit
// meta refresh (Status 200), kein 301 (Pruefbericht M3). Die 301 stehen in deploy/Caddyfile.snippet.
export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [react()],
  redirects: {
    '/about-us': '/#werkzeuge',
    '/services': '/#pakete',
    '/grow-together': '/#kontakt',
    '/grow-together/thank-you': '/danke',
  },
  vite: { plugins: [tailwindcss()] },
});
