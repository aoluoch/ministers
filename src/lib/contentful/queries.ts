import type {
  AboutPageContent,
  ContactPageContent,
  EventItem,
  FaqPageContent,
  GetInvolvedPageContent,
  HomePageContent,
  ProgramsPageContent,
} from '@/types/content'
import { getContentfulClient, isContentfulConfigured } from './client'
import {
  mapAboutBelief,
  mapAboutDifferenceBlock,
  mapAboutLeadership,
  mapAboutMission,
  mapAboutTextblock,
  mapContactPage,
  mapFaqPage,
  mapGetInvolvedPage,
  mapHeroSection,
  mapHomeCtaBanner,
  mapHomeExploreLinks,
  mapHomeTestimonials,
  mapHomeTextBlock,
  mapHomeTrackRecord,
  mapProgram,
} from './mappers'
import type {
  AboutBeliefSkeleton,
  AboutDifferenceBlockSkeleton,
  AboutLeadershipSkeleton,
  AboutMissionSkeleton,
  AboutTextblockSkeleton,
  ContactSkeleton,
  FaqSkeleton,
  GetInvolvedSkeleton,
  HeroSectionSkeleton,
  HomeCtaBannerSkeleton,
  HomeExploreLinksSkeleton,
  HomeTestimonialsSkeleton,
  HomeTextBlockSkeleton,
  HomeTrackRecordSkeleton,
  ProgramsSkeleton,
} from './types'

const emptyAboutMission: AboutPageContent['mission'] = {
  title: '',
  body: '',
}

const emptyAboutBeliefs: AboutPageContent['beliefs'] = {
  title: '',
  intro: '',
  beliefs: [],
}

const emptyAboutDifference: AboutPageContent['difference'] = {
  title: '',
  paragraphs: [],
  quotes: [],
}

const emptyAboutLeadership: AboutPageContent['leadership'] = {
  title: '',
  leaders: [],
}

const emptyCta = {
  label: '',
  href: '',
}

const emptyHomePage: HomePageContent = {
  hero: {
    brandName: '',
    headline: '',
    body: '',
    supportingLine: '',
    primaryCta: emptyCta,
  },
  about: {
    title: '',
    paragraphs: [],
  },
  explore: {
    title: '',
    items: [],
  },
  trackRecord: {
    title: '',
    paragraphs: [],
    quote: '',
  },
  testimonials: {
    title: '',
    quotes: [],
    story: '',
  },
  readyCta: {
    title: '',
    primaryCta: emptyCta,
  },
}

const emptyAboutPage: AboutPageContent = {
  whyWeExist: {
    title: '',
    paragraphs: [],
  },
  mission: emptyAboutMission,
  beliefs: emptyAboutBeliefs,
  difference: emptyAboutDifference,
  leadership: emptyAboutLeadership,
  joinCta: {
    title: '',
    primaryCta: emptyCta,
  },
}

const emptyProgramsList: ProgramsPageContent['list'] = {
  title: '',
  intro: '',
  events: [],
}

const emptyGetInvolvedPage: GetInvolvedPageContent = {
  pathways: {
    title: '',
    intro: '',
    pathways: [],
  },
  readyCta: {
    title: '',
    primaryCta: emptyCta,
  },
}

const emptyContactPage: ContactPageContent = {
  details: {
    title: '',
    intro: [],
    phoneLabel: '',
    phone: '',
    locationLabel: '',
    location: '',
    followLabel: '',
    socials: [],
    pressNote: '',
  },
}

const emptyFaqPage: FaqPageContent = {
  faq: {
    title: '',
    items: [],
  },
  cta: {
    title: '',
    primaryCta: emptyCta,
  },
}

type ContentfulError = {
  details?: {
    errors?: Array<{
      name?: string
    }>
  }
}

