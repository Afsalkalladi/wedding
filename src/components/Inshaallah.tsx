import { Reveal } from './Reveal'

/** The closing word of the invitation. */
export function Inshaallah() {
  return (
    <section className="relative px-5 pt-6 pb-4 text-center">
      <Reveal>
        <p
          dir="rtl"
          lang="ar"
          className="font-arabic text-[clamp(1.5rem,7vw,2.5rem)] text-foreground/80 leading-[1.9]"
        >
          إِنْ شَاءَ ٱللَّٰه
        </p>
        <p className="mt-2 font-body text-[0.65rem] sm:text-xs tracking-[0.3em] uppercase text-foreground/45">
          In sha&rsquo; Allah
        </p>
      </Reveal>
    </section>
  )
}
