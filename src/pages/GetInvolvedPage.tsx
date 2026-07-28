import { getInvolvedContent } from '@/content/get-involved'
import { InvolvePathways } from '@/components/sections/InvolvePathways'
import { CtaBanner } from '@/components/sections/CtaBanner'

export function GetInvolvedPage() {
  const c = getInvolvedContent

  return (
    <>
      <InvolvePathways {...c.pathways} />
      <CtaBanner {...c.readyCta} />
    </>
  )
}
