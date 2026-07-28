import { contactContent } from '@/content/contact'
import { ContactDetails } from '@/components/sections/ContactDetails'

export function ContactPage() {
  return <ContactDetails {...contactContent.details} />
}
