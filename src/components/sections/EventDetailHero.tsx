import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react'
import { CtaButton } from '@/components/sections/CtaButton'
import { cn } from '@/lib/utils'
import type { EventDetailHeroProps, EventItem } from '@/types/content'

const statusLabel: Record<EventItem['status'], string> = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  past: 'Past event',
}

export function EventDetailHero({
  title,
  cadence,
  status,
  dateLabel,
  timeLabel,
  location,
  coverImage,
  registerCta,
}: EventDetailHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-purple text-brand-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 55% at 85% 20%, rgba(236,179,120,0.35), transparent 55%)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
        <div className="animate-fade-up">
          <Link
            to="/programs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-beige transition hover:text-brand-cream"
          >
            <ArrowLeft className="h-4 w-4" />
            All events
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                'rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider',
                status === 'past' ? 'bg-brand-cream/20 text-brand-cream' : 'bg-brand-peach text-brand-purple-deep',
              )}
            >
              {statusLabel[status]}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-peach">
              {cadence}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-summit-gradient">{title}</span>
          </h1>

          <ul className="mt-6 space-y-3 text-sm text-brand-cream/90 sm:text-base">
            <li className="flex items-start gap-2.5">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-brand-peach" />
              <span>{dateLabel}</span>
            </li>
            {timeLabel ? (
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-peach" />
                <span>{timeLabel}</span>
              </li>
            ) : null}
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-peach" />
              <span>{location}</span>
            </li>
          </ul>

          {registerCta ? (
            <div className="mt-8">
              <CtaButton cta={registerCta} variant="gradient" />
            </div>
          ) : null}
        </div>

        <div className="animate-fade-in relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full ring-2 ring-brand-peach/40 lg:mx-0 lg:max-w-none lg:justify-self-end">
          {coverImage ? (
            <img
              src={coverImage.src}
              alt={coverImage.alt}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-brand-purple-deep font-display text-brand-beige">
              YMS
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
