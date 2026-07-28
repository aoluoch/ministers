import { siteContent } from '@/content/site'
import type { CtaBannerProps, InvolvePathwaysProps } from '@/types/content'

export const getInvolvedContent = {
  pathways: {
    title: "There's a Place for You Here",
    intro:
      "The Young Ministers' Summit isn't something you attend once and leave behind — it's a community you grow with. Here's how to step in.",
    pathways: [
      {
        title: 'Become a Member',
        description:
          'Join the community of young ministers being mentored, equipped, and held accountable for the long haul.',
      },
      {
        title: 'Volunteer',
        description:
          "Give your time and skills to help the Summit and our ongoing work run well. Just reach out to us — we'll guide you through the next steps.",
      },
      {
        title: 'Attend an Event',
        description:
          "Start with our first-ever Summit on August 1, 2026. It's free, and open to every young minister — no matter your denomination or location.",
      },
      {
        title: 'Spread the Word',
        description:
          "Know a young minister who's gifted but growing alone? Tell them about us.",
      },
      {
        title: 'Join a Mailing List',
        description: 'Stay in the loop as we grow. (Coming soon.)',
      },
      {
        title: 'Partner With Us',
        description:
          'We welcome partnerships with organizations, ministries, and individuals who share our heart for equipping young ministers — from training resources to practical support like leadership development, finances, and more.',
      },
    ],
  } satisfies InvolvePathwaysProps,

  readyCta: {
    title: 'Ready to Start?',
    primaryCta: {
      label: 'Register for the Summit',
      href: siteContent.registerCtaHref,
    },
    secondaryCta: {
      label: 'Contact Us to Volunteer or Partner',
      href: '/contact',
    },
    tone: 'purple',
  } satisfies CtaBannerProps,
}
