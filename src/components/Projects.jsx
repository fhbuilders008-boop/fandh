import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Photo from './Photo'
import { PROJECTS } from '../data/content'
import { waLink } from '../lib/site'
import { IconArrow, IconPin } from './Icons'

// Derived from the data so a new project category never needs a second edit here.
const FILTERS = ['All', ...new Set(PROJECTS.map((p) => p.category))]

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-52 top-1/3 h-[480px] w-[480px] rounded-full bg-maroonAlt/40 blur-[140px]" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Homes We Have"
          accent="Signed Our Name To."
          intro="Every project below is one we would drive you to tomorrow — because the families living in them will tell you the same thing we would."
        />

        {/* Filter */}
        <div className="mt-12 flex justify-center">
          {/* Wraps between pills on narrow screens rather than inside a label. */}
          <div className="glass inline-flex max-w-full flex-wrap justify-center rounded-3xl p-1.5 sm:rounded-full">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-7 ${
                  filter === f ? 'text-maroonDark' : 'text-ivory/65 hover:text-gold'
                }`}
                aria-pressed={filter === f}
              >
                {filter === f && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-gold-gradient"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                key={project.name}
                layout
                /* Same slow ease-out as the rest of the site — a fade and a
                   rise, no scale pop. */
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-maroonDark/60 transition-all duration-700 hover:-translate-y-1.5 hover:border-gold/55 hover:shadow-gold"
              >
                <div className="relative h-56 overflow-hidden">
                  <Photo
                    id={project.image}
                    alt={`${project.name}, ${project.location}`}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                    fallbackVariant={project.variant}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroonDark via-maroonDark/25 to-transparent" />

                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md ${
                      project.status === 'Ongoing'
                        ? 'border border-gold/50 bg-gold/15 text-goldLight'
                        : 'border border-ivory/25 bg-white/10 text-ivory/85'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-2xl text-ivory">{project.name}</h3>

                  <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] text-gold/85">
                    <IconPin className="h-4 w-4" />
                    {project.location}
                  </p>

                  <p className="mt-4 text-[13px] leading-relaxed text-ivory/60">{project.blurb}</p>

                  <div className="hairline my-5" />

                  <p className="text-[12px] leading-relaxed text-ivory/75">{project.highlight}</p>

                  <a
                    href={waLink(`Hi F&H Builders, I'd like details on ${project.name} at ${project.location}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-goldLight"
                  >
                    View Project
                    <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-14 text-center">
          <p className="body-muted mx-auto max-w-xl">
            Want to walk one of these in person? We will meet you on site, hard hats and all.
          </p>
          <a href="#contact" className="btn-gold mt-6">
            Book a Site Visit
          </a>
        </div>
      </div>
    </section>
  )
}
