import { useState } from 'react'
import { motion } from 'framer-motion'

const GATE_EASE = [0.76, 0, 0.24, 1] as const

/**
 * A wax-seal medallion assembles at the centre, then the page itself parts
 * like a pair of gates — echoing the mosque-arch motif used throughout —
 * with a soft flare of gold light spilling through as they open.
 */
export function IntroVeil() {
  const [done, setDone] = useState(false)
  if (done) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ pointerEvents: 'none' }}>
      {/* light spilling through as the gates part */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: [0, 0.55, 0], scale: [0.4, 1.6, 2.4] }}
        transition={{ duration: 1.3, delay: 0.8, times: [0, 0.35, 1], ease: 'easeOut' }}
        className="absolute inset-0 m-auto w-40 h-40 rounded-full bg-gold blur-3xl"
      />

      {/* the seal: two squares rotating together into an eight-point rosette */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.05, times: [0, 0.4, 0.62, 1], ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 text-gold">
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: '50px 50px' }}
          />
          <motion.rect
            x="24.5"
            y="24.5"
            width="51"
            height="51"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ opacity: 0, rotate: -30, scale: 0.4 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: '50px 50px' }}
          />
          <motion.rect
            x="24.5"
            y="24.5"
            width="51"
            height="51"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ opacity: 0, rotate: 15, scale: 0.4 }}
            animate={{ opacity: 1, rotate: 45, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: '50px 50px' }}
          />
        </svg>
      </motion.div>

      {/* left gate */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{ duration: 1.1, delay: 0.85, ease: GATE_EASE }}
        className="absolute inset-y-0 left-0 w-1/2"
        style={{
          background: 'linear-gradient(115deg, hsl(var(--background)) 55%, hsl(var(--wash-gold)))',
        }}
      >
        <div className="absolute inset-y-0 right-0 w-px bg-gold/50" />
      </motion.div>

      {/* right gate */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.1, delay: 0.85, ease: GATE_EASE }}
        onAnimationComplete={() => setDone(true)}
        className="absolute inset-y-0 right-0 w-1/2"
        style={{
          background: 'linear-gradient(245deg, hsl(var(--background)) 55%, hsl(var(--wash-gold)))',
        }}
      >
        <div className="absolute inset-y-0 left-0 w-px bg-gold/50" />
      </motion.div>
    </div>
  )
}
