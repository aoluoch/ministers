import type { EntryFieldTypes, EntrySkeletonType } from 'contentful'

/**
 * Skeletons track Contentful content types as you paste JSON previews.
 * Home is composed from per-section types (e.g. `heroSection`), not one `homePage` entry.
 */

/** Content type id: `heroSection` */
export type HeroSectionSkeleton = EntrySkeletonType & {
  contentTypeId: 'heroSection'
  fields: {
    heroBrandName: EntryFieldTypes.Symbol
    heroHeadline: EntryFieldTypes.Symbol
    heroBody: EntryFieldTypes.Text
    heroSupportingLine: EntryFieldTypes.Symbol
    heroCtaLabel?: EntryFieldTypes.Symbol
    heroCtaHref?: EntryFieldTypes.Symbol
  }
}

/** Content type id: `homeTextBlock` — "What We're About" */
export type HomeTextBlockSkeleton = EntrySkeletonType & {
  contentTypeId: 'homeTextBlock'
  fields: {
    aboutTitle: EntryFieldTypes.Symbol
    aboutParagraph: EntryFieldTypes.Text
    aboutQuote: EntryFieldTypes.Symbol
  }
}

/** Content type id: `homeEploreLinks` (API id spelling as in Contentful) */
export type HomeExploreLinksSkeleton = EntrySkeletonType & {
  contentTypeId: 'homeEploreLinks'
  fields: {
    exploreTitle: EntryFieldTypes.Symbol
    /** Long text storing a JSON array of explore items */
    exploreItems: EntryFieldTypes.Text
  }
}

/** Content type id: `homeTrackRecord` */
export type HomeTrackRecordSkeleton = EntrySkeletonType & {
  contentTypeId: 'homeTrackRecord'
  fields: {
    trackRecordTitle: EntryFieldTypes.Symbol
    trackRecordParagraph: EntryFieldTypes.Text
    trackRecordQuote: EntryFieldTypes.Symbol
  }
}

/** @deprecated Prefer per-section types; kept until remaining home sections are modeled. */
export type HomePageSkeleton = EntrySkeletonType & {
  contentTypeId: 'homePage'
  fields: {
    aboutTitle: EntryFieldTypes.Symbol
    aboutParagraphs: EntryFieldTypes.Text
    aboutQuote?: EntryFieldTypes.Symbol
    exploreTitle: EntryFieldTypes.Symbol
    exploreItems: EntryFieldTypes.Object
    trackRecordTitle: EntryFieldTypes.Symbol
    trackRecordParagraphs: EntryFieldTypes.Text
    trackRecordQuote: EntryFieldTypes.Symbol
    testimonialsTitle: EntryFieldTypes.Symbol
    testimonialQuotes: EntryFieldTypes.Object
    testimonialStory: EntryFieldTypes.Text
    readyCtaTitle: EntryFieldTypes.Symbol
    readyCtaBody?: EntryFieldTypes.Text
    readyCtaPrimaryLabel: EntryFieldTypes.Symbol
    readyCtaPrimaryHref: EntryFieldTypes.Symbol
    readyCtaTone?: EntryFieldTypes.Symbol
  }
}

export type AboutPageSkeleton = EntrySkeletonType & {
  contentTypeId: 'aboutPage'
  fields: {
    whyTitle: EntryFieldTypes.Symbol
    whyParagraphs: EntryFieldTypes.Text
    missionTitle: EntryFieldTypes.Symbol
    missionBody: EntryFieldTypes.Text
    beliefsTitle: EntryFieldTypes.Symbol
    beliefsIntro: EntryFieldTypes.Text
    beliefsList: EntryFieldTypes.Object
    differenceTitle: EntryFieldTypes.Symbol
    differenceParagraphs: EntryFieldTypes.Text
    differenceQuotes: EntryFieldTypes.Object
    leadershipTitle: EntryFieldTypes.Symbol
    leaders: EntryFieldTypes.Object
    joinCtaTitle: EntryFieldTypes.Symbol
    joinCtaBody?: EntryFieldTypes.Text
    joinCtaPrimaryLabel: EntryFieldTypes.Symbol
    joinCtaPrimaryHref: EntryFieldTypes.Symbol
    joinCtaSecondaryLabel?: EntryFieldTypes.Symbol
    joinCtaSecondaryHref?: EntryFieldTypes.Symbol
    joinCtaTone?: EntryFieldTypes.Symbol
  }
}

export type ProgramsPageSkeleton = EntrySkeletonType & {
  contentTypeId: 'programsPage'
  fields: {
    title: EntryFieldTypes.Symbol
    intro: EntryFieldTypes.Text
    footerNote?: EntryFieldTypes.Text
    footerCtaLabel?: EntryFieldTypes.Symbol
    footerCtaHref?: EntryFieldTypes.Symbol
  }
}

export type EventSkeleton = EntrySkeletonType & {
  contentTypeId: 'event'
  fields: {
    slug: EntryFieldTypes.Symbol
    title: EntryFieldTypes.Symbol
    cadence: EntryFieldTypes.Symbol
    status: EntryFieldTypes.Symbol
    summary: EntryFieldTypes.Text
    dateLabel: EntryFieldTypes.Symbol
    timeLabel?: EntryFieldTypes.Symbol
    location: EntryFieldTypes.Symbol
    coverImage?: EntryFieldTypes.AssetLink
    body: EntryFieldTypes.Text
    highlights?: EntryFieldTypes.Object
    photos?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
    photosEmptyNote?: EntryFieldTypes.Text
    registerCtaLabel?: EntryFieldTypes.Symbol
    registerCtaHref?: EntryFieldTypes.Symbol
    sortOrder?: EntryFieldTypes.Integer
  }
}

export type GetInvolvedPageSkeleton = EntrySkeletonType & {
  contentTypeId: 'getInvolvedPage'
  fields: {
    title: EntryFieldTypes.Symbol
    intro: EntryFieldTypes.Text
    pathways: EntryFieldTypes.Object
    ctaTitle: EntryFieldTypes.Symbol
    ctaPrimaryLabel: EntryFieldTypes.Symbol
    ctaPrimaryHref: EntryFieldTypes.Symbol
    ctaSecondaryLabel?: EntryFieldTypes.Symbol
    ctaSecondaryHref?: EntryFieldTypes.Symbol
    ctaTone?: EntryFieldTypes.Symbol
  }
}

export type ContactPageSkeleton = EntrySkeletonType & {
  contentTypeId: 'contactPage'
  fields: {
    title: EntryFieldTypes.Symbol
    intro: EntryFieldTypes.Symbol
    phoneLabel: EntryFieldTypes.Symbol
    phone: EntryFieldTypes.Symbol
    locationLabel: EntryFieldTypes.Symbol
    location: EntryFieldTypes.Symbol
    followLabel: EntryFieldTypes.Symbol
    socials: EntryFieldTypes.Object
    pressNote: EntryFieldTypes.Text
  }
}

export type FaqPageSkeleton = EntrySkeletonType & {
  contentTypeId: 'faqPage'
  fields: {
    title?: EntryFieldTypes.Symbol
    items: EntryFieldTypes.Object
    ctaTitle: EntryFieldTypes.Symbol
    ctaPrimaryLabel: EntryFieldTypes.Symbol
    ctaPrimaryHref: EntryFieldTypes.Symbol
    ctaSecondaryLabel?: EntryFieldTypes.Symbol
    ctaSecondaryHref?: EntryFieldTypes.Symbol
    ctaTone?: EntryFieldTypes.Symbol
  }
}
