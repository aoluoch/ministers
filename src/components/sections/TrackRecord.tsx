import { Reveal } from '@/components/layout/Reveal'
import type { TrackRecordProps } from '@/types/content'

export function TrackRecord({ title, paragraphs, quote }: TrackRecordProps) {
  if (!title && !paragraphs.length && !quote) return null

  return (
    <section className="bg-brand-purple px-4 py-16 text-brand-cream sm:px-6 lg:px-8 lg:py-20">
      <Reveal className="mx-auto max-w-3xl">
        {title ? (
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-summit-gradient">{title}</span>
          </h2>
        ) : null}
        {paragraphs.length ? (
          <div className="mt-6 space-y-4 text-base leading-relaxed text-brand-cream/85 sm:text-lg">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        ) : null}
        {quote ? (
          <blockquote className="mt-8 font-display text-xl font-semibold text-brand-beige sm:text-2xl">
            “{quote}”
          </blockquote>
        ) : null}
      </Reveal>
    </section>
  )
}
