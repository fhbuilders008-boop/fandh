import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { TESTIMONIALS } from '../data/content'
import { IconArrow, IconQuote, IconStar } from './Icons'

const AUTOPLAY_MS = 7000

export default function Testimonials() {
  const [[index, dir], setState] = useState([0, 1])
  const [paused, setPaused] = useState(false)

  const go = useCallback((step) => {
    setState(([i]) => [(i + step + TESTIMONIALS.length) % TESTIMONIALS.length, step])
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, go, index])

  const t = TESTIMONIALS[index]

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 sm:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[150px]" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Client Stories"
          title="The Only Reviews"
          accent="That Matter."
          intro="Families who trusted us with the biggest decision of their lives — in their own words."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="relative min-h-[380px] sm:min-h-[330px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -60, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="glass absolute inset-0 flex flex-col rounded-3xl p-8 shadow-deep sm:p-11"
              >
                <IconQuote className="h-9 w-9 text-gold/45" />

                <blockquote className="mt-5 flex-1">
                  <p className="font-display text-lg italic leading-relaxed text-ivory/90 sm:text-[22px] sm:leading-[1.6]">
                    “{t.quote}”
                  </p>
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-base text-gold">
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-display text-base text-ivory">{t.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-gold/75">{t.project}</p>
                  </div>
                  <span className="ml-auto hidden gap-1 text-gold sm:flex" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IconStar key={i} className="h-3.5 w-3.5" />
                    ))}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-gold transition-all hover:border-gold hover:bg-gold/10"
              aria-label="Previous testimonial"
            >
              <IconArrow className="h-4 w-4 rotate-180" />
            </button>

            <div className="flex items-center gap-2.5">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-gold' : 'w-1.5 bg-ivory/25 hover:bg-ivory/50'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-gold transition-all hover:border-gold hover:bg-gold/10"
              aria-label="Next testimonial"
            >
              <IconArrow className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
