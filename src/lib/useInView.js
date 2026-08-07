import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from './motion'

/**
 * Fires once when the element first enters the viewport.
 *
 * Returns `[ref, inView]`; callers put `inView` on `data-inview` and let CSS
 * own the actual motion. The observer disconnects on its first hit, so
 * scrolling back up never re-triggers or thrashes.
 *
 * Falls straight to visible when the visitor prefers reduced motion, or when
 * IntersectionObserver is unavailable — content must never depend on the
 * animation having run.
 */
export default function useInView({
  /* A little past the fold: sections start moving just before they'd
     otherwise pop into view. */
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.15,
} = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      { rootMargin, threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold, inView])

  return [ref, inView]
}
