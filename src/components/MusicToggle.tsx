import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useMusic } from '../lib/MusicProvider'

/** Mute/unmute button for the background track the wax stamp started. */
export function MusicToggle() {
  const { available, playing, toggle } = useMusic()

  if (!available) return null

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onClick={toggle}
      aria-label={playing ? 'Mute sound' : 'Unmute sound'}
      aria-pressed={playing}
      title={playing ? 'Mute' : 'Unmute'}
      className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm shadow-soft hover:shadow-elegant flex items-center justify-center text-foreground/80 hover:text-foreground transition-[color,box-shadow]"
    >
      {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </motion.button>
  )
}
