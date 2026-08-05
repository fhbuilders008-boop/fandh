import { LogoLockup } from './LogoMark'
import { SERVICES } from '../data/content'
import { ADDRESS, EMAIL, NAV_LINKS, PHONE_DISPLAY, TAGLINE, TEL_LINK, waLink } from '../lib/site'
import { IconArrow, IconWhatsApp } from './Icons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-maroonDark">
      {/* Final CTA */}
      <div className="container-x border-b border-gold/12 py-16 text-center sm:py-20">
        <p className="eyebrow justify-center">
          <span className="h-px w-8 bg-gold/60" />
          Ready when you are
          <span className="h-px w-8 bg-gold/60" />
        </p>
        <h2 className="heading-lg mx-auto mt-5 max-w-3xl text-balance text-ivory">
          Your home is waiting to be built. <span className="gold-text italic">Let's begin.</span>
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <IconWhatsApp className="h-4 w-4" />
            WhatsApp Us
          </a>
          <a href={TEL_LINK} className="btn-outline">
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* Columns */}
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <LogoLockup />
          <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-ivory/55">
            Luxury villa construction, premium villa projects and end-to-end property development
            across Kerala.
          </p>
          <p className="mt-5 font-display text-base italic text-gold/85">“{TAGLINE}”</p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-[11px] uppercase tracking-widest2 text-gold/80">Explore</h3>
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
          <h3 className="text-[11px] uppercase tracking-widest2 text-gold/80">Contact</h3>
          <ul className="mt-5 flex flex-col gap-3 text-[14px] text-ivory/60">
            <li>
              <a href={TEL_LINK} className="transition-colors hover:text-gold">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-gold">
                {EMAIL}
              </a>
            </li>
            <li className="leading-relaxed">{ADDRESS}</li>
          </ul>
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
