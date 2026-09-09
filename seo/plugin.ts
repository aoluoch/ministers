/**
 * Vite plugin: production SEO artefacts for this SPA.
 *
 * Build (`vite build`):
 *  1. `dist/sitemap.xml` — static pages + one URL per published Contentful program/article
 *  2. `dist/robots.txt`  — allows public crawling, blocks private paths, links the sitemap
 *  3. `dist/<route>/index.html` — a copy of `index.html` per public route with that
 *     route's real `<title>`, description, canonical, OG/Twitter tags and JSON-LD
 *     injected, plus `dist/404.html`. Crawlers that do not execute JS therefore
 *     still read correct per-page metadata; the app itself is unchanged (same
 *     bundle, same `#root`), and the runtime `<Seo>` component keeps tags in sync
 *     during client-side navigation.
 *
 * Dev / preview: `/sitemap.xml` and `/robots.txt` are served by middleware so the
 * exact production output can be verified locally.
 */
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { Connect, Plugin, ResolvedConfig } from 'vite'
import { loadEnv } from 'vite'
import {
  STATIC_PAGES,
  blogPath,
  eventPath,
  normalizeSiteUrl,
  type PageSeo,
  type SeoBlogPost,
  type SeoEvent,
} from '../src/lib/seo/pages.ts'
import {
  blogPageSeo,
  blogPostSeo,
  eventDetailSeo,
  notFoundSeo,
  programsPageSeo,
  staticPageSeo,
} from '../src/lib/seo/routes.ts'
import { fetchSeoBlogPosts, fetchSeoEvents, fetchTitleDescriptionEntries } from './contentful.ts'
import { renderHeadTags } from './head.ts'
import { buildSitemapEntries, renderRobots, renderSitemap } from './sitemap.ts'
import { faqSchema, serviceListSchema } from '../src/lib/seo/schema.ts'

const SEO_START = '<!--seo-head-start-->'
const SEO_END = '<!--seo-head-end-->'

/** Replace the marker block in `index.html` with a route's head tags. */
function injectHead(html: string, headTags: string): string {
  const start = html.indexOf(SEO_START)
  const end = html.indexOf(SEO_END)
  if (start === -1 || end === -1 || end < start) {
    // Marker missing (hand-edited index.html): fall back to appending to <head>.
    return html.replace('</head>', `${headTags}\n  </head>`)
  }
  return `${html.slice(0, start)}${SEO_START}\n${headTags}\n    ${html.slice(end)}`
}

type Artefacts = {
  siteUrl: string
  events: SeoEvent[]
  posts: SeoBlogPost[]
  faqs: Array<{ title: string; description: string }>
  pathways: Array<{ title: string; description: string }>
  sitemap: string
  robots: string
}

async function collect(config: ResolvedConfig): Promise<Artefacts> {
  const env = loadEnv(config.mode, config.envDir ?? config.root, '')
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL || process.env.VITE_SITE_URL)
  const contentfulEnv = {
    spaceId: env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: env.VITE_CONTENTFUL_ACCESS_TOKEN,
    environment: env.VITE_CONTENTFUL_ENVIRONMENT,
  }

  const [events, posts, faqs, pathways] = await Promise.all([
    fetchSeoEvents(contentfulEnv),
    fetchSeoBlogPosts(contentfulEnv),
    fetchTitleDescriptionEntries(contentfulEnv, 'faq'),
    fetchTitleDescriptionEntries(contentfulEnv, 'getInvolved'),
  ])

  return {
    siteUrl,
    events,
    posts,
    faqs,
    pathways,
    sitemap: renderSitemap(buildSitemapEntries(siteUrl, events, posts)),
    robots: renderRobots(siteUrl),
  }
}

