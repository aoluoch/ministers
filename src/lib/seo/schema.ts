/**
 * Schema.org JSON-LD builders. Isomorphic (app + build-time prerender), so:
 *  - relative imports with explicit extensions only
 *  - no DOM APIs, no `import.meta.env`
 *
 * Every value here comes from real site/CMS content — never invent facts.
 */
import {
  SITE,
  absoluteUrl,
  breadcrumbTrail,
  type BreadcrumbItem,
  type PageSeo,
  type SeoEvent,
} from './pages.ts'

type JsonLdObject = Record<string, unknown>

export const WEBSITE_ID_SUFFIX = '/#website'
export const ORGANIZATION_ID_SUFFIX = '/#organization'

function organizationId(siteUrl: string): string {
  return `${siteUrl}${ORGANIZATION_ID_SUFFIX}`
}

function websiteId(siteUrl: string): string {
  return `${siteUrl}${WEBSITE_ID_SUFFIX}`
}

/** Organization — the movement itself. Emitted site-wide. */
export function organizationSchema(siteUrl: string): JsonLdObject {
  return {
    '@type': 'Organization',
    '@id': organizationId(siteUrl),
    name: SITE.name,
    alternateName: SITE.shortName,
    url: absoluteUrl(siteUrl, '/'),
    description: SITE.tagline,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(siteUrl, SITE.logoPath),
      width: SITE.logoWidth,
      height: SITE.logoHeight,
      caption: SITE.logoAlt,
    },
    image: absoluteUrl(siteUrl, SITE.logoPath),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.streetAddress,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'general enquiries',
      telephone: SITE.phone,
      url: absoluteUrl(siteUrl, '/contact'),
      availableLanguage: 'en',
    },
    sameAs: [...SITE.sameAs],
  }
}

/** WebSite — emitted site-wide alongside Organization. */
export function websiteSchema(siteUrl: string): JsonLdObject {
  return {
    '@type': 'WebSite',
    '@id': websiteId(siteUrl),
    name: SITE.name,
    alternateName: SITE.shortName,
    url: absoluteUrl(siteUrl, '/'),
    description: SITE.tagline,
    inLanguage: 'en',
    publisher: { '@id': organizationId(siteUrl) },
  }
}

export function breadcrumbSchema(
  siteUrl: string,
  items: BreadcrumbItem[],
): JsonLdObject | null {
  if (items.length < 2) return null
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(siteUrl, items[items.length - 1].path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(siteUrl, item.path),
    })),
  }
}

/**
 * WebPage (or a more specific subtype such as AboutPage / ContactPage / FAQPage)
 * describing the current URL.
 */
export function webPageSchema(
  siteUrl: string,
  page: PageSeo,
  options: { type?: string; breadcrumbs?: BreadcrumbItem[] } = {},
): JsonLdObject {
  const url = absoluteUrl(siteUrl, page.path)
  const breadcrumbs = options.breadcrumbs ?? breadcrumbTrail(page.path)
  const schema: JsonLdObject = {
    '@type': options.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en',
    isPartOf: { '@id': websiteId(siteUrl) },
    about: { '@id': organizationId(siteUrl) },
  }
  if (page.image?.url) {
    schema.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: page.image.url,
      ...(page.image.width ? { width: page.image.width } : {}),
      ...(page.image.height ? { height: page.image.height } : {}),
      ...(page.image.alt ? { caption: page.image.alt } : {}),
    }
  }
  if (breadcrumbs.length > 1) {
    schema.breadcrumb = { '@id': `${url}#breadcrumb` }
  }
  return schema
}

/** `upcoming` / `ongoing` / `past` → schema.org eventStatus. */
function eventStatusUrl(status: string | undefined): string {
  return status === 'cancelled'
    ? 'https://schema.org/EventCancelled'
    : 'https://schema.org/EventScheduled'
}

/**
 * Event schema for a program detail page. Only fields actually published in
 * Contentful are emitted (no placeholder prices, offers, or performers).
 */
export function eventSchema(
  siteUrl: string,
  event: SeoEvent,
  options: { description?: string; status?: string; registerUrl?: string } = {},
): JsonLdObject {
  const url = absoluteUrl(siteUrl, `/programs/${event.slug}`)
  const schema: JsonLdObject = {
    '@type': 'Event',
    '@id': `${url}#event`,
    name: event.title,
    url,
    eventStatus: eventStatusUrl(options.status),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    organizer: { '@id': organizationId(siteUrl) },
    isPartOf: { '@id': websiteId(siteUrl) },
  }

  const description = (options.description ?? event.summary ?? '').trim()
  if (description) schema.description = description
  if (event.dateIso) schema.startDate = event.dateIso
  if (event.location) {
    schema.location = {
      '@type': 'Place',
      name: event.location,
      address: { '@type': 'PostalAddress', streetAddress: event.location },
    }
  }
  if (event.imageUrl) schema.image = event.imageUrl
  if (options.registerUrl) {
    schema.offers = {
      '@type': 'Offer',
      url: options.registerUrl,
      availability: 'https://schema.org/InStock',
    }
  }
  return schema
}

/** ItemList of program/event links for the `/programs` list page. */
export function eventListSchema(
  siteUrl: string,
  events: Array<{ slug: string; title: string }>,
): JsonLdObject | null {
  if (!events.length) return null
  const url = absoluteUrl(siteUrl, '/programs')
  return {
    '@type': 'ItemList',
    '@id': `${url}#programs`,
    name: 'Programs & gatherings',
    numberOfItems: events.length,
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: event.title,
      url: absoluteUrl(siteUrl, `/programs/${event.slug}`),
    })),
  }
}

/** FAQPage — only when real question/answer pairs exist in Contentful. */
export function faqSchema(
  siteUrl: string,
  items: Array<{ question: string; answer: string }>,
): JsonLdObject | null {
  const valid = items.filter((item) => item.question.trim() && item.answer.trim())
  if (!valid.length) return null
  const url = absoluteUrl(siteUrl, '/faq')
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    name: 'Frequently asked questions',
    inLanguage: 'en',
    isPartOf: { '@id': websiteId(siteUrl) },
    mainEntity: valid.map((item) => ({
      '@type': 'Question',
      name: item.question.trim(),
      acceptedAnswer: { '@type': 'Answer', text: item.answer.trim() },
    })),
  }
}

/**
 * Service items for what the movement actually provides (Get Involved
 * pathways). Rendered as an ItemList of Service nodes.
 */
export function serviceListSchema(
  siteUrl: string,
  path: string,
  name: string,
  services: Array<{ title: string; description: string }>,
): JsonLdObject | null {
  const valid = services.filter((service) => service.title.trim())
  if (!valid.length) return null
  const url = absoluteUrl(siteUrl, path)
  return {
    '@type': 'ItemList',
    '@id': `${url}#services`,
    name,
    numberOfItems: valid.length,
    itemListElement: valid.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title.trim(),
        ...(service.description.trim() ? { description: service.description.trim() } : {}),
        serviceType: 'Ministry training and mentorship',
        provider: { '@id': organizationId(siteUrl) },
        areaServed: 'Worldwide',
        url,
      },
    })),
  }
}

/** Wrap graph nodes into a single `@context` document for one `<script>` tag. */
export function jsonLdGraph(nodes: unknown[]): string {
  const graph = nodes.filter(Boolean)
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}
