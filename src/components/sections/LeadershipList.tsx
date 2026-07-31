import { Reveal } from '@/components/layout/Reveal'
import type { LeadershipListProps } from '@/types/content'

export function LeadershipList({ title, leaders }: LeadershipListProps) {
  if (!title && !leaders.length) return null

  return (
    <section className="section-atmosphere px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        {title ? (
          <Reveal>
            <h2 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h2>
          </Reveal>
        ) : null}
        {leaders.length ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader, index) => (
              <Reveal key={`${leader.role}-${leader.name}`} delayMs={index * 40}>
                <li className="rounded-lg border border-brand-purple/10 bg-card/70 p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-peach">
                    {leader.role}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-brand-purple">
                    {leader.name}
                  </h3>
                  {leader.affiliation ? (
                    <p className="mt-1 text-sm text-muted-foreground">{leader.affiliation}</p>
                  ) : null}
                  {leader.bio ? (
                    <p className="mt-3 text-sm italic leading-relaxed text-muted-foreground">
                      {leader.bio}
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
