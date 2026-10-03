import { motion } from 'framer-motion'

/** Specks, scattered in the margins — slow, low-opacity, never over the text column. */
const MOTES = [
  { left: '5%', size: 5, hue: 'gold', duration: 9, delay: 0 },
  { left: '10%', size: 3, hue: 'sage', duration: 11, delay: 1.5 },
  { left: '3%', size: 4, hue: 'sage', duration: 13, delay: 3 },
  { left: '94%', size: 6, hue: 'gold', duration: 10, delay: 0.8 },
  { left: '89%', size: 3, hue: 'gold', duration: 12, delay: 2.2 },
  { left: '96%', size: 4, hue: 'sage', duration: 14, delay: 4 },
] as const

/** A handful of slow-drifting gold and sage flecks, confined to the side margins. */
export function AmbientMotes() {
  return (
    <div className="fixed inset-0 z-[1] overflow-hidden" style={{ pointerEvents: 'none' }}>
      {MOTES.map((m, i) => (
        <motion.span
          key={i}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.5, 0.5, 0] }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.15, 0.85, 1],
          }}
          className={`absolute rounded-full blur-[1px] ${m.hue === 'gold' ? 'bg-gold/50' : 'bg-sage-light/40'}`}
          style={{ left: m.left, width: m.size, height: m.size }}
        />
      ))}
    </div>
  )
}
