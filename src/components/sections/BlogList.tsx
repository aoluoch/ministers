import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, User } from 'lucide-react'
import { Reveal } from '@/components/layout/Reveal'
import { CtaButton } from '@/components/sections/CtaButton'
import { CmsImage } from '@/components/ui/cms-image'
import { cn } from '@/lib/utils'
import type { BlogListProps, BlogPost } from '@/types/content'

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden rounded-xl border border-brand-purple/10 bg-card/80 shadow-sm transition hover:border-brand-peach/60">
      <Link
        to={`/blog/${post.slug}`}
        className="grid gap-0 sm:grid-cols-[11rem_1fr] md:grid-cols-[14rem_1fr]"
      >
        <div className="relative min-h-40 bg-brand-purple sm:min-h-full">
          {post.coverImage ? (
            <CmsImage
              src={post.coverImage.src}
              alt={`${post.title}${post.dateLabel ? ` — ${post.dateLabel}` : ''}`}
              width={224}
              height={224}
              fit="fill"
              sizes="(min-width: 768px) 14rem, (min-width: 640px) 11rem, 100vw"
              className="h-full w-full object-cover opacity-95"
            />
          ) : null}
          <span className="absolute left-3 top-3 rounded-md bg-brand-peach px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-purple-deep">
            Article
          </span>
        </div>

        <div className="flex flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="font-display text-xl font-bold text-brand-purple sm:text-2xl">
              {post.title}
            </h2>
            {post.tag ? (
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-peach">
                {post.tag}
              </span>
            ) : null}
          </div>

          {post.summary ? (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {post.summary}
            </p>
          ) : null}

          {(post.dateLabel || post.author) ? (
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-brand-ink/75">
              {post.dateLabel ? (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-brand-peach" />
                  {post.dateLabel}
                </span>
              ) : null}
              {post.author ? (
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4 text-brand-peach" />
                  {post.author}
                </span>
              ) : null}
            </div>
          ) : null}

          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-purple">
            Read article
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </article>
  )
}

export function BlogList({ title, intro, posts, footerNote, footerCta }: BlogListProps) {
  if (!title && !intro && !posts.length && !footerNote && !footerCta) return null

  return (
    <section className="section-atmosphere px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        {(title || intro) ? (
          <Reveal className="max-w-3xl">
            {title ? (
              <h1 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h1>
            ) : null}
            {intro ? (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {intro}
              </p>
            ) : null}
          </Reveal>
        ) : null}

        {posts.length ? (
          <div className={cn('space-y-6', title || intro ? 'mt-12' : 'mt-0')}>
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-brand-purple sm:text-3xl">
                Latest articles
              </h2>
            </Reveal>
            <div className="mt-5 space-y-6">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delayMs={index * 70}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        {(footerNote || footerCta) && (
          <Reveal className="mt-12 max-w-3xl">
            {footerNote ? (
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {footerNote}
              </p>
            ) : null}
            {footerCta ? (
              <div className="mt-5">
                <CtaButton cta={footerCta} variant="outline" size="default" />
              </div>
            ) : null}
          </Reveal>
        )}
      </div>
    </section>
  )
}
