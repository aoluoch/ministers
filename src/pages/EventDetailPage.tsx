import { Link, Navigate, useLoaderData } from 'react-router-dom'
import { EventDetailHero } from '@/components/sections/EventDetailHero'
import { EventDetailBody } from '@/components/sections/EventDetailBody'
import { EventGallery } from '@/components/sections/EventGallery'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { siteContent } from '@/content/site'
import type { EventItem } from '@/types/content'

export function EventDetailPage() {
  const event = useLoaderData() as EventItem | undefined

  if (!event) {
    return <Navigate to="/programs" replace />
  }

  return (
    <>
      <EventDetailHero
        title={event.title}
        cadence={event.cadence}
        status={event.status}
        dateLabel={event.dateLabel}
        timeLabel={event.timeLabel}
        location={event.location}
        coverImage={event.coverImage}
        registerCta={event.registerCta}
      />
      <EventDetailBody
        summary={event.summary}
        body={event.body}
        highlights={event.highlights}
      />
      <EventGallery photos={event.photos} emptyNote={event.photosEmptyNote} />
      {event.registerCta ? (
        <CtaBanner
          title="Ready to be part of this?"
          body={`Join us for ${event.title} — ${event.dateLabel}.`}
          primaryCta={event.registerCta}
          secondaryCta={{ label: 'Back to all events', href: '/programs' }}
          tone="purple"
        />
      ) : (
        <section className="px-4 py-10 text-center sm:px-6">
          <Link
            to="/programs"
            className="text-sm font-semibold text-brand-purple underline-offset-4 hover:underline"
          >
            ← Back to all events
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Questions? Reach us on{' '}
            <Link to="/contact" className="font-medium text-brand-purple hover:underline">
              Contact
            </Link>{' '}
            or follow {siteContent.socials[0]?.handle}.
          </p>
        </section>
      )}
    </>
  )
}
