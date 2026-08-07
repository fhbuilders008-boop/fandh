/**
 * One motion vocabulary for the whole site.
 *
 * Every timing here is deliberately slow: the brand is a heritage builder,
 * so nothing snaps, bounces or springs. The easing twin of `--ease-luxe`
 * lives in index.css; JS only needs the numbers that sequence the page.
 */

/** Beat-by-beat schedule of the load overture, in seconds. */
export const OVERTURE = {
  /** First skyline stroke starts here. */
  drawStart: 0.25,
  /** Gap between building strokes — each one arrives like a new storey. */
  drawStagger: 0.28,
  /** How long a single building takes to draw itself. */
  drawDuration: 0.9,
  /** Wordmark rises as the last stroke lands, so the two feel connected. */
  wordDelay: 1.6,
  /** Tagline opens out to full tracking last. */
  taglineDelay: 2.15,
  /** Hero copy load-in. The brand mark now assembles on scroll rather than
      running a load overture, so the copy no longer waits behind it — it
      settles promptly after the backdrop fade. */
  copyStart: 0.45,
  copyStagger: 0.12,
}

/** Delay for the nth skyline stroke. */
export const drawDelay = (i) => OVERTURE.drawStart + i * OVERTURE.drawStagger

/** Delay for the nth line of hero copy. */
export const copyDelay = (i) => OVERTURE.copyStart + i * OVERTURE.copyStagger

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
