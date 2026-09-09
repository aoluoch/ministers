/**
 * `sitemap.xml` + `robots.txt` generation. Pure string builders so they can be
 * used from the Vite build hook and from the dev/preview middleware.
 */
import {
  STATIC_PAGES,
  absoluteUrl,
  blogPath,
  eventPath,
  normalizeSiteUrl,
  type ChangeFrequency,
  type SeoBlogPost,
  type SeoEvent,
} from '../src/lib/seo/pages.ts'

export type SitemapEntry = {
  loc: string
  lastmod?: string
  changefreq?: ChangeFrequency
  priority?: number
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toIsoDay(value: string | undefined, fallback: string): string {
  if (!value) return fallback
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return fallback
  return date.toISOString().slice(0, 10)
}

/**
 * Every public, indexable URL: the static pages plus one entry per published
 * Contentful program. Admin/auth/dashboard routes do not exist in this app, and
 * the 404 route is intentionally excluded.
 */
export function buildSitemapEntries(
  siteUrl: string,
  events: SeoEvent[],
  posts: SeoBlogPost[] = [],
  now = new Date(),
): SitemapEntry[] {
  const origin = normalizeSiteUrl(siteUrl)
  const today = now.toISOString().slice(0, 10)

  const staticEntries: SitemapEntry[] = STATIC_PAGES.map((page) => ({
    loc: absoluteUrl(origin, page.path),
    lastmod: today,
    changefreq: page.changeFrequency,
    priority: page.priority,
  }))

  const eventEntries: SitemapEntry[] = events.map((event) => ({
    loc: absoluteUrl(origin, eventPath(event.slug)),
    lastmod: toIsoDay(event.updatedAt, today),
    changefreq: 'monthly' as ChangeFrequency,
    priority: 0.7,
  }))

  const postEntries: SitemapEntry[] = posts.map((post) => ({
    loc: absoluteUrl(origin, blogPath(post.slug)),
    lastmod: toIsoDay(post.updatedAt, today),
    changefreq: 'monthly' as ChangeFrequency,
    priority: 0.7,
  }))

  const seen = new Set<string>()
  return [...staticEntries, ...eventEntries, ...postEntries].filter((entry) => {
    if (seen.has(entry.loc)) return false
    seen.add(entry.loc)
    return true
  })
}

export function renderSitemap(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const parts = [`    <loc>${escapeXml(entry.loc)}</loc>`]
      if (entry.lastmod) parts.push(`    <lastmod>${entry.lastmod}</lastmod>`)
      if (entry.changefreq) parts.push(`    <changefreq>${entry.changefreq}</changefreq>`)
      if (typeof entry.priority === 'number') {
        parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`)
      }
      return `  <url>\n${parts.join('\n')}\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

/**
 * Crawlable everywhere (CSS/JS included, so Google can render the SPA) except
 * private areas and tracking-parameter duplicates. There is no admin/auth area
 * in this app today; the disallow list keeps those paths private if added later.
 */
export function renderRobots(siteUrl: string): string {
  const origin = normalizeSiteUrl(siteUrl)
  return `# robots.txt for ${origin}
User-agent: *
Allow: /

# Private / non-public areas (kept out of the index if ever added)
Disallow: /admin
Disallow: /dashboard
Disallow: /login
Disallow: /logout
Disallow: /signup
Disallow: /account
Disallow: /api/
Disallow: /preview
Disallow: /draft

# Tracking-parameter duplicates of canonical pages
Disallow: /*?*utm_
Disallow: /*?*fbclid=
Disallow: /*?*gclid=
Disallow: /*?*mc_cid=

# Build artefacts
Disallow: /*.map$

Sitemap: ${origin}/sitemap.xml
`
}
