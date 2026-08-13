import { Link } from 'react-router-dom'
import { Reveal } from '@/components/layout/Reveal'
import type { JourneySectionProps } from '@/types/content'

type JourneyPillarsProps = JourneySectionProps & {
  variant?: 'summary' | 'detail'
}

function padNumber(value: number) {
  return String(value).padStart(2, '0')
}

export function JourneyPillars({
  title,
  intro,
  pillars,
  variant = 'summary',
}: JourneyPillarsProps) {
  if (!pillars.length) return null

  const detail = variant === 'detail'

  return (
    <section className="section-atmosphere px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        {(title || intro) ? (
          <Reveal className="max-w-3xl">
            {title ? (
              <h2 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h2>
            ) : null}
            {intro ? (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {intro}
              </p>
            ) : null}
          </Reveal>
        ) : null}

        {pillars.length ? (
          <ol className={title || intro ? 'mt-12 grid gap-6 sm:grid-cols-2' : 'grid gap-6 sm:grid-cols-2'}>
            {pillars.map((pillar, index) => {
              const body = (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-peach">
                    {padNumber(pillar.number || index + 1)}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold text-brand-purple">
                    {pillar.name}
                  </h3>
                  {pillar.question ? (
                    <p className="mt-2 text-sm font-medium text-brand-purple/80">
                      {pillar.question}
                    </p>
                  ) : null}
                  {pillar.statement ? (
                    <p className="mt-3 font-serif text-lg italic text-brand-purple">
                      “{pillar.statement}”
                    </p>
                  ) : null}
                  {detail
                    ? pillar.description.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 48)}
                          className="mt-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          {paragraph}
                        </p>
                      ))
                    : pillar.summary ? (
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {pillar.summary}
                        </p>
                      ) : null}
                </>
              )

              return (
                <Reveal key={pillar.slug || pillar.name} delayMs={index * 60}>
                  <li
                    id={detail ? pillar.slug : undefined}
                    className="h-full rounded-xl border border-brand-purple/10 bg-card/80 p-6 shadow-sm"
                  >
                    {detail ? (
                      body
                    ) : (
                      <Link to={`/journey#${pillar.slug}`} className="block h-full">
                        {body}
                        <span className="mt-4 inline-block text-sm font-semibold text-brand-purple">
                          Read the full pillar →
                        </span>
                      </Link>
                    )}
                  </li>
                </Reveal>
              )
            })}
          </ol>
        ) : null}
      </div>
    </section>
  )
}
