import { useLoaderData } from 'react-router-dom'
import { TextBlock } from '@/components/sections/TextBlock'
import { MissionBlock } from '@/components/sections/MissionBlock'
import { BeliefsList } from '@/components/sections/BeliefsList'
import { DifferenceBlock } from '@/components/sections/DifferenceBlock'
import { GlobalPresence } from '@/components/sections/GlobalPresence'
import { LeadershipList } from '@/components/sections/LeadershipList'
import { CtaBanner } from '@/components/sections/CtaBanner'
import type { AboutPageContent } from '@/types/content'

export function AboutPage() {
  const c = useLoaderData() as AboutPageContent

  return (
    <>
      <TextBlock {...c.whyWeExist} />
      <MissionBlock {...c.mission} />
      <BeliefsList {...c.beliefs} />
      <DifferenceBlock {...c.difference} />
      <GlobalPresence {...c.presence} />
      <LeadershipList {...c.leadership} />
      <CtaBanner {...c.joinCta} />
    </>
  )
}
