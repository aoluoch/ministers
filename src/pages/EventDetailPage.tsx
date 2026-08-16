import { useMemo } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { EventDetailHero } from '@/components/sections/EventDetailHero'
import { EventDetailBody } from '@/components/sections/EventDetailBody'
import { EventGallery } from '@/components/sections/EventGallery'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { siteContent } from '@/content/site'
import { eventDetailSeo } from '@/lib/seo/routes'
import { SITE_URL } from '@/lib/seo/site-url'
import { NotFoundPage } from '@/pages/NotFoundPage'
import type { EventItem } from '@/types/content'

export function EventDetailPage() {
  const event = useLoaderData() as EventItem | undefined

  /** Title, description, OG image, and Event schema all come from the CMS entry. */
  const seo = useMemo(() => {
    if (!event) return null
    return eventDetailSeo(
      SITE_URL,
      {
        slug: event.slug,
        title: event.title,
        summary: event.summary,
        dateIso: event.dateIso,
        dateLabel: event.dateLabel,
        location: event.location,
        imageUrl: event.coverImage?.src,
        imageAlt: event.coverImage?.alt,
      },
      { status: event.status, registerUrl: event.registerCta?.href },
    )
  }, [event])

  // Unknown slug → real 404 (noindex) instead of a silent redirect, so Google
  // does not index a soft 404 for a URL that never existed.
  if (!event || !seo) {
    return <NotFoundPage />
  }

  return (
    <>
      <Seo {...seo} />
      <EventDetailHero
        title={event.title}
        slug={event.slug}
        cadence={event.cadence}
        status={event.status}
        dateLabel={event.dateLabel}
        timeLabel={event.timeLabel}
        location={event.location}
        coverImage={event.coverImage}
        registerCta={event.registerCta}
      />
      <EventDetailBody
        title={event.detailTitle}
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

      {/* Internal links keep event pages connected to the main public pages. */}
      <nav
        aria-label="Related pages"
        className="border-t border-brand-purple/10 px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium">
          <Link to="/programs" className="text-brand-purple underline-offset-4 hover:underline">
            All programs
          </Link>
          <Link to="/journey" className="text-brand-purple underline-offset-4 hover:underline">
            The journey
          </Link>
          <Link to="/about" className="text-brand-purple underline-offset-4 hover:underline">
            About the movement
          </Link>
          <Link to="/get-involved" className="text-brand-purple underline-offset-4 hover:underline">
            Get involved
          </Link>
          <Link to="/faq" className="text-brand-purple underline-offset-4 hover:underline">
            FAQ
          </Link>
        </div>
      </nav>
    </>
  )
}
