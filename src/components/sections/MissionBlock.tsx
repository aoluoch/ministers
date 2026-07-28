import { Reveal } from '@/components/layout/Reveal'
import type { MissionBlockProps } from '@/types/content'

export function MissionBlock({ title, body }: MissionBlockProps) {
  return (
    <section className="bg-brand-purple px-4 py-16 text-brand-cream sm:px-6 lg:px-8 lg:py-20">
      <Reveal className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold sm:text-4xl">
          <span className="text-summit-gradient">{title}</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-brand-cream/90 sm:text-lg">{body}</p>
      </Reveal>
    </section>
  )
}
