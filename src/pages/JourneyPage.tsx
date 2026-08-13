import { useLoaderData } from 'react-router-dom'
import { TextBlock } from '@/components/sections/TextBlock'
import { JourneyPillars } from '@/components/sections/JourneyPillars'
import { CommunityGroups } from '@/components/sections/CommunityGroups'
import { TrainingTopics } from '@/components/sections/TrainingTopics'
import { CtaBanner } from '@/components/sections/CtaBanner'
import type { JourneyPageContent } from '@/types/content'

export function JourneyPage() {
  const c = useLoaderData() as JourneyPageContent

  return (
    <>
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
