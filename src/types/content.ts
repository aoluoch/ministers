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
}

export type TextBlockProps = {
  eyebrow?: string
  title: string
  paragraphs: string[]
  quote?: string
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
  intro: string
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
  /** Google Form URL for actual signup (used on the Summit event detail page). */
  registerFormUrl: string
  nav: SiteNavLink[]
  phone: string
  location: string
  socials: { label: string; href: string; handle: string }[]
  footerTagline: string
}
