import { useEffect, useState } from 'react'
import { Reveal } from './Reveal'
import { assets, site } from '../lib/site'
import { gregorianLabel } from '../lib/hijri'

type TimeLeft = { days: number; hours: number; minutes: number }

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  }
}

/** A small eight-point star, used between the units. */
function StarDivider() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3 h-3 shrink-0 text-foreground/25">
      <path
        d="M6 6h12v12H6z M12 2l10 10-10 10L2 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function Countdown() {
  const target = new Date(`${site.weddingDate}T00:00:00`)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(new Date(`${site.weddingDate}T00:00:00`))), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
  ]

  return (
    <section id="countdown" className="relative py-16 md:py-24 px-5 overflow-hidden">
      {/* The pattern is masked into a soft pool instead of being framed by
          cut-out panels, so it melts into the page rather than sitting on it. */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${assets.tile})`,
          backgroundSize: '96px 96px',
          maskImage: 'radial-gradient(ellipse 65% 60% at 50% 50%, #000 15%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 60% at 50% 50%, #000 15%, transparent 72%)',
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <Reveal>
          <img
            src={assets.lantern}
            alt=""
            className="w-14 sm:w-16 h-auto mx-auto mb-6 opacity-70 pointer-events-none select-none"
          />
          <h2 className="font-display text-[clamp(2.25rem,10vw,4.5rem)] text-foreground mb-2">
            Countdown
          </h2>
          <p className="font-body text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase text-foreground/50">
            Until {gregorianLabel(site.weddingDate, { weekday: undefined })}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="inline-flex items-center justify-center gap-1 sm:gap-3 rounded-2xl border border-foreground/10 bg-background/70 backdrop-blur-[2px] px-4 sm:px-8 py-6 sm:py-8">
            {units.map((unit, index) => (
              <div key={unit.label} className="flex items-center gap-1 sm:gap-3">
                <div className="flex flex-col items-center px-2 sm:px-4">
                  <span className="font-display text-[clamp(2rem,10vw,4rem)] text-foreground leading-none">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="mt-2 text-[0.6rem] sm:text-xs tracking-[0.2em] uppercase text-foreground/50 font-body">
                    {unit.label}
                  </span>
                </div>
                {index < units.length - 1 && <StarDivider />}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
