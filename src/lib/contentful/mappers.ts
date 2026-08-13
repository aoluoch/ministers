import type { Asset, Entry } from 'contentful'
import { siteContent } from '@/content/site'
import type {
  AboutPageContent,
  BeliefsListProps,
  ChapterItem,
  CommunityGroup,
  ContactPageContent,
  EventItem,
  ExploreItem,
  FaqPageContent,
  GetInvolvedPageContent,
  CtaBannerProps,
  DifferenceBlockProps,
  ExploreLinksProps,
  GlobalPresenceProps,
  HeroSectionProps,
  HomePageContent,
  JourneyPageContent,
  JourneyPillar,
  JourneySectionProps,
  LeaderItem,
  LeadershipListProps,
  MissionBlockProps,
  ProgramsPageContent,
  TestimonialsProps,
  TextBlockProps,
  TrackRecordProps,
  TrainingTopic,
} from '@/types/content'
import {
  asAssetImage,
  asCta,
  asInteger,
  asJsonArray,
  asOptionalString,
  asParagraphs,
  asRichTextBeliefs,
  asRichTextParagraphs,
  asString,
  asTone,
  assetAlt,
  assetCaption,
  assetUrl,
  fieldsOf,
} from './helpers'
import type {
  AboutBeliefSkeleton,
  AboutCtaBannerSkeleton,
  AboutDifferenceBlockSkeleton,
  AboutLeadershipSkeleton,
  AboutMissionSkeleton,
  AboutPageSkeleton,
  AboutTextblockSkeleton,
  ChapterSkeleton,
  CommunityGroupSkeleton,
  ContactSkeleton,
  EventSkeleton,
  FaqPageSkeleton,
  FaqSkeleton,
  GetInvolvedPageSkeleton,
  GetInvolvedSkeleton,
  GlobalPresenceSkeleton,
  HeroSectionSkeleton,
  HomeCtaBannerSkeleton,
  HomeExploreLinksSkeleton,
  HomePageSkeleton,
  HomeTestimonialsSkeleton,
  HomeTextBlockSkeleton,
  HomeTrackRecordSkeleton,
  JourneyPageSkeleton,
  JourneyPillarSkeleton,
  LeaderSkeleton,
  ProgramsPageSkeleton,
  ProgramsSkeleton,
  TrainingTopicSkeleton,
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
    image: asAssetImage(f.heroImage as Asset | undefined, asString(f.heroBrandName)),
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
    image: asAssetImage(f.image as Asset | undefined, asString(f.aboutTitle)),
  }
}

