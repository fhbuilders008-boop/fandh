import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconPhone, IconWhatsApp } from './Icons'
import { PHONE_DISPLAY, TEL_LINK, waLink } from '../lib/site'

/**
 * Persistent WhatsApp + Call actions. They appear once the visitor has moved
 * past the hero so they never compete with the logo reveal.
 */
export default function FloatingActions() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-[55] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
        >
          {/* Call */}
          <a
            href={TEL_LINK}
            className="group flex items-center justify-center rounded-full border border-gold/50 bg-maroonDark/85 text-gold shadow-goldSoft backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-gold hover:text-maroonDark"
            style={{ height: '3.25rem', width: '3.25rem' }}
            aria-label={`Call F&H Builders on ${PHONE_DISPLAY}`}
          >
            <IconPhone className="h-5 w-5" />
          </a>

          {/* WhatsApp with pulsing gold ring */}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center rounded-full bg-gold-gradient text-maroonDark shadow-gold transition-transform duration-300 hover:scale-105"
            style={{ height: '3.75rem', width: '3.75rem' }}
            aria-label="Chat with F&H Builders on WhatsApp"
          >
            <span className="animate-pulseRing absolute inset-0 rounded-full border-2 border-gold" aria-hidden="true" />
            <IconWhatsApp className="relative h-7 w-7" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