/** Every route that gets its own prerendered HTML file. */
function routePages(built: Artefacts): Array<{ file: string; page: PageSeo }> {
  const { siteUrl, events, posts, faqs, pathways } = built

  const faqSchemaNode = faqSchema(
    siteUrl,
    faqs.map((item) => ({ question: item.title, answer: item.description })),
  )
  const serviceSchemaNode = serviceListSchema(
    siteUrl,
    '/get-involved',
    'Ways to get involved',
    pathways,
  )

  const extraFor = (path: string): unknown[] => {
    if (path === '/faq') return faqSchemaNode ? [faqSchemaNode] : []
    if (path === '/get-involved') return serviceSchemaNode ? [serviceSchemaNode] : []
    return []
  }

  const pages: Array<{ file: string; page: PageSeo }> = STATIC_PAGES.map((page) => ({
    file: page.path === '/' ? 'index.html' : `${page.path.replace(/^\//, '')}/index.html`,
    page:
      page.path === '/programs'
        ? programsPageSeo(siteUrl, events)
        : page.path === '/blog'
          ? blogPageSeo(siteUrl, posts)
          : staticPageSeo(page.path, siteUrl, extraFor(page.path)),
  }))

  for (const event of events) {
    pages.push({
      file: `${eventPath(event.slug).replace(/^\//, '')}/index.html`,
      page: eventDetailSeo(siteUrl, event),
    })
  }

  for (const post of posts) {
    pages.push({
      file: `${blogPath(post.slug).replace(/^\//, '')}/index.html`,
      page: blogPostSeo(siteUrl, post),
    })
  }

  pages.push({ file: '404.html', page: notFoundSeo(siteUrl) })
  return pages
}

export function seoPlugin(): Plugin {
  let config: ResolvedConfig
  let artefacts: Artefacts | null = null

  const ensure = async (): Promise<Artefacts> => {
    if (!artefacts) artefacts = await collect(config)
    return artefacts
  }

  /** Serves the real sitemap/robots in `vite dev` and `vite preview`. */
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    const url = (req.url ?? '').split('?')[0]
    if (url !== '/sitemap.xml' && url !== '/robots.txt') {
      next()
      return
    }

    ensure()
      .then((built) => {
        if (url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8')
          res.end(built.sitemap)
          return
        }
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(built.robots)
      })
      .catch(next)
  }

  /**
   * `vite preview` does not resolve `/about` → `dist/about/index.html` before its
   * SPA fallback, but production static hosts (Netlify, Vercel `cleanUrls`,
   * Cloudflare Pages) do. This mirrors that behaviour so the prerendered head can
   * be verified locally exactly as it will be served.
   */
  const directoryIndexMiddleware: Connect.NextHandleFunction = (req, _res, next) => {
    const url = (req.url ?? '').split('?')[0]
    if (!url || url === '/' || path.extname(url)) {
      next()
      return
    }

    const outDir = path.resolve(config.root, config.build.outDir)
    const candidate = path.join(outDir, url.replace(/\/+$/, ''), 'index.html')
    if (candidate.startsWith(outDir) && existsSync(candidate)) {
      req.url = `${url.replace(/\/+$/, '')}/index.html`
    }
    next()
  }

  return {
    name: 'ymm-seo',

    configResolved(resolved) {
      config = resolved
    },

    configureServer(server) {
      server.middlewares.use(middleware)
    },

    configurePreviewServer(server) {
      server.middlewares.use(middleware)
      server.middlewares.use(directoryIndexMiddleware)
    },

    /** Home-page metadata for the canonical `index.html`. */
    async transformIndexHtml(html) {
      if (config.command !== 'build') return html
      const built = await ensure()
      return injectHead(html, renderHeadTags(built.siteUrl, staticPageSeo('/', built.siteUrl)))
    },

    async closeBundle() {
      if (config.command !== 'build') return

      const built = await ensure()
      const outDir = path.resolve(config.root, config.build.outDir)
      const indexPath = path.join(outDir, 'index.html')

      let indexHtml: string
      try {
        indexHtml = await readFile(indexPath, 'utf8')
      } catch {
        console.warn('[seo] dist/index.html not found — skipped SEO output')
        return
      }

      await writeFile(path.join(outDir, 'sitemap.xml'), built.sitemap, 'utf8')
      await writeFile(path.join(outDir, 'robots.txt'), built.robots, 'utf8')

      let written = 0
      for (const { file, page } of routePages(built)) {
        if (file === 'index.html') continue

        const target = path.join(outDir, file)
        await mkdir(path.dirname(target), { recursive: true })
        await writeFile(target, injectHead(indexHtml, renderHeadTags(built.siteUrl, page)), 'utf8')
        written += 1
      }

      const urlCount = buildSitemapEntries(built.siteUrl, built.events, built.posts).length
      console.log(
        `[seo] ${built.siteUrl} → sitemap.xml (${urlCount} URLs, ${built.events.length + built.posts.length} dynamic), robots.txt, ${written + 1} pages with prerendered head`,
      )
    },
  }
}
