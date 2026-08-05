import { useState } from 'react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { IconMail, IconPhone, IconPin, IconWhatsApp } from './Icons'
import {
  ADDRESS,
  EMAIL,
  MAP_EMBED_SRC,
  PHONE_DISPLAY,
  TEL_LINK,
  WHATSAPP_NUMBER,
  waLink,
} from '../lib/site'

const INTERESTS = [
  'Luxury Villa Construction',
  'Premium Villa Project',
  'Villa Plot',
  'Residential Construction',
  'Interior Solutions',
  'Something else',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', interest: INTERESTS[0], message: '' })
  const [sent, setSent] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  /**
   * Submits straight into WhatsApp as a formatted enquiry.
   * To post to a backend/CRM instead, replace the window.open call with a
   * fetch() to your endpoint — the `form` object is already shaped for it.
   */
  const onSubmit = (e) => {
    e.preventDefault()
    const lines = [
      'New enquiry from the F&H website',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      `Interested in: ${form.interest}`,
      form.message ? `Message: ${form.message}` : null,
    ].filter(Boolean)

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener,noreferrer'
    )
    setSent(true)
  }

  const field =
    'w-full rounded-xl border border-gold/20 bg-white/[0.04] px-4 py-3.5 text-[15px] text-ivory placeholder:text-ivory/35 transition-colors duration-300 focus:border-gold/70 focus:bg-white/[0.06] focus:outline-none'

  return (
    <section id="contact" className="relative overflow-hidden bg-maroonDark/50 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-x">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's Talk About"
          accent="Your Future Home."
          intro="One conversation — no pressure, no obligation. Tell us what you are imagining and we will tell you honestly what it takes."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Details + map */}
          <div className="flex flex-col gap-5">
            <Reveal direction="right">
              <div className="glass rounded-2xl p-7">
                <h3 className="font-display text-2xl text-ivory">Reach us directly</h3>
                <p className="mt-2 text-[14px] text-ivory/60">
                  We answer calls ourselves. Most enquiries get a reply within the hour.
                </p>

                <ul className="mt-7 flex flex-col gap-5">
                  <li>
                    <a href={TEL_LINK} className="group flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-maroonDark">
                        <IconPhone className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[10px] uppercase tracking-widest2 text-ivory/45">Phone</span>
                        <span className="mt-0.5 block font-display text-lg text-ivory group-hover:text-gold">
                          {PHONE_DISPLAY}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={waLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-maroonDark">
                        <IconWhatsApp className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[10px] uppercase tracking-widest2 text-ivory/45">WhatsApp</span>
                        <span className="mt-0.5 block font-display text-lg text-ivory group-hover:text-gold">
                          {PHONE_DISPLAY}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a href={`mailto:${EMAIL}`} className="group flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-maroonDark">
                        <IconMail className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[10px] uppercase tracking-widest2 text-ivory/45">Email</span>
                        <span className="mt-0.5 block font-display text-lg text-ivory group-hover:text-gold">
                          {EMAIL}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold">
                      <IconPin className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[10px] uppercase tracking-widest2 text-ivory/45">Office</span>
                      <span className="mt-0.5 block text-[15px] leading-relaxed text-ivory/85">{ADDRESS}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-gold/20">
                <iframe
                  title="F&H Builders & Developers office location"
                  src={MAP_EMBED_SRC}
                  className="h-[280px] w-full grayscale-[0.35] contrast-125"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal direction="left">
            <form onSubmit={onSubmit} className="glass h-full rounded-2xl p-7 sm:p-9">
              <h3 className="font-display text-2xl text-ivory">Book a site visit</h3>
              <p className="mt-2 text-[14px] text-ivory/60">
                Fill this in and it opens a ready-to-send WhatsApp message — no forms lost in an inbox.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-ivory/55">
                    Name *
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={update('name')}
                    className={field}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-ivory/55">
                    Phone *
                  </label>
                  <input
                    id="phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    className={field}
                    placeholder="+91 00000 00000"
                    autoComplete="tel"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-ivory/55">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    className={field}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="interest" className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-ivory/55">
                    I'm interested in
                  </label>
                  <select id="interest" value={form.interest} onChange={update('interest')} className={field}>
                    {INTERESTS.map((option) => (
                      <option key={option} value={option} className="bg-maroonDark text-ivory">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-ivory/55">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    className={`${field} resize-none`}
                    placeholder="Plot size, location, budget range, timeline — anything helps."
                  />
                </div>
              </div>

              <button type="submit" className="btn-gold mt-7 w-full">
                <IconWhatsApp className="h-4 w-4" />
                Send via WhatsApp
              </button>

              {sent && (
                <p role="status" className="mt-4 text-center text-[13px] text-goldLight">
                  WhatsApp should have opened with your enquiry ready to send. If it didn't, call us on{' '}
                  <a href={TEL_LINK} className="underline">
                    {PHONE_DISPLAY}
                  </a>
                  .
                </p>
              )}

              <p className="mt-4 text-center text-[12px] text-ivory/40">
                Your details stay with us. We never share or sell client information.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
