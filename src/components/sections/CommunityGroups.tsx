import { Reveal } from '@/components/layout/Reveal'
import type { CommunityGroupsProps } from '@/types/content'

export function CommunityGroups({ title, intro, groups }: CommunityGroupsProps) {
  if (!groups.length) return null

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
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
        {groups.length ? (
          <ol className={title || intro ? 'mt-12 grid gap-6 md:grid-cols-3' : 'grid gap-6 md:grid-cols-3'}>
            {groups.map((group, index) => (
              <Reveal key={group.title} delayMs={index * 50}>
                <li className="h-full rounded-xl border border-brand-purple/10 bg-card/80 p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-peach">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-brand-purple">
                    {group.title}
                  </h3>
                  {group.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {group.description}
                    </p>
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  )
}
