import { motion } from 'framer-motion'
import { assets, site } from '../lib/site'
import { gregorianLabel, hijriLabel } from '../lib/hijri'

export function Footer() {
  return (
    <footer className="py-14 md:py-20 text-center px-5">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <img
          src={assets.monogram}
          alt=""
          className="w-20 md:w-24 h-auto mx-auto mb-8 opacity-80 pointer-events-none select-none"
        />
        <div className="font-display text-[clamp(1.5rem,7vw,2.75rem)] text-foreground mb-4 leading-tight">
          <p>{site.bride.name}</p>
          <p className="text-[0.6em] text-foreground/50 italic my-1">&amp;</p>
          <p>{site.groom.name}</p>
        </div>
        <p className="font-body text-sm sm:text-base text-foreground/50 tracking-wide">
          {gregorianLabel(site.weddingDate)}
        </p>
        <p className="mt-1 font-body text-[0.65rem] sm:text-xs tracking-[0.18em] uppercase text-foreground/40">
          {hijriLabel(site.weddingDate)}
        </p>
      </motion.div>
    </footer>
  )
}
