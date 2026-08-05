import SectionHeading from './SectionHeading'
import { StaggerGroup, StaggerItem } from './Reveal'
import { WHY_US } from '../data/content'
import { IconCheck } from './Icons'
import { TEL_LINK } from '../lib/site'

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-maroonDark/50 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/[0.06] blur-[130px]" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Why Choose F&H Builders?"
          title="Nine Reasons Families"
          accent="Keep Choosing Us."
          intro="Most of our clients come from a referral by someone who has already lived in one of our homes. These are the reasons they give."
        />

        <StaggerGroup className="mt-16 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {WHY_US.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group flex gap-4 rounded-xl p-4 transition-colors duration-500 hover:bg-white/[0.035]">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-maroonDark">
                  <IconCheck className="h-4 w-4" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="font-display text-lg text-ivory">{item.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ivory/60">{item.copy}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Mid-page CTA band */}
        <div className="glass mt-16 flex flex-col items-center gap-6 rounded-3xl px-7 py-10 text-center sm:px-12 lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h3 className="font-display text-2xl text-ivory sm:text-3xl">
              Still comparing builders? <span className="gold-text italic">Compare us honestly.</span>
            </h3>
            <p className="body-muted mt-3 max-w-2xl">
              Send us any quote you have received. We will walk you through it line by line — brand,
              grade and quantity — whether or not you ever build with us.
            </p>
          </div>
          <a href={TEL_LINK} className="btn-gold shrink-0">
            Talk to Our Team
          </a>
        </div>
      </div>
    </section>
  )
}
