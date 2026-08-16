import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { EventList } from '@/components/sections/EventList'
import { programsPageSeo } from '@/lib/seo/routes'
import { SITE_URL } from '@/lib/seo/site-url'
import type { ProgramsPageContent } from '@/types/content'

export function ProgramsPage() {
  const { list } = useLoaderData() as ProgramsPageContent
  const seo = useMemo(
    () =>
      programsPageSeo(
        SITE_URL,
        list.events.map((event) => ({ slug: event.slug, title: event.title })),
      ),
    [list.events],
  )

  return (
    <>
      <Seo {...seo} />
      <EventList {...list} />
    </>
  )
}
