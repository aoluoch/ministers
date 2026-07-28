import { cn } from '@/lib/utils'
import { siteContent } from '@/content/site'

type SocialIconProps = {
  className?: string
}

export function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  )
}

export function FacebookIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 8.2h2.2V5h-2.2C11.7 5 10 6.7 10 9.2V11H8v3.2h2V19h3.2v-4.8h2.2l.6-3.2h-2.8V9.2c0-.6.4-1 1-1Z" />
    </svg>
  )
}

export function TikTokIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.77a8.2 8.2 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15Z" />
    </svg>
  )
}

export function socialIconFor(label: string, className = 'h-4 w-4') {
  switch (label.toLowerCase()) {
    case 'instagram':
      return <InstagramIcon className={className} />
    case 'facebook':
      return <FacebookIcon className={className} />
    case 'tiktok':
      return <TikTokIcon className={className} />
    default:
      return null
  }
}

type SocialLinksProps = {
  className?: string
  linkClassName?: string
  iconClassName?: string
  /** Use site socials by default; pass a subset if needed. */
  socials?: typeof siteContent.socials
  showLabels?: boolean
}

export function SocialLinks({
  className,
  linkClassName,
  iconClassName = 'h-4 w-4',
  socials = siteContent.socials,
  showLabels = false,
}: SocialLinksProps) {
  return (
    <div className={cn('flex items-center gap-1', className)} aria-label="Social media">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.label}
          title={social.label}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-md transition',
            showLabels ? 'h-auto px-0 py-1' : 'h-9 w-9',
            linkClassName,
          )}
        >
          {socialIconFor(social.label, iconClassName)}
          {showLabels ? <span>{social.handle}</span> : null}
        </a>
      ))}
    </div>
  )
}
