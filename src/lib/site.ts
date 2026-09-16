/** Everything specific to this wedding. Edit here, not in the components. */
export const site = {
  bride: {
    name: 'Fathima Shahadiya',
    parents: 'Ahammed & Arifa',
  },
  groom: {
    name: 'Mohammed Ajmal P',
    parents: 'Kadeejathul Qubra & Muhammed Kutty',
  },
  /** ISO date of the wedding. The Hijri date is derived from it. */
  weddingDate: '2026-10-25',
  venue: {
    name: 'Mehafil Banquet Hall',
    mapsUrl: 'https://maps.app.goo.gl/pTo9Dw8Jh7bUbFkt6',
  },
} as const

// Optional files, picked up only if they exist. Importing them through Vite
// gives each a content-hashed URL, so a replaced file is never served stale
// from a phone's cache.
const coupleImage = Object.values(
  import.meta.glob<string>('../assets/couple.webp', { eager: true, query: '?url', import: 'default' }),
)[0]
const musicFiles = Object.values(
  import.meta.glob<string>('../assets/music.{mp3,m4a,ogg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

export const assets = {
  tile: '/assets/islamic/geometric-tile.svg',
  archHead: '/assets/islamic/arch-head.svg',
  // Made from art/couple-source.png by `npm run couple`. If it's missing, the
  // drawn SVG (`coupleFallback`) is shown instead.
  couple: coupleImage ?? null,
  coupleFallback: '/assets/islamic/couple-illustration.svg',
  venue: '/assets/islamic/venue-illustration.svg',
  lantern: '/assets/islamic/lantern.svg',
  arabesque: '/assets/islamic/arabesque-corner.svg',
  monogram: '/assets/islamic/monogram-rosette.svg',
  dividerOrnament: '/assets/islamic/divider-ornament.svg',
  // Save src/assets/music.mp3 (or .m4a / .ogg) and the sound button appears.
  backgroundMusic: musicFiles,
} as const
