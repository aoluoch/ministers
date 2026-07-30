import type { Asset, Entry, EntrySkeletonType } from 'contentful'
import type { CtaLink } from '@/types/content'

/** Resolve a Contentful asset file URL to an absolute https URL. */
export function assetUrl(asset: Asset | undefined | null): string | undefined {
  const file = asset?.fields?.file
  if (!file || typeof file !== 'object' || !('url' in file)) return undefined
  const url = file.url
  if (typeof url !== 'string' || !url) return undefined
  return url.startsWith('//') ? `https:${url}` : url
}

export function assetAlt(
  asset: Asset | undefined | null,
  fallback: string,
): string {
  const title = asset?.fields?.title
  return typeof title === 'string' && title.trim() ? title : fallback
}

export function assetCaption(asset: Asset | undefined | null): string | undefined {
  const description = asset?.fields?.description
  return typeof description === 'string' && description.trim()
    ? description
    : undefined
}

/** Long text: blank-line-separated blocks → string[]. Or pass through a JSON string[]. */
export function asParagraphs(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((p): p is string => typeof p === 'string' && p.trim().length > 0)
  }
  if (typeof value === 'string') {
    return value
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
  }
  return []
}

export function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

export function asOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined
}

export function asJsonArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[]
  // Text fields often store JSON as a string
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return []
    try {
      const parsed: unknown = JSON.parse(trimmed)
      return Array.isArray(parsed) ? (parsed as T[]) : []
    } catch {
      return []
    }
  }
  return []
}

export function asCta(
  label: unknown,
  href: unknown,
): CtaLink | undefined {
  const l = asOptionalString(label)
  const h = asOptionalString(href)
  if (!l || !h) return undefined
  return { label: l, href: h }
}

export function asTone(value: unknown): 'purple' | 'cream' | undefined {
  if (value === 'purple' || value === 'cream') return value
  return undefined
}

export function fieldsOf<T extends EntrySkeletonType>(
  entry: Entry<T, undefined, string>,
): T['fields'] {
  return entry.fields
}
