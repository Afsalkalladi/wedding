import { Reveal } from './Reveal'
import { assets, site } from '../lib/site'

export function Couple() {
  return (
    <section id="couple" className="relative py-16 md:py-24 px-5 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <img
            // The portrait is optional: without it, the drawn SVG stands in.
            src={assets.couple ?? assets.coupleFallback}
            alt={`Illustration of ${site.bride.name} and ${site.groom.name}`}
            // The page colour is baked into the image's background (see
            // scripts/prepare-couple.mjs), so it needs no blend mode.
            className="w-[min(420px,86vw)] h-auto mx-auto select-none"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-foreground/50">
            With the blessings of Allah and our families
          </p>
          <div className="mt-4 font-display text-[clamp(1.75rem,8vw,3rem)] text-foreground leading-tight">
            <p>{site.bride.name}</p>
            <p className="text-[0.6em] text-foreground/50 italic my-1">&amp;</p>
            <p>{site.groom.name}</p>
          </div>
          <p className="mt-4 font-body text-sm sm:text-base text-foreground/60 italic max-w-md mx-auto leading-relaxed">
            We request the pleasure of your company as we begin our life together.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
