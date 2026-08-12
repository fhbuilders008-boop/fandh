import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Buttery smooth scrolling, driven off GSAP's ticker so ScrollTrigger and
 * Lenis stay on the exact same frame (no jitter on pinned sections).
 * Disabled entirely when the visitor prefers reduced motion.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    /**
     * Section ScrollTriggers (see BrandAssemble, HouseBuild) are created in
     * child-component layout effects that run before this effect. Their very
     * first refresh — the one that turns a placeholder `start: 0` into the
     * real scroll-pixel range — normally piggybacks on the browser's `load`
     * event. That event has often already fired by the time React finishes
     * mounting, and web fonts loading in afterwards (see index.html's
     * `display=swap` Google Fonts) can shift section heights again after
     * that. Both leave triggers stuck unrefreshed, so entry animations never
     * play. Force a refresh once layout has settled, and again once fonts
     * are in, rather than relying on GSAP's implicit auto-refresh timing.
     */
    const refresh = () => ScrollTrigger.refresh()
    requestAnimationFrame(refresh)
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)

    // Anchor links go through Lenis so in-page jumps stay smooth.
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -70, duration: 1.3 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}
