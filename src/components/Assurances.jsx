import { StaggerGroup, StaggerItem } from './Reveal'
import { ASSURANCES } from '../data/content'

/**
 * The four-up assurance strip that sits directly under the hero — the first
 * thing a visitor reads after the brand mark, and the reason they keep reading.
 *
 * This is the page's one light band, lifted from the reference layout: after a
 * full-height maroon hero it gives the eye somewhere to land, and it separates
 * the hero from the maroon sections that follow. Everything in here is therefore
 * inverted — dark type on ivory — while the gold accents carry through.
 *
 * A divider belongs on a cell only when it has a sibling to its left *in that
 * layout*: at two columns that is cells 1 and 3, at four columns it is 1, 2
 * and 3. Stacked on mobile, nobody gets one.
 */
const DIVIDER = ['', 'sm:border-l', 'lg:border-l', 'sm:border-l']

export default function Assurances() {
  return (
    <section aria-label="Why families trust F&H Builders" className="relative bg-ivory">
      {/* Gold hairlines tie the band back to the maroon either side of it. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="container-x">
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {ASSURANCES.map((item, i) => {
            const Icon = item.icon
            return (
              <StaggerItem
                key={item.title}
                className={`group border-maroonDark/10 px-4 py-11 text-center sm:px-8 ${
                  DIVIDER[i] ?? ''
                }`}
              >
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold/45 bg-gold/[0.08] transition-all duration-700 group-hover:-translate-y-1 group-hover:border-goldDark group-hover:bg-gold/20 group-hover:shadow-goldSoft">
                  <Icon className="line-gold-deep h-7 w-7" strokeWidth={1.25} />
                </span>

                <h3 className="mt-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-maroonDark">
                  {item.title}
                </h3>

                <p className="mx-auto mt-3 max-w-[30ch] text-[13.5px] leading-relaxed text-charcoal/70">
                  {item.copy}
                </p>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