export function mapHomeExploreLinks(
  entry: Entry<HomeExploreLinksSkeleton, undefined, string>,
): ExploreLinksProps {
  const f = fieldsOf(entry)
  return {
    title: asString(f.exploreTitle),
    items: asExploreItems(f.exploreItems),
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

export function mapHomeTestimonials(
  entry: Entry<HomeTestimonialsSkeleton, undefined, string>,
): TestimonialsProps {
  const f = fieldsOf(entry)
  return {
    title: asString(f.title),
    quotes: asTextList(f.quotes).map((quote) => ({ quote })),
    story: asString(f.story),
  }
}

export function mapHomeCtaBanner(
  entry: Entry<HomeCtaBannerSkeleton, undefined, string>,
): CtaBannerProps {
  const f = fieldsOf(entry)

  return {
    title: asString(f.title),
    body: asOptionalString(f.description),
    primaryCta: asCta(f.ctaLabel, f.ctaHref) ?? {
      label: 'Join the Movement',
      href: '/get-involved',
    },
    tone: 'purple',
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
    journey: {
      title: 'The Four Bs',
      intro: '',
      pillars: [],
    },
    explore: {
      title: asString(f.exploreTitle),
      items: asJsonArray<ExploreItem>(f.exploreItems),
    },
    presence: {
      title: '',
      intro: '',
      nations: [],
      images: [],
      chapters: [],
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

export function mapAboutTextblock(
  entry: Entry<AboutTextblockSkeleton, undefined, string>,
): TextBlockProps {
  const f = fieldsOf(entry)
  return {
    title: asString(f.title),
    paragraphs: asRichTextParagraphs(f.description),
  }
}

export function mapAboutMission(
  entry: Entry<AboutMissionSkeleton, undefined, string>,
): MissionBlockProps {
  const f = fieldsOf(entry)
  return {
    title: asString(f.title),
    body: asString(f.description),
    visionTitle: asOptionalString(f.visionTitle),
    visionBody: asOptionalString(f.visionBody),
  }
}

export function mapAboutBelief(
  entry: Entry<AboutBeliefSkeleton, undefined, string>,
): BeliefsListProps {
  const f = fieldsOf(entry)
  return {
    title: asString(f.title),
    intro: asString(f.beliefsIntro),
    beliefs: asRichTextBeliefs(f.beliefsList),
  }
}

function asTextList(value: unknown): string[] {
  const fromJson = asJsonArray<string | { text?: string; quote?: string }>(value)
    .map((item) => {
      if (typeof item === 'string') return item.trim()
      return asString(item?.text || item?.quote).trim()
    })
    .filter(Boolean)

  if (fromJson.length) return fromJson
  if (typeof value !== 'string') return []

  return value
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

type RawExploreItem = Partial<Record<keyof ExploreItem, unknown>> & {
  url?: unknown
  link?: unknown
  label?: unknown
}

function asExploreItem(value: RawExploreItem): ExploreItem | null {
  const title = asString(value.title).trim()
  const description = asString(value.description).trim()
  const href = asString(value.href || value.url || value.link).trim()
  const linkLabel = asString(value.linkLabel || value.label).trim() || 'Learn more'

  if (!title || !description || !href) return null
  return { title, description, href, linkLabel }
}

function asExploreItems(value: unknown): ExploreItem[] {
  const fromJson = asJsonArray<RawExploreItem>(value)
    .map(asExploreItem)
    .filter((item): item is ExploreItem => Boolean(item))

  if (fromJson.length) return fromJson
  if (typeof value !== 'string') return []

  return value
    .trim()
    .split(/\n\s*\n+/)
    .map(asExploreTextBlock)
    .filter((item): item is ExploreItem => Boolean(item))
}

function asExploreTextBlock(block: string): ExploreItem | null {
  const lines = block
    .split(/\n+/)
    .map((line) => line.replace(/^[-*]\s+/, '').trim())
    .filter(Boolean)

  if (!lines.length) return null

  const parts = lines.length === 1
    ? lines[0].split(/\s*\|\s*/).map((part) => part.trim()).filter(Boolean)
    : lines

  const labeled = parts.reduce<RawExploreItem>((item, line) => {
    const match = line.match(/^(title|description|href|url|link|linkLabel|link label|label):\s*(.+)$/i)
    if (!match) return item

    const key = match[1].toLowerCase().replace(/\s+/g, '')
    const value = match[2].trim()
    if (key === 'title') item.title = value
    if (key === 'description') item.description = value
    if (key === 'href' || key === 'url' || key === 'link') item.href = value
    if (key === 'linklabel' || key === 'label') item.linkLabel = value
    return item
  }, {})

  const labeledItem = asExploreItem(labeled)
  if (labeledItem) return labeledItem

  return asExploreItem({
    title: parts[0],
    description: parts[1],
    href: parts[2],
    linkLabel: parts[3],
  })
}

function isEntryLike(value: unknown): value is Entry<LeaderSkeleton, undefined, string> {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'fields' in value &&
      'sys' in value,
  )
}

function asLeader(value: unknown): LeaderItem | null {
  if (!value || typeof value !== 'object') return null

  if (isEntryLike(value)) {
    const f = fieldsOf(value)
    const role = asString(f.role).trim()
    const name = asString(f.name).trim()
    if (!role || !name) return null
    return {
      role,
      name,
      affiliation: asOptionalString(f.affiliation),
      bio: asOptionalString(f.bio),
      photo: asAssetImage(f.photo as Asset | undefined, name),
    }
  }

  const item = value as Record<string, unknown>
  const role = asString(item.role).trim()
  const name = asString(item.name).trim()
  if (!role || !name) return null

  return {
    role,
    name,
    affiliation: asOptionalString(item.affiliation),
    bio: asOptionalString(item.bio),
  }
}

function asLeaders(value: unknown): LeaderItem[] {
  const source = (() => {
    if (Array.isArray(value)) return value
    if (!value || typeof value !== 'object') return []

    const objectValue = value as Record<string, unknown>
    if (Array.isArray(objectValue.leaders)) return objectValue.leaders
    if (Array.isArray(objectValue.items)) return objectValue.items
    return Object.values(objectValue)
  })()

  return source.map(asLeader).filter((leader): leader is LeaderItem => Boolean(leader))
}

export function mapAboutDifferenceBlock(
  entry: Entry<AboutDifferenceBlockSkeleton, undefined, string>,
): DifferenceBlockProps {
  const f = fieldsOf(entry)
  return {
    title: asString(f.title),
    paragraphs: asRichTextParagraphs(f.description),
    quotes: asTextList(f.quotes),
  }
}

export function mapAboutLeadership(
  entry: Entry<AboutLeadershipSkeleton, undefined, string>,
): LeadershipListProps {
  const f = fieldsOf(entry)
  const linked = asLeaders(f.leaders)
  return {
    title: asString(f.leadershipTitle),
    leaders: linked.length ? linked : asLeaders(f.title),
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
    presence: {
      title: '',
      intro: '',
      nations: [],
      images: [],
      chapters: [],
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
  const status = typeof value === 'string' ? value.trim().toLowerCase() : ''
  if (status === 'upcoming' || status === 'ongoing' || status === 'past') return status
  return 'upcoming'
}

function asEventStatusFromDate(
  dateValue: unknown,
  statusValue: unknown,
  today = new Date(),
): EventItem['status'] {
  const fallbackStatus = asEventStatus(statusValue)
  if (typeof dateValue !== 'string' || !dateValue.trim()) return fallbackStatus

  const eventDate = new Date(dateValue)
  if (Number.isNaN(eventDate.getTime())) return fallbackStatus

  const eventDay = new Date(
    eventDate.getUTCFullYear(),
    eventDate.getUTCMonth(),
    eventDate.getUTCDate(),
  )
  const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  return eventDay < todayDay ? 'past' : fallbackStatus
}

function asSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function asDateLabel(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
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
    detailTitle: undefined,
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

export function mapProgram(
  entry: Entry<ProgramsSkeleton, undefined, string>,
): EventItem {
  const f = fieldsOf(entry)
  const title = asString(f.title)
  const photos = (Array.isArray(f.media) ? f.media : []) as Asset[]
  const cover = photos[0]

  return {
    slug: asSlug(title || entry.sys.id),
    title,
    detailTitle: asOptionalString(f.eventDetailTitle),
    cadence: asString(f.tag),
    status: asEventStatusFromDate(f.date, f.status),
    summary: asString(f.summary),
    dateLabel: asDateLabel(f.date),
    location: asString(f.location),
    coverImage: (() => {
      const src = assetUrl(cover)
      if (!src) return undefined
      return { src, alt: assetAlt(cover, title) }
    })(),
    body: asRichTextParagraphs(f.description),
    highlights: (() => {
      const list = asRichTextParagraphs(f.eventDetails)
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
  }
}

export function mapGetInvolvedPage(
  entries: Entry<GetInvolvedSkeleton, undefined, string>[],
  page?: Entry<GetInvolvedPageSkeleton, undefined, string> | null,
): GetInvolvedPageContent {
  const chrome = page ? fieldsOf(page) : undefined
  return {
    pathways: {
      title: asString(chrome?.title),
      intro: asString(chrome?.intro),
      pathways: entries
        .map((entry) => {
          const f = fieldsOf(entry)
          return {
            title: asString(f.title).trim(),
            description: asString(f.description).trim(),
          }
        })
        .filter((item) => item.title || item.description),
    },
    readyCta: {
      title: asString(chrome?.ctaTitle),
      body: asOptionalString(chrome?.ctaBody),
      primaryCta: asCta(chrome?.ctaLabel, chrome?.ctaHref) ?? { label: '', href: '' },
      tone: 'purple',
    },
  }
}

export function mapContactPage(
  entry: Entry<ContactSkeleton, undefined, string>,
): ContactPageContent {
  const f = fieldsOf(entry)
  return {
    details: {
      title: asString(f.title),
      intro: asRichTextParagraphs(f.description),
      phoneLabel: asString(f.phoneLabel, 'Phone'),
      phone: asString(f.phone) || siteContent.phone,
      locationLabel: asString(f.locationLabel, 'Location'),
      location: asString(f.location) || siteContent.location,
      followLabel: 'Follow us',
      socials: siteContent.socials,
      pressNote: asString(f.pressNote),
    },
  }
}

export function mapFaqPage(
  entries: Entry<FaqSkeleton, undefined, string>[],
  page?: Entry<FaqPageSkeleton, undefined, string> | null,
): FaqPageContent {
  const chrome = page ? fieldsOf(page) : undefined
  return {
    faq: {
      title: asString(chrome?.title),
      items: entries
        .map((entry) => {
          const f = fieldsOf(entry)
          return {
            question: asString(f.title).trim(),
            answer: asString(f.description).trim(),
          }
        })
        .filter((item) => item.question || item.answer),
    },
    cta: {
      title: asString(chrome?.ctaTitle),
      body: asOptionalString(chrome?.ctaBody),
      primaryCta: asCta(chrome?.ctaLabel, chrome?.ctaHref) ?? { label: '', href: '' },
      tone: 'purple',
    },
  }
}

export function mapAboutCtaBanner(
  entry: Entry<AboutCtaBannerSkeleton, undefined, string>,
): CtaBannerProps {
  const f = fieldsOf(entry)
  return {
    title: asString(f.title),
    body: asOptionalString(f.description),
    primaryCta: asCta(f.ctaLabel, f.ctaHref) ?? {
      label: 'Get involved',
      href: '/get-involved',
    },
    tone: 'purple',
  }
}

export function mapJourneyPillar(
  entry: Entry<JourneyPillarSkeleton, undefined, string>,
): JourneyPillar {
  const f = fieldsOf(entry)
  const name = asString(f.name)
  return {
    slug: asOptionalString(f.slug) || asSlug(name || entry.sys.id),
    name,
    number: asInteger(f.number, asInteger(f.sortOrder, 0)),
    question: asString(f.question),
    statement: asString(f.statement),
    summary: asString(f.summary),
    description: asRichTextParagraphs(f.description),
  }
}

export function mapJourneySection(
  pillars: JourneyPillar[],
  page?: Entry<JourneyPageSkeleton, undefined, string> | null,
): JourneySectionProps {
  const chrome = page ? fieldsOf(page) : undefined
  return {
    title: asString(chrome?.pillarsTitle, 'The Four Bs'),
    intro: asString(chrome?.pillarsIntro),
    pillars,
  }
}

export function mapJourneyPage(
  page: Entry<JourneyPageSkeleton, undefined, string> | null,
  pillars: JourneyPillar[],
  groups: CommunityGroup[],
  topics: TrainingTopic[],
): JourneyPageContent {
  const f = page ? fieldsOf(page) : undefined
  return {
    intro: {
      title: asString(f?.title, 'The Journey'),
      paragraphs: asParagraphs(f?.intro),
    },
    pillars: mapJourneySection(pillars, page),
    community: {
      title: groups.length ? asString(f?.communityTitle, 'How community works') : asString(f?.communityTitle),
      intro: asString(f?.communityIntro),
      groups,
    },
    training: {
      title: topics.length ? asString(f?.trainingTitle, 'The training programme') : asString(f?.trainingTitle),
      intro: asString(f?.trainingIntro),
      topics,
    },
    beyond: {
      title: asString(f?.beyondTitle),
      paragraphs: asRichTextParagraphs(f?.beyondBody),
    },
    commissioning: {
      title: asString(f?.commissioningTitle),
      paragraphs: asRichTextParagraphs(f?.commissioningBody),
    },
    cta: {
      title: asString(f?.ctaTitle),
      body: asOptionalString(f?.ctaBody),
      primaryCta: asCta(f?.ctaLabel, f?.ctaHref) ?? {
        label: 'Get involved',
        href: '/get-involved',
      },
      tone: 'purple',
    },
  }
}

export function mapChapter(
  entry: Entry<ChapterSkeleton, undefined, string>,
): ChapterItem {
  const f = fieldsOf(entry)
  const country = asString(f.country)
  const leaderName = asString(f.leaderName)
  return {
    country,
    leaderName,
    leaderTitle: asOptionalString(f.leaderTitle),
    bio: asOptionalString(f.bio),
    photo: asAssetImage(f.photo as Asset | undefined, leaderName || country),
  }
}

export function mapGlobalPresence(
  page: Entry<GlobalPresenceSkeleton, undefined, string> | null,
  chapters: ChapterItem[],
): GlobalPresenceProps {
  const f = page ? fieldsOf(page) : undefined
  const fromField = asTextList(f?.nations)
  const fromChapters = chapters
    .map((chapter) => chapter.country.trim())
    .filter(Boolean)
    .filter((country, index, list) => list.indexOf(country) === index)
  const images = (Array.isArray(f?.images) ? f.images : []) as Asset[]

  return {
    title: asString(f?.title, 'A global movement'),
    intro: asString(f?.intro),
    nations: fromField.length ? fromField : fromChapters,
    images: images
      .map((asset) => asAssetImage(asset, asString(f?.title, 'Nation')))
      .filter((image): image is NonNullable<typeof image> => Boolean(image)),
    chapters,
  }
}

export function mapCommunityGroup(
  entry: Entry<CommunityGroupSkeleton, undefined, string>,
): CommunityGroup {
  const f = fieldsOf(entry)
  return {
    title: asString(f.title),
    description: asString(f.description),
  }
}

function asTrainingCategory(value: unknown): TrainingTopic['category'] {
  const category = typeof value === 'string' ? value.trim().toLowerCase() : ''
  return category === 'specialised' || category === 'specialized' ? 'specialised' : 'fundamental'
}

export function mapTrainingTopic(
  entry: Entry<TrainingTopicSkeleton, undefined, string>,
): TrainingTopic {
  const f = fieldsOf(entry)
  return {
    title: asString(f.title),
    summary: asString(f.summary),
    points: asRichTextParagraphs(f.points),
    category: asTrainingCategory(f.category),
  }
}
