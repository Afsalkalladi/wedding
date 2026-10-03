import { motion } from 'framer-motion'

/** The opening invocation, set above everything else on the page. */
export function Bismillah({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay }}
      className="text-center"
    >
      <p
        dir="rtl"
        lang="ar"
        className="font-arabic text-[clamp(1.55rem,6.8vw,2.6rem)] text-foreground/85 leading-[1.9]"
      >
        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </p>
      {/* kept narrow: this line sits where the arch is still curving inward */}
      <p className="mt-2 mx-auto max-w-[85%] sm:max-w-[68%] font-body text-xs sm:text-sm tracking-[0.15em] uppercase text-foreground/45 leading-relaxed">
        In the name of Allah, the Most Gracious, the Most Merciful
      </p>
    </motion.div>
  )
}
