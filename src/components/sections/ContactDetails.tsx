import { Reveal } from '@/components/layout/Reveal'
import { SocialLinks } from '@/components/SocialLinks'
import type { ContactDetailsProps } from '@/types/content'

export function ContactDetails({
  title,
  intro,
  phoneLabel,
  phone,
  locationLabel,
  location,
  followLabel,
  socials,
  pressNote,
}: ContactDetailsProps) {
  return (
    <section className="section-atmosphere px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Reveal className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{intro}</p>

        <dl className="mt-10 space-y-6">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-peach">
              {phoneLabel}
            </dt>
            <dd className="mt-2 text-base text-brand-ink">{phone}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-peach">
              {locationLabel}
            </dt>
            <dd className="mt-2 text-base text-brand-ink">{location}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-peach">
              {followLabel}
            </dt>
            <dd className="mt-4">
              <SocialLinks
                socials={socials}
                iconClassName="h-5 w-5"
                linkClassName="h-11 w-11 bg-brand-purple text-brand-cream hover:bg-brand-purple-deep"
              />
            </dd>
          </div>
        </dl>

        <p className="mt-10 text-sm leading-relaxed text-muted-foreground">{pressNote}</p>
      </Reveal>
    </section>
  )
}
