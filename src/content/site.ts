// Relative import (not the `@/` alias) so build-time SEO tooling in `seo/` can
// load this file directly from Node — see src/lib/seo/pages.ts.
import type { SiteContent } from '../types/content.ts'

export const siteContent: SiteContent = {
  name: 'Young Ministers Movement',
  shortName: 'YMM',
  logoSrc: '/newlogo.jpeg',
  logoAlt: 'Young Ministers Movement logo',
  registerCtaHref: '/get-involved',
  registerCtaLabel: 'Join the Movement',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Journey', href: '/journey' },
    { label: 'Programs', href: '/programs' },
    { label: 'Blog', href: '/blog' },
    { label: 'Get Involved', href: '/get-involved' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
  phone: '0705053784',
  location: 'Grace Arena Ministries, Bungoma Rd, Off Baricho Rd.',
  socials: [
    {
      label: 'Instagram',
      href: 'https://instagram.com/youngministers_summit',
      handle: '@youngministers_summit',
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com/youngministerssummit',
      handle: 'Young Ministers Summit',
    },
    {
      label: 'TikTok',
      href: 'https://tiktok.com/@youngministers_summit',
      handle: '@youngministers_summit',
    },
  ],
  footerTagline:
    'Raising ministers of the gospel who are fully equipped to operate and minister the gospel globally.',
}
