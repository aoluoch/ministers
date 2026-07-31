import { Reveal } from '@/components/layout/Reveal'
import type { MissionBlockProps } from '@/types/content'

export function MissionBlock({ title, body }: MissionBlockProps) {
  if (!title && !body) return null

  return (
    <section className="bg-brand-purple px-4 py-16 text-brand-cream sm:px-6 lg:px-8 lg:py-20">
      <Reveal className="mx-auto max-w-3xl">
        {title ? (
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-summit-gradient">{title}</span>
          </h2>
        ) : null}
        {body ? (
          <p className="mt-6 text-base leading-relaxed text-brand-cream/90 sm:text-lg">{body}</p>
        ) : null}
      </Reveal>
    </section>
  )
}
