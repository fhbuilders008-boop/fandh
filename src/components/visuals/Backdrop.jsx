/**
 * Cinematic, asset-free backdrop: layered maroon gradients, an architectural
 * line-art silhouette, film grain and a vignette.
 *
 * To swap in real photography or video, drop the file in /public and render
 * <img src="/villa.jpg" /> or <video src="/villa.mp4" /> as the bottom layer —
 * the gradient + vignette layers below are already tuned to sit on top of it.
 */
export default function Backdrop({ variant = 'hero', className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Base wash */}
      <div className="absolute inset-0 bg-maroon-fade" />

      {/* Warm gold light source */}
      <div
        className="absolute -top-1/3 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 opacity-[0.5]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, rgba(205,159,73,0.22) 0%, rgba(97,24,39,0.18) 38%, rgba(39,1,1,0) 70%)',
        }}
      />

      {/* Architectural silhouette */}
      <svg
        className="absolute bottom-0 left-0 h-[62%] w-full opacity-[0.18]"
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id={`bd-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E1BF6F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#CD9F49" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <g fill="none" stroke={`url(#bd-${variant})`} strokeWidth="1.5">
          {/* Villa massing */}
          <path d="M120 520 V300 H420 V210 H700 V330 H980 V250 H1320 V520" />
          <path d="M420 210 L560 130 L700 210" />
          <path d="M980 250 L1150 160 L1320 250" />
          {/* Floor + mullion grid */}
          <path d="M120 380 H420 M120 450 H420 M700 400 H980 M700 460 H980 M980 330 H1320 M980 420 H1320" />
          <path d="M200 300 V520 M280 300 V520 M360 300 V520 M480 210 V520 M560 130 V520 M640 210 V520 M780 330 V520 M860 330 V520 M940 330 V520 M1060 250 V520 M1150 160 V520 M1240 250 V520" />
        </g>
      </svg>

      {/* Grain */}
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      {/* Vignette keeps gold type legible everywhere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(39,1,1,0) 30%, rgba(39,1,1,0.55) 72%, rgba(39,1,1,0.9) 100%)',
        }}
      />
    </div>
  )
}
