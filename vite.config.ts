import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Link-preview crawlers (WhatsApp included) only follow absolute image URLs,
 * so `%SITE_URL%` in index.html is replaced with VITE_SITE_URL — the address
 * the site is published at, e.g. https://fathima-ajmal.example.com
 */
function siteUrl(url: string, isBuild: boolean): Plugin {
  const base = url.replace(/\/+$/, '')
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      if (isBuild && !base) {
        console.warn(
          '\n⚠  VITE_SITE_URL is not set — link previews (WhatsApp etc.) will show no image.\n',
        )
      }
      return html.split('%SITE_URL%').join(base)
    },
  }
}

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, '.', '')
  return {
    plugins: [react(), siteUrl(env.VITE_SITE_URL ?? '', command === 'build')],
    server: { port: 5173 },
  }
})
