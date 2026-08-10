import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from './Reveal'
import GoldDivider from './GoldDivider'

gsap.registerPlugin(ScrollTrigger)

const PHASES = [
  {
    tag: '01',
    title: 'Soil Investigation & Foundation',
    copy: 'Every plot has its soil tested before a single footing is poured, so the foundation is engineered for what is actually underground.',
  },
  {
    tag: '02',
    title: 'Structural Frame',
    copy: 'Columns, beams and the floor slab rise on a grid engineered for Kerala’s monsoon loads.',
  },
  {
    tag: '03',
    title: 'Walls & Roofing',
    copy: 'Masonry, pitched roofing and the facade lines take shape over the frame.',
  },
  {
    tag: '04',
    title: 'Windows, Doors & Finishing',
    copy: 'Openings, joinery and finishing details are set precisely in place.',
  },
  {
    tag: '05',
    title: 'Landscaping & Handover',
    copy: 'Grounds finished, every system inspected, and the keys handed over — on time.',
  },
]

const VIDEO_SRC = '/videos/architecture-scrub.mp4'

/**
 * HOUSE BUILD — a villa rising, scrubbed frame-by-frame against scroll.
 *
 * The video's `currentTime` is tweened from 0 to its duration inside a
 * pinned ScrollTrigger, exactly as the previous SVG line-draw was scrubbed.
 * Captions and dots are driven by the same timeline (not a separate
 * currentTime listener), so they stay perfectly in lockstep with scroll
 * position and get cleaned up automatically when the matchMedia context
 * reverts.
 *
 * Desktop pins the section and scrubs the video one phase per fifth of the
 * timeline against an extended scroll runway. Unlike the hero, this section's
 * stacked content comfortably fits a phone viewport (measured ~660-680px
 * against 667px+ real devices), so mobile keeps the pin too — just a shorter
 * runway and a lighter scrub, since a long hijacked scroll feels worse on a
 * small screen than on desktop. Reduced motion shows the finished frame with
 * a single fade.
 */
