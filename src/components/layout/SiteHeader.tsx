import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { siteContent } from '@/content/site'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { SocialLinks, socialIconFor } from '@/components/SocialLinks'
import { cn } from '@/lib/utils'

function navClassName({ isActive }: { isActive: boolean }) {
  return cn(
    'text-sm font-semibold transition-colors',
    isActive ? 'text-brand-peach' : 'text-brand-cream/85 hover:text-brand-cream',
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-purple/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src={siteContent.logoSrc}
            alt={siteContent.logoAlt}
            className="h-11 w-11 rounded-full object-cover ring-1 ring-brand-peach/40"
          />
          <span className="truncate font-display text-sm font-bold tracking-wide text-brand-cream sm:text-base">
            {siteContent.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {siteContent.nav.map((item) => (
            <NavLink key={item.href} to={item.href} className={navClassName} end={item.href === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <SocialLinks linkClassName="text-brand-cream/85 hover:bg-white/10 hover:text-brand-peach" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="cream" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{siteContent.shortName}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4" aria-label="Mobile">
                {siteContent.nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'font-display text-lg font-semibold',
                          isActive ? 'text-brand-purple' : 'text-brand-ink/80',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-8 border-t border-brand-purple/15 pt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-peach">
                  Follow us
                </p>
                <div className="flex items-center gap-2">
                  {siteContent.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-purple text-brand-cream transition hover:bg-brand-purple-deep"
                    >
                      {socialIconFor(social.label, 'h-4 w-4')}
                    </a>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
