import { motion } from 'framer-motion'
import { assets, site } from '../lib/site'
import { gregorianLabel, hijriLabel } from '../lib/hijri'

export function Footer() {
  return (
    <footer className="py-8 md:py-10 text-center px-5">
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
