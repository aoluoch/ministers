import { contentfulImageUrl } from '@/lib/seo/pages'
import { cn } from '@/lib/utils'

type CmsImageProps = {
  src: string
  alt: string
  className?: string
  /** Rendered width in CSS pixels — used to request a right-sized asset. */
  width: number
  height: number
  /** Above-the-fold images should be eager + high priority; the rest lazy. */
  priority?: boolean
  sizes?: string
  fit?: 'fill' | 'pad' | 'thumb'
}

/**
 * `<img>` for CMS/static images with sensible SEO + performance defaults:
 *  - Contentful Images API resizing to WebP at 1× and 2× (`srcSet`)
 *  - intrinsic `width`/`height` so the browser reserves space (no layout shift)
 *  - `loading="lazy"` + `decoding="async"` unless the image is above the fold
 *
 * `alt` stays a required prop so every image keeps descriptive text.
 */
export function CmsImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  sizes,
  fit,
}: CmsImageProps) {
  const single = contentfulImageUrl(src, { width, height: fit ? height : undefined, fit })
  const retina = contentfulImageUrl(src, {
    width: width * 2,
    height: fit ? height * 2 : undefined,
    fit,
  })
  const optimized = single !== src

  return (
    <img
      src={single}
      srcSet={optimized ? `${single} 1x, ${retina} 2x` : undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={cn(className)}
    />
  )
}
