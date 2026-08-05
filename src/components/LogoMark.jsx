/**
 * F&H Builders & Developers — brand mark, rebuilt as SEPARATED SVG LAYERS.
 *
 * The flat logo artwork was recreated here as five independent <g> groups so each
 * piece can be animated on its own by GSAP in the hero:
 *
 *   #skyline    — three line-art towers
 *   #letter-f   — the serif "F"
 *   #ampersand  — the script "&"
 *   #letter-h   — the serif "H"
 *   #tagline    — "BUILDERS & DEVELOPERS"
 *
 * All five sit inside #logo-group so the assembled mark can be glowed/scaled as one.
 * Pass `uid` when rendering a second copy on the page to keep DOM ids unique.
 */
export default function LogoMark({ uid = '', className = '', ...props }) {
  const id = (name) => `${uid}${name}`

  return (
    <svg
      viewBox="0 0 800 540"
      className={className}
      role="img"
      aria-label="F&H Builders & Developers"
      xmlns="http://www.w3.org/2000/svg"
      /* Visible overflow lets the hero fly each layer in from beyond the
         artboard — the sticky pane above does the clipping instead. */
      style={{ overflow: 'visible' }}
      {...props}
    >
      <title>F&amp;H Builders &amp; Developers</title>
      <defs>
        {/* Brushed-gold gradient, angled so the letterforms catch a highlight. */}
        <linearGradient id={id('goldFill')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AC7A2F" />
          <stop offset="22%" stopColor="#E1BF6F" />
          <stop offset="46%" stopColor="#CD9F49" />
          <stop offset="68%" stopColor="#E1BF6F" />
          <stop offset="100%" stopColor="#AC7A2F" />
        </linearGradient>

        <linearGradient id={id('goldStroke')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E1BF6F" />
          <stop offset="55%" stopColor="#CD9F49" />
          <stop offset="100%" stopColor="#AC7A2F" />
        </linearGradient>

        {/* Soft ambient gold bloom used behind the assembled mark. */}
        <radialGradient id={id('bloom')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#CD9F49" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#CD9F49" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g id={id('logo-group')}>
        <ellipse cx="400" cy="330" rx="330" ry="230" fill={`url(#${id('bloom')})`} />

        {/* ── 1. Skyline: three line-art towers ─────────────────────────── */}
        <g
          id={id('skyline')}
          fill="none"
          stroke={`url(#${id('goldStroke')})`}
          strokeWidth="7"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        >
          {/* Left tower — twin stepped setbacks */}
          <path d="M318 258 L318 168 L342 144 L342 112 L366 88 L366 258" />
          <path d="M318 206 H342 M342 152 H366 M342 200 H366" strokeWidth="5" />

          {/* Centre spire — tallest, chevron crown */}
          <path d="M382 258 L382 78 L400 46 L418 78 L418 258" />
          <path d="M400 46 L400 258" strokeWidth="5" />

          {/* Right tower — pitched apex */}
          <path d="M434 258 L434 140 L456 112 L478 140 L478 258" />
          <path d="M456 112 L456 258" strokeWidth="5" />
        </g>

        {/* ── 2. Letter F ───────────────────────────────────────────────── */}
        <g id={id('letter-f')}>
          <text
            x="275"
            y="430"
            textAnchor="middle"
            fontFamily="'Playfair Display', 'Cormorant Garamond', Georgia, serif"
            fontSize="310"
            fontWeight="700"
            fill={`url(#${id('goldFill')})`}
          >
            F
          </text>
        </g>

        {/* ── 3. Letter H ───────────────────────────────────────────────── */}
        <g id={id('letter-h')}>
          <text
            x="517"
            y="430"
            textAnchor="middle"
            fontFamily="'Playfair Display', 'Cormorant Garamond', Georgia, serif"
            fontSize="310"
            fontWeight="700"
            fill={`url(#${id('goldFill')})`}
          >
            H
          </text>
        </g>

        {/* ── 4. Ampersand — script, nested between the letters ─────────── */}
        <g id={id('ampersand')}>
          <text
            x="392"
            y="448"
            textAnchor="middle"
            fontFamily="'Playfair Display', 'Cormorant Garamond', Georgia, serif"
            fontStyle="italic"
            fontSize="210"
            fontWeight="500"
            fill={`url(#${id('goldFill')})`}
          >
            &amp;
          </text>
        </g>

        {/* ── 5. Tagline ────────────────────────────────────────────────── */}
        <g id={id('tagline')}>
          <text
            x="400"
            y="505"
            textAnchor="middle"
            fontFamily="Manrope, Inter, system-ui, sans-serif"
            fontSize="29"
            fontWeight="400"
            letterSpacing="10"
            fill="#CD9F49"
          >
            BUILDERS &amp; DEVELOPERS
          </text>
        </g>
      </g>
    </svg>
  )
}

/** Compact horizontal lockup for the navbar and footer. */
export function LogoLockup({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 60 60" className="h-9 w-9 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="lockupGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#AC7A2F" />
            <stop offset="45%" stopColor="#E1BF6F" />
            <stop offset="100%" stopColor="#CD9F49" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#lockupGold)" strokeWidth="3">
          <path d="M23 52 L23 22 L30 14 L37 22 L37 52" />
          <path d="M11 52 L11 30 L18 23 L18 52" />
          <path d="M49 52 L49 30 L42 23 L42 52" />
        </g>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-wide gold-text">F&amp;H</span>
        <span className="mt-1 text-[8px] uppercase tracking-widest2 text-gold/70">Builders &amp; Developers</span>
      </span>
    </span>
  )
}
