import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Photo from './Photo'
import ArchVisual from './visuals/ArchVisual'
import { GALLERY } from '../data/content'
import { IconArrow, IconClose, IconPlus } from './Icons'

const spanClass = (span) => {
  if (span === 'tall') return 'sm:row-span-2 h-[380px] sm:h-full'
  if (span === 'wide') return 'sm:col-span-2 h-[240px]'
  return 'h-[240px]'
}

/**
 * TEMPORARY gallery — a handful of stock photographs plus labelled placeholders
 * awaiting F&H's own project photography. See the GALLERY comment in
 * data/content.js for how to promote a placeholder to a real photo.
 *
 * The lightbox indexes the photographed tiles only, so arrow-key navigation
 * never lands on an empty placeholder.
 */
export default function Gallery() {
  const [lightbox, setLightbox] = useState(null) // index within `photos`

  const photos = useMemo(() => GALLERY.filter((g) => !g.placeholder), [])

  // Keyboard control for the lightbox.
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % photos.length)
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + photos.length) % photos.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, photos.length])

  const active = lightbox === null ? null : photos[lightbox]

  return (
    <section id="gallery" className="relative overflow-hidden bg-maroonDark/50 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Gallery"
          title="Look Closer."
          accent="The Detail Is the Difference."
          intro="Elevations, interiors and site progress — the same project, seen the way our clients see it. We are photographing our latest handovers now; the remaining frames go up as they come in."
        />

        <div className="mt-10 grid auto-rows-[240px] grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item, i) => {
            const classes = `group relative overflow-hidden rounded-2xl border text-left ${spanClass(item.span)}`

            if (item.placeholder) {
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className={`${classes} border-dashed border-gold/25 bg-maroonDark/40`}
                >
                  <ArchVisual variant={item.variant} className="h-full w-full opacity-40" />
                  <span className="absolute inset-0 bg-maroonDark/55" />

                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-gold/40 text-gold/70">
                      <IconPlus className="h-4 w-4" />
                    </span>
                    <span className="font-display text-lg text-ivory/80">{item.title}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-gold/60">
                      Photography coming soon
                    </span>
                  </span>
                </motion.div>
              )
            }

            const photoIndex = photos.indexOf(item)

            return (
              <motion.button
                key={item.title}
                type="button"
                onClick={() => setLightbox(photoIndex)}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className={`${classes} border-gold/15 transition-all duration-500 hover:border-gold/55 hover:shadow-gold`}
                aria-label={`Open ${item.title}`}
              >
                <Photo
                  id={item.image}
                  alt={item.title}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                  fallbackVariant={item.variant}
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroonDark/95 via-maroonDark/25 to-transparent" />

                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <span className="flex flex-col gap-1">
                    <span className="text-[13px] font-medium leading-snug text-ivory/90">{item.title}</span>
                    {item.caption && (
                      <span className="text-[10px] uppercase tracking-[0.16em] text-gold/70">
                        {item.caption}
                      </span>
                    )}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <IconPlus className="h-4 w-4" />
                  </span>
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-maroonDark/95 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10"
              aria-label="Close"
            >
              <IconClose className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) => (i - 1 + photos.length) % photos.length)
              }}
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10 sm:left-8"
              aria-label="Previous image"
            >
              <IconArrow className="h-5 w-5 rotate-180" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) => (i + 1) % photos.length)
              }}
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10 sm:right-8"
              aria-label="Next image"
            >
              <IconArrow className="h-5 w-5" />
            </button>

            <motion.figure
              key={active.title}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/25 shadow-deep"
              onClick={(e) => e.stopPropagation()}
            >
              <Photo
                key={active.image}
                id={active.image}
                alt={active.title}
                className="h-[46vh] w-full sm:h-[62vh]"
                sizes="(min-width: 640px) 900px, 100vw"
                priority
                fallbackVariant={active.variant}
              />
              <figcaption className="flex items-center justify-between gap-4 bg-maroonBg px-6 py-4">
                <span className="font-display text-lg text-ivory">{active.title}</span>
                {active.caption && (
                  <span className="text-[11px] uppercase tracking-[0.14em] text-gold/75">
                    {active.caption}
                  </span>
                )}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
