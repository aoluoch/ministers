import { siteContent } from '@/content/site'
import type {
  CtaBannerProps,
  ExploreLinksProps,
  HeroSectionProps,
  TextBlockProps,
  TestimonialsProps,
  TrackRecordProps,
} from '@/types/content'

export const homeContent = {
  hero: {
    brandName: siteContent.name,
    headline: "You don't have to figure out ministry alone.",
    body: "The Young Ministers' Summit is a community that mentors, equips, and walks with young ministers of the gospel — so you can grow into everything God has called you to be, without doing it in isolation.",
    supportingLine: 'Ministry does not have to be stressful. We can walk with you in the journey.',
    primaryCta: {
      label: 'Register for the Summit — August 1, 2026',
      href: siteContent.registerCtaHref,
    },
  } satisfies HeroSectionProps,

  about: {
    title: "What We're About",
    paragraphs: [
      'We gather young preachers, worshippers, prophets, teachers, and campus leaders from every denomination and background into one community — a place to be discipled, healed, equipped, and held accountable, so the gifts God gave you can produce lasting fruit.',
      "This isn't a one-time event. It's a lifetime commitment to raising ministers who finish well.",
    ],
    quote: "We're not building a crowd. We're building a generation.",
  } satisfies TextBlockProps,

  explore: {
    title: 'Explore',
    items: [
      {
        title: 'Our Programs',
        description:
          'From the annual Summit to quarterly classes, see how we equip young ministers for the long road ahead.',
        href: '/programs',
        linkLabel: 'View programs',
      },
      {
        title: 'Get Involved',
        description:
          "Attend, volunteer, partner, or simply join the community. There's a place for you here.",
        href: '/get-involved',
        linkLabel: 'Ways to join',
      },
      {
        title: 'Past & Upcoming Events',
        description: "See what's coming next — starting with our very first Summit.",
        href: '/programs',
        linkLabel: 'See events',
      },
    ],
  } satisfies ExploreLinksProps,

  trackRecord: {
    title: 'A Track Record You Can Trust',
    paragraphs: [
      "Our founder, Apostle Dr. David Owusu, has spent over two decades ministering across 16 countries, mentoring thousands of young preachers, worshippers, and campus leaders into their calling. Many of those he's walked with are now leading their own ministries across the United Kingdom, The United States, Ghana, and Kenya.",
    ],
    quote: "Your past doesn't disqualify you. It's part of the assignment.",
  } satisfies TrackRecordProps,

  testimonials: {
    title: 'In Their Words',
    quotes: [
      { quote: "This isn't a conference. It's a forum that's here to stay." },
      { quote: 'Healed ministers make honest ministers.' },
      { quote: 'No sermons here — just real stories, real wounds, real growth.' },
    ],
    story:
      'Pastor Charles Finney was once a campus leader mentored through this community. Today, he pastors Grace Encounter Fellowship in Thika — one of the fastest-growing youth churches in Kenya — and has hosted over five meetings across the country in the past six months, each drawing more than 5,000 young people.',
  } satisfies TestimonialsProps,

  readyCta: {
    title: 'Ready to Take the Next Step?',
    body: "Join us for the first-ever Young Ministers' Summit on August 1, 2026.",
    primaryCta: {
      label: 'Register Now',
      href: siteContent.registerCtaHref,
    },
    tone: 'purple',
  } satisfies CtaBannerProps,
}
