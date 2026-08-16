import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { FaqAccordion } from '@/components/sections/FaqAccordion'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { staticPageSeo } from '@/lib/seo/routes'
import { faqSchema } from '@/lib/seo/schema'
import { SITE_URL } from '@/lib/seo/site-url'
import type { FaqPageContent } from '@/types/content'

export function FaqPage() {
  const c = useLoaderData() as FaqPageContent

  /** FAQPage schema from the published Contentful questions (never invented). */
  const seo = useMemo(() => {
    const faq = faqSchema(SITE_URL, c.faq.items)
    return staticPageSeo('/faq', SITE_URL, faq ? [faq] : [])
  }, [c.faq.items])

  return (
    <>
      <Seo {...seo} />
      <FaqAccordion {...c.faq} />
      <CtaBanner {...c.cta} />
    </>
  )
}
