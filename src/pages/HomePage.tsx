import { homeContent } from '@/content/home'
import { HeroSection } from '@/components/sections/HeroSection'
import { TextBlock } from '@/components/sections/TextBlock'
import { ExploreLinks } from '@/components/sections/ExploreLinks'
import { TrackRecord } from '@/components/sections/TrackRecord'
import { Testimonials } from '@/components/sections/Testimonials'
import { CtaBanner } from '@/components/sections/CtaBanner'

export function HomePage() {
  const c = homeContent

  return (
    <>
      <HeroSection {...c.hero} />
      <TextBlock {...c.about} />
      <ExploreLinks {...c.explore} />
      <TrackRecord {...c.trackRecord} />
      <Testimonials {...c.testimonials} />
      <CtaBanner {...c.readyCta} />
    </>
  )
}
