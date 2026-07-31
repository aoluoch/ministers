import { Reveal } from '@/components/layout/Reveal'
import type { EventDetailBodyProps } from '@/types/content'

export function EventDetailBody({
  title,
  summary,
  body,
  highlights,
}: EventDetailBodyProps) {
  const heading = title ?? (summary || body.length || highlights?.length ? 'About this event' : '')

  if (!heading && !summary && !body.length && !highlights?.length) return null

  return (
    <section className="section-atmosphere px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <Reveal>
          {heading ? (
            <h2 className="font-display text-2xl font-bold text-brand-purple sm:text-3xl">
              {heading}
            </h2>
          ) : null}
          {summary ? (
            <p className="mt-4 text-base font-medium leading-relaxed text-brand-ink/90 sm:text-lg">
              {summary}
            </p>
          ) : null}
          {body.length ? (
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              {body.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </Reveal>

        {highlights?.length ? (
          <Reveal delayMs={80}>
            <aside className="rounded-xl border border-brand-purple/10 bg-card/80 p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-brand-purple">Event details</h3>
              <ul className="mt-4 space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-brand-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-peach" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
