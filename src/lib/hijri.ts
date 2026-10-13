/**
 * Hijri dates, from the Umm al-Qura calendar built into Intl.
 *
 * Umm al-Qura is calculated, so a date observed by local moon sighting can fall
 * a day either side of it — worth confirming locally before printing.
 *
 * We ask Intl for the month as a *number*, not a name: asking for `month:
 * 'short'` hits inconsistent (and sometimes outright buggy) CLDR data across
 * platforms — Android has been seen returning the Gregorian month name for
 * the same index (e.g. month 5 rendered as "May"), iOS a different
 * abbreviation style than Chrome/desktop ("Jmd" vs "Jum. I"). The month
 * index itself is plain arithmetic and consistent everywhere, so we map it
 * to our own canonical names instead of trusting the OS's month-name table.
 */

const MONTH_NAMES = [
  'Muharram',
  'Safar',
  'Rabi al-Awwal',
  'Rabi al-Thani',
  'Jumada al-Ula',
  'Jumada al-Akhira',
  'Rajab',
  'Shaban',
  'Ramadan',
  'Shawwal',
  'Dhu al-Qadah',
  'Dhu al-Hijjah',
]

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
      month: 'numeric',
      year: 'numeric',
    }).formatToParts(utcDate(iso))

    const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
    const monthIndex = Number(get('month')) - 1
    const month = MONTH_NAMES[monthIndex] ?? get('month')
    return `${get('day')} ${month} ${get('year').replace(/\s*AH$/, '')} AH`
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
