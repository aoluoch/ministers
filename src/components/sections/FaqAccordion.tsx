import { Reveal } from '@/components/layout/Reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FaqAccordionProps } from '@/types/content'

export function FaqAccordion({ title = 'FAQ', items }: FaqAccordionProps) {
  return (
    <section className="section-atmosphere px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h2>
        </Reveal>
        <Reveal className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
