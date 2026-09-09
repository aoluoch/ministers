/**
 * Isomorphic SEO metadata: used by the React app *and* by the build-time
 * sitemap/robots/prerender plugin (`seo/plugin.ts`).
 *
 * Constraints (because `vite.config.ts` loads this file outside the app build):
 *  - no `@/` alias imports — relative imports with explicit extensions only
 *  - no DOM APIs and no `import.meta.env`
 *
 * Page titles/descriptions below mirror the published Contentful copy for each
 * page. Keep them factual — they are the text Google shows in search results.
 */
import { siteContent } from '../../content/site.ts'

/** Fallback production origin. Override per environment with `VITE_SITE_URL`. */
export const DEFAULT_SITE_URL = 'https://youngministers.org'

export type SeoImage = {
  url: string
  width?: number
  height?: number
  alt?: string
  type?: string
}

export type TwitterCard = 'summary' | 'summary_large_image'

export type PageSeo = {
  /** Route path, always starting with `/` (no query string, no hash). */
  path: string
  title: string
  description: string
  image?: SeoImage
  twitterCard?: TwitterCard
  /** Only for pages that must stay out of the index (404 / error states). */
  noindex?: boolean
  jsonLd?: unknown[]
}

export type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export type StaticPageSeo = {
  path: string
  /** Short label used for breadcrumbs and internal links. */
  label: string
  title: string
  description: string
  changeFrequency: ChangeFrequency
  priority: number
}

export const SITE = {
  name: siteContent.name,
  shortName: siteContent.shortName,
  tagline: siteContent.footerTagline,
  locale: 'en_US',
  /** Brand logo in `public/` (1254 × 1254). */
  logoPath: siteContent.logoSrc,
  logoWidth: 1254,
  logoHeight: 1254,
  logoAlt: siteContent.logoAlt,
  phone: siteContent.phone,
  streetAddress: siteContent.location,
  sameAs: siteContent.socials.map((social) => social.href),
} as const

/** Programs list page — parent of every event detail page. */
export const PROGRAMS_PATH = '/programs'

/** Blog list page — parent of every article detail page. */
export const BLOG_PATH = '/blog'

/** Public, indexable pages. Single source of truth for sitemap + prerender. */
export const STATIC_PAGES: StaticPageSeo[] = [
  {
    path: '/',
    label: 'Home',
    title: 'Young Ministers Movement — Belong, Become, Build, Beyond',
    description:
      'A global movement raising up young ministers of the gospel and equipping them to operate confidently on the global stage.',
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    path: '/about',
    label: 'About',
    title: 'About the Young Ministers Movement',
    description:
      'Why the movement exists: our vision, mission, core values, and the chapter leaders serving young ministers across the UK, USA, Canada, Ghana, and Kenya.',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/journey',
    label: 'Journey',
    title: 'The Journey: Belong, Become, Build, Beyond',
    description:
      'The development path every young minister walks in the movement — belonging, becoming, building, and going beyond through community, training, and mentorship.',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: PROGRAMS_PATH,
    label: 'Programs',
    title: 'Programs & Gatherings',
    description:
      'The Young Ministers Summit introduced the movement. Programs are the public gatherings where young ministers train, connect, and are sent.',
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    path: BLOG_PATH,
    label: 'Blog',
    title: 'Blog',
    description:
      'Stories, teaching, and updates from the Young Ministers Movement — belonging, becoming, building, and going beyond.',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    path: '/get-involved',
    label: 'Get Involved',
    title: 'Get Involved',
    description:
      'Mentorship, training, platforms, and a global family — find your place in the Young Ministers Movement and take the next step.',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    path: '/contact',
    label: 'Contact',
    title: 'Contact the Movement',
    description:
      'Get in touch with the Young Ministers Movement. Chapters across the UK, USA, Canada, Ghana, and Kenya — reach out and we will connect you.',
    changeFrequency: 'yearly',
    priority: 0.6,
  },
  {
    path: '/faq',
    label: 'FAQ',
    title: 'Frequently Asked Questions',
    description:
      'Answers about joining the Young Ministers Movement, the training you receive, ministry departments, and how the movement differs from the Summit.',
    changeFrequency: 'monthly',
    priority: 0.6,
  },
]

