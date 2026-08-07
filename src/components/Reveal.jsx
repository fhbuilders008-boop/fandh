import { Children, cloneElement, createElement, isValidElement } from 'react'
import useInView from '../lib/useInView'

const DIRECTIONS = {
  up: { '--fh-ty': '36px' },
  down: { '--fh-ty': '-36px' },
  left: { '--fh-tx': '48px', '--fh-ty': '0px' },
  right: { '--fh-tx': '-48px', '--fh-ty': '0px' },
  none: { '--fh-tx': '0px', '--fh-ty': '0px' },
}

/**
 * Scroll-triggered reveal, driven by IntersectionObserver.
 *
 * The observer only flips a `data-inview` flag; the fade and the rise live in
 * CSS (`.fh-reveal`), so every section on the site shares one duration and
 * one easing curve, and the browser keeps the work on the compositor.
 *
 * Defaults are deliberately slow — a ~1s ease-out with no overshoot.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 1.05,
  className = '',
  as = 'div',
  style,
  ...rest
}) {
  const [ref, inView] = useInView()
  const offset = DIRECTIONS[direction] ?? DIRECTIONS.up

  return createElement(
    as,
    {
      ref,
      'data-inview': inView,
      className: `fh-reveal ${className}`,
      style: {
        ...offset,
        '--fh-delay': `${delay}s`,
        '--fh-dur': `${duration}s`,
        ...style,
      },
      ...rest,
    },
    children
  )
}

/**
 * Reveals its children one after another off a single observer on the group,
 * so a grid of cards arrives as one considered sequence rather than as each
 * card crossing the fold on its own.
 */
export function StaggerGroup({
  children,
  className = '',
  stagger = 0.09,
  delay = 0,
  duration = 1.05,
  ...rest
}) {
  const [ref, inView] = useInView()

  // Index is handed down rather than counted by the item, so a card's delay
  // depends on its position in the grid, not on when it happened to mount.
  const items = Children.map(children, (child, i) =>
    isValidElement(child) && child.type === StaggerItem
      ? cloneElement(child, { index: i, stagger, baseDelay: delay, duration })
      : child
  )

  return (
    <div ref={ref} data-inview={inView} className={className} {...rest}>
      {items}
    </div>
  )
}

export function StaggerItem({
  children,
  className = '',
  index = 0,
  stagger = 0.09,
  baseDelay = 0,
  duration = 1.05,
  style,
  ...rest
}) {
  return (
    <div
      className={`fh-reveal ${className}`}
      style={{
        '--fh-delay': `${baseDelay + index * stagger}s`,
        '--fh-dur': `${duration}s`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
