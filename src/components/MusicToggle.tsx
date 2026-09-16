import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { assets } from '../lib/site'

/**
 * Background music, started on the visitor's first interaction because browsers
 * block autoplay with sound. Renders nothing if the audio file is absent.
 */
export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [available, setAvailable] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const audio = new Audio(assets.backgroundMusic)
    audio.loop = true
    audio.volume = 0.35
    audio.addEventListener('canplaythrough', () => setAvailable(true))
    audio.addEventListener('error', () => setAvailable(false))
    audioRef.current = audio

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (muted) {
      audio.muted = false
      void audio.play().catch(() => undefined)
      setMuted(false)
    } else {
      audio.muted = true
      audio.pause()
      setMuted(true)
    }
  }

  if (!available) return null

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      onClick={toggle}
      aria-label={muted ? 'Play music' : 'Mute music'}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-secondary/90 backdrop-blur-sm border border-muted/30 shadow-lg flex items-center justify-center text-primary hover:bg-secondary hover:scale-110 transition-all duration-300"
    >
      {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </motion.button>
  )
}