/** Trim a trailing slash and any accidental whitespace from a site origin. */
export function normalizeSiteUrl(value: string | undefined | null): string {
  const raw = (value ?? '').trim()
  if (!raw) return DEFAULT_SITE_URL
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  return withProtocol.replace(/\/+$/, '')
}

/** Normalise a route path: leading slash, no trailing slash, no query/hash. */
export function normalizePath(path: string): string {
  const withoutQuery = (path || '/').split('#')[0].split('?')[0]
  const withLeading = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`
  if (withLeading === '/') return '/'
  return withLeading.replace(/\/+$/, '') || '/'
}

/** Canonical absolute HTTPS URL for a route. */
export function absoluteUrl(siteUrl: string, path: string): string {
  const origin = normalizeSiteUrl(siteUrl)
  const normalized = normalizePath(path)
  return normalized === '/' ? `${origin}/` : `${origin}${normalized}`
}

/** `Page title | Young Ministers Movement` (home page keeps its own title). */
export function formatTitle(title: string, path: string): string {
  const trimmed = title.trim()
  if (!trimmed) return SITE.name
  if (normalizePath(path) === '/') return trimmed
  if (trimmed.toLowerCase().includes(SITE.name.toLowerCase())) return trimmed
  return `${trimmed} | ${SITE.name}`
}

/** Keep descriptions inside the length Google renders, without cutting words. */
export function clampDescription(value: string, max = 165): string {
  const text = value.replace(/\s+/g, ' ').trim()
  if (text.length <= max) return text
  const clipped = text.slice(0, max - 1)
  const lastSpace = clipped.lastIndexOf(' ')
  const base = lastSpace > 60 ? clipped.slice(0, lastSpace) : clipped
  return `${base.replace(/[,.;:—-]$/, '')}…`
}

export function findStaticPage(path: string): StaticPageSeo | undefined {
  const normalized = normalizePath(path)
  return STATIC_PAGES.find((page) => page.path === normalized)
}

/** Brand logo as the default social-share image. */
export function defaultOgImage(siteUrl: string): SeoImage {
  return {
    url: absoluteUrl(siteUrl, SITE.logoPath),
    width: SITE.logoWidth,
    height: SITE.logoHeight,
    alt: SITE.logoAlt,
    type: SITE.logoPath.endsWith('.png') ? 'image/png' : 'image/jpeg',
  }
}

function withHttps(url: string): string {
  return url.startsWith('//') ? `https:${url}` : url
}

const CONTENTFUL_IMAGE_HOST = 'images.ctfassets.net'

/**
 * Turn a Contentful asset URL into a 1200 × 630 social card via the Images API
 * (padded on brand navy so logos/portraits are never cropped awkwardly).
 * Non-Contentful URLs are passed through unchanged.
 */
export function socialImageFrom(
  url: string | undefined | null,
  alt: string | undefined,
  fallback: SeoImage,
): { image: SeoImage; twitterCard: TwitterCard } {
  if (!url) return { image: fallback, twitterCard: 'summary' }
  const absolute = withHttps(url)
  if (!absolute.includes(CONTENTFUL_IMAGE_HOST)) {
    return { image: { url: absolute, alt }, twitterCard: 'summary_large_image' }
  }
  const [base] = absolute.split('?')
  return {
    image: {
      url: `${base}?w=1200&h=630&fit=pad&bg=rgb%3A430158&fm=jpg&q=80`,
      width: 1200,
      height: 630,
      alt,
      type: 'image/jpeg',
    },
    twitterCard: 'summary_large_image',
  }
}

/** Optimised Contentful delivery URL (WebP) for on-page `<img>` usage. */
export function contentfulImageUrl(
  url: string,
  options: {
    width?: number
    height?: number
    quality?: number
    fit?: 'fill' | 'pad' | 'thumb'
  } = {},
): string {
  const absolute = withHttps(url)
  if (!absolute.includes(CONTENTFUL_IMAGE_HOST)) return absolute

  const [base] = absolute.split('?')
  const params = new URLSearchParams()
  if (options.width) params.set('w', String(Math.round(options.width)))
  if (options.height) params.set('h', String(Math.round(options.height)))
  if (options.fit) params.set('fit', options.fit)
  params.set('fm', 'webp')
  params.set('q', String(options.quality ?? 78))
  return `${base}?${params.toString()}`
}

export type BreadcrumbItem = { name: string; path: string }

/** Breadcrumb trail for a route (Home → parent → current page). */
export function breadcrumbTrail(path: string, currentLabel?: string): BreadcrumbItem[] {
  const normalized = normalizePath(path)
  const home: BreadcrumbItem = { name: 'Home', path: '/' }
  if (normalized === '/') return [home]

  const staticPage = findStaticPage(normalized)
  if (staticPage) return [home, { name: staticPage.label, path: staticPage.path }]

  if (normalized.startsWith(`${PROGRAMS_PATH}/`)) {
    const programs = findStaticPage(PROGRAMS_PATH)
    return [
      home,
      { name: programs?.label ?? 'Programs', path: PROGRAMS_PATH },
      { name: currentLabel ?? 'Event', path: normalized },
    ]
  }

  if (normalized.startsWith(`${BLOG_PATH}/`)) {
    const blog = findStaticPage(BLOG_PATH)
    return [
      home,
      { name: blog?.label ?? 'Blog', path: BLOG_PATH },
      { name: currentLabel ?? 'Article', path: normalized },
    ]
  }

  return [home, { name: currentLabel ?? 'Page', path: normalized }]
}

/** Minimal event shape shared by the app and the build-time generator. */
export type SeoEvent = {
  slug: string
  title: string
  summary?: string
  /** ISO date from Contentful (`programs.date`). */
  dateIso?: string
  dateLabel?: string
  location?: string
  imageUrl?: string
  imageAlt?: string
  /** Contentful `sys.updatedAt`, used for sitemap `lastmod`. */
  updatedAt?: string
}

export function eventPath(slug: string): string {
  return `${PROGRAMS_PATH}/${slug}`
}

export function blogPath(slug: string): string {
  return `${BLOG_PATH}/${slug}`
}

/** Title/description for an event detail page, built from real CMS content. */
export function eventPageSeo(event: SeoEvent, siteUrl: string): PageSeo {
  const description = clampDescription(
    event.summary?.trim() ||
      [event.title, event.dateLabel, event.location].filter(Boolean).join(' · ') ||
      SITE.tagline,
  )
  const { image, twitterCard } = socialImageFrom(
    event.imageUrl,
    event.imageAlt || event.title,
    defaultOgImage(siteUrl),
  )

  return {
    path: eventPath(event.slug),
    title: event.title,
    description,
    image,
    twitterCard,
  }
}

/** Minimal article shape shared by the app and the build-time generator. */
export type SeoBlogPost = {
  slug: string
  title: string
  summary?: string
  dateIso?: string
  dateLabel?: string
  author?: string
  imageUrl?: string
  imageAlt?: string
  updatedAt?: string
}

/** Title/description for a blog article page, built from real CMS content. */
export function blogPostPageSeo(post: SeoBlogPost, siteUrl: string): PageSeo {
  const description = clampDescription(
    post.summary?.trim() ||
      [post.title, post.dateLabel, post.author].filter(Boolean).join(' · ') ||
      SITE.tagline,
  )
  const { image, twitterCard } = socialImageFrom(
    post.imageUrl,
    post.imageAlt || post.title,
    defaultOgImage(siteUrl),
  )

  return {
    path: blogPath(post.slug),
    title: post.title,
    description,
    image,
    twitterCard,
  }
}
