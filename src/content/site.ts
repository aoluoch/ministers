import { getRegisterFormUrl } from '@/lib/register'
import type { SiteContent } from '@/types/content'

export const siteContent: SiteContent = {
  name: "Young Ministers' Summit",
  shortName: 'YMS',
  logoSrc: '/ymlogo.jpg',
  logoAlt: "Young Ministers' Summit logo",
  registerCtaHref: '/programs',
  registerCtaLabel: 'Register for the Summit',
  registerFormUrl: getRegisterFormUrl(),
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Get Involved', href: '/get-involved' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
  phone: '[Insert phone number]',
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
    'Mentoring, equipping, and walking with young ministers of the gospel — so you finish well.',
}
