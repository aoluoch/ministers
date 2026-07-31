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

/** Content type id: `homeTestimonials` — "In Their Words" */
export type HomeTestimonialsSkeleton = EntrySkeletonType & {
  contentTypeId: 'homeTestimonials'
  fields: {
    title: EntryFieldTypes.Symbol
    /** Long text storing a JSON array of quote items */
    quotes: EntryFieldTypes.Text
    story: EntryFieldTypes.Text
  }
}

/** Content type id: `homeCtaBanner` — home ready CTA above the footer */
export type HomeCtaBannerSkeleton = EntrySkeletonType & {
  contentTypeId: 'homeCtaBanner'
  fields: {
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Text
    ctaHref?: EntryFieldTypes.Symbol
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

/** Content type id: `aboutTextblock` — "Why We Exist" */
export type AboutTextblockSkeleton = EntrySkeletonType & {
  contentTypeId: 'aboutTextblock'
  fields: {
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.RichText
  }
}

/** Content type id: `aboutMission` */
export type AboutMissionSkeleton = EntrySkeletonType & {
  contentTypeId: 'aboutMission'
  fields: {
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Text
  }
}

/** Content type id: `aboutBelief` */
export type AboutBeliefSkeleton = EntrySkeletonType & {
  contentTypeId: 'aboutBelief'
  fields: {
    title: EntryFieldTypes.Symbol
    beliefsIntro: EntryFieldTypes.Text
    beliefsList: EntryFieldTypes.RichText
  }
}

/** Content type id: `aboutDifferenceBlock` — "What Makes Us Different" */
export type AboutDifferenceBlockSkeleton = EntrySkeletonType & {
  contentTypeId: 'aboutDifferenceBlock'
  fields: {
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.RichText
    quotes?: EntryFieldTypes.Text
  }
}

/** Content type id: `aboutLeadership` — "Leadership" */
export type AboutLeadershipSkeleton = EntrySkeletonType & {
  contentTypeId: 'aboutLeadership'
  fields: {
    leadershipTitle: EntryFieldTypes.Symbol
    /** Object field storing the leadership list payload. */
    title: EntryFieldTypes.Object
  }
}

/** @deprecated Prefer per-section types; kept until remaining about sections are modeled. */
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

/** Content type id: `programs` */
export type ProgramsSkeleton = EntrySkeletonType & {
  contentTypeId: 'programs'
  fields: {
    title: EntryFieldTypes.Symbol
    tag?: EntryFieldTypes.Symbol
    date: EntryFieldTypes.Date
    summary: EntryFieldTypes.Text
    location: EntryFieldTypes.Symbol
    status: EntryFieldTypes.Symbol
    eventDetailTitle: EntryFieldTypes.Symbol
    description: EntryFieldTypes.RichText
    eventDetails?: EntryFieldTypes.RichText
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
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

export type GetInvolvedSkeleton = EntrySkeletonType & {
  contentTypeId: 'getInvolved'
  fields: {
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Text
  }
}

export type ContactSkeleton = EntrySkeletonType & {
  contentTypeId: 'contact'
  fields: {
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.RichText
  }
}

export type FaqSkeleton = EntrySkeletonType & {
  contentTypeId: 'faq'
  fields: {
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Text
  }
}
