import { createClient, type ContentfulClientApi } from 'contentful'

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID?.trim()
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN?.trim()
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT?.trim() || 'master'

export function isContentfulConfigured(): boolean {
  return Boolean(space && accessToken)
}

if (import.meta.env.DEV && !isContentfulConfigured()) {
  console.warn(
    '[contentful] VITE_CONTENTFUL_SPACE_ID / VITE_CONTENTFUL_ACCESS_TOKEN missing — using local content. Put them in `.env` (not `.env.example`) and restart Vite.',
  )
}

let client: ContentfulClientApi<undefined> | null = null

/** Delivery API client. Returns null when env vars are missing. */
export function getContentfulClient(): ContentfulClientApi<undefined> | null {
  if (!isContentfulConfigured()) return null
  if (!client) {
    client = createClient({
      space: space!,
      accessToken: accessToken!,
      environment,
    })
  }
  return client
}
