import { useLoaderData } from 'react-router-dom'
import { InvolvePathways } from '@/components/sections/InvolvePathways'
import { CtaBanner } from '@/components/sections/CtaBanner'
import type { GetInvolvedPageContent } from '@/types/content'

export function GetInvolvedPage() {
  const c = useLoaderData() as GetInvolvedPageContent

  return (
    <>
      <InvolvePathways {...c.pathways} />
      <CtaBanner {...c.readyCta} />
    </>
  )
}
