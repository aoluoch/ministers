/**
 * Build-time Contentful fetch for the sitemap + prerendered event pages.
 *
 * Runs in Node during `vite build` (and in the dev/preview middleware), so it
 * uses `fetch` against the Content Delivery API directly instead of the browser
 * SDK. Credentials come from the same `VITE_CONTENTFUL_*` env vars the app uses.
 */
import { slugify } from '../src/lib/slug.ts'
import type { SeoEvent } from '../src/lib/seo/pages.ts'

type ContentfulAssetFile = {
  url?: string
  details?: { image?: { width?: number; height?: number } }
}

type ContentfulAsset = {
  sys: { id: string }
  fields?: { title?: string; description?: string; file?: ContentfulAssetFile }
}

type ContentfulLink = { sys: { id: string; linkType?: string } }

type ProgramEntry = {
  sys: { id: string; updatedAt?: string }
  fields?: {
    title?: string
    summary?: string
    date?: string
    location?: string
    status?: string
    media?: ContentfulLink[]
  }
}

type EntriesResponse = {
  items?: ProgramEntry[]
  includes?: { Asset?: ContentfulAsset[] }
}

export type ContentfulEnv = {
  spaceId?: string
  accessToken?: string
  environment?: string
}

type SimpleEntry = { fields?: { title?: string; description?: string } }

function cdaUrl(env: ContentfulEnv, contentType: string, extra: Record<string, string> = {}) {
  const space = env.spaceId?.trim()
  const token = env.accessToken?.trim()
  const environment = env.environment?.trim() || 'master'
  if (!space || !token) return null

  const url = new URL(
    `https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries`,
  )
  url.searchParams.set('content_type', contentType)
  url.searchParams.set('limit', '1000')
  for (const [key, value] of Object.entries(extra)) url.searchParams.set(key, value)
  url.searchParams.set('access_token', token)
  return url
}

/**
 * GET with retries. A transient network blip must not silently drop dynamic
 * URLs from the sitemap, so each request is attempted up to 3 times.
 */
async function fetchJson<T>(url: URL, label: string, attempts = 3): Promise<T | null> {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { Accept: 'application/json' } })
      if (response.ok) return (await response.json()) as T

      // 4xx responses (bad token, unknown content type) will not fix themselves.
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        console.warn(`[seo] Contentful ${label} fetch failed: HTTP ${response.status}`)
        return null
      }
      console.warn(
        `[seo] Contentful ${label} fetch attempt ${attempt}/${attempts} failed: HTTP ${response.status}`,
      )
    } catch (error) {
      console.warn(
        `[seo] Contentful ${label} fetch attempt ${attempt}/${attempts} failed:`,
        error instanceof Error ? error.message : error,
      )
    }

    if (attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, 400 * attempt))
    }
  }

  console.warn(`[seo] Contentful ${label} unavailable after ${attempts} attempts`)
  return null
}

/**
 * `title` / `description` pairs for a simple Contentful list type (`faq`,
 * `getInvolved`). Used to prerender FAQPage and Service structured data.
 */
export async function fetchTitleDescriptionEntries(
  env: ContentfulEnv,
  contentType: 'faq' | 'getInvolved',
): Promise<Array<{ title: string; description: string }>> {
  const url = cdaUrl(env, contentType, { order: 'sys.createdAt' })
  if (!url) return []

  const data = await fetchJson<{ items?: SimpleEntry[] }>(url, contentType)
  if (!data) return []

  return (data.items ?? [])
    .map((item) => ({
      title: item.fields?.title?.trim() ?? '',
      description: item.fields?.description?.trim() ?? '',
    }))
    .filter((item) => item.title || item.description)
}

function dateLabel(value: string | undefined): string | undefined {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function isoDate(value: string | undefined): string | undefined {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

/**
 * Published programs → sitemap/prerender input. Returns `[]` (never throws) so a
 * missing token or CDA outage degrades to a static-pages-only sitemap instead of
 * failing the build.
 */
export async function fetchSeoEvents(env: ContentfulEnv): Promise<SeoEvent[]> {
  const url = cdaUrl(env, 'programs', { include: '1', order: 'fields.date' })
  if (!url) return []

  const data = await fetchJson<EntriesResponse>(url, 'programs')
  if (!data) return []

  const assets = new Map<string, ContentfulAsset>()
  for (const asset of data.includes?.Asset ?? []) assets.set(asset.sys.id, asset)

  const events: SeoEvent[] = []
  for (const item of data.items ?? []) {
    const title = item.fields?.title?.trim()
    if (!title) continue

    const slug = slugify(title) || slugify(item.sys.id)
    if (!slug) continue

    const cover = item.fields?.media?.[0]?.sys.id
      ? assets.get(item.fields.media[0].sys.id)
      : undefined
    const rawUrl = cover?.fields?.file?.url
    const imageUrl = rawUrl?.startsWith('//') ? `https:${rawUrl}` : rawUrl
    // Prefer the editor-written asset description; fall back to the event title
    // rather than the uploaded file name.
    const imageAlt = cover?.fields?.description?.trim() || title

    events.push({
      slug,
      title,
      summary: item.fields?.summary?.trim() || undefined,
      dateIso: isoDate(item.fields?.date),
      dateLabel: dateLabel(item.fields?.date),
      location: item.fields?.location?.trim() || undefined,
      imageUrl,
      imageAlt,
      updatedAt: item.sys.updatedAt,
    })
  }

  // De-duplicate slugs so the sitemap can never contain the same URL twice.
  const seen = new Set<string>()
  return events.filter((event) => {
    if (seen.has(event.slug)) return false
    seen.add(event.slug)
    return true
  })
}
