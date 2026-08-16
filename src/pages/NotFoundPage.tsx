import { Link } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/button'
import { STATIC_PAGES } from '@/lib/seo/pages'
import { notFoundSeo } from '@/lib/seo/routes'
import { SITE_URL } from '@/lib/seo/site-url'

/**
 * Real 404 page: `noindex, follow`, never in the sitemap, and it links to the
 * main public pages so visitors (and crawlers) can recover instead of hitting a
 * silent redirect to the home page.
 */
export function NotFoundPage() {
  const seo = notFoundSeo(SITE_URL)

  return (
    <>
      <Seo {...seo} />
      <section className="section-atmosphere px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-brand-peach">
            Error 404
          </p>
          <h1 className="mt-4 text-3xl font-bold text-brand-purple sm:text-4xl">
            We could not find that page
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            The link may be out of date or mistyped. Use the links below to find what you
            were looking for.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/programs">See our programs</Link>
            </Button>
          </div>

          <nav aria-label="Site pages" className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-peach">
              Explore the movement
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium">
              {STATIC_PAGES.map((page) => (
                <li key={page.path}>
                  <Link
                    to={page.path}
                    className="text-brand-purple underline-offset-4 transition hover:underline"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  )
}
