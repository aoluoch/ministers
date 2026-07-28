import { Link } from 'react-router-dom'
import { siteContent } from '@/content/site'
import { Separator } from '@/components/ui/separator'
import { SocialLinks } from '@/components/SocialLinks'

export function SiteFooter() {
  return (
    <footer className="bg-brand-purple text-brand-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={siteContent.logoSrc}
                alt={siteContent.logoAlt}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-brand-peach/40"
              />
              <p className="font-display text-lg font-bold">{siteContent.name}</p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-cream/80">
              {siteContent.footerTagline}
            </p>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-peach">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {siteContent.nav.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-brand-cream/85 transition hover:text-brand-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-peach">
              Connect
            </p>
            <ul className="mt-4 space-y-2 text-sm text-brand-cream/85">
              <li>{siteContent.location}</li>
              <li>{siteContent.phone}</li>
            </ul>
            <p className="mt-6 font-display text-sm font-semibold uppercase tracking-wider text-brand-peach">
              Follow us
            </p>
            <SocialLinks
              className="mt-3"
              iconClassName="h-5 w-5"
              linkClassName="h-10 w-10 text-brand-cream hover:bg-white/10 hover:text-brand-peach"
            />
          </div>
        </div>

        <Separator className="my-8 bg-white/15" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-xs text-brand-cream/60 sm:text-left">
            © {new Date().getFullYear()} {siteContent.name}. All rights reserved.
          </p>
          <SocialLinks
            iconClassName="h-4 w-4"
            linkClassName="h-9 w-9 text-brand-cream/80 hover:bg-white/10 hover:text-brand-peach"
          />
        </div>
      </div>
    </footer>
  )
}
