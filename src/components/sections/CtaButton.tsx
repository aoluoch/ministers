import { Link } from 'react-router-dom'
import { Button, type ButtonProps } from '@/components/ui/button'
import type { CtaLink } from '@/types/content'

type CtaButtonProps = {
  cta: CtaLink
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  className?: string
}

function isExternal(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:')
}

export function CtaButton({ cta, variant = 'default', size = 'lg', className }: CtaButtonProps) {
  if (isExternal(cta.href) || cta.href.startsWith('#')) {
    return (
      <Button asChild variant={variant} size={size} className={className}>
        <a
          href={cta.href}
          target={cta.href.startsWith('http') ? '_blank' : undefined}
          rel={cta.href.startsWith('http') ? 'noreferrer' : undefined}
        >
          {cta.label}
        </a>
      </Button>
    )
  }

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link to={cta.href}>{cta.label}</Link>
    </Button>
  )
}
