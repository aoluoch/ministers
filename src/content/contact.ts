import { siteContent } from '@/content/site'
import type { ContactDetailsProps } from '@/types/content'

export const contactContent = {
  details: {
    title: 'Get in Touch',
    intro: "We'd love to hear from you.",
    phoneLabel: 'Phone',
    phone: siteContent.phone,
    locationLabel: 'Location',
    location: siteContent.location,
    followLabel: 'Follow us',
    socials: siteContent.socials,
    pressNote:
      'For media and press inquiries, reach our Media & PR team through the contact details above.',
  } satisfies ContactDetailsProps,
}
