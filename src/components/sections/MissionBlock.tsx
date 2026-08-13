import { Reveal } from '@/components/layout/Reveal'
import type { MissionBlockProps } from '@/types/content'

export function MissionBlock({ title, body, visionTitle, visionBody }: MissionBlockProps) {
  if (!title && !body && !visionTitle && !visionBody) return null

  const hasVision = Boolean(visionTitle || visionBody)
  const hasMission = Boolean(title || body)

  return (
    <section className="bg-brand-purple px-4 py-16 text-brand-cream sm:px-6 lg:px-8 lg:py-20">
      <Reveal className="mx-auto max-w-6xl">
        <div className={hasVision && hasMission ? 'grid gap-10 md:grid-cols-2' : 'max-w-3xl'}>
          {hasVision ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-peach">
                Vision
              </p>
              {visionTitle ? (
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  <span className="text-summit-gradient">{visionTitle}</span>
                </h2>
              ) : null}
              {visionBody ? (
                <p className="mt-6 text-base leading-relaxed text-brand-cream/90 sm:text-lg">
                  {visionBody}
                </p>
              ) : null}
            </div>
          ) : null}
          {hasMission ? (
            <div>
              {hasVision ? (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-peach">
                  Mission
                </p>
              ) : null}
              {title ? (
                <h2 className={hasVision ? 'mt-3 text-3xl font-bold sm:text-4xl' : 'text-3xl font-bold sm:text-4xl'}>
                  <span className="text-summit-gradient">{title}</span>
                </h2>
              ) : null}
              {body ? (
                <p className="mt-6 text-base leading-relaxed text-brand-cream/90 sm:text-lg">{body}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </Reveal>
    </section>
  )
}
