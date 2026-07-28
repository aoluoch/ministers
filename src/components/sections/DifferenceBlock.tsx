import { Reveal } from '@/components/layout/Reveal'
import type { DifferenceBlockProps } from '@/types/content'

export function DifferenceBlock({ title, paragraphs, quotes }: DifferenceBlockProps) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Reveal className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
        <div className="mt-8 space-y-3">
          {quotes.map((quote) => (
            <blockquote
              key={quote}
              className="font-display text-lg font-semibold text-brand-purple sm:text-xl"
            >
              “{quote}”
            </blockquote>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
