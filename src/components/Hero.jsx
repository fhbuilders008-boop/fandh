import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LogoMark from './LogoMark'
import Backdrop from './visuals/Backdrop'
import { TEL_LINK, waLink } from '../lib/site'

gsap.registerPlugin(ScrollTrigger)

/**
 * HERO — scroll-driven logo assembly.
 *
 * The section is a tall scroll runway containing a `sticky` viewport-height
 * pane. Sticky (rather than ScrollTrigger's `pin`) keeps the layout entirely in
 * CSS — no injected pin-spacers, nothing to fight with Lenis, and it survives
 * StrictMode's double-mount cleanly.
 *
 * Two timelines drive the mark:
 *   1. an intro tween that fades the five layers in at their off-stage positions,
 *      so the visitor immediately sees gold pieces waiting to be assembled;
 *   2. a scrubbed timeline that drags those pieces into their final positions,
 *      blooms the assembled logo, then hands the stage to the hero copy.
 *
 * The scrubbed timeline only touches transform (plus one short filter beat), so
 * the whole sequence stays on the compositor.
 */
export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context((self) => {
      const q = self.selector

      // Reduced motion: present the finished composition, no scroll choreography.
      if (reduced) {
        gsap.set(q('.hero-content'), { opacity: 1, y: 0 })
        gsap.set(q('.hero-backdrop'), { opacity: 1 })
        gsap.set(
          q('.hero-logo'),
          window.innerWidth >= 768
            ? { opacity: 1, scale: 0.32, yPercent: -30 }
            : { opacity: 0, scale: 0.55, yPercent: -22 }
        )
        gsap.set(q('.scroll-cue'), { opacity: 0 })
        return
      }

      // ── Off-stage starting positions ───────────────────────────────────
      // Transform origins only; the displacement itself is declared on each
      // fromTo below so it survives a ScrollTrigger invalidate/refresh.
      gsap.set('#skyline', { opacity: 0, transformOrigin: '50% 100%' })
      gsap.set('#letter-f', { opacity: 0 })
      gsap.set('#letter-h', { opacity: 0 })
      gsap.set('#ampersand', { opacity: 0, transformOrigin: '50% 55%' })
      gsap.set('#tagline', { opacity: 0 })
      gsap.set(q('.hero-content'), { opacity: 0, y: 48 })
      gsap.set(q('.hero-backdrop'), { opacity: 0.2 })
      gsap.set(q('.scroll-cue'), { opacity: 0 })

      // ── 1. Intro: reveal the scattered pieces on load ──────────────────
      gsap
        .timeline({ delay: 0.25 })
        .to('#skyline', { opacity: 1, duration: 0.6, ease: 'power2.out' })
        .to('#letter-f', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.45')
        .to('#letter-h', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '<')
        .to('#ampersand', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to('#tagline', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to(q('.scroll-cue'), { opacity: 1, duration: 0.6 }, '-=0.3')

      // ── 2. Scrubbed assembly ───────────────────────────────────────────
      const mm = gsap.matchMedia()

      const build = ({ stagger, logoRest }) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            // The element itself, not a selector: gsap.context scopes selector
            // strings to *inside* root, so '#hero' would resolve to nothing here
            // and ScrollTrigger would silently fall back to the whole document.
            trigger: root.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        // Pieces converge, staggered, each landing with a little overshoot.
        // fromTo (not to) states both endpoints explicitly: GSAP decomposes an
        // existing matrix back into pixels, so a `to({ yPercent: 0 })` would
        // resolve to 0 → 0 after any invalidate and never move.
        const land = { ease: 'back.out(1.4)', duration: 1, immediateRender: true }

        tl.fromTo('#skyline', { yPercent: -95 }, { yPercent: 0, ...land })
          .fromTo('#letter-f', { xPercent: -190 }, { xPercent: 0, ...land }, `>-${1 - stagger}`)
          .fromTo('#letter-h', { xPercent: 190 }, { xPercent: 0, ...land }, '<')
          .fromTo(
            '#ampersand',
            { scale: 0.2 },
            { scale: 1, ease: 'back.out(2)', duration: 0.9, immediateRender: true },
            `>-${0.9 - stagger}`
          )
          .fromTo(
            '#tagline',
            { yPercent: 260 },
            { yPercent: 0, ease: 'power2.out', duration: 0.8, immediateRender: true },
            `>-${0.8 - stagger}`
          )

          // Assembled: soft gold bloom, then settle.
          .to(
            '#logo-group',
            {
              scale: 1.035,
              filter: 'drop-shadow(0 0 30px rgba(205,159,73,0.7))',
              transformOrigin: '50% 50%',
              duration: 0.5,
              ease: 'sine.inOut',
            },
            '+=0.2'
          )
          .to('#logo-group', {
            scale: 1,
            filter: 'drop-shadow(0 0 10px rgba(205,159,73,0.3))',
            duration: 0.5,
            ease: 'sine.inOut',
          })

          // Hold the finished mark on screen for a beat.
          .to({}, { duration: 0.7 })

          // Mark recedes; the cinematic hero takes the stage.
          .to(q('.scroll-cue'), { opacity: 0, duration: 0.3 }, '<')
          .to(q('.hero-backdrop'), { opacity: 1, duration: 1.2 }, '<')
          .fromTo(
            q('.hero-logo'),
            { scale: 1, yPercent: 0, opacity: 1 },
            { ...logoRest, duration: 1.2, ease: 'power2.inOut', immediateRender: false },
            '<'
          )
          .to(q('.hero-content'), { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '>-0.55')
      }

      // Desktop: wider stagger, and the assembled mark parks above the copy.
      mm.add('(min-width: 768px)', () =>
        build({ stagger: 0.22, logoRest: { scale: 0.32, yPercent: -30, opacity: 1 } })
      )
      // Mobile: shorter runway, tighter stagger, and the mark dissolves rather
      // than parking — there is no room for both it and the copy.
      mm.add('(max-width: 767px)', () =>
        build({ stagger: 0.34, logoRest: { scale: 0.55, yPercent: -22, opacity: 0 } })
      )

      return () => mm.revert()
    }, root)

    // Webfonts change the wordmark metrics — recalc once they land.
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh())

    return () => ctx.revert()
  }, [])

  return (
    /* Tall scroll runway — the sticky child below is what the visitor sees. */
    <section
      id="hero"
      ref={root}
      className="relative h-[240vh] w-full md:h-[320vh]"
      aria-label="F&H Builders & Developers"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden bg-maroonBg">
        <Backdrop className="hero-backdrop" />

        {/* Layer 1 — the assembling brand mark */}
        <div className="hero-logo pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
          <LogoMark className="w-full max-w-[min(92vw,880px)] drop-shadow-[0_0_10px_rgba(205,159,73,0.3)]" />
        </div>

        {/* Layer 2 — hero copy, revealed once the mark has assembled */}
        <div className="hero-content absolute inset-0 z-10 flex items-center justify-center px-5 pt-28 sm:pt-32">
          <div className="container-x flex flex-col items-center text-center">
            <span className="eyebrow">
              <span className="h-px w-8 bg-gold/60" />
              Luxury Villas &amp; Bespoke Homes · Kerala
              <span className="h-px w-8 bg-gold/60" />
            </span>

            <h1 className="heading-xl mt-6 max-w-4xl text-balance text-ivory">
              Every Wall Holds <span className="gold-text italic">a Story.</span>
            </h1>

            <p className="body-muted mt-6 max-w-2xl text-balance">
              We build villas that outlive trends — considered architecture, uncompromising
              materials and a finish you can feel underfoot. Your family's next hundred years starts
              with one conversation.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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

            <dl className="mt-11 grid w-full max-w-3xl grid-cols-3 gap-3 sm:gap-6">
              {[
                ['12+', 'Years of craft'],
                ['150+', 'Homes delivered'],
                ['100%', 'On-time handover'],
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
        </div>

        {/* Scroll cue */}
        <div className="scroll-cue absolute bottom-7 left-1/2 z-30 -translate-x-1/2 text-center">
          <span className="block text-[10px] uppercase tracking-widest2 text-gold/70">Scroll</span>
          <span className="mx-auto mt-2 block h-9 w-px bg-gradient-to-b from-gold/80 to-transparent" />
        </div>
      </div>
    </section>
  )
}
