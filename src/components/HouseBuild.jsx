import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from './Reveal'
import GoldDivider from './GoldDivider'

gsap.registerPlugin(ScrollTrigger)

const PHASES = [
  {
    tag: '01',
    title: 'Soil Investigation & Foundation',
    copy: 'Every plot is soil-tested before a single footing is poured, so the foundation is engineered for what is actually underground.',
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

/**
 * HOUSE BUILD — a villa drafted, then rendered, as the section scrubs.
 *
 * The old version drew isolated vertical strokes, so mid-scroll it read as
 * floating sticks. This one is composed as five *complete* architectural
 * units — a surveyed plot, a full structural bay grid, a solid massing with
 * its roof, punched openings, then grounds — so every partial state is a
 * coherent drawing, never a skeleton.
 *
 * Each phase is a group of `.build-*` elements. Line work reveals by
 * stroke-dash (drawing itself), while solid masses and glass fade+rise in.
 * When the last phase lands, a warm render wash sweeps across and the whole
 * elevation settles as a finished gold rendering.
 *
 * Desktop pins and scrubs one phase per beat; small screens / reduced motion
 * show the finished villa with a single fade.
 */
export default function HouseBuild() {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)
  const badgeRef = useRef(null)
  const captionRefs = useRef([])
  const dotRefs = useRef([])

  useLayoutEffect(() => {
    const svg = svgRef.current
    const drawEls = svg.querySelectorAll('.build-draw')

    const mm = gsap.matchMedia()

    mm.add(
      {
        cinematic: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        reduced: '(max-width: 1023px), (prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { cinematic } = ctx.conditions

        // Prime every drawn path to its hidden (fully-dashed) state.
        drawEls.forEach((p) => {
          const len = p.getTotalLength()
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: cinematic ? len : 0 })
        })

        if (!cinematic) {
          gsap.set('.build-solid, .build-glass', { opacity: 1, y: 0 })
          gsap.set('.build-render', { opacity: 1 })
          gsap.set(badgeRef.current, { opacity: 1, y: 0 })
          gsap.set(captionRefs.current[captionRefs.current.length - 1], { opacity: 1, y: 0 })
          gsap.set(dotRefs.current, { opacity: 1 })

          gsap.from(svg, {
            opacity: 0,
            y: 24,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
          })
          return
        }

        gsap.set(captionRefs.current, { opacity: 0, y: 16 })
        gsap.set(dotRefs.current, { opacity: 0.35 })
        gsap.set('.build-solid', { opacity: 0, y: 14 })
        gsap.set('.build-glass', { opacity: 0, y: 8 })
        gsap.set('.build-render', { opacity: 0 })
        gsap.set(badgeRef.current, { opacity: 0, y: 16 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=280%',
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        PHASES.forEach((_, i) => {
          const draws = svg.querySelectorAll(`.phase-${i} .build-draw`)
          const solids = svg.querySelectorAll(`.phase-${i} .build-solid`)
          const glass = svg.querySelectorAll(`.phase-${i} .build-glass`)

          tl.addLabel(`p${i}`)
          if (draws.length) {
            tl.to(draws, { strokeDashoffset: 0, duration: 1, ease: 'none', stagger: 0.05 }, `p${i}`)
          }
          if (solids.length) {
            tl.to(solids, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06 }, `p${i}+=0.15`)
          }
          if (glass.length) {
            tl.to(glass, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05 }, `p${i}+=0.35`)
          }
          tl.to(dotRefs.current[i], { opacity: 1, duration: 0.25 }, `p${i}`)

          if (i > 0) {
            tl.to(captionRefs.current[i - 1], { opacity: 0, y: -14, duration: 0.2 }, `p${i}`)
            tl.to(dotRefs.current[i - 1], { opacity: 0.35, duration: 0.25 }, `p${i}`)
            tl.to(captionRefs.current[i], { opacity: 1, y: 0, duration: 0.2 }, `p${i}+=0.2`)
          } else {
            tl.to(captionRefs.current[i], { opacity: 1, y: 0, duration: 0.25 }, `p${i}`)
          }
        })

        // Final beat: the drawing becomes a rendering.
        tl.to('.build-render', { opacity: 1, duration: 1, ease: 'power2.out' }, `p${PHASES.length - 1}+=0.25`)
        tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6 }, `p${PHASES.length - 1}+=0.5`)
        tl.to({}, { duration: 0.6 })
      }
    )

    return () => mm.revert()
  }, [])

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

          {/* Mobile / reduced-motion summary — the scrubbed captions below are desktop-only */}
          <Reveal delay={0.24} className="lg:hidden">
            <p className="body-muted mt-5">
              From soil investigation to handover: foundation, structural frame, walls and
              roofing, finishing, and landscaping &mdash; delivered on a schedule you can plan
              around.
            </p>
          </Reveal>

          <div className="relative mt-8 hidden min-h-[190px] lg:block">
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

          <div className="mt-6 hidden items-center gap-2 lg:flex">
            {PHASES.map((phase, i) => (
              <span
                key={phase.tag}
                ref={(el) => (dotRefs.current[i] = el)}
                className="h-1.5 w-8 rounded-full bg-gold"
              />
            ))}
          </div>
        </div>

        {/* Drawing column */}
        <div className="relative mx-auto w-full max-w-xl">
          <Reveal direction="left" duration={0.85} className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-maroonDark/40 shadow-deep">
              <svg
                ref={svgRef}
                viewBox="0 0 900 520"
                className="h-auto w-full"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <linearGradient
                    id="hb-line"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="70"
                    x2="0"
                    y2="470"
                  >
                    <stop offset="0%" stopColor="#f5d78a" />
                    <stop offset="46%" stopColor="#d9ae57" />
                    <stop offset="100%" stopColor="#8a640f" />
                  </linearGradient>
                  <linearGradient id="hb-wall" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3a1416" />
                    <stop offset="100%" stopColor="#25090b" />
                  </linearGradient>
                  <linearGradient id="hb-roof" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d9ae57" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#8a640f" stopOpacity="0.18" />
                  </linearGradient>
                  <linearGradient id="hb-glass" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f5d78a" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#d9ae57" stopOpacity="0.12" />
                  </linearGradient>
                  <radialGradient id="hb-render" cx="50%" cy="34%" r="78%">
                    <stop offset="0%" stopColor="#CD9F49" stopOpacity="0.26" />
                    <stop offset="60%" stopColor="#CD9F49" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#CD9F49" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Phase 0 - Surveyed plot & foundation */}
                <g className="phase-0">
                  <g
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.85"
                  >
                    <path className="build-draw" d="M40 430 H860" />
                  </g>
                  <path
                    className="build-draw"
                    d="M110 430 l-10 16 M210 430 l-10 16 M310 430 l-10 16 M410 430 l-10 16 M510 430 l-10 16 M610 430 l-10 16 M710 430 l-10 16 M810 430 l-10 16"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                  <path
                    className="build-draw"
                    d="M180 430 V400 H720 V430"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className="build-draw"
                    d="M180 400 H720"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="1.4"
                    opacity="0.5"
                  />
                </g>

                {/* Phase 1 - Structural frame */}
                <g className="phase-1">
                  <path
                    className="build-draw"
                    d="M180 400 V150 M300 400 V150 M450 400 V130 M600 400 V150 M720 400 V150"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    className="build-draw"
                    d="M180 270 H720 M180 150 H720"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                </g>

                {/* Phase 2 - Walls & roofing */}
                <g className="phase-2">
                  <rect className="build-solid" x="180" y="150" width="540" height="250" fill="url(#hb-wall)" rx="2" />
                  <path className="build-solid" d="M156 152 L450 60 L744 152 Z" fill="url(#hb-roof)" />
                  <path
                    className="build-draw"
                    d="M156 152 L450 60 L744 152"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className="build-draw"
                    d="M180 400 V152 H720 V400"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className="build-draw"
                    d="M405 96 L450 82 L495 96"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"
                  />
                </g>

                {/* Phase 3 - Windows, doors & finishing */}
                <g className="phase-3">
                  <rect className="build-glass" x="220" y="210" width="96" height="82" fill="url(#hb-glass)" />
                  <path
                    className="build-draw"
                    d="M220 210 H316 V292 H220 Z M268 210 V292 M220 251 H316"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <rect className="build-glass" x="584" y="210" width="96" height="82" fill="url(#hb-glass)" />
                  <path
                    className="build-draw"
                    d="M584 210 H680 V292 H584 Z M632 210 V292 M584 251 H680"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <rect className="build-glass" x="418" y="250" width="64" height="150" fill="url(#hb-glass)" />
                  <path
                    className="build-draw"
                    d="M418 400 V250 H482 V400 M450 250 V400"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </g>

                {/* Phase 4 - Landscaping & handover */}
                <g className="phase-4">
                  <path
                    className="build-draw"
                    d="M60 452 H840"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    className="build-draw"
                    d="M420 400 L392 452 M482 400 L510 452"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  {/* slim trees flanking the villa — trunk + rounded canopy */}
                  <path
                    className="build-draw"
                    d="M120 400 V360 M120 372 q-20 -6 -24 -26 q22 -10 24 12 q4 -24 26 -12 q-2 22 -26 26"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.75"
                  />
                  <path
                    className="build-draw"
                    d="M780 400 V360 M780 372 q-20 -6 -24 -26 q22 -10 24 12 q4 -24 26 -12 q-2 22 -26 26"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.75"
                  />
                  {/* low shrub rows along the ground */}
                  <path
                    className="build-draw"
                    d="M150 452 q14 -16 28 0 q14 -16 28 0 q14 -16 28 0 M666 452 q14 -16 28 0 q14 -16 28 0 q14 -16 28 0"
                    fill="none"
                    stroke="url(#hb-line)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.5"
                  />
                </g>

                <rect
                  className="build-render"
                  x="120"
                  y="50"
                  width="660"
                  height="410"
                  rx="6"
                  fill="url(#hb-render)"
                />
              </svg>
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
