import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Backdrop from './visuals/Backdrop'
import BrandAssemble from './brand/BrandAssemble'
import { IMAGES } from '../lib/images'
import { copyDelay } from '../lib/motion'
import { TEL_LINK, waLink } from '../lib/site'

/**
 * HERO — the brand overture.
 *
 * The lockup performs itself first: the skyline draws stroke by stroke, the
 * F&H monogram rises into it, the tagline engraves itself out to full
 * tracking. Only then does the copy follow, one line at a time.
 *
 * All of it is CSS animation on a fixed schedule (see lib/motion.js) — there
 * is no timeline library and no JS driving frames here, so the sequence
 * survives a slow main thread on load, and reduced-motion collapses it to a
 * static page in one rule.
 */
export default function Hero() {
  // The cue is a "not yet scrolled" hint, not a permanent fixture: past a
  // small threshold it fades out so it never lingers over later sections.
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-maroonBg"
      aria-label="F&H Builders & Developers"
    >
      <Backdrop className="fh-fade" photoId={IMAGES.heroVilla} priority />

      <div className="container-x relative z-10 flex flex-col items-center px-5 pb-16 pt-28 text-center sm:pb-12 sm:pt-32">
        <BrandAssemble />

        <span className="fh-stage eyebrow mt-9" style={{ animationDelay: `${copyDelay(0)}s` }}>
          <span className="h-px w-8 bg-gold/60" />
          Trust · Quality · Legacy
          <span className="h-px w-8 bg-gold/60" />
        </span>

        <h1
          className="fh-stage heading-xl mt-6 max-w-4xl text-balance text-ivory"
          style={{ animationDelay: `${copyDelay(1)}s` }}
        >
          Every Home Begins <span className="gold-text italic">With Trust.</span>
        </h1>

        <p
          className="fh-stage body-muted mt-6 max-w-2xl text-balance"
          style={{ animationDelay: `${copyDelay(2)}s` }}
        >
          We design and build luxury villas, premium villa plots, and residential projects with
          uncompromising quality. From soil testing and structural engineering to final handover,
          every detail is planned to create a home that's beautiful, durable, and built for
          generations.
        </p>

        <div
          className="fh-stage mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          style={{ animationDelay: `${copyDelay(3)}s` }}
        >
          <a href="#contact" className="btn-gold">
            Book a Site Visit
          </a>
          <a
            href={waLink('Hi F&H Builders, I saw your website and would like to discuss a villa project.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            WhatsApp Us
          </a>
          <a href={TEL_LINK} className="btn-ghost">
            Call Now
          </a>
        </div>

        <dl
          className="fh-stage mt-11 grid w-full max-w-3xl grid-cols-3 gap-3 sm:gap-6"
          style={{ animationDelay: `${copyDelay(4)}s` }}
        >
          {[
            ['12+', 'Years of craft'],
            ['150+', 'Homes delivered'],
            ['100%', 'On time handover'],
          ].map(([value, label]) => (
            <div key={label} className="glass rounded-xl px-3 py-4 sm:px-5">
              <dt className="font-display text-xl text-gold sm:text-3xl">{value}</dt>
              <dd className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ivory/60 sm:text-[11px]">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

    </section>

    {/* Scroll cue — portaled to <body> rather than nested in the section, so
        `position: fixed` genuinely anchors to the viewport. GSAP's pin (see
        BrandAssemble) puts an inline `transform` on the hero section while
        it's pinned, and a transformed ancestor becomes the containing block
        for any `position: fixed` descendant per the CSS spec — nested here,
        the cue would silently track the (routinely taller-than-one-screen)
        section instead of the screen, landing on top of the stats. Fades out
        once the visitor actually starts scrolling so it never lingers over
        the sections that follow; hidden on short mobile viewports where the
        stacked content already exceeds one screen. */}
    {createPortal(
      <div
        className={`fixed bottom-7 left-1/2 z-30 hidden -translate-x-1/2 text-center transition-opacity duration-500 sm:block ${
          scrolled ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        {/* The animation owns `transform`, so the centring translate stays on
            the wrapper where it cannot be overwritten mid-sequence. */}
        <div className="fh-stage" style={{ animationDelay: `${copyDelay(5)}s` }}>
          <span className="block text-[10px] uppercase tracking-widest2 text-gold/70">Scroll</span>
          <span className="mx-auto mt-2 block h-9 w-px bg-gradient-to-b from-gold/80 to-transparent" />
        </div>
      </div>,
      document.body
    )}
    </>
  )
}
