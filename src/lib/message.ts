export type MessagePayload = {
  name: string
  message: string
  submittedAt: string
}

/**
 * Sends a note for the couple to whatever endpoint is configured in
 * `VITE_MESSAGE_ENDPOINT` (a serverless function, a form service — anything
 * that accepts a JSON POST).
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

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Message endpoint responded with ${response.status}`)
  }
}
