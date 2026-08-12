import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { FAQS } from '../data/content'
import { IconPlus, IconWhatsApp } from './Icons'
import { waLink } from '../lib/site'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full bg-gold/[0.06] blur-[130px]" />

      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Questions, Answered"
            title="Ask Without Hesitation."
            accent="Build With Trusted Developers."
            intro="Clear answers. Honest advice. Complete transparency. If you don't find your question here, reach out to us directly — we're always happy to help."
          />

          <Reveal delay={0.2}>
            <a
              href={waLink('Hi F&H Builders, I have a question about your process.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-8"
            >
              <IconWhatsApp className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </Reveal>
        </div>

        <div className="divide-y divide-gold/12 border-y border-gold/12">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <Reveal key={faq.q} delay={Math.min(i * 0.04, 0.2)}>
                <div>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={`font-display text-lg transition-colors duration-300 sm:text-xl ${
                          isOpen ? 'text-gold' : 'text-ivory/90 group-hover:text-gold'
                        }`}
                      >
                        {faq.q}
                      </span>
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? 'rotate-45 border-gold bg-gold text-maroonDark'
                            : 'border-gold/35 text-gold group-hover:border-gold'
                        }`}
                      >
                        <IconPlus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-10 text-[14.5px] leading-relaxed text-ivory/65">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
