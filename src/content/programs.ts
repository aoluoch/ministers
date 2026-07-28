import { siteContent } from '@/content/site'
import type { EventItem, EventListProps } from '@/types/content'

/** Self-contained events — each entry holds summary + full detail (including photos). */
export const events: EventItem[] = [
  {
    slug: 'young-ministers-summit-2026',
    title: "Young Ministers' Summit",
    cadence: 'Annual',
    status: 'upcoming',
    summary:
      "Our flagship gathering — a space for young ministers across denominations to be mentored, taught, and refreshed together. It's not a performance and it's not a stage for image. It's real stories, real growth, and practical equipping for the road ahead.",
    dateLabel: 'August 1, 2026',
    timeLabel: 'Starting 8:00 AM',
    location: 'Grace Arena Ministries, Bungoma Rd, Off Baricho Rd.',
    coverImage: {
      src: '/ymlogo.jpg',
      alt: "Young Ministers' Summit logo",
    },
    body: [
      "The Young Ministers' Summit is our flagship annual gathering for young ministers across denominations. Come ready for mentorship, teaching, and refreshment — not a performance stage, but a room for real stories, real growth, and practical equipping.",
      'This is the first-ever Summit, open to young ministers countrywide. Whether you preach, worship, prophesy, teach, or lead on campus, there is a place for you here.',
      "After the day ends, the relationship doesn't. We stay in touch and walk with you on the road ahead.",
    ],
    highlights: [
      'First-ever Summit: August 1, 2026',
      'Starts at 8:00 AM',
      'Held at Grace Arena Ministries',
      'Open to young ministers countrywide',
      'Completely free to attend',
    ],
    photos: [],
    photosEmptyNote:
      'Photos from the Summit will appear here after the event. Follow us on social media for live updates.',
    registerCta: {
      label: 'Register for the Summit',
      href: siteContent.registerFormUrl,
    },
  },
  {
    slug: 'young-ministers-classes',
    title: "Young Ministers' Classes",
    cadence: 'Quarterly',
    status: 'upcoming',
    summary:
      'Ongoing training between Summits, so growth doesn’t stop once the event ends. These sessions dig into the practical realities of ministry — leadership, ethics, character, communication, and more — held online so ministers from anywhere can take part.',
    dateLabel: 'Quarterly schedule (dates announced soon)',
    location: 'Online',
    coverImage: {
      src: '/ymlogo.jpg',
      alt: "Young Ministers' Classes",
    },
    body: [
      'Between annual Summits, Young Ministers’ Classes keep growth moving. These quarterly sessions go deep into the practical realities of ministry — leadership, ethics, character, communication, and more.',
      'Classes are held online so ministers from anywhere in the country can take part without needing to travel to Nairobi.',
      'More session dates and stories will be published here as they are confirmed.',
    ],
    highlights: [
      'Held quarterly',
      'Online — join from anywhere',
      'Leadership, ethics, character, and communication',
      'Open to young ministers across denominations',
    ],
    photos: [],
    photosEmptyNote:
      'Class photos and session highlights will be added here as programs run. Check back soon.',
  },
]

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((event) => event.slug === slug)
}

export const programsContent = {
  list: {
    title: 'How We Equip Young Ministers',
    intro:
      'Ministry needs more than passion — it needs structure, wisdom, and community. Explore our upcoming and ongoing events, then open any event for full details and photos.',
    events,
    footerNote:
      'More stories and photos from our programs are on the way — check back soon, or follow us on social media for updates.',
    footerCta: {
      label: 'See Ways to Get Involved',
      href: '/get-involved',
    },
  } satisfies EventListProps,
}
