/**
 * Renders the `<head>` SEO block that gets injected into each prerendered route
 * HTML file, so crawlers and social scrapers see real metadata without running
 * JavaScript. The runtime `<Seo>` component writes the same tags on navigation.
 */
import {
  SITE,
  absoluteUrl,
  clampDescription,
  defaultOgImage,
  formatTitle,
  normalizePath,
  type PageSeo,
} from '../src/lib/seo/pages.ts'
import { jsonLdGraph, organizationSchema, websiteSchema } from '../src/lib/seo/schema.ts'

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** `</script>` inside JSON-LD would close the tag early. */
function escapeJsonLd(value: string): string {
  return value.replace(/</g, '\\u003c')
}

function meta(key: 'name' | 'property', value: string, content: string): string {
  return `    <meta ${key}="${value}" content="${escapeAttribute(content)}" data-seo="true" />`
}

export function renderHeadTags(siteUrl: string, page: PageSeo): string {
  const path = normalizePath(page.path)
  const canonical = absoluteUrl(siteUrl, path)
  const title = formatTitle(page.title, path)
  const description = clampDescription(page.description || SITE.tagline)
  const image = page.image ?? defaultOgImage(siteUrl)
  const card = page.twitterCard ?? 'summary'

  const lines = [
    `    <title>${escapeHtml(title)}</title>`,
    meta('name', 'description', description),
  ]

  // Noindex pages (404) get no canonical: the URL is not a real page.
  if (!page.noindex) {
    lines.push(`    <link rel="canonical" href="${escapeAttribute(canonical)}" data-seo="true" />`)
  }

  lines.push(
    meta(
      'name',
      'robots',
      page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    ),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', SITE.name),
    meta('property', 'og:locale', SITE.locale),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:url', canonical),
    meta('property', 'og:image', image.url),
  )

  if (image.alt) lines.push(meta('property', 'og:image:alt', image.alt))
  if (image.width) lines.push(meta('property', 'og:image:width', String(image.width)))
  if (image.height) lines.push(meta('property', 'og:image:height', String(image.height)))
  if (image.type) lines.push(meta('property', 'og:image:type', image.type))

  lines.push(
    meta('name', 'twitter:card', card),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', image.url),
  )
  if (image.alt) lines.push(meta('name', 'twitter:image:alt', image.alt))

  const graph = jsonLdGraph([
    websiteSchema(siteUrl),
    organizationSchema(siteUrl),
    ...(page.jsonLd ?? []),
  ])
  lines.push(
    `    <script type="application/ld+json" id="seo-jsonld" data-seo="true">${escapeJsonLd(graph)}</script>`,
  )

  return lines.join('\n')
}
