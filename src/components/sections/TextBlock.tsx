import { Reveal } from '@/components/layout/Reveal'
import { CmsImage } from '@/components/ui/cms-image'
import { cn } from '@/lib/utils'
import type { TextBlockProps } from '@/types/content'

export function TextBlock({ eyebrow, title, paragraphs, quote, image }: TextBlockProps) {
  if (!eyebrow && !title && !paragraphs.length && !quote && !image) return null

  const copy = (
    <>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple/70">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2 className="text-3xl font-bold text-brand-purple sm:text-4xl">{title}</h2>
      ) : null}
      {paragraphs.length ? (
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
      ) : null}
      {quote ? (
        <blockquote className="mt-8 border-l-4 border-brand-peach pl-5 font-serif text-xl italic text-brand-purple">
          “{quote}”
        </blockquote>
      ) : null}
    </>
  )

  return (
    <section className="section-atmosphere px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Reveal
        className={cn(
          'mx-auto max-w-6xl',
          image ? 'grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]' : 'max-w-3xl',
        )}
      >
        <div>{copy}</div>
        {image ? (
          <div className="overflow-hidden rounded-2xl bg-brand-purple-deep/10 ring-1 ring-brand-purple/10">
            <CmsImage
              src={image.src}
              alt={image.alt}
              width={640}
              height={512}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mx-auto max-h-[32rem] w-full object-contain object-center"
            />
          </div>
        ) : null}
      </Reveal>
    </section>
  )
}
