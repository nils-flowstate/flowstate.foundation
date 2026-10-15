// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://flowstate.foundation',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE', en: 'en-US' } },
      filter: page => !page.includes('/welcome'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Bestehende VITE_*-Variablen bleiben unverändert nutzbar.
    envPrefix: ['VITE_', 'PUBLIC_'],
  },
})
