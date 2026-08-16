import { useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { HeroSection } from '@/components/sections/HeroSection'
import { TextBlock } from '@/components/sections/TextBlock'
import { JourneyPillars } from '@/components/sections/JourneyPillars'
import { ExploreLinks } from '@/components/sections/ExploreLinks'
import { GlobalPresence } from '@/components/sections/GlobalPresence'
import { TrackRecord } from '@/components/sections/TrackRecord'
import { Testimonials } from '@/components/sections/Testimonials'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { staticPageSeo } from '@/lib/seo/routes'
import { SITE_URL } from '@/lib/seo/site-url'
import type { HomePageContent } from '@/types/content'

export function HomePage() {
  const c = useLoaderData() as HomePageContent

  return (
    <>
      <Seo {...staticPageSeo('/', SITE_URL)} />
      <HeroSection {...c.hero} />
      <TextBlock {...c.about} />
      <JourneyPillars {...c.journey} />
      <ExploreLinks {...c.explore} />
      <GlobalPresence {...c.presence} />
      <TrackRecord {...c.trackRecord} />
      <Testimonials {...c.testimonials} />
      <CtaBanner {...c.readyCta} />
    </>
  )
}
