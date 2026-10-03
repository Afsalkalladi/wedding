import { Reveal } from './Reveal'

/** The closing word of the invitation. */
export function Inshaallah() {
  return (
    <section className="relative px-5 pt-4 pb-1 text-center">
      <Reveal>
        <p
          dir="rtl"
          lang="ar"
          className="font-arabic text-[clamp(1.7rem,7.5vw,2.75rem)] text-foreground/80 leading-[1.9]"
        >
          إِنْ شَاءَ ٱللَّٰه
        </p>
        <p className="mt-2 font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-gold-soft">
          In sha&rsquo; Allah
        </p>
      </Reveal>
    </section>
  )
}
