import { Reveal } from '@/components/layout/Reveal'
import { CmsImage } from '@/components/ui/cms-image'
import type { GlobalPresenceProps } from '@/types/content'

export function GlobalPresence({ title, intro, nations, images, chapters }: GlobalPresenceProps) {
  if (!title && !intro && !nations.length && !images.length && !chapters.length) return null

  return (
    <section className="bg-brand-purple px-4 py-16 text-brand-cream sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        {(title || intro) ? (
          <Reveal className="max-w-3xl">
            {title ? (
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span className="text-summit-gradient">{title}</span>
              </h2>
            ) : null}
            {intro ? (
              <p className="mt-4 text-base leading-relaxed text-brand-cream/85 sm:text-lg">
                {intro}
              </p>
            ) : null}
          </Reveal>
        ) : null}

        {images.length ? (
          <Reveal className="mt-8">
            <ul className="flex flex-wrap items-center gap-4">
              {images.map((image) => (
                <li key={image.src} className="overflow-hidden rounded-lg bg-black/30 ring-1 ring-white/10">
                  <CmsImage
                    src={image.src}
                    alt={image.alt}
                    width={112}
                    height={112}
                    className="h-24 w-24 object-contain sm:h-28 sm:w-28"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {nations.length ? (
          <Reveal className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {nations.map((nation) => (
                <li
                  key={nation}
                  className="font-display text-sm font-bold uppercase tracking-[0.18em] text-brand-peach"
                >
                  {nation}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {chapters.length ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter, index) => (
              <Reveal key={`${chapter.country}-${chapter.leaderName}`} delayMs={index * 40}>
                <li className="rounded-xl border border-white/10 bg-white/5 p-5">
                  {chapter.photo ? (
                    <CmsImage
                      src={chapter.photo.src}
                      alt={
                        chapter.leaderName
                          ? `${chapter.leaderName}${chapter.leaderTitle ? `, ${chapter.leaderTitle}` : ''} — ${chapter.country} chapter`
                          : chapter.photo.alt
                      }
                      width={384}
                      height={160}
                      fit="fill"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="mb-4 h-40 w-full rounded-lg object-cover object-top ring-1 ring-brand-peach/30"
                    />
                  ) : null}
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-peach">
                    {chapter.country}
                  </p>
                  {chapter.leaderName ? (
                    <h3 className="mt-2 font-display text-lg font-bold text-brand-cream">
                      {chapter.leaderName}
                    </h3>
                  ) : null}
                  {chapter.leaderTitle ? (
                    <p className="mt-1 text-sm text-brand-cream/75">{chapter.leaderTitle}</p>
                  ) : null}
                  {chapter.bio ? (
                    <p className="mt-3 text-sm leading-relaxed text-brand-cream/80">
                      {chapter.bio}
                    </p>
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