async function getSingleton<T extends { contentTypeId: string; fields: Record<string, unknown> }>(
  contentType: T['contentTypeId'],
  query: Record<string, unknown> = {},
) {
  const client = getContentfulClient()
  if (!client) return null

  const res = await client.getEntries({
    content_type: contentType,
    ...query,
    limit: 1,
  })
  return (res.items[0] as import('contentful').Entry<T, undefined, string> | undefined) ?? null
}

function warnContentfulError(label: string, error: unknown) {
  console.warn(`[contentful] ${label} fetch failed`, error)
}

function isUnknownContentTypeError(error: unknown): boolean {
  const errors = (error as ContentfulError).details?.errors
  return Array.isArray(errors) && errors.some((item) => item.name === 'unknownContentType')
}

function warnLocalSection(label: string, error: unknown) {
  if (import.meta.env.DEV) {
    console.warn(`[contentful] ${label} content type not found.`, error)
  }
}

async function getOptionalSingleton<
  T extends { contentTypeId: string; fields: Record<string, unknown> },
>(
  contentType: T['contentTypeId'],
  query: Record<string, unknown> = {},
) {
  try {
    return await getSingleton<T>(contentType, query)
  } catch (error) {
    if (isUnknownContentTypeError(error)) {
      warnLocalSection(contentType, error)
      return null
    }
    throw error
  }
}

async function getAboutTextblockEntry() {
  return getOptionalSingleton<AboutTextblockSkeleton>('aboutTextblock')
}

async function getAboutMissionEntry() {
  return getOptionalSingleton<AboutMissionSkeleton>('aboutMission')
}

async function getAboutBeliefEntry() {
  return getOptionalSingleton<AboutBeliefSkeleton>('aboutBelief')
}

async function getAboutDifferenceBlockEntry() {
  return getOptionalSingleton<AboutDifferenceBlockSkeleton>('aboutDifferenceBlock')
}

async function getAboutLeadershipEntry() {
  return getOptionalSingleton<AboutLeadershipSkeleton>('aboutLeadership')
}

export async function fetchHomePage(): Promise<HomePageContent> {
  if (!isContentfulConfigured()) return emptyHomePage
  try {
    // Compose home from per-section content types as they come online.
    const [
      heroEntry,
      aboutEntry,
      exploreEntry,
      trackRecordEntry,
      testimonialsEntry,
      ctaBannerEntry,
    ] = await Promise.all([
      getOptionalSingleton<HeroSectionSkeleton>('heroSection'),
      getOptionalSingleton<HomeTextBlockSkeleton>('homeTextBlock'),
      getOptionalSingleton<HomeExploreLinksSkeleton>('homeEploreLinks'),
      getOptionalSingleton<HomeTrackRecordSkeleton>('homeTrackRecord'),
      getOptionalSingleton<HomeTestimonialsSkeleton>('homeTestimonials'),
      getOptionalSingleton<HomeCtaBannerSkeleton>('homeCtaBanner'),
    ])

    return {
      hero: heroEntry ? mapHeroSection(heroEntry) : emptyHomePage.hero,
      about: aboutEntry ? mapHomeTextBlock(aboutEntry) : emptyHomePage.about,
      explore: exploreEntry ? mapHomeExploreLinks(exploreEntry) : emptyHomePage.explore,
      trackRecord: trackRecordEntry
        ? mapHomeTrackRecord(trackRecordEntry)
        : emptyHomePage.trackRecord,
      testimonials: testimonialsEntry
        ? mapHomeTestimonials(testimonialsEntry)
        : emptyHomePage.testimonials,
      readyCta: ctaBannerEntry ? mapHomeCtaBanner(ctaBannerEntry) : emptyHomePage.readyCta,
    }
  } catch (error) {
    warnContentfulError('homePage', error)
    return emptyHomePage
  }
}

