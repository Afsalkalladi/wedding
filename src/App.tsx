import { Countdown } from './components/Countdown'
import { Couple } from './components/Couple'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Inshaallah } from './components/Inshaallah'
import { Location } from './components/Location'
import { MessageForm } from './components/MessageForm'
import { MusicToggle } from './components/MusicToggle'
import { Divider } from './components/Reveal'

export default function App() {
  return (
    <>
      <main className="bg-background text-foreground overflow-x-hidden">
        <Hero />
        <Countdown />
        <Divider />
        <Couple />
        <Divider />
        <Location />
        <Divider />
        <MessageForm />
        <Inshaallah />
        <Footer />
      </main>
      <MusicToggle />
    </>
  )
}
