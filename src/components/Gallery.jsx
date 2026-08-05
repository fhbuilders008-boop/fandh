import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import ArchVisual from './visuals/ArchVisual'
import { GALLERY, GALLERY_TABS } from '../data/content'
import { IconArrow, IconClose, IconPlus } from './Icons'

const spanClass = (span) => {
  if (span === 'tall') return 'sm:row-span-2 h-[380px] sm:h-full'
  if (span === 'wide') return 'sm:col-span-2 h-[240px]'
  return 'h-[240px]'
}

export default function Gallery() {
  const [tab, setTab] = useState(GALLERY_TABS[0])
  const [lightbox, setLightbox] = useState(null) // index within `items`

  const items = useMemo(() => GALLERY.filter((g) => g.tab === tab), [tab])

  // Keyboard control for the lightbox.
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % items.length)
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + items.length) % items.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, items.length])

  const active = lightbox === null ? null : items[lightbox]

  return (
    <section id="gallery" className="relative overflow-hidden bg-maroonDark/50 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Gallery"
          title="Look Closer."
          accent="The Detail Is the Difference."
          intro="Elevations, interiors, site progress and drone footage — the same project, seen the way our clients see it."
        />

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {GALLERY_TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTab(t)
                setLightbox(null)
              }}
              aria-pressed={tab === t}
              className={`rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.13em] transition-all duration-300 ${
                tab === t
                  ? 'border-gold bg-gold/15 text-gold shadow-goldSoft'
                  : 'border-gold/20 text-ivory/60 hover:border-gold/60 hover:text-gold'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Masonry-ish grid */}
        {/* grid-flow-dense backfills the holes the tall/wide spans leave behind. */}
        <motion.div
          layout
          className="mt-10 grid auto-rows-[240px] grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                key={`${tab}-${item.title}`}
                layout
                type="button"
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-2xl border border-gold/15 text-left transition-all duration-500 hover:border-gold/55 hover:shadow-gold ${spanClass(
                  item.span
                )}`}
                aria-label={`Open ${item.title}`}
              >
                <ArchVisual
                  variant={item.variant}
                  className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroonDark/95 via-maroonDark/25 to-transparent" />

                {item.video && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-maroonDark/60 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                      <IconArrow className="ml-0.5 h-5 w-5 text-gold" />
                    </span>
                  </span>
                )}

                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <span className="text-[13px] font-medium leading-snug text-ivory/90">{item.title}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <IconPlus className="h-4 w-4" />
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
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
                setLightbox((i) => (i - 1 + items.length) % items.length)
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
                setLightbox((i) => (i + 1) % items.length)
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
              <ArchVisual variant={active.variant} className="h-[46vh] w-full sm:h-[62vh]" />
              <figcaption className="flex items-center justify-between gap-4 bg-maroonBg px-6 py-4">
                <span className="font-display text-lg text-ivory">{active.title}</span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-gold/75">{active.tab}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
