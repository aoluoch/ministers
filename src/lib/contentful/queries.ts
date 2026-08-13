import { siteContent } from '@/content/site'
import type {
  AboutPageContent,
  ContactPageContent,
  EventItem,
  FaqPageContent,
  GetInvolvedPageContent,
  HomePageContent,
  JourneyPageContent,
  ProgramsPageContent,
} from '@/types/content'
import { getContentfulClient, isContentfulConfigured } from './client'
import {
  mapAboutBelief,
  mapAboutCtaBanner,
  mapAboutDifferenceBlock,
  mapAboutLeadership,
  mapAboutMission,
  mapAboutTextblock,
  mapChapter,
  mapCommunityGroup,
  mapContactPage,
  mapFaqPage,
  mapGetInvolvedPage,
  mapGlobalPresence,
  mapHeroSection,
  mapHomeCtaBanner,
  mapHomeExploreLinks,
  mapHomeTestimonials,
  mapHomeTextBlock,
  mapHomeTrackRecord,
  mapJourneyPage,
  mapJourneyPillar,
  mapJourneySection,
  mapProgram,
  mapProgramsPageChrome,
  mapTrainingTopic,
} from './mappers'
import type {
  AboutBeliefSkeleton,
  AboutCtaBannerSkeleton,
  AboutDifferenceBlockSkeleton,
  AboutLeadershipSkeleton,
  AboutMissionSkeleton,
  AboutTextblockSkeleton,
  ChapterSkeleton,
  CommunityGroupSkeleton,
  ContactSkeleton,
  FaqPageSkeleton,
  FaqSkeleton,
  GetInvolvedPageSkeleton,
  GetInvolvedSkeleton,
  GlobalPresenceSkeleton,
  HeroSectionSkeleton,
  HomeCtaBannerSkeleton,
  HomeExploreLinksSkeleton,
  HomeTestimonialsSkeleton,
  HomeTextBlockSkeleton,
  HomeTrackRecordSkeleton,
  JourneyPageSkeleton,
  JourneyPillarSkeleton,
  ProgramsPageSkeleton,
  ProgramsSkeleton,
  TrainingTopicSkeleton,
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

const emptyJourney: HomePageContent['journey'] = {
  title: 'The Four Bs',
  intro: '',
  pillars: [],
}

const emptyPresence: HomePageContent['presence'] = {
  title: '',
  intro: '',
  nations: [],
  images: [],
  chapters: [],
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
  journey: emptyJourney,
  explore: {
    title: '',
    items: [],
  },
  presence: emptyPresence,
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
  presence: emptyPresence,
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
    phoneLabel: 'Phone',
    phone: siteContent.phone,
    locationLabel: 'Location',
    location: siteContent.location,
    followLabel: 'Follow us',
    socials: siteContent.socials,
    pressNote: '',
  },
}

