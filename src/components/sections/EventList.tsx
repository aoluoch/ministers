import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { Reveal } from '@/components/layout/Reveal'
import { CtaButton } from '@/components/sections/CtaButton'
import { cn } from '@/lib/utils'
import type { EventItem, EventListProps } from '@/types/content'

const statusLabel: Record<EventItem['status'], string> = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  past: 'Past event',
}

function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="overflow-hidden rounded-xl border border-brand-purple/10 bg-card/80 shadow-sm transition hover:border-brand-peach/60">
      <Link
        to={`/programs/${event.slug}`}
        className="grid gap-0 sm:grid-cols-[11rem_1fr] md:grid-cols-[14rem_1fr]"
      >
        <div className="relative min-h-40 bg-brand-purple sm:min-h-full">
          {event.coverImage ? (
            <img
              src={event.coverImage.src}
              alt={event.coverImage.alt}
              className="h-full w-full object-cover opacity-95"
            />
          ) : null}
          <span
            className={cn(
              'absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider',
              event.status === 'past'
                ? 'bg-brand-cream/90 text-brand-purple'
                : 'bg-brand-peach text-brand-purple-deep',
            )}
          >
            {statusLabel[event.status]}
          </span>
        </div>

        <div className="flex flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="font-display text-xl font-bold text-brand-purple sm:text-2xl">
              {event.title}
            </h2>
            {event.cadence ? (
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-peach">
                {event.cadence}
              </span>
            ) : null}
          </div>

          {event.summary ? (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {event.summary}
            </p>
          ) : null}

          {(event.dateLabel || event.timeLabel || event.location) ? (
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-brand-ink/75">
              {(event.dateLabel || event.timeLabel) ? (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-brand-peach" />
                  {event.dateLabel}
                  {event.timeLabel ? ` · ${event.timeLabel}` : ''}
                </span>
              ) : null}
              {event.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand-peach" />
                  {event.location}
                </span>
              ) : null}
            </div>
          ) : null}

          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-purple">
            View event details
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </article>
  )
}

function EventGroup({
  title,
  events,
  offset = 0,
}: {
  title: string
  events: EventItem[]
  offset?: number
}) {
  if (!events.length) return null

  return (
    <div>
      <Reveal>
        <h2 className="font-display text-2xl font-bold text-brand-purple sm:text-3xl">
          {title}
        </h2>
      </Reveal>
      <div className="mt-5 space-y-6">
        {events.map((event, index) => (
          <Reveal key={event.slug} delayMs={(offset + index) * 70}>
            <EventCard event={event} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export function EventList({ title, intro, events, footerNote, footerCta }: EventListProps) {
  if (!title && !intro && !events.length && !footerNote && !footerCta) return null
  const activeEvents = events.filter((event) => event.status !== 'past')
  const pastEvents = events.filter((event) => event.status === 'past')

  return (
    <section className="section-atmosphere px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        {(title || intro) ? (
          <Reveal className="max-w-3xl">
            {title ? (
              <h1 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h1>
            ) : null}
            {intro ? (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {intro}
              </p>
            ) : null}
          </Reveal>
        ) : null}

        {events.length ? (
          <div className={cn('space-y-6', title || intro ? 'mt-12' : 'mt-0')}>
            <EventGroup title="Upcoming events" events={activeEvents} />
            <EventGroup title="Past events" events={pastEvents} offset={activeEvents.length} />
          </div>
        ) : null}

        {(footerNote || footerCta) && (
          <Reveal className="mt-12 max-w-3xl">
            {footerNote ? (
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {footerNote}
              </p>
            ) : null}
            {footerCta ? (
              <div className="mt-5">
                <CtaButton cta={footerCta} variant="outline" size="default" />
              </div>
            ) : null}
          </Reveal>
        )}
      </div>
    </section>
  )
}
