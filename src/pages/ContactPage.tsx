import { useLoaderData } from 'react-router-dom'
import { ContactDetails } from '@/components/sections/ContactDetails'
import type { ContactPageContent } from '@/types/content'

export function ContactPage() {
  const { details } = useLoaderData() as ContactPageContent
  return <ContactDetails {...details} />
}
