# F&H Builders & Developers

> *Every wall holds a story.*

A premium, conversion-focused website for **F&H Builders & Developers** — a luxury villa and
construction company in Kerala. Built to read as a high-end real estate brand rather than a generic
construction site, with every section routing visitors toward WhatsApp, a call, or a booked site
visit.

The signature moment is the **scroll-driven logo reveal**: the brand mark is split into five
independent SVG layers that fly in from off-screen and assemble as you scroll, then bloom and recede
to hand the stage to the hero copy.

---

## Run it locally

Requires **Node 18+**.

```bash
npm install
npm run dev          # http://localhost:5173
```

Other scripts:

```bash
npm run build        # production build → dist/
npm run preview      # serve the production build locally
```

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 3 (brand palette as a theme extension) |
| Section / UI motion | Framer Motion |
| Scroll choreography | GSAP + ScrollTrigger |
| Smooth scrolling | Lenis, driven off the GSAP ticker so both share a frame |
| Fonts | Playfair Display (display serif) + Manrope (body sans) |

---

## Project structure

```
src/
├─ App.jsx                    # page composition; below-the-fold sections are code-split
├─ main.jsx
├─ index.css                  # Tailwind layers + brand component classes (.btn-gold, .glass, …)
├─ data/
│  └─ content.js              # services, projects, why-us, testimonials, gallery, FAQs
├─ lib/
│  ├─ site.js                 # ⭐ phone / WhatsApp / email / address — single source of truth
│  └─ useLenis.js             # smooth scroll wired into GSAP's ticker
└─ components/
   ├─ LogoMark.jsx            # ⭐ the logo as five separated, animatable SVG layers
   ├─ Hero.jsx                # ⭐ the scroll-driven assembly
   ├─ Navbar.jsx  About.jsx  Services.jsx  Projects.jsx  WhyChooseUs.jsx
   ├─ Testimonials.jsx  Gallery.jsx  FAQ.jsx  Contact.jsx  Footer.jsx
   ├─ FloatingActions.jsx     # persistent WhatsApp + Call buttons
   ├─ Reveal.jsx              # scroll-reveal + stagger helpers
   ├─ Icons.jsx               # inline icon set (no icon library)
   └─ visuals/
      ├─ Backdrop.jsx         # cinematic asset-free section backdrop
      └─ ArchVisual.jsx       # architectural line-art placeholders for project/gallery cards
```

---

## The hero logo reveal

`LogoMark.jsx` rebuilds the flat logo artwork as **five separated `<g>` groups**, each independently
animatable:

| Layer | id | Motion |
| --- | --- | --- |
| Skyline (3 line-art towers) | `#skyline` | drops from above |
| Letter F | `#letter-f` | slides in from the left |
| Ampersand | `#ampersand` | scales up from the centre |
| Letter H | `#letter-h` | slides in from the right |
| Tagline | `#tagline` | rises from below |

All five live inside `#logo-group` so the assembled mark can be glowed and scaled as one unit.

**How the choreography works** (`Hero.jsx`):

1. An **intro timeline** fades the five layers in at their off-stage positions on load, so the first
   paint already shows gold pieces waiting to converge.
2. A **scrubbed ScrollTrigger timeline** drags them into place — staggered, each landing with a
   `back.out` overshoot — then blooms the assembled mark, holds it, and recedes it while the hero
   headline, CTAs and stat row fade up.

Three implementation notes worth knowing before you edit it:

- **The section is a tall runway with a `sticky` inner pane** rather than ScrollTrigger's `pin`.
  Sticky is pure CSS: no injected pin-spacers, nothing to desync from Lenis, and it survives React
  StrictMode's double-mount. It also needs `overflow-x: clip` (not `hidden`) on `html`/`body` —
  `hidden` creates a scroll container and silently breaks sticky.
- **The trigger is passed as an element (`root.current`), not the string `'#hero'`.** `gsap.context`
  scopes selector strings to *inside* its root, so `'#hero'` would match nothing and ScrollTrigger
  would quietly fall back to the whole document.
- **Layer motion uses `fromTo`, not `to`.** GSAP decomposes an existing transform matrix back into
  pixels, so after any `invalidateOnRefresh` a `to({ xPercent: 0 })` resolves to `0 → 0` and the
  piece never moves. Stating both endpoints keeps it correct across refreshes.

Only `transform` and `opacity` are animated (plus one short `filter` beat for the gold bloom), so
the sequence stays on the compositor.

**Mobile** gets a shorter runway (240vh vs 320vh), a tighter stagger, and the assembled mark
dissolves instead of parking above the copy — there isn't room for both.

**`prefers-reduced-motion`** skips the choreography entirely: Lenis is disabled, the hero renders in
its final composed state, and the runway collapses to a single screen.

---

## Customising

### Contact details

Everything lives in **`src/lib/site.js`** — phone, WhatsApp number, email, address, map embed and
the nav links. Change it there and it updates the navbar, hero, contact section, footer and both
floating buttons at once.

```js
export const PHONE_DISPLAY = '+91 99615 33355'
export const PHONE_TEL     = '+919961533355'
export const WHATSAPP_NUMBER = '919961533355'
```

### Content

Services, projects, why-us points, testimonials, gallery items and FAQs are all plain arrays in
**`src/data/content.js`**. No component edits needed to add or reorder entries.

### Imagery

The site ships **asset-free**: backdrops and card "photos" are generated architectural line-art SVGs
(`visuals/Backdrop.jsx`, `visuals/ArchVisual.jsx`) so it looks intentional with zero image weight.

To drop in real photography:

- **Project / gallery cards** — replace `<ArchVisual variant={…} />` with
  `<img src={project.image} alt={project.name} loading="lazy" className="h-full w-full object-cover" />`
  and add an `image` field to the entries in `content.js`.
- **Hero background** — put your file in `public/` and render it as the bottom layer inside
  `Backdrop.jsx`; the gradient and vignette layers above it are already tuned to sit over
  photography or video and keep gold text legible.

### Logo

The mark is drawn with live `<text>` for the letterforms (Playfair Display) plus hand-drawn skyline
paths. If you have the original vector artwork, swap the `<text>` elements for traced `<path>` data
inside the same five `<g>` groups — the ids are what the animation targets, so nothing else changes.

### Contact form

`Contact.jsx` submits into WhatsApp as a pre-formatted enquiry via a `wa.me` deep link. To post to a
backend or CRM instead, replace the `window.open(...)` call in `onSubmit` with a `fetch()` — the
`form` state object is already shaped for it.

---

## Sections

Hero → About → Services → Featured Projects (filterable: Ongoing / Completed) → Why Choose F&H →
Testimonials (carousel) → Gallery (tabbed, masonry, lightbox) → FAQ (accordion) → Contact (details,
map, WhatsApp form) → Footer, with persistent WhatsApp and Call buttons throughout.

---

## Notes

- Semantic HTML, meta + Open Graph tags, JSON-LD `HomeAndConstructionBusiness` schema, and
  descriptive labels on every interactive element.
- Below-the-fold sections are lazy-loaded; GSAP and Framer Motion are split into their own
  long-cache chunks.
- The Google Map is an `iframe` with `loading="lazy"`, so it costs nothing until it scrolls into
  view.

## Deploy

Any static host. Build with `npm run build` and serve `dist/`.

```bash
npm run build
# → deploy the dist/ folder (Netlify, Vercel, Cloudflare Pages, S3, nginx …)
```
