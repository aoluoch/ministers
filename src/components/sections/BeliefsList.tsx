import { Reveal } from '@/components/layout/Reveal'
import type { BeliefsListProps } from '@/types/content'

export function BeliefsList({ title, intro, beliefs }: BeliefsListProps) {
  return (
    <section className="section-atmosphere px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
        </Reveal>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {beliefs.map((belief, index) => (
            <Reveal key={belief.title} delayMs={index * 50}>
              <li className="border-t border-brand-peach/80 pt-4">
                <h3 className="font-display text-lg font-bold text-brand-purple">{belief.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {belief.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
