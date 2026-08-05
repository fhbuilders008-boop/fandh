import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogoLockup } from './LogoMark'
import { NAV_LINKS, TEL_LINK, waLink } from '../lib/site'
import { IconClose, IconPhone } from './Icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-gold/15 bg-maroonDark/85 py-3 backdrop-blur-xl'
            : 'border-b border-transparent py-5'
        }`}
      >
        <nav className="container-x flex items-center justify-between" aria-label="Primary">
          <a href="#hero" className="shrink-0" aria-label="F&H Builders & Developers — home">
            <LogoLockup />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-[13px] font-medium uppercase tracking-[0.12em] text-ivory/75 transition-colors hover:text-gold"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={TEL_LINK} className="btn-outline !px-5 !py-2.5 !text-[11px]">
              <IconPhone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold !px-5 !py-2.5 !text-[11px]"
            >
              Book a Visit
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-gold lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-3.5 bg-current" />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-maroonDark/97 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x flex h-full flex-col py-6">
              <div className="flex items-center justify-between">
                <LogoLockup />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-gold"
                  aria-label="Close menu"
                >
                  <IconClose className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-12 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-gold/10 py-4 font-display text-3xl text-ivory/90 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full"
                  onClick={() => setOpen(false)}
                >
                  WhatsApp Us
                </a>
                <a href={TEL_LINK} className="btn-outline w-full">
                  Call +91 99615 33355
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
