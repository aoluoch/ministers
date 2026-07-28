import { Reveal } from '@/components/layout/Reveal'
import { CtaButton } from '@/components/sections/CtaButton'
import { cn } from '@/lib/utils'
import type { CtaBannerProps } from '@/types/content'

export function CtaBanner({
  title,
  body,
  primaryCta,
  secondaryCta,
  tone = 'purple',
}: CtaBannerProps) {
  const purple = tone === 'purple'

  return (
    <section
      className={cn(
        'px-4 py-16 sm:px-6 lg:px-8 lg:py-20',
        purple ? 'bg-brand-purple text-brand-cream' : 'section-atmosphere text-brand-ink',
      )}
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2
          className={cn(
            'text-3xl font-bold sm:text-4xl',
            purple ? 'text-summit-gradient' : 'text-brand-purple',
          )}
        >
          {title}
        </h2>
        {body ? (
          <p
            className={cn(
              'mt-4 text-base leading-relaxed sm:text-lg',
              purple ? 'text-brand-cream/85' : 'text-muted-foreground',
            )}
          >
            {body}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CtaButton cta={primaryCta} variant={purple ? 'gradient' : 'default'} />
          {secondaryCta ? (
            <CtaButton cta={secondaryCta} variant={purple ? 'cream' : 'outline'} />
          ) : null}
        </div>
      </Reveal>
    </section>
  )
}
