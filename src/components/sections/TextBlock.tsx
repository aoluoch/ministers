import { Reveal } from '@/components/layout/Reveal'
import type { TextBlockProps } from '@/types/content'

export function TextBlock({ eyebrow, title, paragraphs, quote }: TextBlockProps) {
  if (!eyebrow && !title && !paragraphs.length && !quote) return null

  return (
    <section className="section-atmosphere px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Reveal className="mx-auto max-w-3xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple/70">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h2>
        ) : null}
        {paragraphs.length ? (
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        ) : null}
        {quote ? (
          <blockquote className="mt-8 border-l-4 border-brand-peach pl-5 font-display text-xl font-semibold text-brand-purple">
            “{quote}”
          </blockquote>
        ) : null}
      </Reveal>
    </section>
  )
}
