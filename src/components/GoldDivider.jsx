import useInView from '../lib/useInView'

/**
 * A single hairline of gold that expands from nothing to its full width as
 * the section arrives — the logo's fine linework used as punctuation between
 * a heading and the copy beneath it.
 */
export default function GoldDivider({
  width = 200,
  delay = 0,
  duration = 1.15,
  className = '',
}) {
  const [ref, inView] = useInView()

  return (
    <span
      ref={ref}
      data-inview={inView}
      aria-hidden="true"
      className={`fh-divider ${className}`}
      style={{
        '--fh-w': `${width}px`,
        '--fh-delay': `${delay}s`,
        '--fh-dur': `${duration}s`,
      }}
    />
  )
}
