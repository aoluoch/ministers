import type { Asset, Entry } from 'contentful'
import type {
  AboutPageContent,
  ContactPageContent,
  EventItem,
  ExploreItem,
  FaqPageContent,
  GetInvolvedPageContent,
  ExploreLinksProps,
  HeroSectionProps,
  HomePageContent,
  ProgramsPageContent,
  TextBlockProps,
  TrackRecordProps,
} from '@/types/content'
import {
  asCta,
  asJsonArray,
  asOptionalString,
  asParagraphs,
  asString,
  asTone,
  assetAlt,
  assetCaption,
  assetUrl,
  fieldsOf,
} from './helpers'
import type {
  AboutPageSkeleton,
  ContactPageSkeleton,
  EventSkeleton,
  FaqPageSkeleton,
  GetInvolvedPageSkeleton,
  HeroSectionSkeleton,
  HomeExploreLinksSkeleton,
  HomePageSkeleton,
  HomeTextBlockSkeleton,
  HomeTrackRecordSkeleton,
  ProgramsPageSkeleton,
} from './types'

export function mapHeroSection(
  entry: Entry<HeroSectionSkeleton, undefined, string>,
): HeroSectionProps {
  const f = fieldsOf(entry)
  return {
    brandName: asString(f.heroBrandName),
    headline: asString(f.heroHeadline),
    body: asString(f.heroBody),
    supportingLine: asString(f.heroSupportingLine),
    primaryCta: asCta(f.heroCtaLabel, f.heroCtaHref) ?? {
      label: 'Register',
      href: '/programs',
    },
  }
}

export function mapHomeTextBlock(
  entry: Entry<HomeTextBlockSkeleton, undefined, string>,
): TextBlockProps {
  const f = fieldsOf(entry)
  return {
    title: asString(f.aboutTitle),
    paragraphs: asParagraphs(f.aboutParagraph),
    quote: asString(f.aboutQuote),
  }
}

export function mapHomeExploreLinks(
  entry: Entry<HomeExploreLinksSkeleton, undefined, string>,
): ExploreLinksProps {
  const f = fieldsOf(entry)
  return {
    title: asString(f.exploreTitle),
    items: asJsonArray<ExploreItem>(f.exploreItems).filter(
      (item) =>
        typeof item?.title === 'string' &&
        typeof item?.description === 'string' &&
        typeof item?.href === 'string' &&
        typeof item?.linkLabel === 'string',
    ),
  }
}

export function mapHomeTrackRecord(
  entry: Entry<HomeTrackRecordSkeleton, undefined, string>,
): TrackRecordProps {
  const f = fieldsOf(entry)
  return {
    title: asString(f.trackRecordTitle),
    paragraphs: asParagraphs(f.trackRecordParagraph),
    quote: asString(f.trackRecordQuote),
  }
}

/** Maps remaining home sections when a monolithic `homePage` entry exists. */
export function mapHomePageRest(
  entry: Entry<HomePageSkeleton, undefined, string>,
): Omit<HomePageContent, 'hero'> {
  const f = fieldsOf(entry)
  const primaryCta = asCta(f.readyCtaPrimaryLabel, f.readyCtaPrimaryHref)

  return {
    about: {
      title: asString(f.aboutTitle),
      paragraphs: asParagraphs(f.aboutParagraphs),
      quote: asOptionalString(f.aboutQuote),
    },
    explore: {
      title: asString(f.exploreTitle),
      items: asJsonArray<ExploreItem>(f.exploreItems),
    },
    trackRecord: {
      title: asString(f.trackRecordTitle),
      paragraphs: asParagraphs(f.trackRecordParagraphs),
      quote: asString(f.trackRecordQuote),
    },
    testimonials: {
      title: asString(f.testimonialsTitle),
      quotes: asJsonArray<{ quote: string }>(f.testimonialQuotes),
      story: asString(f.testimonialStory),
    },
    readyCta: {
      title: asString(f.readyCtaTitle),
      body: asOptionalString(f.readyCtaBody),
      primaryCta: primaryCta ?? { label: 'Register', href: '/programs' },
      tone: asTone(f.readyCtaTone),
    },
  }
}

