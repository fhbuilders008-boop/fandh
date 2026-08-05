/**
 * Deterministic, asset-free "photo" stand-in for project & gallery cards.
 * Each variant draws a different architectural composition in gold line-art on
 * maroon, so every card reads as its own image without shipping a single JPEG.
 *
 * Replace with real photography by swapping this component for:
 *   <img src={project.image} alt={project.name} loading="lazy" className="..." />
 */
const VARIANTS = [
  // 0 — flat-roof modern villa
  <g key="0">
    <path d="M40 300 V170 H190 V120 H330 V300" />
    <path d="M190 120 H330 M40 210 H190 M190 190 H330 M190 240 H330" />
    <path d="M80 210 V300 M120 210 V300 M150 170 V300 M240 120 V300 M285 120 V300" />
    <path d="M20 300 H360" strokeWidth="2" />
  </g>,
  // 1 — pitched-roof heritage villa
  <g key="1">
    <path d="M60 300 V180 L190 100 L320 180 V300" />
    <path d="M110 300 V220 H160 V300 M220 220 H280 V270 H220 Z" />
    <path d="M60 180 H320 M190 100 V300" />
    <path d="M20 300 H360" strokeWidth="2" />
  </g>,
  // 2 — twin-tower development
  <g key="2">
    <path d="M70 300 V110 H160 V300 M210 300 V70 H300 V300" />
    <path d="M70 150 H160 M70 190 H160 M70 230 H160 M70 270 H160" />
    <path d="M210 110 H300 M210 150 H300 M210 190 H300 M210 230 H300 M210 270 H300" />
    <path d="M115 110 V300 M255 70 V300" />
    <path d="M20 300 H360" strokeWidth="2" />
  </g>,
  // 3 — courtyard / plot layout
  <g key="3">
    <path d="M50 90 H330 V290 H50 Z" />
    <path d="M120 90 V290 M230 90 V290 M50 170 H330 M50 220 H330" />
    <path d="M150 190 h60 v40 h-60 Z" />
    <circle cx="85" cy="130" r="16" />
    <circle cx="285" cy="255" r="16" />
  </g>,
  // 4 — interior perspective
  <g key="4">
    <path d="M40 60 H340 V300 H40 Z" />
    <path d="M110 130 H270 V240 H110 Z" />
    <path d="M40 60 L110 130 M340 60 L270 130 M40 300 L110 240 M340 300 L270 240" />
    <path d="M150 240 V300 M230 240 V300 M150 175 H230" />
  </g>,
  // 5 — poolside elevation
  <g key="5">
    <path d="M50 230 V120 H180 V80 H330 V230" />
    <path d="M50 230 H330 M30 260 h340 M30 285 h340" strokeWidth="2" />
    <path d="M90 230 V150 M140 230 V150 M215 230 V130 H275 V230" />
    <path d="M180 80 H330" />
  </g>,
]

export default function ArchVisual({ variant = 0, className = '' }) {
  const shape = VARIANTS[variant % VARIANTS.length]
  return (
    <svg
      viewBox="0 0 380 320"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`av-bg-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A0F1B" />
          <stop offset="55%" stopColor="#360203" />
          <stop offset="100%" stopColor="#270101" />
        </linearGradient>
        <linearGradient id={`av-line-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E1BF6F" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#AC7A2F" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect width="380" height="320" fill={`url(#av-bg-${variant})`} />
      <g
        fill="none"
        stroke={`url(#av-line-${variant})`}
        strokeWidth="1.6"
        strokeLinecap="square"
        opacity="0.85"
      >
        {shape}
      </g>
      <rect width="380" height="320" fill="url(#av-vignette)" />
      <defs>
        <radialGradient id="av-vignette" cx="50%" cy="45%" r="70%">
          <stop offset="55%" stopColor="#270101" stopOpacity="0" />
          <stop offset="100%" stopColor="#270101" stopOpacity="0.7" />
        </radialGradient>
      </defs>
    </svg>
  )
}