export default function HouseBuild() {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const videoRef = useRef(null)
  const badgeRef = useRef(null)
  const captionRefs = useRef([])
  const dotRefs = useRef([])

  const [metaLoaded, setMetaLoaded] = useState(false)

  // Wait for duration to be known before any ScrollTrigger/pin math runs.
  useLayoutEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (video.readyState >= 1) {
      setMetaLoaded(true)
      return
    }

    const onLoadedMetadata = () => setMetaLoaded(true)
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    return () => video.removeEventListener('loadedmetadata', onLoadedMetadata)
  }, [])

  useLayoutEffect(() => {
    if (!metaLoaded) return

    const video = videoRef.current
    const duration = video.duration

    const mm = gsap.matchMedia()

    mm.add(
      {
        desktop: '(min-width: 1024px)',
        motionOk: '(prefers-reduced-motion: no-preference)',
        // gsap.matchMedia only invokes the callback when at least one query
        // in the group matches — `desktop` and `motionOk` aren't
        // complements of each other, so mobile + reduced-motion would
        // leave both false and the callback would never fire. This query
        // is the exact complement of `motionOk`, guaranteeing one match.
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { desktop, motionOk } = ctx.conditions

        if (!motionOk) {
          video.currentTime = duration
          gsap.set(captionRefs.current, { opacity: 0, y: 0 })
          gsap.set(captionRefs.current[captionRefs.current.length - 1], { opacity: 1 })
          gsap.set(dotRefs.current, { opacity: 0.35 })
          gsap.set(dotRefs.current[dotRefs.current.length - 1], { opacity: 1 })
          gsap.set(badgeRef.current, { opacity: 1, y: 0 })

          gsap.from(panelRef.current, {
            opacity: 0,
            y: 24,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
          })
          return
        }

        gsap.set(captionRefs.current, { opacity: 0, y: 16 })
        gsap.set(captionRefs.current[0], { opacity: 1, y: 0 })
        gsap.set(dotRefs.current, { opacity: 0.35 })
        gsap.set(dotRefs.current[0], { opacity: 1 })
        gsap.set(badgeRef.current, { opacity: 0, y: 16 })

        // One timeline unit per phase, so labels land on whole numbers and
        // the crossfade gap below is easy to reason about proportionally.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: desktop ? '+=280%' : '+=160%',
            scrub: desktop ? 0.5 : 0.35,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.to(video, { currentTime: duration, ease: 'none', duration: PHASES.length }, 0)

        PHASES.forEach((_, i) => {
          tl.addLabel(`p${i}`, i)

          tl.to(dotRefs.current[i], { opacity: 1, duration: 0.25 }, `p${i}`)

          if (i > 0) {
            tl.to(dotRefs.current[i - 1], { opacity: 0.35, duration: 0.25 }, `p${i}`)
            // Fade the outgoing caption fully out, then bring the next one in
            // after a beat — never crossfading, always a clean gap.
            tl.to(captionRefs.current[i - 1], { opacity: 0, y: -14, duration: 0.2 }, `p${i}`)
            tl.to(captionRefs.current[i], { opacity: 1, y: 0, duration: 0.2 }, `p${i}+=0.2`)
          } else {
            tl.to(captionRefs.current[i], { opacity: 1, y: 0, duration: 0.25 }, `p${i}`)
          }
        })

        tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.4 }, `p${PHASES.length - 1}+=0.4`)
      }
    )

    return () => mm.revert()
  }, [metaLoaded])

  return (
    <section
      id="build"
      ref={sectionRef}
      className="relative overflow-hidden bg-maroonBg py-24 sm:py-28 lg:flex lg:min-h-[100svh] lg:items-center lg:py-0"
    >
      <div className="pointer-events-none absolute right-[-10%] top-0 h-[420px] w-[420px] rounded-full bg-gold/[0.06] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-10%] h-[360px] w-[360px] rounded-full bg-gold/[0.05] blur-[120px]" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Copy column */}
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-gold/60" />
              How We Build
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="heading-lg mt-5 text-balance text-ivory">
              Watch a Villa <span className="gold-text italic">Rise.</span>
            </h2>
          </Reveal>

          <GoldDivider delay={0.2} width={168} className="mt-7" />

          {/* Reduced-motion summary — the scrubbed captions below only ever
              show one phase at a time, so reduced-motion visitors (who see a
              single static frame, not the sequence) get the whole journey in
              one paragraph instead. */}
          <Reveal delay={0.24} className="hidden motion-reduce:block">
            <p className="body-muted mt-5">
              From soil investigation to handover: foundation, structural frame, walls and
              roofing, finishing, and landscaping &mdash; delivered on a schedule you can plan
              around.
            </p>
          </Reveal>

          <div className="relative mt-8 min-h-[190px]">
            {PHASES.map((phase, i) => (
              <div
                key={phase.tag}
                ref={(el) => (captionRefs.current[i] = el)}
                className="absolute inset-0"
              >
                <span className="font-display text-sm text-gold/70">{phase.tag}</span>
                <h3 className="mt-2 font-display text-2xl text-ivory sm:text-[28px]">
                  {phase.title}
                </h3>
                <p className="body-muted mt-3 max-w-sm">{phase.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2">
            {PHASES.map((phase, i) => (
              <span
                key={phase.tag}
                ref={(el) => (dotRefs.current[i] = el)}
                className="h-1.5 w-8 rounded-full bg-gold"
              />
            ))}
          </div>
        </div>

        {/* Video column */}
        <div className="relative mx-auto w-full max-w-xl">
          <Reveal direction="left" duration={0.85} className="relative">
            <div
              ref={panelRef}
              className="relative aspect-[900/520] w-full overflow-hidden rounded-3xl border border-gold/20 bg-maroonDark/40 shadow-deep"
            >
              {/* Skeleton — visible until the video reports its duration, so
                  ScrollTrigger never has to pin/scrub against an unknown length. */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 animate-pulse bg-gradient-to-br from-maroonDark/70 via-gold/[0.06] to-maroonDark/80 transition-opacity duration-500 ${
                  metaLoaded ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
              />
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={VIDEO_SRC}
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <div
            ref={badgeRef}
            className="absolute -bottom-6 left-6 flex items-center gap-4 rounded-2xl bg-gold-gradient p-5 shadow-deep sm:left-10"
          >
            <p className="font-display text-4xl leading-none text-maroonDark">12+</p>
            <p className="text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-maroonDark/80">
              Years Building
              <br />
              Excellence
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
