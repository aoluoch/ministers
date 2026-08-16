import { useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { TextBlock } from '@/components/sections/TextBlock'
import { JourneyPillars } from '@/components/sections/JourneyPillars'
import { CommunityGroups } from '@/components/sections/CommunityGroups'
import { TrainingTopics } from '@/components/sections/TrainingTopics'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { staticPageSeo } from '@/lib/seo/routes'
import { SITE_URL } from '@/lib/seo/site-url'
import type { JourneyPageContent } from '@/types/content'

export function JourneyPage() {
  const c = useLoaderData() as JourneyPageContent

  return (
    <>
      <Seo {...staticPageSeo('/journey', SITE_URL)} />
      <TextBlock {...c.intro} />
      <JourneyPillars {...c.pillars} variant="detail" />
      <CommunityGroups {...c.community} />
      <TrainingTopics {...c.training} />
      <TextBlock {...c.beyond} />
      <TextBlock {...c.commissioning} />
      <CtaBanner {...c.cta} />
    </>
  )
}
