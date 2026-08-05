import { motion } from 'framer-motion'

const DIRECTIONS = {
  up: { y: 42, x: 0 },
  down: { y: -42, x: 0 },
  left: { x: 52, y: 0 },
  right: { x: -52, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-triggered fade/slide. Framer Motion's `whileInView` handles the
 * observer; `once` keeps it from re-firing and thrashing on scroll-up.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.7,
  className = '',
  as = 'div',
  ...rest
}) {
  const Tag = motion[as] ?? motion.div
  const offset = DIRECTIONS[direction] ?? DIRECTIONS.up

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Container that staggers its Reveal-like children. */
export function StaggerGroup({ children, className = '', stagger = 0.09, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', ...rest }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 34 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
