/**
 * Route → `PageSeo` for the pages whose metadata does not depend on loader data.
 * Shared by the build-time prerender (`seo/plugin.ts`) and by the app pages, so
 * prerendered HTML and client-side navigation always agree.
 *
 * Isomorphic: relative imports with explicit extensions only, no DOM access.
 */
import {
  SITE,
  STATIC_PAGES,
  breadcrumbTrail,
  clampDescription,
  defaultOgImage,
  eventPageSeo,
  blogPostPageSeo,
  findStaticPage,
  normalizePath,
  socialImageFrom,
  type PageSeo,
  type SeoEvent,
  type SeoBlogPost,
} from './pages.ts'
import {
  breadcrumbSchema,
  eventListSchema,
  eventSchema,
  blogListSchema,
  articleSchema,
  webPageSchema,
} from './schema.ts'

/** Schema.org type per static route (defaults to WebPage). */
const PAGE_SCHEMA_TYPE: Record<string, string> = {
  '/': 'WebPage',
  '/about': 'AboutPage',
  '/journey': 'WebPage',
  '/programs': 'CollectionPage',
  '/blog': 'CollectionPage',
  '/get-involved': 'WebPage',
  '/contact': 'ContactPage',
  '/faq': 'WebPage',
}

/**
 * Static-page metadata + WebPage/BreadcrumbList graph. `extraJsonLd` carries
 * page-specific schema (FAQPage, ItemList of Services, …) that needs CMS data.
 */
export function staticPageSeo(path: string, siteUrl: string, extraJsonLd: unknown[] = []): PageSeo {
  const normalized = normalizePath(path)
  const page = findStaticPage(normalized) ?? STATIC_PAGES[0]
  const base: PageSeo = {
    path: page.path,
    title: page.title,
    description: clampDescription(page.description),
    image: defaultOgImage(siteUrl),
    twitterCard: 'summary',
  }
  const breadcrumbs = breadcrumbTrail(page.path)

  return {
    ...base,
    jsonLd: [
      webPageSchema(siteUrl, base, {
        type: PAGE_SCHEMA_TYPE[page.path] ?? 'WebPage',
        breadcrumbs,
      }),
      breadcrumbSchema(siteUrl, breadcrumbs),
      ...extraJsonLd,
    ].filter(Boolean),
  }
}

/** `/programs` with an ItemList of the published events. */
export function programsPageSeo(siteUrl: string, events: SeoEvent[]): PageSeo {
  return staticPageSeo('/programs', siteUrl, [eventListSchema(siteUrl, events)].filter(Boolean))
}

/** `/programs/:slug` — title, description, OG image and Event schema from CMS. */
export function eventDetailSeo(
  siteUrl: string,
  event: SeoEvent,
  options: { status?: string; registerUrl?: string } = {},
): PageSeo {
  const base = eventPageSeo(event, siteUrl)
  const breadcrumbs = breadcrumbTrail(base.path, event.title)

  return {
    ...base,
    jsonLd: [
      webPageSchema(siteUrl, base, { type: 'ItemPage', breadcrumbs }),
      breadcrumbSchema(siteUrl, breadcrumbs),
      eventSchema(siteUrl, event, {
        description: base.description,
        status: options.status,
        registerUrl: options.registerUrl,
      }),
    ].filter(Boolean),
  }
}

/** `/blog` with an ItemList of published articles. */
export function blogPageSeo(
  siteUrl: string,
  posts: Array<{ slug: string; title: string }>,
): PageSeo {
  return staticPageSeo('/blog', siteUrl, [blogListSchema(siteUrl, posts)].filter(Boolean))
}

/** `/blog/:slug` — title, description, OG image and BlogPosting schema from CMS. */
export function blogPostSeo(siteUrl: string, post: SeoBlogPost): PageSeo {
  const base = blogPostPageSeo(post, siteUrl)
  const breadcrumbs = breadcrumbTrail(base.path, post.title)

  return {
    ...base,
    jsonLd: [
      webPageSchema(siteUrl, base, { type: 'ItemPage', breadcrumbs }),
      breadcrumbSchema(siteUrl, breadcrumbs),
      articleSchema(siteUrl, post, { description: base.description }),
    ].filter(Boolean),
  }
}

/** 404 — intentionally `noindex, follow`, and never listed in the sitemap. */
export function notFoundSeo(siteUrl: string, path = '/404'): PageSeo {
  const image = socialImageFrom(undefined, undefined, defaultOgImage(siteUrl))
  return {
    path: normalizePath(path),
    title: 'Page not found',
    description: `The page you are looking for is not available. Explore the Young Ministers Movement: ${SITE.tagline}`,
    image: image.image,
    twitterCard: image.twitterCard,
    noindex: true,
  }
}
