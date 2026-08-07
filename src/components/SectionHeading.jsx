import Reveal from './Reveal'
import GoldDivider from './GoldDivider'

export default function SectionHeading({ eyebrow, title, accent, intro, align = 'center', className = '' }) {
  const centered = align === 'center'

  return (
    <div className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-8 bg-gold/60" />
            {eyebrow}
            {centered && <span className="h-px w-8 bg-gold/60" />}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2 className="heading-lg mt-5 text-balance text-ivory">
          {title} {accent && <span className="gold-text italic">{accent}</span>}
        </h2>
      </Reveal>

      {/* The gold rule closes the heading before the copy opens. */}
      <GoldDivider delay={0.24} className={`mt-7 ${centered ? 'mx-auto' : ''}`} />

      {intro && (
        <Reveal delay={0.3}>
          <p className="body-muted mt-7">{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
