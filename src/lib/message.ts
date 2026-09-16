export type MessagePayload = {
  name: string
  message: string
  submittedAt: string
}

/**
 * Sends a note for the couple to the endpoint in `VITE_MESSAGE_ENDPOINT`.
 *
 * Works with the Google Apps Script in `google-apps-script/Code.gs` (messages
 * land in a Google Sheet) or with a form service such as Formspree.
 *
 * With no endpoint configured the message is logged and resolves successfully,
 * so the form can be worked on without a backend.
 */
export async function submitMessage(payload: MessagePayload): Promise<void> {
  const endpoint = import.meta.env.VITE_MESSAGE_ENDPOINT

  if (!endpoint) {
    console.info('[message] No VITE_MESSAGE_ENDPOINT configured — logged only:', payload)
    await new Promise((resolve) => setTimeout(resolve, 600))
    return
  }

  // Apps Script web apps can't answer a CORS preflight, so they get a
  // "simple" text/plain request (the script parses the JSON body itself).
  const isAppsScript = endpoint.includes('script.google.com')

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: isAppsScript
      ? { 'Content-Type': 'text/plain;charset=utf-8' }
      : { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Message endpoint responded with ${response.status}`)
  }

  const result = await response.json().catch(() => ({ ok: true }))
  if (result && result.ok === false) {
    throw new Error(result.error ?? 'Message was rejected')
  }
}
