/**
 * `<Seo>` keeps `document.head` in sync with the active route: title, meta
 * description, canonical, Open Graph, Twitter/X, robots, and JSON-LD.
 *
 * The build also prerenders these tags into per-route HTML files
 * (`seo/plugin.ts`), so crawlers that do not execute JS still get correct
 * metadata. This component keeps client-side navigation correct.
 */
import { useEffect, useMemo } from 'react'
import {
  SITE,
  absoluteUrl,
  clampDescription,
  defaultOgImage,
  formatTitle,
  normalizePath,
  type PageSeo,
} from '@/lib/seo/pages'
import { jsonLdGraph, organizationSchema, websiteSchema } from '@/lib/seo/schema'
import { SITE_URL } from '@/lib/seo/site-url'

const MANAGED_ATTR = 'data-seo'
const JSON_LD_ID = 'seo-jsonld'

function upsertMeta(key: 'name' | 'property', value: string, content: string) {
  const selector = `meta[${key}="${value}"]`
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(key, value)
    element.setAttribute(MANAGED_ATTR, 'true')
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function removeMeta(key: 'name' | 'property', value: string) {
  document.head.querySelector(`meta[${key}="${value}"]`)?.remove()
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    element.setAttribute(MANAGED_ATTR, 'true')
    document.head.appendChild(element)
  }
  element.href = href
}

function upsertJsonLd(json: string) {
  let element = document.head.querySelector<HTMLScriptElement>(`script#${JSON_LD_ID}`)
  if (!element) {
    element = document.createElement('script')
    element.id = JSON_LD_ID
    element.type = 'application/ld+json'
    element.setAttribute(MANAGED_ATTR, 'true')
    document.head.appendChild(element)
  }
  element.textContent = json
}

export function Seo({ path, title, description, image, twitterCard, noindex, jsonLd }: PageSeo) {
  /** Callers build `jsonLd` inline, so key the effect on its serialised form. */
  const graphJson = useMemo(
    () => jsonLdGraph([websiteSchema(SITE_URL), organizationSchema(SITE_URL), ...(jsonLd ?? [])]),
    [jsonLd],
  )
  const imageJson = useMemo(() => JSON.stringify(image ?? null), [image])

  useEffect(() => {
    const normalizedPath = normalizePath(path)
    const canonical = absoluteUrl(SITE_URL, normalizedPath)
    const fullTitle = formatTitle(title, normalizedPath)
    const metaDescription = clampDescription(description || SITE.tagline)
    const ogImage = (JSON.parse(imageJson) as PageSeo['image']) ?? defaultOgImage(SITE_URL)
    const card = twitterCard ?? 'summary'

    document.title = fullTitle
    upsertMeta('name', 'description', metaDescription)

    if (noindex) {
      // A 404 URL is not a real page, so it gets no canonical.
      document.head.querySelector('link[rel="canonical"]')?.remove()
      upsertMeta('name', 'robots', 'noindex, follow')
    } else {
      upsertCanonical(canonical)
      upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
    }

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:locale', SITE.locale)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', metaDescription)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', ogImage.url)
    if (ogImage.alt) upsertMeta('property', 'og:image:alt', ogImage.alt)
    else removeMeta('property', 'og:image:alt')
    if (ogImage.width) upsertMeta('property', 'og:image:width', String(ogImage.width))
    else removeMeta('property', 'og:image:width')
    if (ogImage.height) upsertMeta('property', 'og:image:height', String(ogImage.height))
    else removeMeta('property', 'og:image:height')
    if (ogImage.type) upsertMeta('property', 'og:image:type', ogImage.type)
    else removeMeta('property', 'og:image:type')

    upsertMeta('name', 'twitter:card', card)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', metaDescription)
    upsertMeta('name', 'twitter:image', ogImage.url)
    if (ogImage.alt) upsertMeta('name', 'twitter:image:alt', ogImage.alt)
    else removeMeta('name', 'twitter:image:alt')

    upsertJsonLd(graphJson)
  }, [path, title, description, imageJson, twitterCard, noindex, graphJson])

  return null
}
