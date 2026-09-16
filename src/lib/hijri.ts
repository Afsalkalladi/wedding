/**
 * Hijri dates, from the Umm al-Qura calendar built into Intl.
 *
 * Umm al-Qura is calculated, so a date observed by local moon sighting can fall
 * a day either side of it — worth confirming locally before printing.
 */

const MONTH_NAMES: Record<string, string> = {
  'Muh.': 'Muharram',
  Muharram: 'Muharram',
  Saf: 'Safar',
  Safar: 'Safar',
  'Rab. I': 'Rabi al-Awwal',
  'Rab. II': 'Rabi al-Thani',
  'Jum. I': 'Jumada al-Ula',
  'Jumada I': 'Jumada al-Ula',
  'Jum. II': 'Jumada al-Akhira',
  'Jumada II': 'Jumada al-Akhira',
  Raj: 'Rajab',
  Rajab: 'Rajab',
  'Sha.': 'Shaban',
  Shaban: 'Shaban',
  Ram: 'Ramadan',
  Ramadan: 'Ramadan',
  Shaw: 'Shawwal',
  Shawwal: 'Shawwal',
  'Dhuʻl-Q.': 'Dhu al-Qadah',
  "Dhu'l-Q.": 'Dhu al-Qadah',
  'Dhuʻl-H.': 'Dhu al-Hijjah',
  "Dhu'l-H.": 'Dhu al-Hijjah',
}

function utcDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

/** e.g. "14 Jumada al-Ula 1448 AH" */
export function hijriLabel(iso: string): string {
  try {
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      timeZone: 'UTC',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).formatToParts(utcDate(iso))

    const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
    const month = get('month')
    return `${get('day')} ${MONTH_NAMES[month] ?? month} ${get('year').replace(/\s*AH$/, '')} AH`
  } catch {
    return ''
  }
}

/** e.g. "Sunday, 25 October 2026" */
export function gregorianLabel(iso: string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  }).format(utcDate(iso))
}
