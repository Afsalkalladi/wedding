/**
 * Renders public/og-image.jpg — the picture WhatsApp, iMessage, Facebook etc.
 * show when the invitation link is shared.
 *
 *   npm run og
 *
 * Link previews need a raster image (SVG is ignored), 1200×630 is the size every
 * platform displays large, and WhatsApp drops images much over ~300 KB.
 * Re-run after replacing the couple illustration.
 */
import { existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('..', import.meta.url))
const WIDTH = 1200
const HEIGHT = 630
const IVORY = '#F7F3EA'

// Prefer the white-ground portrait from `npm run couple`; otherwise the drawn SVG.
const portrait = `${root}art/couple-white.png`
const fallback = `${root}public/assets/islamic/couple-illustration.svg`
const couplePath = existsSync(portrait) ? portrait : fallback

// A faint khatim pattern that fades out toward the edges, as on the site.
const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <pattern id="tile" width="96" height="96" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="#3A5542" stroke-opacity="0.16" stroke-width="1">
        <path d="M28,28 H68 V68 H28 Z"/>
        <path d="M48,20 L76,48 L48,76 L20,48 Z"/>
        <circle cx="48" cy="48" r="6"/>
      </g>
    </pattern>
    <radialGradient id="fade" cx="50%" cy="50%" r="62%" gradientTransform="translate(0.5 0.5) scale(0.62 1) translate(-0.5 -0.5)">
      <stop offset="55%" stop-color="${IVORY}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${IVORY}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="${IVORY}"/>
  <rect width="100%" height="100%" fill="url(#tile)"/>
  <rect width="100%" height="100%" fill="url(#fade)"/>
</svg>`)

const couple = await sharp(couplePath, { density: 300 })
  .resize({ height: HEIGHT - 40, fit: 'inside' })
  .png()
  .toBuffer()

const out = `${root}public/og-image.jpg`
await sharp(background)
  // multiply, as on the page, so the portrait's white ground becomes ivory
  .composite([{ input: couple, gravity: 'center', blend: 'multiply' }])
  .flatten({ background: IVORY })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(out)

const kb = Math.round(statSync(out).size / 1024)
console.log(`og-image.jpg written (${WIDTH}×${HEIGHT}, ${kb} KB) from ${couplePath.replace(root, '')}`)
if (kb > 300) console.warn('Warning: over 300 KB — WhatsApp may not show it.')

