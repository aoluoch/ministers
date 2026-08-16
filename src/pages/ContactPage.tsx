import { useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { ContactDetails } from '@/components/sections/ContactDetails'
import { staticPageSeo } from '@/lib/seo/routes'
import { SITE_URL } from '@/lib/seo/site-url'
import type { ContactPageContent } from '@/types/content'

export function ContactPage() {
  const { details } = useLoaderData() as ContactPageContent

  return (
    <>
      <Seo {...staticPageSeo('/contact', SITE_URL)} />
      <ContactDetails {...details} />
    </>
  )
}
