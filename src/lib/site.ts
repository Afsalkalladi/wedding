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

export const assets = {
  tile: '/assets/islamic/geometric-tile.svg',
  archHead: '/assets/islamic/arch-head.svg',
  // Drop the couple's illustration in at this path and it replaces the drawn
  // SVG automatically; until then `coupleFallback` is used.
  couple: '/assets/couple.png',
  coupleFallback: '/assets/islamic/couple-illustration.svg',
  venue: '/assets/islamic/venue-illustration.svg',
  lantern: '/assets/islamic/lantern.svg',
  arabesque: '/assets/islamic/arabesque-corner.svg',
  monogram: '/assets/islamic/monogram-rosette.svg',
  dividerOrnament: '/assets/islamic/divider-ornament.svg',
  // Drop a file in at this path and the music toggle switches itself on.
  backgroundMusic: '/assets/wedding-background-music.mp3',
} as const
