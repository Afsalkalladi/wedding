/**
 * Prepares the couple illustration for the page.
 *
 *   npm run couple            (reads art/couple-source.png)
 *
 * The artwork comes on a textured cream "paper". This script divides that
 * paper colour out (background → pure white, grain lifted away), then tints
 * the result with the page colour, so the picture's background IS the page
 * background and there's no visible edge. The colour is baked in rather than
 * applied with a CSS blend mode because a blend is skipped while the fade-in
 * animation runs, which flashed a white box on load.
 *
 * Outputs:
 *   src/assets/couple.webp      — for the page (page colour baked in)
 *   art/couple-white.png        — white-ground version for `npm run og`
 */
import { statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('..', import.meta.url))
const SRC = `${root}art/couple-source.png`
const OUT = `${root}src/assets/couple.webp`
const OUT_WHITE = `${root}art/couple-white.png`

// Must match --background in src/index.css (hsl(40 33% 95%) renders as this).
const PAGE = [246, 244, 238]

// Paper tones brighter than LOW are pushed toward white; above HIGH they are
// pure white. Values are after the paper colour has been divided out (0–1).
const LOW = 0.9
const HIGH = 0.965
const MAX_WIDTH = 1260
// The source has a faint 1px frame around its edge; this band is forced white
// so no outline shows on the page.
const EDGE = 6

const image = sharp(SRC).removeAlpha()
const { data, info } = await image.raw().toBuffer({ resolveWithObject: true })

// Paper colour = median of a block in each corner.
function paperColour() {
  const samples = [[], [], []]
  const block = 48
  const corners = [
    [0, 0],
    [info.width - block, 0],
    [0, info.height - block],
    [info.width - block, info.height - block],
  ]
  for (const [cx, cy] of corners) {
    for (let y = cy; y < cy + block; y++) {
      for (let x = cx; x < cx + block; x++) {
        const i = (y * info.width + x) * info.channels
        for (let c = 0; c < 3; c++) samples[c].push(data[i + c])
      }
    }
  }
  return samples.map((s) => s.sort((a, b) => a - b)[s.length >> 1])
}

const paper = paperColour()
const smooth = (t) => t * t * (3 - 2 * t)

for (let i = 0; i < data.length; i += info.channels) {
  const px = i / info.channels
  const x = px % info.width
  const y = Math.floor(px / info.width)
  if (x < EDGE || y < EDGE || x >= info.width - EDGE || y >= info.height - EDGE) {
    data[i] = data[i + 1] = data[i + 2] = 255
    continue
  }
  const n = [0, 1, 2].map((c) => Math.min(1, data[i + c] / paper[c]))
  const lightest = Math.min(n[0], n[1], n[2])
  // How much of this pixel is "paper": 0 below LOW, 1 above HIGH.
  const k = smooth(Math.max(0, Math.min(1, (lightest - LOW) / (HIGH - LOW))))
  for (let c = 0; c < 3; c++) {
    data[i + c] = Math.round((n[c] + (1 - n[c]) * k) * 255)
  }
}

const resize = { width: MAX_WIDTH, withoutEnlargement: true }

await sharp(data, { raw: info }).resize(resize).png({ compressionLevel: 9 }).toFile(OUT_WHITE)

// Multiply by the page colour: white → page colour, everything else tinted
// exactly as `mix-blend-mode: multiply` would have done.
const tinted = Buffer.from(data)
for (let i = 0; i < tinted.length; i += info.channels) {
  for (let c = 0; c < 3; c++) tinted[i + c] = Math.round((tinted[i + c] * PAGE[c]) / 255)
}
await sharp(tinted, { raw: info }).resize(resize).webp({ quality: 88, effort: 6 }).toFile(OUT)

console.log(
  `couple.webp written (${Math.round(statSync(OUT).size / 1024)} KB), paper colour was rgb(${paper.join(', ')})`,
)
