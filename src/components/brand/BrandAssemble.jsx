import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * BRAND ASSEMBLE — the hero's signature moment.
 *
 * The real logo artwork (/brand-logo.png) is sliced into seven vertical
 * shards (public/brand-shards/shard-0…6.png). Each shard is a full-canvas
 * PNG containing only its column of the artwork, so when all seven sit at
 * their natural position { x:0, y:0, rot:0, scale:1 } they recompose the
 * original file pixel-for-pixel — the finished logo is the untouched
 * artwork, never a redraw.
 *
 * On scroll, the shards begin scattered (offset, rotated, blurred, dim) and
 * converge into place as the section scrubs through. Outer shards travel
 * further and settle first-to-last from the centre out, so the logo reads as
 * assembling itself from its own fragments. A soft gold bloom breathes up
 * behind it as the last shard locks, then the descriptor tracks in.
 *
 * Reduced motion / small screens: the composed logo is simply shown.
 */

// Per-shard scatter origin. Index order matches shard-0…6 (left → right).
// Signed x pushes outward from centre; y and rotation add depth so it reads
// as fragments in space rather than a sliding blind. Centre shards (3) barely
// move — the letters' spine stays put while the flanks fly in around it.
const SCATTER = [
  { x: -260, y: -70, rot: -13, s: 0.82 }, // 0 · far left  (F stem)
  { x: -170, y: 90, rot: 9, s: 0.86 }, //   1 · left
  { x: -80, y: -110, rot: -6, s: 0.9 }, //   2 · left-centre
  { x: 0, y: 46, rot: 0, s: 0.94 }, //       3 · centre  (spire / & spine)
  { x: 90, y: -96, rot: 6, s: 0.9 }, //      4 · right-centre
  { x: 180, y: 84, rot: -8, s: 0.86 }, //    5 · right
  { x: 268, y: -64, rot: 12, s: 0.82 }, //   6 · far right (H)
]

const SHARDS = SCATTER.map((s, i) => ({ ...s, src: `/brand-shards/shard-${i}.png` }))

export default function BrandAssemble({ className = '' }) {
  const rootRef = useRef(null)
  const shardRefs = useRef([])
  const bloomRef = useRef(null)
  const taglineRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const shards = shardRefs.current.filter(Boolean)

    const mm = gsap.matchMedia()

    mm.add(
      {
        // The pin holds the whole hero fixed for the scrub's scroll distance
        // while the flex-centred copy below it can already be taller than a
        // short viewport — on phones (and any landscape phone) that pins the
        // headline, body copy and CTA entirely off-screen until the visitor
        // scrolls past the pin. Reserve the cinematic version for viewports
        // tall/wide enough to fit it without hiding the CTA.
        motion: '(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)',
        still:
          '(max-width: 1023px), (max-height: 699px), (prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { motion } = ctx.conditions

        if (!motion) {
          gsap.set(shards, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)' })
          gsap.set([bloomRef.current, taglineRef.current], { opacity: 1 })
          return
        }

        // Scattered start state. A low opacity floor (not fully invisible)
        // means that if a visitor lands and doesn't scroll, the hero reads as
        // the logo caught mid-formation — deliberate — rather than a blank gap.
        shards.forEach((el, i) => {
          const c = SHARDS[i]
          gsap.set(el, {
            xPercent: c.x / 3.4,
            yPercent: c.y / 3.4,
            rotate: c.rot,
            scale: c.s,
            opacity: 0.16,
            filter: 'blur(10px)',
            transformOrigin: '50% 60%',
          })
        })
        gsap.set(bloomRef.current, { opacity: 0, scale: 0.7 })
        gsap.set(taglineRef.current, { opacity: 0, letterSpacing: '0.16em', y: 10 })

        // Distance from centre index (3) → outer shards settle later, giving a
        // centre-out lock. Order the convergence so the logo builds from spine
        // outward: centre first fades in, flanks snap home last.
        const order = [3, 2, 4, 1, 5, 0, 6]

        // Anchor to page scroll from the very top: the shards paint scattered
        // on load (their set state above) and lock as the visitor scrolls the
        // first ~65% of a viewport. Tied to the hero section so it recomputes
        // correctly on resize.
        const hero = root.closest('#hero') || root
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '+=65%',
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        order.forEach((idx, step) => {
          const el = shards[idx]
          const at = step * 0.09
          tl.fromTo(
            el,
            { opacity: 0.16 },
            {
              xPercent: 0,
              yPercent: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.5,
              ease: 'power3.out',
            },
            at
          )
        })

        // Gold bloom breathes up behind the composed mark as the outer shards
        // land, then the descriptor engraves out to full tracking.
        tl.to(bloomRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, 0.42)
        tl.to(
          taglineRef.current,
          { opacity: 1, letterSpacing: '0.46em', y: 0, duration: 0.5, ease: 'power2.out' },
          0.6
        )
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <div ref={rootRef} className={`fh-assemble ${className}`}>
      <div className="fh-assemble-stage">
        {/* Gold bloom behind the mark. */}
        <div ref={bloomRef} className="fh-assemble-bloom" aria-hidden="true" />

        {/* The logo, as its own seven shards. Stacked absolutely; together
            they are the untouched artwork. */}
        <div className="fh-assemble-mark" aria-hidden="true">
          {SHARDS.map((s, i) => (
            <img
              key={s.src}
              ref={(el) => (shardRefs.current[i] = el)}
              src={s.src}
              alt=""
              className="fh-shard"
              draggable="false"
            />
          ))}
        </div>
      </div>

      <p ref={taglineRef} className="fh-assemble-tagline" aria-hidden="true">
        Builders &amp; Developers
      </p>

      <span className="sr-only">F&amp;H Builders &amp; Developers</span>
    </div>
  )
}
