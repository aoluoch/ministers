import { faqContent } from '@/content/faq'
import { FaqAccordion } from '@/components/sections/FaqAccordion'
import { CtaBanner } from '@/components/sections/CtaBanner'

export function FaqPage() {
  const c = faqContent

  return (
    <>
      <FaqAccordion {...c.faq} />
      <CtaBanner {...c.cta} />
    </>
  )
}
