import Photo from './Photo'
import Reveal from './Reveal'
import { IMAGES } from '../lib/images'
import { PHONE_DISPLAY, TEL_LINK, waLink } from '../lib/site'
import { IconArrow, IconPhone } from './Icons'

/**
 * Full-bleed conversion band between the contact form and the footer:
 * a villa photograph pushed far back behind a maroon wash, so the type
 * stays the loudest thing on screen.
 */
export default function CTABand() {
  return (
    <section aria-label="Get in touch" className="relative isolate overflow-hidden">
      {/* Photo sets its own `position: relative`, so the full-bleed placement
          lives on this wrapper rather than fighting it through className. */}
      <div className="absolute inset-0 -z-10">
        <Photo
          id={IMAGES.ctaVilla}
          alt="Contemporary villa by F&H Builders at dusk"
          className="h-full w-full"
          imgClassName="scale-105"
          sizes="100vw"
          fallbackVariant={5}
          position="center 60%"
        />
      </div>
      {/* Two washes: a flat floor for contrast, then a left-heavy gradient so the
          headline sits on solid maroon while the villa stays legible on the right. */}
      <div className="absolute inset-0 -z-10 bg-maroonDark/70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-maroonDark via-maroonDark/80 to-maroonDark/45" />

      <div className="container-x py-16 sm:py-20">
        <Reveal>
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:gap-12 lg:text-left">
            {/* Icon + headline */}
            <div className="flex flex-col items-center gap-6 sm:flex-row lg:shrink-0">
              <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient text-maroonDark shadow-goldSoft">
                <span className="absolute inset-0 animate-pulseRing rounded-2xl border border-gold/60" />
                <IconPhone className="h-7 w-7" strokeWidth={1.7} />
              </span>

              <h2 className="font-display text-3xl leading-tight text-ivory sm:text-4xl">
                Let&apos;s Build Something
                <br className="hidden sm:block" />{' '}
                <span className="gold-text italic">Extraordinary Together.</span>
              </h2>
            </div>

            <span className="hidden h-16 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent lg:block" />

            <div className="lg:flex-1">
              <p className="body-muted mx-auto max-w-md lg:mx-0">
                Have a project in mind — a villa, a plot, or a soil report before you commit? Let&apos;s
                talk it through, honestly and without obligation.
              </p>
              <a
                href={TEL_LINK}
                className="mt-2 inline-block font-display text-2xl text-gold transition-colors hover:text-goldLight"
              >
                {PHONE_DISPLAY}
              </a>
            </div>

            <a
              href={waLink('Hi F&H Builders, I would like to get in touch about a project.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold group shrink-0"
            >
              Get In Touch
              <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
