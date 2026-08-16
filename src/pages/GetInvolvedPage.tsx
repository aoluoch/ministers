import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { InvolvePathways } from '@/components/sections/InvolvePathways'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { staticPageSeo } from '@/lib/seo/routes'
import { serviceListSchema } from '@/lib/seo/schema'
import { SITE_URL } from '@/lib/seo/site-url'
import type { GetInvolvedPageContent } from '@/types/content'

export function GetInvolvedPage() {
  const c = useLoaderData() as GetInvolvedPageContent

  /** Service schema built from the real Get Involved pathways in Contentful. */
  const seo = useMemo(() => {
    const services = serviceListSchema(
      SITE_URL,
      '/get-involved',
      c.pathways.title || 'Ways to get involved',
      c.pathways.pathways,
    )
    return staticPageSeo('/get-involved', SITE_URL, services ? [services] : [])
  }, [c.pathways])

  return (
    <>
      <Seo {...seo} />
      <InvolvePathways {...c.pathways} />
      <CtaBanner {...c.readyCta} />
    </>
  )
}
