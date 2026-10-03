import { motion } from 'framer-motion'
import waxStampImg from '../assets/wax-stamp.webp'

/** A red wax-seal button — the invitation's one opening interaction. */
export function WaxStamp({ onOpen, opening }: { onOpen: () => void; opening: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        {/* shockwave as the seal cracks open */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: 'hsl(3 60% 45%)' }}
          initial={{ opacity: 0 }}
          animate={opening ? { opacity: [0.55, 0], scale: [1, 2.8] } : { opacity: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        />

        <motion.button
          type="button"
          onClick={onOpen}
          disabled={opening}
          whileTap={{ scale: 0.92 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            opening
              ? { scale: [1, 1.18, 0.4], opacity: [1, 1, 0], rotate: [0, 0, 22] }
              : { opacity: 1, scale: 1, rotate: 0 }
          }
          transition={
            opening
              ? { duration: 0.6, times: [0, 0.3, 1], ease: 'easeIn' }
              : { duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }
          }
          aria-label="Open the invitation"
          className="relative w-full h-full flex items-center justify-center disabled:pointer-events-none"
          style={{ filter: 'drop-shadow(0 10px 16px hsl(3 55% 20% / 0.45))' }}
        >
          <img
            src={waxStampImg}
            alt=""
            className="w-full h-full select-none pointer-events-none"
            draggable={false}
          />

          {/* a slow pulse ring inviting a tap, stilled once opening starts */}
          {!opening && (
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 0 0 hsl(3 62% 38% / 0.45)',
                  '0 0 0 16px hsl(3 62% 38% / 0)',
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </motion.button>
      </div>

      <motion.span
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        className="text-[0.65rem] sm:text-xs tracking-[0.3em] uppercase text-foreground/50 font-body"
      >
        Tap to open
      </motion.span>
    </div>
  )
}
