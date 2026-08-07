// Lightweight inline icon set — no icon library, no extra bundle weight.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
}

export const IconVilla = (p) => (
  <svg {...base} {...p}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10.5V20h14v-9.5" />
    <path d="M10 20v-5h4v5" />
  </svg>
)

export const IconTower = (p) => (
  <svg {...base} {...p}>
    <path d="M4 21V9l5-4 5 4v12" />
    <path d="M14 21V12h6v9" />
    <path d="M7 12h4M7 15h4M7 18h4M17 15v3" />
  </svg>
)

export const IconPlot = (p) => (
  <svg {...base} {...p}>
    <path d="M3 5h18v14H3z" />
    <path d="M9 5v14M15 5v14M3 12h18" />
    <circle cx="6" cy="8.5" r="1" />
  </svg>
)

export const IconHome = (p) => (
  <svg {...base} {...p}>
    <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
    <path d="M9.5 21v-6h5v6" />
  </svg>
)

export const IconConsult = (p) => (
  <svg {...base} {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
    <path d="M8.5 9h8M8.5 12.5h5" />
  </svg>
)

export const IconBlueprint = (p) => (
  <svg {...base} {...p}>
    <path d="M3 4h18v16H3z" />
    <path d="M3 9h6v11M9 9h12M15 9v11M9 14.5h6" />
  </svg>
)

export const IconInterior = (p) => (
  <svg {...base} {...p}>
    <path d="M4 18v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
    <path d="M4 18h16M6 18v2M18 18v2M7 10V7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" />
  </svg>
)

export const IconGrowth = (p) => (
  <svg {...base} {...p}>
    <path d="M3 20h18" />
    <path d="M6 20v-6M11 20V8M16 20v-9M21 20V5" />
  </svg>
)

/* Geotechnical investigation — bore probe through stratified soil. */
export const IconGeotech = (p) => (
  <svg {...base} {...p}>
    <path d="M3 13h18M3 17h18M3 21h18" />
    <path d="M12 3v9" />
    <path d="m9 6 3-3 3 3" />
    <path d="M7.5 13v8M16.5 13v8" />
  </svg>
)

export const IconCheck = (p) => (
  <svg {...base} {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
)

/* ── Assurance strip ─────────────────────────────────────────────────── */

export const IconShield = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l7.5 3v5.6c0 4.5-3 8.1-7.5 9.4-4.5-1.3-7.5-4.9-7.5-9.4V6z" />
    <path d="m8.8 12 2.3 2.3L15.4 10" />
  </svg>
)

export const IconTeam = (p) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
    <path d="M16.2 5.6a3.2 3.2 0 0 1 0 6.2M17.6 14.4A6.2 6.2 0 0 1 21.2 20" />
  </svg>
)

export const IconClock = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="13.5" r="7.5" />
    <path d="M12 9.5v4l2.6 1.8" />
    <path d="M9.4 2.5h5.2M12 2.5v3.5" />
  </svg>
)

export const IconHeartHand = (p) => (
  <svg {...base} {...p}>
    <path d="M12 10.4 10.8 9.2a2.2 2.2 0 1 0-3.1 3.1l4.3 4.2 4.3-4.2a2.2 2.2 0 1 0-3.1-3.1z" />
    <path d="M3 20.5h3.2l2.6 1.2h4.6l6.1-2.6a1.5 1.5 0 0 0-1.4-2.6l-4 1.4" />
  </svg>
)

/* ── Social ──────────────────────────────────────────────────────────── */

export const IconFacebook = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6a22 22 0 0 0-2.4-.12c-2.4 0-4.05 1.46-4.05 4.15V9.9H7.5V13h2.75v8z" />
  </svg>
)

export const IconInstagram = (p) => (
  <svg {...base} {...p}>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const IconLinkedIn = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M6.94 8.5H4.1V20h2.84zM5.52 3.9a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3M20 13.6c0-3.1-1.66-4.55-3.87-4.55a3.34 3.34 0 0 0-3.03 1.67h-.04V8.5H9.34V20h2.84v-5.7c0-1.5.29-2.95 2.15-2.95s1.84 1.72 1.84 3.05V20H19z" />
  </svg>
)

export const IconPhone = (p) => (
  <svg {...base} {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
)

export const IconWhatsApp = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.5-.1-.7.2-.8 1-.9 1.1-.3.2-.6.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4A3.4 3.4 0 0 0 6 8.7a5.9 5.9 0 0 0 1.3 3.2 13.5 13.5 0 0 0 5.1 4.5 17 17 0 0 0 1.7.6 4.1 4.1 0 0 0 1.9.1 3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3z" />
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
  </svg>
)

export const IconMail = (p) => (
  <svg {...base} {...p}>
    <path d="M3 6h18v12H3z" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

export const IconPin = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)

export const IconArrow = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const IconPlus = (p) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const IconQuote = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M9.7 5.5 8.4 7.8A4.7 4.7 0 0 0 6 11.9V18h6.1v-6.1H9.3c0-1.2.4-2.3 1.2-3.2l1.6-1.9zm9 0-1.3 2.3a4.7 4.7 0 0 0-2.4 4.1V18H21v-6.1h-2.8c0-1.2.4-2.3 1.2-3.2l1.6-1.9z" />
  </svg>
)

export const IconClose = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const IconStar = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z" />
  </svg>
)
