import { Reveal } from '@/components/layout/Reveal'
import type { InvolvePathwaysProps } from '@/types/content'

export function InvolvePathways({ title, intro, pathways }: InvolvePathwaysProps) {
  if (!title && !intro && !pathways.length) return null

  const gridClassName = title || intro
    ? 'mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3'

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
        {pathways.length ? (
          <ul className={gridClassName}>
            {pathways.map((pathway, index) => (
              <Reveal key={pathway.title} delayMs={index * 45}>
                <li className="rounded-xl border border-brand-purple/10 bg-card/80 p-6 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-brand-purple">
                    {pathway.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {pathway.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
