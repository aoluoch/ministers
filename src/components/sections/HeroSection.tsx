import { siteContent } from '@/content/site'
import { CtaButton } from '@/components/sections/CtaButton'
import { CmsImage } from '@/components/ui/cms-image'
import { cn } from '@/lib/utils'
import type { HeroSectionProps } from '@/types/content'

export function HeroSection({
  brandName,
  headline,
  body,
  supportingLine,
  primaryCta,
  image,
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
            'radial-gradient(ellipse 70% 55% at 85% 20%, rgba(253,209,50,0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(196,160,212,0.28), transparent 50%)',
        }}
      />
      <div
        className={cn(
          'relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-20',
          image ? 'lg:grid-cols-[1.15fr_0.85fr]' : '',
        )}
      >
        <div>
          <div className="animate-fade-in flex items-center gap-4">
            <img
              src={siteContent.logoSrc}
              alt={siteContent.logoAlt}
              width={144}
              height={144}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              className="h-28 w-28 rounded-2xl object-cover ring-2 ring-brand-peach/40 sm:h-36 sm:w-36"
            />
          </div>

          <h1 className="animate-fade-up mt-8 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-summit-gradient">{brandName}</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-2xl font-serif text-xl italic text-brand-cream sm:text-2xl"
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

        {image ? (
          <div className="animate-fade-in hidden justify-center lg:flex">
            <CmsImage
              src={image.src}
              alt={image.alt}
              width={560}
              height={448}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="max-h-[28rem] w-full rounded-2xl object-contain"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