export function mapAboutPage(
  entry: Entry<AboutPageSkeleton, undefined, string>,
): AboutPageContent {
  const f = fieldsOf(entry)
  const primary = asCta(f.joinCtaPrimaryLabel, f.joinCtaPrimaryHref)

  return {
    whyWeExist: {
      title: asString(f.whyTitle),
      paragraphs: asParagraphs(f.whyParagraphs),
    },
    mission: {
      title: asString(f.missionTitle),
      body: asString(f.missionBody),
    },
    beliefs: {
      title: asString(f.beliefsTitle),
      intro: asString(f.beliefsIntro),
      beliefs: asJsonArray(f.beliefsList),
    },
    difference: {
      title: asString(f.differenceTitle),
      paragraphs: asParagraphs(f.differenceParagraphs),
      quotes: asJsonArray<string | { text: string }>(f.differenceQuotes).map(
        (q) => (typeof q === 'string' ? q : asString(q.text)),
      ),
    },
    leadership: {
      title: asString(f.leadershipTitle),
      leaders: asJsonArray(f.leaders),
    },
    joinCta: {
      title: asString(f.joinCtaTitle),
      body: asOptionalString(f.joinCtaBody),
      primaryCta: primary ?? { label: 'Programs', href: '/programs' },
      secondaryCta: asCta(f.joinCtaSecondaryLabel, f.joinCtaSecondaryHref),
      tone: asTone(f.joinCtaTone),
    },
  }
}

export function mapProgramsPageChrome(
  entry: Entry<ProgramsPageSkeleton, undefined, string>,
  events: EventItem[],
): ProgramsPageContent {
  const f = fieldsOf(entry)
  return {
    list: {
      title: asString(f.title),
      intro: asString(f.intro),
      events,
      footerNote: asOptionalString(f.footerNote),
      footerCta: asCta(f.footerCtaLabel, f.footerCtaHref),
    },
  }
}

function asEventStatus(value: unknown): EventItem['status'] {
  if (value === 'upcoming' || value === 'ongoing' || value === 'past') return value
  return 'upcoming'
}

export function mapEvent(
  entry: Entry<EventSkeleton, undefined, string>,
): EventItem {
  const f = fieldsOf(entry)
  const title = asString(f.title)
  const cover = f.coverImage as Asset | undefined
  const photos = (Array.isArray(f.photos) ? f.photos : []) as Asset[]

  return {
    slug: asString(f.slug),
    title,
    cadence: asString(f.cadence),
    status: asEventStatus(f.status),
    summary: asString(f.summary),
    dateLabel: asString(f.dateLabel),
    timeLabel: asOptionalString(f.timeLabel),
    location: asString(f.location),
    coverImage: (() => {
      const src = assetUrl(cover)
      if (!src) return undefined
      return { src, alt: assetAlt(cover, title) }
    })(),
    body: asParagraphs(f.body),
    highlights: (() => {
      const list = asJsonArray<string>(f.highlights)
      return list.length ? list : undefined
    })(),
    photos: photos
      .map((asset) => {
        const src = assetUrl(asset)
        if (!src) return null
        return {
          src,
          alt: assetAlt(asset, title),
          caption: assetCaption(asset),
        }
      })
      .filter((p): p is NonNullable<typeof p> => p !== null),
    photosEmptyNote: asOptionalString(f.photosEmptyNote),
    registerCta: asCta(f.registerCtaLabel, f.registerCtaHref),
  }
}

export function mapGetInvolvedPage(
  entry: Entry<GetInvolvedPageSkeleton, undefined, string>,
): GetInvolvedPageContent {
  const f = fieldsOf(entry)
  const primary = asCta(f.ctaPrimaryLabel, f.ctaPrimaryHref)

  return {
    pathways: {
      title: asString(f.title),
      intro: asString(f.intro),
      pathways: asJsonArray(f.pathways),
    },
    readyCta: {
      title: asString(f.ctaTitle),
      primaryCta: primary ?? { label: 'Register', href: '/programs' },
      secondaryCta: asCta(f.ctaSecondaryLabel, f.ctaSecondaryHref),
      tone: asTone(f.ctaTone),
    },
  }
}

export function mapContactPage(
  entry: Entry<ContactPageSkeleton, undefined, string>,
): ContactPageContent {
  const f = fieldsOf(entry)
  return {
    details: {
      title: asString(f.title),
      intro: asString(f.intro),
      phoneLabel: asString(f.phoneLabel),
      phone: asString(f.phone),
      locationLabel: asString(f.locationLabel),
      location: asString(f.location),
      followLabel: asString(f.followLabel),
      socials: asJsonArray(f.socials),
      pressNote: asString(f.pressNote),
    },
  }
}

export function mapFaqPage(
  entry: Entry<FaqPageSkeleton, undefined, string>,
): FaqPageContent {
  const f = fieldsOf(entry)
  const primary = asCta(f.ctaPrimaryLabel, f.ctaPrimaryHref)

  return {
    faq: {
      title: asOptionalString(f.title),
      items: asJsonArray(f.items),
    },
    cta: {
      title: asString(f.ctaTitle),
      primaryCta: primary ?? { label: 'Register', href: '/programs' },
      secondaryCta: asCta(f.ctaSecondaryLabel, f.ctaSecondaryHref),
      tone: asTone(f.ctaTone),
    },
  }
}
