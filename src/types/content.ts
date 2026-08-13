/** Self-contained section prop shapes for a future Contentful swap (no entry references). */

export type CtaLink = {
  label: string
  href: string
}

export type HeroSectionProps = {
  brandName: string
  headline: string
  body: string
  supportingLine: string
  primaryCta: CtaLink
  image?: EventCoverImage
}

export type TextBlockProps = {
  eyebrow?: string
  title: string
  paragraphs: string[]
  quote?: string
  image?: EventCoverImage
}

export type ExploreItem = {
  title: string
  description: string
  href: string
  linkLabel: string
}

export type ExploreLinksProps = {
  title: string
  items: ExploreItem[]
}

export type TrackRecordProps = {
  title: string
  paragraphs: string[]
  quote: string
}

export type TestimonialItem = {
  quote: string
}

export type TestimonialsProps = {
  title: string
  quotes: TestimonialItem[]
  story: string
}

export type CtaBannerProps = {
  title: string
  body?: string
  primaryCta: CtaLink
  secondaryCta?: CtaLink
  tone?: 'purple' | 'cream'
}

export type MissionBlockProps = {
  title: string
  body: string
  visionTitle?: string
  visionBody?: string
}

export type BeliefItem = {
  title: string
  description: string
}

export type BeliefsListProps = {
  title: string
  intro: string
  beliefs: BeliefItem[]
}

export type DifferenceBlockProps = {
  title: string
  paragraphs: string[]
  quotes: string[]
}

export type LeaderItem = {
  role: string
  name: string
  affiliation?: string
  bio?: string
  photo?: EventCoverImage
}

export type LeadershipListProps = {
  title: string
  leaders: LeaderItem[]
}

export type EventPhoto = {
  src: string
  alt: string
  caption?: string
}

export type EventCoverImage = {
  src: string
  alt: string
}

/** Full self-contained event (summary + detail). No CMS references. */
export type EventItem = {
  slug: string
  title: string
  detailTitle?: string
  cadence: string
  status: 'upcoming' | 'ongoing' | 'past'
  summary: string
  dateLabel: string
  timeLabel?: string
  location: string
  coverImage?: EventCoverImage
  body: string[]
  highlights?: string[]
  photos: EventPhoto[]
  photosEmptyNote?: string
  registerCta?: CtaLink
}

export type EventListProps = {
  title: string
  intro: string
  events: EventItem[]
  footerNote?: string
  footerCta?: CtaLink
}

export type EventDetailHeroProps = {
  title: string
  cadence: string
  status: EventItem['status']
  dateLabel: string
  timeLabel?: string
  location: string
  coverImage?: EventCoverImage
  registerCta?: CtaLink
}

export type EventDetailBodyProps = {
  title?: string
  summary: string
  body: string[]
  highlights?: string[]
}

export type EventGalleryProps = {
  title?: string
  photos: EventPhoto[]
  emptyNote?: string
}

export type InvolvePathway = {
  title: string
  description: string
}

export type InvolvePathwaysProps = {
  title: string
  intro: string
  pathways: InvolvePathway[]
}

export type ContactDetailsProps = {
  title: string
  intro: string[]
  phoneLabel: string
  phone: string
  locationLabel: string
  location: string
  followLabel: string
  socials: { label: string; href: string; handle: string }[]
  pressNote: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type FaqAccordionProps = {
  title?: string
  items: FaqItem[]
}

export type JourneyPillar = {
  slug: string
  name: string
  number: number
  question: string
  statement: string
  summary: string
  description: string[]
}

export type JourneySectionProps = {
  title: string
  intro: string
  pillars: JourneyPillar[]
}

export type ChapterItem = {
  country: string
  leaderName: string
  leaderTitle?: string
  bio?: string
  photo?: EventCoverImage
}

export type GlobalPresenceProps = {
  title: string
  intro: string
  nations: string[]
  images: EventCoverImage[]
  chapters: ChapterItem[]
}

export type CommunityGroup = {
  title: string
  description: string
}

export type CommunityGroupsProps = {
  title: string
  intro: string
  groups: CommunityGroup[]
}

export type TrainingTopic = {
  title: string
  summary: string
  points: string[]
  category: 'fundamental' | 'specialised'
}

export type TrainingSectionProps = {
  title: string
  intro: string
  topics: TrainingTopic[]
}

export type QuoteBandProps = {
  quote: string
  attribution?: string
}

export type SiteNavLink = {
  label: string
  href: string
}

export type SiteContent = {
  name: string
  shortName: string
  logoSrc: string
  logoAlt: string
  /** Marketing “Register” CTAs — sends users to Programs to learn about the Summit. */
  registerCtaHref: string
  registerCtaLabel: string
  nav: SiteNavLink[]
  phone: string
  location: string
  socials: { label: string; href: string; handle: string }[]
  footerTagline: string
}

/** Full page payloads (local content + Contentful adapters share these shapes). */

export type HomePageContent = {
  hero: HeroSectionProps
  about: TextBlockProps
  journey: JourneySectionProps
  explore: ExploreLinksProps
  presence: GlobalPresenceProps
  trackRecord: TrackRecordProps
  testimonials: TestimonialsProps
  readyCta: CtaBannerProps
}

export type AboutPageContent = {
  whyWeExist: TextBlockProps
  mission: MissionBlockProps
  beliefs: BeliefsListProps
  difference: DifferenceBlockProps
  presence: GlobalPresenceProps
  leadership: LeadershipListProps
  joinCta: CtaBannerProps
}

export type JourneyPageContent = {
  intro: TextBlockProps
  pillars: JourneySectionProps
  community: CommunityGroupsProps
  training: TrainingSectionProps
  beyond: TextBlockProps
  commissioning: TextBlockProps
  cta: CtaBannerProps
}

export type ProgramsPageContent = {
  list: EventListProps
}

export type GetInvolvedPageContent = {
  pathways: InvolvePathwaysProps
  readyCta: CtaBannerProps
}

export type ContactPageContent = {
  details: ContactDetailsProps
}

export type FaqPageContent = {
  faq: FaqAccordionProps
  cta: CtaBannerProps
}
