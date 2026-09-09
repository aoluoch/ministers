import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { BlogList } from '@/components/sections/BlogList'
import { blogPageSeo } from '@/lib/seo/routes'
import { SITE_URL } from '@/lib/seo/site-url'
import type { BlogPageContent } from '@/types/content'

export function BlogPage() {
  const { list } = useLoaderData() as BlogPageContent
  const seo = useMemo(
    () =>
      blogPageSeo(
        SITE_URL,
        list.posts.map((post) => ({ slug: post.slug, title: post.title })),
      ),
    [list.posts],
  )

  return (
    <>
      <Seo {...seo} />
      <BlogList {...list} />
    </>
  )
}
