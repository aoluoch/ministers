import { useMemo } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { BlogDetailHero } from '@/components/sections/BlogDetailHero'
import { EventDetailBody } from '@/components/sections/EventDetailBody'
import { EventGallery } from '@/components/sections/EventGallery'
import { siteContent } from '@/content/site'
import { blogPostSeo } from '@/lib/seo/routes'
import { SITE_URL } from '@/lib/seo/site-url'
import { NotFoundPage } from '@/pages/NotFoundPage'
import type { BlogPost } from '@/types/content'

export function BlogDetailPage() {
  const post = useLoaderData() as BlogPost | undefined

  const seo = useMemo(() => {
    if (!post) return null
    return blogPostSeo(SITE_URL, {
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      dateIso: post.dateIso,
      dateLabel: post.dateLabel,
      author: post.author,
      imageUrl: post.coverImage?.src,
      imageAlt: post.coverImage?.alt,
    })
  }, [post])

  if (!post || !seo) {
    return <NotFoundPage />
  }

  return (
    <>
      <Seo {...seo} />
      <BlogDetailHero
        title={post.title}
        slug={post.slug}
        tag={post.tag}
        dateLabel={post.dateLabel}
        author={post.author}
        coverImage={post.coverImage}
      />
      <EventDetailBody
        title={post.detailTitle}
        summary={post.summary}
        body={post.body}
        highlights={post.highlights}
        highlightsTitle="In this article"
        emptyHeading="About this article"
      />
      <EventGallery photos={post.photos} />
      <section className="px-4 py-10 text-center sm:px-6">
        <Link
          to="/blog"
          className="text-sm font-semibold text-brand-purple underline-offset-4 hover:underline"
        >
          ← Back to all articles
        </Link>
        <p className="mt-3 text-sm text-muted-foreground">
          Questions? Reach us on{' '}
          <Link to="/contact" className="font-medium text-brand-purple hover:underline">
            Contact
          </Link>{' '}
          or follow {siteContent.socials[0]?.handle}.
        </p>
      </section>

      <nav
        aria-label="Related pages"
        className="border-t border-brand-purple/10 px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium">
          <Link to="/blog" className="text-brand-purple underline-offset-4 hover:underline">
            All articles
          </Link>
          <Link to="/programs" className="text-brand-purple underline-offset-4 hover:underline">
            Programs
          </Link>
          <Link to="/journey" className="text-brand-purple underline-offset-4 hover:underline">
            The journey
          </Link>
          <Link to="/about" className="text-brand-purple underline-offset-4 hover:underline">
            About the movement
          </Link>
          <Link to="/get-involved" className="text-brand-purple underline-offset-4 hover:underline">
            Get involved
          </Link>
        </div>
      </nav>
    </>
  )
}
