import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import ArchVisual from './visuals/ArchVisual'
import { TAGLINE, waLink } from '../lib/site'

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
              Crafting Timeless Luxury.{' '}
              <span className="gold-text italic">Building Extraordinary Living.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="body-muted mt-6">
              A house is poured in weeks. A home is built over a lifetime of mornings — the light
              that finds the staircase at seven, the doorway your children will measure their height
              against, the veranda where your parents will sit and feel proud. That is what we are
              really building.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="body-muted mt-4">
              F&amp;H Builders &amp; Developers works in a narrow, deliberate lane: a limited number
              of luxury villas each year, each one detailed to a standard we would accept for our
              own families. We choose the stone in person. We test the steel. We stay past sunset
              when a joint is not sitting right. And we hand over on the day we promised — because
              trust, once cracked, cannot be plastered over.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <blockquote className="mt-9 border-l-2 border-gold/60 pl-6">
              <p className="font-display text-xl italic text-gold sm:text-2xl">“{TAGLINE}”</p>
              <footer className="mt-2 text-xs uppercase tracking-[0.18em] text-ivory/50">
                F&amp;H Builders &amp; Developers
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.3}>
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
              <ArchVisual variant={1} className="h-[380px] w-full sm:h-[460px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroonDark via-maroonDark/10 to-transparent" />
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="glass absolute -bottom-8 -left-4 w-[220px] rounded-2xl p-5 shadow-deep sm:-left-10 sm:w-[260px]">
              <p className="font-display text-4xl text-gold">12+</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ivory/65">
                Years of building in Kerala
              </p>
              <div className="hairline my-4" />
              <p className="text-[13px] leading-relaxed text-ivory/70">
                150+ families, one standard — the one we would want for our own.
              </p>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  )
}
