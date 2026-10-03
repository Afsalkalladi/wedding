import { MapPin } from 'lucide-react'
import { Reveal } from './Reveal'
import { assets, site } from '../lib/site'
import { gregorianLabel, hijriLabel } from '../lib/hijri'

export function Location() {
  return (
    <section
      id="location"
      className="relative py-10 md:py-14 px-5 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, transparent 0%, hsl(var(--wash-sage) / 0.6) 45%, transparent 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(2.5rem,11vw,5rem)] text-foreground mb-2">
            Location
          </h2>
          <p className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-gold-soft">
            Where we will gather
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <img
            src={assets.venue}
            alt=""
            className="w-[min(420px,90vw)] h-auto mx-auto my-8 opacity-90 pointer-events-none select-none"
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="relative rounded-2xl px-5 py-8 sm:px-8 sm:py-10 shadow-soft"
            style={{
              background:
                'linear-gradient(160deg, hsl(var(--wash-sage) / 0.6), hsl(var(--background) / 0.7))',
            }}
          >
            <img
              src={assets.arabesque}
              alt=""
              className="absolute -left-4 -top-4 w-14 sm:w-20 h-auto opacity-35 pointer-events-none select-none"
            />
            <img
              src={assets.arabesque}
              alt=""
              style={{ transform: 'scaleX(-1)' }}
              className="absolute -right-4 -top-4 w-14 sm:w-20 h-auto opacity-35 pointer-events-none select-none"
            />
            <h3 className="font-display text-[clamp(2rem,8vw,3.1rem)] text-foreground leading-tight">
              {site.venue.name}
            </h3>

            <img
              src={assets.dividerOrnament}
              alt=""
              className="w-24 h-auto mx-auto my-5 opacity-60 select-none"
            />

            <p className="font-body text-base sm:text-lg text-foreground/70">
              {gregorianLabel(site.weddingDate)}
            </p>
            <p className="mt-1 font-body text-xs sm:text-sm tracking-[0.18em] uppercase text-foreground/45">
              {hijriLabel(site.weddingDate)}
            </p>

            <a
              href={site.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 rounded-lg px-4 py-3 font-body text-xs sm:text-sm tracking-[0.15em] uppercase text-background shadow-soft hover:shadow-elegant hover:brightness-105 transition-[filter,box-shadow]"
              style={{ background: 'linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-soft)))' }}
            >
              <MapPin className="w-4 h-4" />
              View on Map
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
