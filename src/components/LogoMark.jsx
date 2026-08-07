/**
 * Compact horizontal lockup for the navbar and footer — the real logo artwork
 * (/brand-mark.png) plus a descriptor. The mark already contains the "F&H", so
 * the text beside it carries only the descriptor.
 */
export function LogoLockup({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/brand-mark.png"
        alt="F&H Builders & Developers"
        width="604"
        height="596"
        className="h-12 w-auto shrink-0"
      />
      <span className="text-[9px] uppercase leading-relaxed tracking-widest2 text-gold/75">
        Builders &amp;
        <br />
        Developers
      </span>
    </span>
  )
}
