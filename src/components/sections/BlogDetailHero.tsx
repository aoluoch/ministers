import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CmsImage } from '@/components/ui/cms-image'
import type { BlogDetailHeroProps } from '@/types/content'

export function BlogDetailHero({
  title,
  tag,
  dateLabel,
  author,
  coverImage,
  slug,
}: BlogDetailHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-purple text-brand-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 55% at 85% 20%, rgba(253,209,50,0.22), transparent 55%)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
        <div className="animate-fade-up">
          {slug ? (
            <Breadcrumbs
              path={`/blog/${slug}`}
              currentLabel={title}
              className="text-brand-beige"
            />
          ) : null}
          <Link
            to="/blog"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-beige transition hover:text-brand-cream"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-brand-peach px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-purple-deep">
              Article
            </span>
            {tag ? (
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-peach">
                {tag}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-summit-gradient">{title}</span>
          </h1>

          <ul className="mt-6 space-y-3 text-sm text-brand-cream/90 sm:text-base">
            {dateLabel ? (
              <li className="flex items-start gap-2.5">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-brand-peach" />
                <span>{dateLabel}</span>
              </li>
            ) : null}
            {author ? (
              <li className="flex items-start gap-2.5">
                <User className="mt-0.5 h-4 w-4 shrink-0 text-brand-peach" />
                <span>{author}</span>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="animate-fade-in relative mx-auto flex aspect-4/3 w-full max-w-xl items-center justify-center overflow-hidden rounded-lg bg-brand-purple-deep/60 ring-2 ring-brand-peach/40 lg:mx-0 lg:justify-self-end">
          {coverImage ? (
            <CmsImage
              src={coverImage.src}
              alt={`${title}${dateLabel ? ` — ${dateLabel}` : ''}`}
              width={640}
              height={480}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-brand-purple-deep font-display text-brand-beige">
              YMS
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
