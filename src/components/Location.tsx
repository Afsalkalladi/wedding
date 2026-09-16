import { MapPin } from 'lucide-react'
import { Reveal } from './Reveal'
import { assets, site } from '../lib/site'
import { gregorianLabel, hijriLabel } from '../lib/hijri'

export function Location() {
  return (
    <section id="location" className="relative py-16 md:py-24 px-5 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(2.25rem,10vw,4.5rem)] text-foreground mb-2">
            Location
          </h2>
          <p className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-foreground/50">
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
          <div className="bg-foreground/[0.03] border border-foreground/10 rounded-2xl px-5 py-8 sm:px-8 sm:py-10">
            <h3 className="font-display text-[clamp(1.75rem,7vw,2.75rem)] text-foreground leading-tight">
              {site.venue.name}
            </h3>

            <img
              src={assets.dividerOrnament}
              alt=""
              className="w-24 h-auto mx-auto my-5 opacity-60 select-none"
            />

            <p className="font-body text-sm sm:text-base text-foreground/70">
              {gregorianLabel(site.weddingDate)}
            </p>
            <p className="mt-1 font-body text-[0.65rem] sm:text-xs tracking-[0.18em] uppercase text-foreground/45">
              {hijriLabel(site.weddingDate)}
            </p>

            <a
              href={site.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 border border-foreground/20 rounded-lg px-4 py-3 font-body text-xs sm:text-sm tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground hover:border-foreground/50 transition-colors"
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
