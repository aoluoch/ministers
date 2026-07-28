import { Reveal } from '@/components/layout/Reveal'
import type { InvolvePathwaysProps } from '@/types/content'

export function InvolvePathways({ title, intro, pathways }: InvolvePathwaysProps) {
  return (
    <section className="section-atmosphere px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {pathways.map((pathway, index) => (
            <Reveal key={pathway.title} delayMs={index * 45}>
              <li className="rounded-xl border border-brand-purple/10 bg-card/80 p-6 shadow-sm">
                <h3 className="font-display text-xl font-bold text-brand-purple">{pathway.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pathway.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
