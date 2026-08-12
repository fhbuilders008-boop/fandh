import SectionHeading from './SectionHeading'
import { StaggerGroup, StaggerItem } from './Reveal'
import { WHY_US } from '../data/content'
import { IconCheck } from './Icons'
import { waLink } from '../lib/site'

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-maroonDark/50 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/[0.06] blur-[130px]" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Why Choose F&H Builders?"
          title="Ten Reasons Families"
          accent="Keep Choosing Us."
          intro="Most of our clients come from a referral by someone who has already lived in one of our homes. These are the reasons they give."
        />

        <StaggerGroup className="mt-16 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {WHY_US.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group flex gap-4 rounded-xl p-4 transition-colors duration-500 hover:bg-white/[0.035]">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/[0.07] transition-all duration-700 group-hover:border-gold group-hover:bg-gold/15">
                  <IconCheck className="line-gold h-4 w-4" strokeWidth={1.5} />
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
              We believe trust is earned through transparency. Share any quotation you've received,
              and we'll help you understand exactly what you're paying for — no pressure, no
              obligations, just honest advice.
            </p>
          </div>
          <a
            href={waLink("Hi F&H Builders, I'd like a free quotation review.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold shrink-0"
          >
            Get a Free Quotation Review
          </a>
        </div>
      </div>
    </section>
  )
}
