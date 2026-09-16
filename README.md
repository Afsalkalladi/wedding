# Fathima Shahadiya & Mohammed Ajmal — Wedding

An Islamic wedding invitation site: Vite + React + TypeScript + Tailwind, in English,
opening on the Bismillah and closing on In sha' Allah.

All ornament — the mosque arch, the geometric ground, the couple and venue illustrations,
the lantern, arabesque and rosette — is hand-drawn SVG in `public/assets/islamic/`, so
every piece is editable text and stays sharp at any size.

### The couple's picture

`Couple.tsx` shows `public/assets/couple.png` if that file exists, and falls back to the
drawn SVG if it doesn't — so dropping a new illustration in at that path is the whole
edit, no code change.

**Size for the replacement:** the picture is displayed at a maximum of **420 px wide**, so
export at **1260 px wide** (3x, for retina screens); anything above ~1600 px is wasted
weight. Height is free — the layout uses whatever aspect ratio the file has; the current
drawing is 520x560 (roughly square), and a portrait 2:3 crop works equally well. Save it
as PNG with either a transparent background or the page's ivory (#F7F3EA), and with **no
lettering on it** — the section prints the names and the invitation line itself, just
below the picture.

`couple-illustration.svg` is the fallback, drawn from the engagement photo —
her pale blue kurta and dupatta, his white shirt with rolled sleeves and stone trousers,
the pink bouquet, and the spectacles they both wear — but as line forms without facial
features, so the card stays modest and no likeness is published. The three soft colour
washes are the only colour on the page; delete the `colour washes` group in that file to
return it to pure line work. To use the real photograph instead, point `assets.couple` in
`src/lib/site.ts` at an image file.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview
```

## Page order

Hero (Bismillah, names, date) → countdown → the couple → location → a message for the
couple → In sha' Allah → footer.

## Structure

```
index.html              Vite entry
src/
  App.tsx               section order
  components/           one file per section
  lib/site.ts           names, date, venue — the only file most edits need
  lib/hijri.ts          Hijri/Gregorian date formatting
  lib/message.ts        message submission
public/assets/islamic/  the SVG ornament
public/fonts/typekit.css  Adobe Typekit kit (parfumerie-script, mrs-eaves)
```

## Editing content

- Names, parents, the wedding date, the venue and its map link → `src/lib/site.ts`
- Everything else is plain English text inside the section components.

## Dates

`weddingDate` is the only date in the project: **2026-10-25**. Both the Gregorian and the
Hijri labels are derived from it at runtime by `src/lib/hijri.ts`, using the Umm al-Qura
calendar built into `Intl` — so changing that one line updates the hero, the location card
and the footer together.

25 October 2026 falls on **14 Jumada al-Ula 1448 AH** by Umm al-Qura, shown in English
transliteration only (the Arabic-script date line was removed; the Bismillah and In sha'
Allah remain in Arabic). That calendar is
calculated rather than sighted, so a locally announced date can differ by a day — worth
confirming before the cards go out. To pin a fixed wording instead, replace the
`hijriLabel` / `hijriLabelArabic` calls with plain strings.

## Location

**Mehafil Banquet Hall**, linked to the Google Maps pin you supplied. The illustration is
a generic domed pavilion, not a drawing of the actual building — replace
`public/assets/islamic/venue-illustration.svg` if you want it to resemble the real hall.

## Messages from guests

`src/lib/message.ts` POSTs `{ name, message, submittedAt }` as JSON to whatever URL is in
`VITE_MESSAGE_ENDPOINT`:

```bash
echo 'VITE_MESSAGE_ENDPOINT=https://your-endpoint.example/messages' > .env.local
```

With no endpoint set, messages are logged to the console and the thank-you screen still
shows, so the form can be worked on without a backend. A hidden honeypot field (`website`)
silently drops bot submissions.

## Typography

Latin text uses the Typekit faces (parfumerie-script for display, mrs-eaves for body);
Arabic falls through to Amiri, loaded from Google Fonts in `index.html`. The font stacks in
`tailwind.config.ts` handle this glyph by glyph, so no per-language class is needed.

Adobe Typekit kits are licensed per account and domain. Before going live, replace
`public/fonts/typekit.css` with your own kit for *parfumerie-script* and *mrs-eaves*, or
change the `display` / `body` stacks in `tailwind.config.ts` to fonts you have rights to.
The fallbacks (Snell Roundhand / Baskerville) keep the layout sane if the kit fails.

## Responsiveness

Headings and names use `clamp()` sizes, the couple's names stack rather than run edge to
edge, and every decorative image sits inside an `overflow-hidden` section.

The hero arch is split in two so it fits any screen: `arch-head.svg` holds the finial and
the ogee curve at a fixed aspect ratio, and `ArchFrame.tsx` draws the legs in CSS, filling
whatever height is left. The pattern and arch share one `linear-gradient` mask that
dissolves the backdrop into the section below instead of ending on a hard line.

Two constants in `ArchFrame.tsx` keep the words inside the arch at every width:
`FRAME_WIDTH` (`min(640px, 97vw)`) sizes the arch, and `CONTENT_WIDTH` (82% of it) sizes
the column of text, which is narrower than the gap between the legs. Widen the arch and
the text follows; the longest line — *S/o Kadeejathul Qubra & Muhammed Kutty* — wraps
rather than crossing a leg.

Checked at 320, 360, 375, 390 and 1000 px wide: the document never scrolls horizontally,
and every line of the hero measures inside the arch legs.

## Background music

Optional. Drop an MP3 at `public/assets/wedding-background-music.mp3` and the mute toggle
appears by itself; without the file it renders nothing.
