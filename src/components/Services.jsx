import SectionHeading from './SectionHeading'
import { StaggerGroup, StaggerItem } from './Reveal'
import { SERVICES } from '../data/content'
import { waLink } from '../lib/site'
import { IconArrow } from './Icons'

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-maroonDark/50 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-x">
        <SectionHeading
          eyebrow="What We Do"
          title="Everything Your Home Needs,"
          accent="Under One Roof."
          intro="From the first sketch to the day you turn the key — one accountable team, no gaps between trades, no one to point fingers at but us."
        />

        <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <StaggerItem key={service.title}>
                <article className="card card-hover group h-full">
                  <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold transition-all duration-500 group-hover:border-gold/70 group-hover:bg-gold/20">
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="mt-6 font-display text-xl text-ivory">{service.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ivory/65">{service.copy}</p>

                  <a
                    href={waLink(`Hi F&H Builders, I'm interested in: ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold/80 transition-colors hover:text-goldLight"
                  >
                    Enquire
                    <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
