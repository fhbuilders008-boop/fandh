/**
 * The brand's gold gradient as an SVG paint server — mounted once, near the
 * root, and referenced by every SVG on the page.
 *
 * CSS gets the same ramp as `--gold-foil` in index.css; this is its twin for
 * anything CSS gradients cannot paint, namely strokes. Keep the two in step:
 * highlight → antique bronze, top to bottom, exactly as the logo is foiled.
 *
 *   #fh-gold       object-relative — fills and strokes on any artwork
 *   #fh-gold-line  user-space over a 24-unit box — the icon set's viewBox,
 *                  so a flat icon (an arrow, a rule) still gets the full
 *                  ramp instead of collapsing to a single colour.
 */
export default function GoldDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        <linearGradient id="fh-gold" x1="0" y1="0" x2="0.18" y2="1">
          <stop offset="0%" stopColor="#f5d78a" />
          <stop offset="22%" stopColor="#e8c87b" />
          <stop offset="46%" stopColor="#d9ae57" />
          <stop offset="66%" stopColor="#c39a3f" />
          <stop offset="84%" stopColor="#a5761f" />
          <stop offset="100%" stopColor="#8a640f" />
        </linearGradient>

        <linearGradient
          id="fh-gold-line"
          gradientUnits="userSpaceOnUse"
          x1="2"
          y1="1"
          x2="6"
          y2="23"
        >
          <stop offset="0%" stopColor="#f5d78a" />
          <stop offset="35%" stopColor="#d9ae57" />
          <stop offset="70%" stopColor="#b98c33" />
          <stop offset="100%" stopColor="#8a640f" />
        </linearGradient>

        {/* Same foil, shifted deeper — the light ramp above disappears on the
            ivory band, so that section gets the bronze end of the range. */}
        <linearGradient
          id="fh-gold-line-deep"
          gradientUnits="userSpaceOnUse"
          x1="2"
          y1="1"
          x2="6"
          y2="23"
        >
          <stop offset="0%" stopColor="#c99a3c" />
          <stop offset="45%" stopColor="#a5761f" />
          <stop offset="100%" stopColor="#7a5710" />
        </linearGradient>
      </defs>
    </svg>
  )
}
