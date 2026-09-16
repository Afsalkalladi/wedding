import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { Reveal } from './Reveal'
import { assets } from '../lib/site'
import { submitMessage } from '../lib/message'

export function MessageForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (honeypot) return // bot trap — silently ignore

    setStatus('sending')
    try {
      await submitMessage({ name, message, submittedAt: new Date().toISOString() })
      setStatus('sent')
    } catch (error) {
      console.error('Message submission failed', error)
      setStatus('error')
    }
  }

  return (
    <section id="message" className="relative py-16 md:py-24 px-5 overflow-hidden">
      <div className="relative max-w-xl mx-auto">
        <img
          src={assets.arabesque}
          alt=""
          className="absolute -left-6 md:-left-20 -top-6 w-20 md:w-32 h-auto opacity-50 pointer-events-none select-none"
        />
        <img
          src={assets.arabesque}
          alt=""
          style={{ transform: 'scaleX(-1)' }}
          className="absolute -right-6 md:-right-20 -top-6 w-20 md:w-32 h-auto opacity-50 pointer-events-none select-none"
        />

        {status === 'sent' ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative text-center bg-foreground/[0.03] border border-foreground/10 rounded-2xl px-5 py-12 sm:px-8"
          >
            <h2 className="font-display text-[clamp(2rem,9vw,3.5rem)] text-foreground mb-4">
              With Gratitude
            </h2>
            <p className="font-body text-base text-foreground/70 italic">
              Thank you for your kind words — they mean a great deal to us.
            </p>
          </motion.div>
        ) : (
          <Reveal className="relative">
            <div className="text-center mb-10">
              <h2 className="font-display text-[clamp(2.25rem,10vw,4.5rem)] text-foreground mb-2">
                A Message for the Couple
              </h2>
              <p className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-foreground/50">
                We should be delighted to hear from you
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="sender-name"
                  className="font-body text-sm text-foreground tracking-wide"
                >
                  Your name
                </label>
                <input
                  id="sender-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="mt-2 flex h-11 w-full rounded-md border px-3 py-2 text-base bg-transparent border-foreground/20 text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus-visible:outline-none font-body"
                />
              </div>

              <div>
                <label htmlFor="note" className="font-body text-sm text-foreground tracking-wide">
                  Your message
                </label>
                <textarea
                  id="note"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your prayers and good wishes for us."
                  className="mt-2 flex w-full rounded-md border px-3 py-2 text-base bg-transparent border-foreground/20 text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus-visible:outline-none min-h-[120px] font-body"
                />
              </div>

              {status === 'error' && (
                <p className="font-body text-sm text-destructive text-center">
                  We were unable to send your message. Kindly try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 w-full bg-foreground hover:bg-foreground/90 text-background font-body tracking-[0.15em] uppercase text-xs sm:text-sm py-5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                <Send className="w-4 h-4" />
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  )
}
