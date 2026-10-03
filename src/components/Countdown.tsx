import { useEffect, useState } from 'react'
import { Reveal } from './Reveal'
import { getTimeLeft, type TimeLeft } from '../lib/countdown'
import { site } from '../lib/site'

/** Just the ticking numbers — days, hours, minutes, seconds, nothing else. */
export function Countdown() {
  const target = new Date(`${site.weddingDate}T00:00:00`)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const units = [
    { value: timeLeft.days, label: 'Day' },
    { value: timeLeft.hours, label: 'Hr' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Sec' },
  ]

  return (
    <section className="relative py-5 md:py-7 px-5 text-center">
      <Reveal>
        <h2 className="font-display text-[clamp(2.25rem,9vw,3.75rem)] text-foreground mb-5">
          Counting Down
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="flex items-start justify-center gap-1.5 sm:gap-3">
          {units.map((unit, i) => (
            <span key={unit.label} className="flex items-start gap-1.5 sm:gap-3">
              <div className="flex flex-col items-center">
                <span className="font-display text-5xl sm:text-7xl text-foreground leading-none tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="mt-1.5 text-[0.6rem] sm:text-xs tracking-[0.2em] uppercase text-foreground/50 font-body">
                  {unit.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="font-display text-3xl sm:text-5xl text-gold/60 leading-none mt-1 sm:mt-2">
                  :
                </span>
              )}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
