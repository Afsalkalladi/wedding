import { useState } from 'react'
import { motion } from 'framer-motion'
import { WaxStamp } from './WaxStamp'
import { useMusic } from '../lib/MusicProvider'
import { gregorianLabel } from '../lib/hijri'
import { assets, site } from '../lib/site'

const GATE_EASE = [0.76, 0, 0.24, 1] as const
const GATE_DURATION = 1.1

/**
 * The invitation's locked front cover: the couple's portrait, their names
 * and date, and the wax stamp that's the page's one way in. Tapping it
 * starts the music (the stamp click is the user gesture browsers require),
 * breaks the seal, and slides the cover open like a pair of gates.
 */
export function CoverScreen({ onOpened }: { onOpened: () => void }) {
  const [opening, setOpening] = useState(false)
  const { play } = useMusic()

  const handleOpen = () => {
    if (opening) return
    play() // must fire synchronously inside the click for autoplay to be allowed
    setOpening(true)
    window.setTimeout(onOpened, GATE_DURATION * 1000 + 150)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-hidden={opening}>
      {/* left gate */}
      <motion.div
        animate={{ x: opening ? '-100%' : '0%' }}
        transition={{ duration: GATE_DURATION, ease: GATE_EASE }}
        className="absolute inset-y-0 left-0 w-1/2"
        style={{
          background: 'linear-gradient(115deg, hsl(var(--background)) 55%, hsl(var(--wash-gold)))',
        }}
      />

      {/* right gate */}
      <motion.div
        animate={{ x: opening ? '100%' : '0%' }}
        transition={{ duration: GATE_DURATION, ease: GATE_EASE }}
        className="absolute inset-y-0 right-0 w-1/2"
        style={{
          background: 'linear-gradient(245deg, hsl(var(--background)) 55%, hsl(var(--wash-gold)))',
        }}
      />

      {/* light spilling through as the gates part */}
      <motion.div
        animate={{ opacity: opening ? [0, 0.5, 0] : 0, scale: opening ? [0.5, 1.8, 2.4] : 0.5 }}
        transition={{ duration: GATE_DURATION, ease: 'easeOut' }}
        className="absolute inset-0 m-auto w-40 h-40 rounded-full bg-gold blur-3xl"
      />

      {/* cover content — fades independently so it never visually splits */}
      <motion.div
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.45 }}
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        <div className="flex max-h-[100svh] w-full max-w-sm flex-col items-center gap-5 overflow-y-auto py-8 text-center">
          {/* bg-background pins this patch to the exact tone baked into the
              portrait's own pixels — the gates behind it are a gradient, not
              flat, so without this the image's edge would show a seam. */}
          <div className="bg-background rounded-sm">
            <img
              src={assets.couple ?? assets.coupleFallback}
              alt={`Illustration of ${site.bride.name} and ${site.groom.name}`}
              className="block h-auto w-[76vw] max-w-[340px] select-none pointer-events-none"
            />
          </div>

          <div>
            <p className="font-display text-[clamp(1.75rem,7.5vw,2.5rem)] leading-tight text-foreground">
              {site.bride.name}
            </p>
            <p className="font-display text-xl text-gold italic leading-none my-1">&amp;</p>
            <p className="font-display text-[clamp(1.75rem,7.5vw,2.5rem)] leading-tight text-foreground">
              {site.groom.name}
            </p>
          </div>

          <p className="font-body text-sm sm:text-base tracking-[0.25em] uppercase text-gold-soft">
            {gregorianLabel(site.weddingDate, { weekday: undefined })}
          </p>

          <div className="mt-1">
            <WaxStamp onOpen={handleOpen} opening={opening} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
