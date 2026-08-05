import Reveal from './Reveal'

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

      <Reveal delay={0.06}>
        <h2 className="heading-lg mt-5 text-balance text-ivory">
          {title} {accent && <span className="gold-text italic">{accent}</span>}
        </h2>
      </Reveal>

      {intro && (
        <Reveal delay={0.12}>
          <p className="body-muted mt-5">{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
