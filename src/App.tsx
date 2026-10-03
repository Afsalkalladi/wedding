import { useEffect, useState } from 'react'
import { AmbientMotes } from './components/AmbientMotes'
import { Countdown } from './components/Countdown'
import { CoverScreen } from './components/CoverScreen'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Inshaallah } from './components/Inshaallah'
import { Location } from './components/Location'
import { MessageForm } from './components/MessageForm'
import { MusicToggle } from './components/MusicToggle'
import { Divider } from './components/Reveal'
import { MusicProvider } from './lib/MusicProvider'

export default function App() {
  const [opened, setOpened] = useState(false)

  // The cover is a locked front page: no scrolling the invitation behind it
  // until the wax stamp has been tapped. `overflow: hidden` alone isn't
  // reliable against programmatic/touch scroll in every engine, so the body
  // is pinned with position: fixed instead — there's then nothing to scroll.
  useEffect(() => {
    if (opened) return
    const scrollY = window.scrollY
    const { body } = document
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    return () => {
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      window.scrollTo(0, scrollY)
    }
  }, [opened])

  return (
    <MusicProvider>
      {!opened && <CoverScreen onOpened={() => setOpened(true)} />}
      <AmbientMotes />
      <main className="text-foreground overflow-x-hidden">
        <Hero />
        <Divider />
        <Location />
        <Divider />
        <MessageForm />
        <Inshaallah />
        <Countdown />
        <Footer />
      </main>
      <MusicToggle />
    </MusicProvider>
  )
}