const emptyJourneyPage: JourneyPageContent = {
  intro: {
    title: '',
    paragraphs: [],
  },
  pillars: emptyJourney,
  community: {
    title: '',
    intro: '',
    groups: [],
  },
  training: {
    title: '',
    intro: '',
    topics: [],
  },
  beyond: {
    title: '',
    paragraphs: [],
  },
  commissioning: {
    title: '',
    paragraphs: [],
  },
  cta: {
    title: '',
    primaryCta: emptyCta,
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

async function getOptionalEntries<
  T extends { contentTypeId: string; fields: Record<string, unknown> },
>(
  contentType: T['contentTypeId'],
  query: Record<string, unknown> = {},
) {
  const client = getContentfulClient()
  if (!client) return []

  try {
    const res = await client.getEntries({
      content_type: contentType,
      limit: 1000,
      ...query,
    })
    return res.items as import('contentful').Entry<T, undefined, string>[]
  } catch (error) {
    if (isUnknownContentTypeError(error)) {
      warnLocalSection(contentType, error)
      return []
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
  return getOptionalSingleton<AboutLeadershipSkeleton>('aboutLeadership', {
    include: 2,
  })
}

async function fetchJourneyPillars() {
  const entries = await getOptionalEntries<JourneyPillarSkeleton>('journeyPillar')
  return entries.map(mapJourneyPillar).sort((a, b) => a.number - b.number)
}

async function fetchChapters() {
  const entries = await getOptionalEntries<ChapterSkeleton>('chapter', { include: 2 })
  return entries
    .slice()
    .sort((a, b) => {
      const aOrder = typeof a.fields.sortOrder === 'number' ? a.fields.sortOrder : 0
      const bOrder = typeof b.fields.sortOrder === 'number' ? b.fields.sortOrder : 0
      return aOrder - bOrder
    })
    .map(mapChapter)
}

async function fetchPresence() {
  const [presenceEntry, chapters] = await Promise.all([
    getOptionalSingleton<GlobalPresenceSkeleton>('globalPresence', { include: 2 }),
    fetchChapters(),
  ])
  if (!presenceEntry && !chapters.length) return emptyPresence
  return mapGlobalPresence(presenceEntry, chapters)
}

export async function fetchHomePage(): Promise<HomePageContent> {
  if (!isContentfulConfigured()) return emptyHomePage
  try {
    const [
      heroEntry,
      aboutEntry,
      exploreEntry,
      trackRecordEntry,
      testimonialsEntry,
      ctaBannerEntry,
      journeyPageEntry,
      pillars,
      presence,
    ] = await Promise.all([
      getOptionalSingleton<HeroSectionSkeleton>('heroSection', { include: 2 }),
      getOptionalSingleton<HomeTextBlockSkeleton>('homeTextBlock', { include: 2 }),
      getOptionalSingleton<HomeExploreLinksSkeleton>('homeEploreLinks'),
      getOptionalSingleton<HomeTrackRecordSkeleton>('homeTrackRecord'),
      getOptionalSingleton<HomeTestimonialsSkeleton>('homeTestimonials'),
      getOptionalSingleton<HomeCtaBannerSkeleton>('homeCtaBanner'),
      getOptionalSingleton<JourneyPageSkeleton>('journeyPage'),
      fetchJourneyPillars(),
      fetchPresence(),
    ])

    return {
      hero: heroEntry ? mapHeroSection(heroEntry) : emptyHomePage.hero,
      about: aboutEntry ? mapHomeTextBlock(aboutEntry) : emptyHomePage.about,
      journey: pillars.length
        ? mapJourneySection(pillars, journeyPageEntry)
        : emptyJourney,
      explore: exploreEntry ? mapHomeExploreLinks(exploreEntry) : emptyHomePage.explore,
      presence,
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
    const [
      textBlockResult,
      missionEntry,
      beliefEntry,
      differenceEntry,
      leadershipEntry,
      ctaEntry,
      presence,
    ] = await Promise.all([
      getAboutTextblockEntry(),
      getAboutMissionEntry(),
      getAboutBeliefEntry(),
      getAboutDifferenceBlockEntry(),
      getAboutLeadershipEntry(),
      getOptionalSingleton<AboutCtaBannerSkeleton>('aboutCtaBanner'),
      fetchPresence(),
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
      presence,
      leadership: leadershipEntry
        ? mapAboutLeadership(leadershipEntry)
        : emptyAboutLeadership,
      joinCta: ctaEntry ? mapAboutCtaBanner(ctaEntry) : emptyAboutPage.joinCta,
    }
  } catch (error) {
    warnContentfulError('aboutPage', error)
    return emptyAboutPage
  }
}

export async function fetchJourneyPage(): Promise<JourneyPageContent> {
  if (!isContentfulConfigured()) return emptyJourneyPage
  try {
    const [page, pillars, groupEntries, topicEntries] = await Promise.all([
      getOptionalSingleton<JourneyPageSkeleton>('journeyPage'),
      fetchJourneyPillars(),
      getOptionalEntries<CommunityGroupSkeleton>('communityGroup'),
      getOptionalEntries<TrainingTopicSkeleton>('trainingTopic'),
    ])

    if (!page && !pillars.length && !groupEntries.length && !topicEntries.length) {
      return emptyJourneyPage
    }

    return mapJourneyPage(
      page,
      pillars,
      groupEntries
        .slice()
        .sort((a, b) => {
          const aOrder = typeof a.fields.sortOrder === 'number' ? a.fields.sortOrder : 0
          const bOrder = typeof b.fields.sortOrder === 'number' ? b.fields.sortOrder : 0
          return aOrder - bOrder
        })
        .map(mapCommunityGroup),
      topicEntries
        .slice()
        .sort((a, b) => {
          const aOrder = typeof a.fields.sortOrder === 'number' ? a.fields.sortOrder : 0
          const bOrder = typeof b.fields.sortOrder === 'number' ? b.fields.sortOrder : 0
          return aOrder - bOrder
        })
        .map(mapTrainingTopic),
    )
  } catch (error) {
    warnContentfulError('journeyPage', error)
    return emptyJourneyPage
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
  const [events, chrome] = await Promise.all([
    fetchEvents(),
    isContentfulConfigured()
      ? getOptionalSingleton<ProgramsPageSkeleton>('programsPage')
      : Promise.resolve(null),
  ])

  if (chrome) return mapProgramsPageChrome(chrome, events)
  return { list: { ...emptyProgramsList, events } }
}

export async function fetchGetInvolvedPage(): Promise<GetInvolvedPageContent> {
  if (!isContentfulConfigured()) return emptyGetInvolvedPage
  try {
    const [entries, page] = await Promise.all([
      getOptionalEntries<GetInvolvedSkeleton>('getInvolved', {
        order: ['sys.createdAt'],
      }),
      getOptionalSingleton<GetInvolvedPageSkeleton>('getInvolvedPage'),
    ])

    return entries.length || page ? mapGetInvolvedPage(entries, page) : emptyGetInvolvedPage
  } catch (error) {
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
    const [entries, page] = await Promise.all([
      getOptionalEntries<FaqSkeleton>('faq', {
        order: ['sys.createdAt'],
      }),
      getOptionalSingleton<FaqPageSkeleton>('faqPage'),
    ])

    return entries.length || page ? mapFaqPage(entries, page) : emptyFaqPage
  } catch (error) {
    warnContentfulError('faq', error)
    return emptyFaqPage
  }
}
