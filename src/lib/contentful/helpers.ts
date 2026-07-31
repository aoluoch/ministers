import type { Asset, Entry, EntrySkeletonType } from 'contentful'
import type { BeliefItem, CtaLink } from '@/types/content'

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

type RichTextNode = {
  nodeType?: string
  value?: string
  content?: RichTextNode[]
}

function collectRichText(node: RichTextNode | undefined): string {
  if (!node) return ''
  if (node.nodeType === 'text') return typeof node.value === 'string' ? node.value : ''
  if (!Array.isArray(node.content)) return ''
  return node.content.map(collectRichText).join('')
}

/** Contentful Rich Text document → plain paragraph strings for TextBlock. */
export function asRichTextParagraphs(value: unknown): string[] {
  if (!value || typeof value !== 'object') return []
  const doc = value as RichTextNode
  if (doc.nodeType !== 'document' || !Array.isArray(doc.content)) return []

  const paragraphs: string[] = []
  for (const block of doc.content) {
    const type = block.nodeType
    if (
      type === 'paragraph' ||
      type === 'heading-1' ||
      type === 'heading-2' ||
      type === 'heading-3' ||
      type === 'heading-4' ||
      type === 'heading-5' ||
      type === 'heading-6' ||
      type === 'blockquote'
    ) {
      const text = collectRichText(block).trim()
      if (text) paragraphs.push(text)
      continue
    }
    if (type === 'unordered-list' || type === 'ordered-list') {
      for (const item of block.content ?? []) {
        const text = collectRichText(item).trim()
        if (text) paragraphs.push(text)
      }
    }
  }
  return paragraphs
}

function splitTitleDescription(text: string): BeliefItem {
  const separator = text.match(/\s(?:—|–|-)\s|:\s/)
  if (!separator?.index) return { title: text, description: '' }

  const title = text.slice(0, separator.index).trim()
  const description = text.slice(separator.index + separator[0].length).trim()
  return { title: title || text, description }
}

function tableRowToBelief(row: RichTextNode): BeliefItem | null {
  const cells = (row.content ?? [])
    .map((cell) => collectRichText(cell).trim())
    .filter(Boolean)

  if (!cells.length) return null
  if (cells.length === 1) return splitTitleDescription(cells[0])

  return {
    title: cells[0],
    description: cells.slice(1).join(' ').trim(),
  }
}

/** Contentful Rich Text document → belief cards. */
export function asRichTextBeliefs(value: unknown): BeliefItem[] {
  if (!value || typeof value !== 'object') return []
  const doc = value as RichTextNode
  if (doc.nodeType !== 'document' || !Array.isArray(doc.content)) return []

  const beliefs: BeliefItem[] = []
  let current: { title: string; description: string[] } | null = null

  const flush = () => {
    if (!current?.title) return
    beliefs.push({
      title: current.title,
      description: current.description.join(' ').trim(),
    })
    current = null
  }

  for (const block of doc.content) {
    const type = block.nodeType
    const text = collectRichText(block).trim()
    if (!text) continue

    if (type?.startsWith('heading-')) {
      flush()
      current = { title: text, description: [] }
      continue
    }

    if (type === 'unordered-list' || type === 'ordered-list') {
      flush()
      for (const item of block.content ?? []) {
        const itemText = collectRichText(item).trim()
        if (itemText) beliefs.push(splitTitleDescription(itemText))
      }
      continue
    }

    if (type === 'table') {
      flush()
      for (const row of block.content ?? []) {
        const belief = tableRowToBelief(row)
        if (belief) beliefs.push(belief)
      }
      continue
    }

    if (type === 'paragraph' || type === 'blockquote') {
      if (current) {
        current.description.push(text)
      } else {
        beliefs.push(splitTitleDescription(text))
      }
    }
  }

  flush()
  return beliefs.filter((item) => item.title || item.description)
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
  // Rich Text documents (e.g. aboutTextblock.description)
  const fromRichText = asRichTextParagraphs(value)
  if (fromRichText.length) return fromRichText
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
