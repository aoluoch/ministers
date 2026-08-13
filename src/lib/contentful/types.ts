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
    heroImage?: EntryFieldTypes.AssetLink
  }
}

/** Content type id: `homeTextBlock` — "What We're About" */
export type HomeTextBlockSkeleton = EntrySkeletonType & {
  contentTypeId: 'homeTextBlock'
  fields: {
    aboutTitle: EntryFieldTypes.Symbol
    aboutParagraph: EntryFieldTypes.Text
    aboutQuote: EntryFieldTypes.Symbol
    image?: EntryFieldTypes.AssetLink
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
    ctaLabel?: EntryFieldTypes.Symbol
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
    visionTitle?: EntryFieldTypes.Symbol
    visionBody?: EntryFieldTypes.Text
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

/** Content type id: `leader` — reusable person card */
export type LeaderSkeleton = EntrySkeletonType & {
  contentTypeId: 'leader'
  fields: {
    name: EntryFieldTypes.Symbol
    role: EntryFieldTypes.Symbol
    affiliation?: EntryFieldTypes.Symbol
    bio?: EntryFieldTypes.Text
    photo?: EntryFieldTypes.AssetLink
    sortOrder?: EntryFieldTypes.Integer
  }
}

/** Content type id: `aboutLeadership` — "Leadership" */
export type AboutLeadershipSkeleton = EntrySkeletonType & {
  contentTypeId: 'aboutLeadership'
  fields: {
    leadershipTitle: EntryFieldTypes.Symbol
    /** Object field storing the leadership list payload (legacy). */
    title: EntryFieldTypes.Object
    /** Preferred: linked `leader` entries. */
    leaders?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<LeaderSkeleton>>
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

/** Content type id: `getInvolvedPage` — page chrome for Get Involved */
export type GetInvolvedPageSkeleton = EntrySkeletonType & {
  contentTypeId: 'getInvolvedPage'
  fields: {
    title: EntryFieldTypes.Symbol
    intro: EntryFieldTypes.Text
    ctaTitle?: EntryFieldTypes.Symbol
    ctaBody?: EntryFieldTypes.Text
    ctaLabel?: EntryFieldTypes.Symbol
    ctaHref?: EntryFieldTypes.Symbol
  }
}

export type ContactSkeleton = EntrySkeletonType & {
  contentTypeId: 'contact'
  fields: {
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.RichText
    phoneLabel?: EntryFieldTypes.Symbol
    phone?: EntryFieldTypes.Symbol
    locationLabel?: EntryFieldTypes.Symbol
    location?: EntryFieldTypes.Symbol
    pressNote?: EntryFieldTypes.Text
  }
}

export type FaqSkeleton = EntrySkeletonType & {
  contentTypeId: 'faq'
  fields: {
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Text
  }
}

/** Content type id: `faqPage` — page chrome for FAQ */
export type FaqPageSkeleton = EntrySkeletonType & {
  contentTypeId: 'faqPage'
  fields: {
    title: EntryFieldTypes.Symbol
    ctaTitle?: EntryFieldTypes.Symbol
    ctaBody?: EntryFieldTypes.Text
    ctaLabel?: EntryFieldTypes.Symbol
    ctaHref?: EntryFieldTypes.Symbol
  }
}

/** Content type id: `aboutCtaBanner` */
export type AboutCtaBannerSkeleton = EntrySkeletonType & {
  contentTypeId: 'aboutCtaBanner'
  fields: {
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Text
    ctaLabel?: EntryFieldTypes.Symbol
    ctaHref?: EntryFieldTypes.Symbol
  }
}

/** Content type id: `journeyPillar` — one of the Four Bs */
export type JourneyPillarSkeleton = EntrySkeletonType & {
  contentTypeId: 'journeyPillar'
  fields: {
    name: EntryFieldTypes.Symbol
    number: EntryFieldTypes.Integer
    question: EntryFieldTypes.Symbol
    statement: EntryFieldTypes.Symbol
    summary: EntryFieldTypes.Text
    description: EntryFieldTypes.RichText
    slug?: EntryFieldTypes.Symbol
    sortOrder?: EntryFieldTypes.Integer
  }
}

/** Content type id: `journeyPage` — Journey page chrome */
export type JourneyPageSkeleton = EntrySkeletonType & {
  contentTypeId: 'journeyPage'
  fields: {
    title: EntryFieldTypes.Symbol
    intro: EntryFieldTypes.Text
    pillarsTitle?: EntryFieldTypes.Symbol
    pillarsIntro?: EntryFieldTypes.Text
    communityTitle?: EntryFieldTypes.Symbol
    communityIntro?: EntryFieldTypes.Text
    trainingTitle?: EntryFieldTypes.Symbol
    trainingIntro?: EntryFieldTypes.Text
    beyondTitle?: EntryFieldTypes.Symbol
    beyondBody?: EntryFieldTypes.RichText
    commissioningTitle?: EntryFieldTypes.Symbol
    commissioningBody?: EntryFieldTypes.RichText
    ctaTitle?: EntryFieldTypes.Symbol
    ctaBody?: EntryFieldTypes.Text
    ctaLabel?: EntryFieldTypes.Symbol
    ctaHref?: EntryFieldTypes.Symbol
  }
}

/** Content type id: `chapter` — national chapter */
export type ChapterSkeleton = EntrySkeletonType & {
  contentTypeId: 'chapter'
  fields: {
    country: EntryFieldTypes.Symbol
    leaderName: EntryFieldTypes.Symbol
    leaderTitle?: EntryFieldTypes.Symbol
    bio?: EntryFieldTypes.Text
    photo?: EntryFieldTypes.AssetLink
    sortOrder?: EntryFieldTypes.Integer
  }
}

/** Content type id: `globalPresence` — section chrome for chapters */
export type GlobalPresenceSkeleton = EntrySkeletonType & {
  contentTypeId: 'globalPresence'
  fields: {
    title: EntryFieldTypes.Symbol
    intro: EntryFieldTypes.Text
    nations?: EntryFieldTypes.Text
    images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
  }
}

/** Content type id: `communityGroup` — Main / Ministry / Mixed group */
export type CommunityGroupSkeleton = EntrySkeletonType & {
  contentTypeId: 'communityGroup'
  fields: {
    title: EntryFieldTypes.Symbol
    description: EntryFieldTypes.Text
    sortOrder?: EntryFieldTypes.Integer
  }
}

/** Content type id: `trainingTopic` — curriculum item */
export type TrainingTopicSkeleton = EntrySkeletonType & {
  contentTypeId: 'trainingTopic'
  fields: {
    title: EntryFieldTypes.Symbol
    summary: EntryFieldTypes.Text
    points?: EntryFieldTypes.RichText
    category: EntryFieldTypes.Symbol
    sortOrder?: EntryFieldTypes.Integer
  }
}
