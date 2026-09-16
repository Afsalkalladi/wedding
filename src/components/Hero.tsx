import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ArchFrame, CONTENT_TOP, CONTENT_WIDTH } from './ArchFrame'
import { Bismillah } from './Bismillah'
import { assets, site } from '../lib/site'
import { gregorianLabel, hijriLabel } from '../lib/hijri'

export function Hero() {
  const scrollOn = () => {
    document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-background">
      {/* Pattern and arch share one mask so the whole backdrop dissolves into
          the section below instead of ending on a hard line. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0"
        style={{
          maskImage: 'linear-gradient(to bottom, #000 58%, transparent 94%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 58%, transparent 94%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `url(${assets.tile})`, backgroundSize: '110px 110px' }}
        />
        <ArchFrame />
      </motion.div>

      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-start text-center pb-10 mx-auto"
        style={{ width: CONTENT_WIDTH, paddingTop: CONTENT_TOP }}
      >
        {/* a soft wash so the invitation text stays clear of the pattern */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[85%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, hsl(var(--background)) 40%, hsl(var(--background) / 0) 78%)',
          }}
        />

        {/* my-auto centres the block in the space left under the arch head,
            without ever pushing it up into the curve on a short screen */}
        <div className="relative w-full my-auto">
          <Bismillah delay={0.2} />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 md:mt-10 text-[0.6rem] sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase text-foreground/55 font-body"
          >
            We are getting married
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="mt-5 md:mt-6"
          >
            <h1 className="font-display text-[clamp(1.9rem,8.5vw,4rem)] text-foreground leading-[1.08] break-words">
              {site.bride.name}
            </h1>
            <p className="mt-2 font-body text-[0.6rem] sm:text-sm tracking-[0.1em] sm:tracking-[0.18em] uppercase text-foreground/50 leading-relaxed">
              D/o {site.bride.parents}
            </p>

            <p className="font-display text-2xl sm:text-3xl text-foreground/60 italic my-4 sm:my-5">
              &amp;
            </p>

            <h1 className="font-display text-[clamp(1.9rem,8.5vw,4rem)] text-foreground leading-[1.08] break-words">
              {site.groom.name}
            </h1>
            <p className="mt-2 font-body text-[0.6rem] sm:text-sm tracking-[0.1em] sm:tracking-[0.18em] uppercase text-foreground/50 leading-relaxed">
              S/o {site.groom.parents}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-8 md:mt-10"
          >
            <p className="font-body text-sm sm:text-base md:text-lg tracking-[0.18em] text-foreground/70">
              {gregorianLabel(site.weddingDate)}
            </p>
            <p className="mt-2 font-body text-[0.65rem] sm:text-xs tracking-[0.18em] uppercase text-foreground/45">
              {hijriLabel(site.weddingDate)}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={scrollOn}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="relative z-10 flex flex-col items-center gap-1 text-center text-foreground/50 hover:text-foreground transition-colors cursor-pointer pb-8"
        aria-label="Scroll down"
      >
        <span className="text-[0.6rem] tracking-[0.3em] uppercase font-body">Keep scrolling</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  )
}
