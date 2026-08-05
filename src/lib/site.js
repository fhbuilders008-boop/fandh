// Single source of truth for brand + contact details.
// Change the number / address here and it updates everywhere on the site.

export const PHONE_DISPLAY = '+91 99615 33355'
export const PHONE_TEL = '+919961533355'
export const WHATSAPP_NUMBER = '919961533355'
export const EMAIL = 'info@fhbuilders.in'
export const ADDRESS = 'F&H Builders & Developers, Kerala, India'

export const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=Kerala,India&output=embed'

export const TAGLINE = 'Every wall holds a story'

/** Build a wa.me deep link with a pre-filled message. */
export const waLink = (message = "Hello F&H Builders, I'd like to know more about your villa projects.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const TEL_LINK = `tel:${PHONE_TEL}`

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]
