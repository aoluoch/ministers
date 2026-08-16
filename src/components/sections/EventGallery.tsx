import { Reveal } from '@/components/layout/Reveal'
import { CmsImage } from '@/components/ui/cms-image'
import type { EventGalleryProps } from '@/types/content'

export function EventGallery({
  title = 'Photos',
  photos,
  emptyNote,
}: EventGalleryProps) {
  if (!photos.length && !emptyNote) return null

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-brand-purple sm:text-3xl">{title}</h2>
        </Reveal>

        {photos.length === 0 ? (
          <Reveal className="mt-6 rounded-xl border border-dashed border-brand-purple/20 bg-card/50 px-6 py-12 text-center">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {emptyNote ?? 'Photos for this event will be added soon.'}
            </p>
          </Reveal>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <Reveal key={`${photo.src}-${index}`} delayMs={index * 50}>
                <figure className="overflow-hidden rounded-xl border border-brand-purple/10 bg-card shadow-sm">
                  <CmsImage
                    src={photo.src}
                    alt={photo.caption?.trim() || photo.alt}
                    width={480}
                    height={360}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/3] w-full bg-brand-purple-deep/5 object-contain"
                  />
                  {photo.caption ? (
                    <figcaption className="px-3 py-2 text-xs text-muted-foreground">
                      {photo.caption}
                    </figcaption>
                  ) : null}
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
