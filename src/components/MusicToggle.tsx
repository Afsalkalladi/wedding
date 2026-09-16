import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { assets } from '../lib/site'

const TARGET_VOLUME = 0.4
const FADE_MS = 1800

/**
 * Background audio. Browsers refuse to start sound without a tap, so the page
 * offers a button; the track then fades in, loops, and pauses while the tab is
 * hidden. Renders nothing if the audio file isn't there.
 */
export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<number>()
  const [available, setAvailable] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [showLabel, setShowLabel] = useState(true)

  useEffect(() => {
    const audio = new Audio(assets.backgroundMusic)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0
    const onReady = () => setAvailable(true)
    const onError = () => setAvailable(false)
    audio.addEventListener('canplaythrough', onReady)
    audio.addEventListener('error', onError)
    audioRef.current = audio

    // Don't keep playing in a background tab.
    const onVisibility = () => {
      if (document.hidden && !audio.paused) {
        audio.pause()
        setPlaying(false)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      audio.pause()
      audio.removeEventListener('canplaythrough', onReady)
      audio.removeEventListener('error', onError)
      document.removeEventListener('visibilitychange', onVisibility)
      window.clearInterval(fadeRef.current)
      audioRef.current = null
    }
  }, [])

  // Collapse the "Play" label to just the icon after a few seconds.
  useEffect(() => {
    if (!available) return
    const id = window.setTimeout(() => setShowLabel(false), 6000)
    return () => window.clearTimeout(id)
  }, [available])

  const fadeTo = (audio: HTMLAudioElement, target: number, then?: () => void) => {
    window.clearInterval(fadeRef.current)
    const steps = 30
    const delta = (target - audio.volume) / steps
    let i = 0
    fadeRef.current = window.setInterval(() => {
      i += 1
      audio.volume = Math.min(1, Math.max(0, audio.volume + delta))
      if (i >= steps) {
        window.clearInterval(fadeRef.current)
        audio.volume = target
        then?.()
      }
    }, FADE_MS / steps)
  }

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    setShowLabel(false)

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setPlaying(true)
          fadeTo(audio, TARGET_VOLUME)
        })
        .catch(() => setPlaying(false))
    } else {
      setPlaying(false)
      fadeTo(audio, 0, () => audio.pause())
    }
  }

  if (!available) return null

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      onClick={toggle}
      aria-label={playing ? 'Pause sound' : 'Play sound'}
      aria-pressed={playing}
      className="fixed bottom-5 right-5 z-40 h-12 min-w-12 px-3.5 rounded-full bg-background/90 backdrop-blur-sm border border-foreground/15 shadow-soft flex items-center justify-center gap-2 text-foreground/80 hover:text-foreground hover:border-foreground/30 transition-colors"
    >
      {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      <AnimatePresence initial={false}>
        {showLabel && !playing && (
          <motion.span
            key="label"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="overflow-hidden whitespace-nowrap font-body text-[0.65rem] tracking-[0.2em] uppercase"
          >
            Play sound
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