export async function fetchAboutPage(): Promise<AboutPageContent> {
  if (!isContentfulConfigured()) return emptyAboutPage
  try {
    // Compose about from per-section content types as they come online.
    const [
      textBlockResult,
      missionEntry,
      beliefEntry,
      differenceEntry,
      leadershipEntry,
    ] = await Promise.all([
      getAboutTextblockEntry(),
      getAboutMissionEntry(),
      getAboutBeliefEntry(),
      getAboutDifferenceBlockEntry(),
      getAboutLeadershipEntry(),
    ])

    return {
      whyWeExist: textBlockResult
        ? mapAboutTextblock(textBlockResult)
        : emptyAboutPage.whyWeExist,
      mission: missionEntry ? mapAboutMission(missionEntry) : emptyAboutMission,
      beliefs: beliefEntry ? mapAboutBelief(beliefEntry) : emptyAboutBeliefs,
      difference: differenceEntry
        ? mapAboutDifferenceBlock(differenceEntry)
        : emptyAboutDifference,
      leadership: leadershipEntry
        ? mapAboutLeadership(leadershipEntry)
        : emptyAboutLeadership,
      joinCta: emptyAboutPage.joinCta,
    }
  } catch (error) {
    warnContentfulError('aboutPage', error)
    return emptyAboutPage
  }
}

export async function fetchEvents(): Promise<EventItem[]> {
  if (!isContentfulConfigured()) return []
  try {
    const client = getContentfulClient()
    if (!client) return []

    const res = await client.getEntries<ProgramsSkeleton>({
      content_type: 'programs',
      order: ['fields.date'],
    })
    return res.items.map(mapProgram)
  } catch (error) {
    if (isUnknownContentTypeError(error)) {
      warnLocalSection('programs', error)
      return []
    }
    warnContentfulError('programs', error)
    return []
  }
}

export async function fetchEventBySlug(slug: string): Promise<EventItem | undefined> {
  if (!isContentfulConfigured()) {
    return undefined
  }
  try {
    const events = await fetchEvents()
    return events.find((event) => event.slug === slug)
  } catch (error) {
    warnContentfulError(`programs:${slug}`, error)
    return undefined
  }
}

export async function fetchProgramsPage(): Promise<ProgramsPageContent> {
  const events = await fetchEvents()

  return { list: { ...emptyProgramsList, events } }
}

export async function fetchGetInvolvedPage(): Promise<GetInvolvedPageContent> {
  if (!isContentfulConfigured()) return emptyGetInvolvedPage
  try {
    const client = getContentfulClient()
    if (!client) return emptyGetInvolvedPage

    const res = await client.getEntries<GetInvolvedSkeleton>({
      content_type: 'getInvolved',
      order: ['sys.createdAt'],
      limit: 1000,
    })

    return res.items.length ? mapGetInvolvedPage(res.items) : emptyGetInvolvedPage
  } catch (error) {
    if (isUnknownContentTypeError(error)) {
      warnLocalSection('getInvolved', error)
      return emptyGetInvolvedPage
    }
    warnContentfulError('getInvolved', error)
    return emptyGetInvolvedPage
  }
}

export async function fetchContactPage(): Promise<ContactPageContent> {
  if (!isContentfulConfigured()) return emptyContactPage
  try {
    const entry = await getOptionalSingleton<ContactSkeleton>('contact')
    return entry ? mapContactPage(entry) : emptyContactPage
  } catch (error) {
    warnContentfulError('contact', error)
    return emptyContactPage
  }
}

export async function fetchFaqPage(): Promise<FaqPageContent> {
  if (!isContentfulConfigured()) return emptyFaqPage
  try {
    const client = getContentfulClient()
    if (!client) return emptyFaqPage

    const res = await client.getEntries<FaqSkeleton>({
      content_type: 'faq',
      order: ['sys.createdAt'],
      limit: 1000,
    })

    return res.items.length ? mapFaqPage(res.items) : emptyFaqPage
  } catch (error) {
    if (isUnknownContentTypeError(error)) {
      warnLocalSection('faq', error)
      return emptyFaqPage
    }
    warnContentfulError('faq', error)
    return emptyFaqPage
  }
}
