import { useState } from 'react'
import { LogoLockup } from './LogoMark'
import { SERVICES } from '../data/content'
import { ADDRESS, EMAIL, NAV_LINKS, PHONE_DISPLAY, TAGLINE, TEL_LINK, waLink } from '../lib/site'
import {
  IconArrow,
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from './Icons'

const SOCIALS = [
  { label: 'Facebook', href: 'https://facebook.com/', Icon: IconFacebook },
  { label: 'Instagram', href: 'https://instagram.com/', Icon: IconInstagram },
  { label: 'WhatsApp', href: waLink(), Icon: IconWhatsApp },
  { label: 'LinkedIn', href: 'https://linkedin.com/', Icon: IconLinkedIn },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')

  // No backend on this build: the form hands the address to the office inbox.
  const subscribe = (e) => {
    e.preventDefault()
    if (!email) return
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      'Newsletter subscription'
    )}&body=${encodeURIComponent(`Please add ${email} to the F&H Builders project updates list.`)}`
  }

  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-maroonDark">
      {/* Columns */}
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <LogoLockup />
          <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-ivory/55">
            Luxury villas, premium villa plots, residential construction, geotechnical investigation
            and complete construction consultancy across Kerala.
          </p>
          <p className="mt-5 font-display text-base italic text-gold/85">“{TAGLINE}”</p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-[11px] uppercase tracking-widest2 text-gold/80">Quick Links</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-[14px] text-ivory/60 transition-colors hover:text-gold"
                >
                  <IconArrow className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[11px] uppercase tracking-widest2 text-gold/80">Services</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.title}>
                <a
                  href="#services"
                  className="text-[14px] text-ivory/60 transition-colors hover:text-gold"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-widest2 text-gold/80">Contact Info</h3>
          <ul className="mt-5 flex flex-col gap-3.5 text-[14px] text-ivory/60">
            <li className="flex gap-2.5">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
              <span className="leading-relaxed">{ADDRESS}</span>
            </li>
            <li className="flex gap-2.5">
              <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
              <a href={TEL_LINK} className="transition-colors hover:text-gold">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex gap-2.5">
              <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
              <a href={`mailto:${EMAIL}`} className="break-all transition-colors hover:text-gold">
                {EMAIL}
              </a>
            </li>
          </ul>

          <ul className="mt-6 flex gap-2.5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/25 text-ivory/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/70 hover:bg-gold/10 hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-widest2 text-gold/80">Newsletter</h3>
          <p className="mt-5 text-[13.5px] leading-relaxed text-ivory/55">
            Subscribe for updates on our latest villa projects and plot releases.
          </p>

          <form onSubmit={subscribe} className="mt-5 flex items-center gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="min-w-0 flex-1 rounded-lg border border-gold/25 bg-white/[0.04] px-3.5 py-2.5 text-[13.5px] text-ivory placeholder:text-ivory/35 transition-colors focus:border-gold/70 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe to the newsletter"
              className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-gold-gradient text-maroonDark transition-transform duration-300 hover:-translate-y-0.5"
            >
              <IconArrow className="h-4 w-4" strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gold/12">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center text-[12px] text-ivory/40 sm:flex-row sm:text-left">
          <p>© {year} F&amp;H Builders &amp; Developers. All rights reserved.</p>
          <p>Designed &amp; built for families who plan in decades.</p>
        </div>
      </div>
    </footer>
  )
}
