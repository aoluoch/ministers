import { siteContent } from '@/content/site'
import { CtaButton } from '@/components/sections/CtaButton'
import type { HeroSectionProps } from '@/types/content'

export function HeroSection({
  brandName,
  headline,
  body,
  supportingLine,
  primaryCta,
}: HeroSectionProps) {
  const hasPrimaryCta = Boolean(primaryCta.label && primaryCta.href)

  if (!brandName && !headline && !body && !supportingLine && !hasPrimaryCta) return null

  return (
    <section className="relative overflow-hidden bg-brand-purple text-brand-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 55% at 85% 20%, rgba(236,179,120,0.35), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(243,211,179,0.2), transparent 50%)',
        }}
      />
      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="animate-fade-in flex items-center gap-4">
          <img
            src={siteContent.logoSrc}
            alt={siteContent.logoAlt}
            className="h-20 w-20 rounded-full object-cover ring-2 ring-brand-peach/50 sm:h-24 sm:w-24"
          />
        </div>

        <h1 className="animate-fade-up mt-8 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-summit-gradient">{brandName}</span>
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-2xl font-display text-xl font-semibold text-brand-cream sm:text-2xl"
          style={{ animationDelay: '120ms' }}
        >
          {headline}
        </p>

        <p
          className="animate-fade-up mt-5 max-w-2xl text-base leading-relaxed text-brand-cream/85 sm:text-lg"
          style={{ animationDelay: '220ms' }}
        >
          {body}
        </p>

        <p
          className="animate-fade-up mt-4 max-w-xl text-sm font-medium text-brand-beige sm:text-base"
          style={{ animationDelay: '300ms' }}
        >
          {supportingLine}
        </p>

        {hasPrimaryCta ? (
          <div className="animate-fade-up mt-10" style={{ animationDelay: '380ms' }}>
            <CtaButton cta={primaryCta} variant="gradient" />
          </div>
        ) : null}
      </div>
    </section>
  )
}
