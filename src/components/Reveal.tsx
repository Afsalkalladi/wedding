import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { assets } from '../lib/site'

type RevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  /** Vertical offset, in pixels, the element travels while fading in. */
  y?: number
  delay?: number
  duration?: number
}

/** Fades content in the first time it scrolls into view. */
export function Reveal({ children, y = 20, delay = 0, duration = 0.8, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export const Divider = () => (
  <div className="flex justify-center py-2">
    <img src={assets.dividerOrnament} alt="" className="w-28 h-auto opacity-70 select-none" />
  </div>
)
