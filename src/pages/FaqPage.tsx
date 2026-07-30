import { useLoaderData } from 'react-router-dom'
import { FaqAccordion } from '@/components/sections/FaqAccordion'
import { CtaBanner } from '@/components/sections/CtaBanner'
import type { FaqPageContent } from '@/types/content'

export function FaqPage() {
  const c = useLoaderData() as FaqPageContent

  return (
    <>
      <FaqAccordion {...c.faq} />
      <CtaBanner {...c.cta} />
    </>
  )
}
