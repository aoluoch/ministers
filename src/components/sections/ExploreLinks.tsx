import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/layout/Reveal'
import type { ExploreLinksProps } from '@/types/content'

function isExternal(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:')
}

export function ExploreLinks({ title, items }: ExploreLinksProps) {
  if (!title && !items.length) return null

  const linkClassName = 'group block border-t-2 border-brand-peach pt-5 transition hover:border-brand-purple'

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        {title ? (
          <Reveal>
            <h2 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h2>
          </Reveal>
        ) : null}
        {items.length ? (
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={item.href + item.title} delayMs={index * 80}>
                {isExternal(item.href) ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClassName}
                  >
                    <ExploreLinkContent {...item} />
                  </a>
                ) : (
                  <Link to={item.href} className={linkClassName}>
                    <ExploreLinkContent {...item} />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function ExploreLinkContent({
  title,
  description,
  linkLabel,
}: ExploreLinksProps['items'][number]) {
  return (
    <>
      <h3 className="font-display text-xl font-bold text-brand-purple group-hover:text-brand-purple-deep">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-purple">
        {linkLabel}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </>
  )
}
