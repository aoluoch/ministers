import { Reveal } from '@/components/layout/Reveal'
import type { BeliefsListProps } from '@/types/content'

export function BeliefsList({ title, intro, beliefs }: BeliefsListProps) {
  if (!title && !intro && !beliefs.length) return null

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
        {beliefs.length ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {beliefs.map((belief, index) => (
              <Reveal key={belief.title} delayMs={index * 50}>
                <li className="border-t border-brand-peach/80 pt-4">
                  <h3 className="font-display text-lg font-bold text-brand-purple">
                    {belief.title}
                  </h3>
                  {belief.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {belief.description}
                    </p>
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
