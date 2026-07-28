import { aboutContent } from '@/content/about'
import { TextBlock } from '@/components/sections/TextBlock'
import { MissionBlock } from '@/components/sections/MissionBlock'
import { BeliefsList } from '@/components/sections/BeliefsList'
import { DifferenceBlock } from '@/components/sections/DifferenceBlock'
import { LeadershipList } from '@/components/sections/LeadershipList'
import { CtaBanner } from '@/components/sections/CtaBanner'

export function AboutPage() {
  const c = aboutContent

  return (
    <>
      <TextBlock {...c.whyWeExist} />
      <MissionBlock {...c.mission} />
      <BeliefsList {...c.beliefs} />
      <DifferenceBlock {...c.difference} />
      <LeadershipList {...c.leadership} />
      <CtaBanner {...c.joinCta} />
    </>
  )
}
