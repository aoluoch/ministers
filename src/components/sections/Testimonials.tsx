import { Reveal } from '@/components/layout/Reveal'
import type { TestimonialsProps } from '@/types/content'

export function Testimonials({ title, quotes, story }: TestimonialsProps) {
  return (
    <section className="section-atmosphere px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {quotes.map((item, index) => (
            <Reveal key={item.quote} delayMs={index * 90}>
              <blockquote className="border-l-4 border-brand-peach pl-4 font-display text-lg font-semibold leading-snug text-brand-purple">
                “{item.quote}”
              </blockquote>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 max-w-3xl">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{story}</p>
        </Reveal>
      </div>
    </section>
  )
}
