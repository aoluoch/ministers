import { useLoaderData } from 'react-router-dom'
import { HeroSection } from '@/components/sections/HeroSection'
import { TextBlock } from '@/components/sections/TextBlock'
import { TrackRecord } from '@/components/sections/TrackRecord'
import { Testimonials } from '@/components/sections/Testimonials'
import { CtaBanner } from '@/components/sections/CtaBanner'
import type { HomePageContent } from '@/types/content'

export function HomePage() {
  const c = useLoaderData() as HomePageContent

  return (
    <>
      <HeroSection {...c.hero} />
      <TextBlock {...c.about} />
      {/* Explore links are temporarily hidden until the Contentful content is ready. */}
      <TrackRecord {...c.trackRecord} />
      <Testimonials {...c.testimonials} />
      <CtaBanner {...c.readyCta} />
    </>
  )
}
