import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { breadcrumbTrail } from '@/lib/seo/pages'
import { cn } from '@/lib/utils'

type BreadcrumbsProps = {
  /** Route path of the current page, e.g. `/programs/young-ministers-summit`. */
  path: string
  /** Label for the current page when it is not a known static route. */
  currentLabel?: string
  className?: string
}

/**
 * Visible breadcrumb trail matching the `BreadcrumbList` JSON-LD, which also
 * gives every deep page an internal link back to its parent section.
 */
export function Breadcrumbs({ path, currentLabel, className }: BreadcrumbsProps) {
  const items = breadcrumbTrail(path, currentLabel)
  if (items.length < 2) return null

  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
              ) : null}
              {isLast ? (
                <span aria-current="page" className="font-medium">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="underline-offset-4 hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
