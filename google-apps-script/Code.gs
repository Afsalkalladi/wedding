/**
 * Receives "A Message for the Couple" submissions and appends them to the
 * spreadsheet this script is bound to.
 *
 * Setup: see README.md → "Messages from guests".
 */

const SHEET_NAME = 'Messages'
const MAX_NAME = 120
const MAX_MESSAGE = 2000

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)

    // honeypot / empty submissions are dropped
    if (data.website) return json({ ok: true })
    const name = String(data.name || '').trim().slice(0, MAX_NAME)
    const message = String(data.message || '').trim().slice(0, MAX_MESSAGE)
    if (!name || !message) return json({ ok: false, error: 'Name and message are required' })

    sheet().appendRow([new Date(), name, message])
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}

function sheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet()
  let s = book.getSheetByName(SHEET_NAME)
  if (!s) {
    s = book.insertSheet(SHEET_NAME)
    s.appendRow(['Received', 'Name', 'Message'])
    s.setFrozenRows(1)
  }
  return s
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
