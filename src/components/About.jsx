import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import GoldDivider from './GoldDivider'
import Photo from './Photo'
import { COMPANY, STATS } from '../data/content'
import { IMAGES } from '../lib/images'
import { waLink } from '../lib/site'

const SIGNATURE_LINE = 'Where Trust Becomes a Landmark.'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Gentle parallax on the imagery column.
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-gold/[0.07] blur-[130px]" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-gold/60" />
              About F&amp;H Builders
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="heading-lg mt-5 text-balance text-ivory">
              Building Homes.{' '}
              <span className="gold-text italic">Creating Legacies.</span>
            </h2>
          </Reveal>

          <GoldDivider delay={0.2} width={168} className="mt-7" />

          <Reveal delay={0.24}>
            <p className="body-muted mt-7">{COMPANY.intro}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="body-muted mt-4">{COMPANY.approach}</p>
          </Reveal>

          <Reveal delay={0.26}>
            <blockquote className="mt-9 border-l-2 border-gold/60 pl-6">
              <p className="font-display text-xl italic text-gold sm:text-2xl">“{SIGNATURE_LINE}”</p>
              <footer className="mt-2 text-xs uppercase tracking-[0.18em] text-ivory/50">
                F&amp;H Builders &amp; Developers
              </footer>
            </blockquote>
          </Reveal>

          {/* Headline numbers */}
          <Reveal delay={0.3}>
            <dl className="mt-9 grid grid-cols-3 gap-4 border-y border-gold/15 py-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-3xl text-gold sm:text-4xl">{stat.value}</dt>
                  <dd className="mt-1 text-[10.5px] uppercase tracking-[0.14em] text-ivory/55 sm:text-[11px]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="btn-outline">
                Explore Our Work
              </a>
              <a
                href={waLink('Hi F&H Builders, I would like to talk about building a villa.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Start a Conversation
              </a>
            </div>
          </Reveal>
        </div>

        {/* Visual column */}
        <motion.div style={{ y }} className="relative">
          <Reveal direction="left" duration={0.85}>
            <div className="relative overflow-hidden rounded-3xl border border-gold/20 shadow-deep">
              <Photo
                id={IMAGES.aboutInterior}
                alt="Living pavilion in an F&H Builders villa, finished in timber and stone"
                className="h-[380px] w-full sm:h-[500px]"
                sizes="(min-width: 1024px) 45vw, 100vw"
                fallbackVariant={4}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroonDark via-maroonDark/15 to-transparent" />
            </div>
          </Reveal>

          {/* Years-of-excellence plate, overlapping the photograph */}
          <Reveal direction="up" delay={0.2}>
            <div className="absolute -bottom-8 -left-4 flex w-[230px] items-center gap-4 rounded-2xl bg-gold-gradient p-5 shadow-deep sm:-left-10 sm:w-[268px]">
              <p className="font-display text-4xl leading-none text-maroonDark sm:text-5xl">18+</p>
              <p className="text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-maroonDark/80">
                Years of
                <br />
                Excellence
              </p>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  )
}
