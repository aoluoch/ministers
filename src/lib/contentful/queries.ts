import { aboutContent } from '@/content/about'
import { contactContent } from '@/content/contact'
import { faqContent } from '@/content/faq'
import { getInvolvedContent } from '@/content/get-involved'
import { homeContent } from '@/content/home'
import { events as localEvents, programsContent } from '@/content/programs'
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
  mapAboutPage,
  mapContactPage,
  mapEvent,
  mapFaqPage,
  mapGetInvolvedPage,
  mapHeroSection,
  mapHomeExploreLinks,
  mapHomeTextBlock,
  mapHomeTrackRecord,
  mapProgramsPageChrome,
} from './mappers'
import type {
  AboutPageSkeleton,
  ContactPageSkeleton,
  EventSkeleton,
  FaqPageSkeleton,
  GetInvolvedPageSkeleton,
  HeroSectionSkeleton,
  HomeExploreLinksSkeleton,
  HomeTextBlockSkeleton,
  HomeTrackRecordSkeleton,
  ProgramsPageSkeleton,
} from './types'

async function getSingleton<T extends { contentTypeId: string; fields: Record<string, unknown> }>(
  contentType: T['contentTypeId'],
) {
  const client = getContentfulClient()
  if (!client) return null

  const res = await client.getEntries({
    content_type: contentType,
    limit: 1,
  })
  return (res.items[0] as import('contentful').Entry<T, undefined, string> | undefined) ?? null
}

function warnFallback(label: string, error: unknown) {
  console.warn(`[contentful] ${label} fetch failed — using local content`, error)
}

export async function fetchHomePage(): Promise<HomePageContent> {
  if (!isContentfulConfigured()) return homeContent
  try {
    // Compose home from per-section content types as they come online.
    const [heroEntry, aboutEntry, exploreEntry, trackRecordEntry] =
      await Promise.all([
        getSingleton<HeroSectionSkeleton>('heroSection'),
        getSingleton<HomeTextBlockSkeleton>('homeTextBlock'),
        getSingleton<HomeExploreLinksSkeleton>('homeEploreLinks'),
        getSingleton<HomeTrackRecordSkeleton>('homeTrackRecord'),
      ])

    if (import.meta.env.DEV) {
      if (!heroEntry) {
        console.warn(
          '[contentful] No published heroSection entry — using local hero.',
        )
      }
      if (!aboutEntry) {
        console.warn(
          '[contentful] No published homeTextBlock entry — using local about.',
        )
      }
      if (!exploreEntry) {
        console.warn(
          '[contentful] No published homeEploreLinks entry — using local explore.',
        )
      }
      if (!trackRecordEntry) {
        console.warn(
          '[contentful] No published homeTrackRecord entry — using local track record.',
        )
      }
    }

    const explore = exploreEntry
      ? mapHomeExploreLinks(exploreEntry)
      : homeContent.explore

    return {
      ...homeContent,
      hero: heroEntry ? mapHeroSection(heroEntry) : homeContent.hero,
      about: aboutEntry ? mapHomeTextBlock(aboutEntry) : homeContent.about,
      // Keep local items if CMS JSON is empty/invalid
      explore:
        explore.items.length > 0
          ? explore
          : exploreEntry
            ? { ...explore, items: homeContent.explore.items }
            : homeContent.explore,
      trackRecord: trackRecordEntry
        ? mapHomeTrackRecord(trackRecordEntry)
        : homeContent.trackRecord,
    }
  } catch (error) {
    warnFallback('homePage', error)
    return homeContent
  }
}

export async function fetchAboutPage(): Promise<AboutPageContent> {
  if (!isContentfulConfigured()) return aboutContent
  try {
    const entry = await getSingleton<AboutPageSkeleton>('aboutPage')
    return entry ? mapAboutPage(entry) : aboutContent
  } catch (error) {
    warnFallback('aboutPage', error)
    return aboutContent
  }
}

export async function fetchEvents(): Promise<EventItem[]> {
  if (!isContentfulConfigured()) return localEvents
  try {
    const client = getContentfulClient()
    if (!client) return localEvents

    const res = await client.getEntries<EventSkeleton>({
      content_type: 'event',
      order: ['fields.sortOrder', 'fields.dateLabel'],
    })
    if (!res.items.length) return localEvents
    return res.items.map(mapEvent)
  } catch (error) {
    warnFallback('event', error)
    return localEvents
  }
}

export async function fetchEventBySlug(slug: string): Promise<EventItem | undefined> {
  if (!isContentfulConfigured()) {
    return localEvents.find((e) => e.slug === slug)
  }
  try {
    const client = getContentfulClient()
    if (!client) return localEvents.find((e) => e.slug === slug)

    const res = await client.getEntries<EventSkeleton>({
      content_type: 'event',
      'fields.slug': slug,
      limit: 1,
    })
    const entry = res.items[0]
    if (entry) return mapEvent(entry)
    return localEvents.find((e) => e.slug === slug)
  } catch (error) {
    warnFallback(`event:${slug}`, error)
    return localEvents.find((e) => e.slug === slug)
  }
}

export async function fetchProgramsPage(): Promise<ProgramsPageContent> {
  const events = await fetchEvents()

  if (!isContentfulConfigured()) {
    return { list: { ...programsContent.list, events } }
  }

  try {
    const entry = await getSingleton<ProgramsPageSkeleton>('programsPage')
    if (!entry) {
      return { list: { ...programsContent.list, events } }
    }
    return mapProgramsPageChrome(entry, events)
  } catch (error) {
    warnFallback('programsPage', error)
    return { list: { ...programsContent.list, events } }
  }
}

export async function fetchGetInvolvedPage(): Promise<GetInvolvedPageContent> {
  if (!isContentfulConfigured()) return getInvolvedContent
  try {
    const entry = await getSingleton<GetInvolvedPageSkeleton>('getInvolvedPage')
    return entry ? mapGetInvolvedPage(entry) : getInvolvedContent
  } catch (error) {
    warnFallback('getInvolvedPage', error)
    return getInvolvedContent
  }
}

export async function fetchContactPage(): Promise<ContactPageContent> {
  if (!isContentfulConfigured()) return contactContent
  try {
    const entry = await getSingleton<ContactPageSkeleton>('contactPage')
    return entry ? mapContactPage(entry) : contactContent
  } catch (error) {
    warnFallback('contactPage', error)
    return contactContent
  }
}

export async function fetchFaqPage(): Promise<FaqPageContent> {
  if (!isContentfulConfigured()) return faqContent
  try {
    const entry = await getSingleton<FaqPageSkeleton>('faqPage')
    return entry ? mapFaqPage(entry) : faqContent
  } catch (error) {
    warnFallback('faqPage', error)
    return faqContent
  }
}
