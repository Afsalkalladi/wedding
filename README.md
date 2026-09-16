# Fathima Shahadiya & Mohammed Ajmal — Wedding

An Islamic wedding invitation site: Vite + React + TypeScript + Tailwind, in English,
opening on the Bismillah and closing on In sha' Allah.

All ornament — the mosque arch, the geometric ground, the couple and venue illustrations,
the lantern, arabesque and rosette — is hand-drawn SVG in `public/assets/islamic/`, so
every piece is editable text and stays sharp at any size.

### The couple's picture

The artwork lives outside the site at `art/couple-source.png`. Prepare it with:

```bash
npm run couple   # → src/assets/couple.webp
npm run og       # refresh the WhatsApp preview from it
```

The source is drawn on textured cream paper. `prepare-couple` divides that paper tone out,
lifts the paper grain away, paints a thin edge band clean (the source has a faint 1px
frame), and then tints the picture with the page colour — so its background *is* the page
background and there's no visible box. The colour is baked into the file rather than
applied with a CSS blend mode, because browsers skip the blend while the fade-in animation
runs, which flashed a white box on load. If you ever change `--background` in
`src/index.css`, update `PAGE` in the script and re-run it.
Colours in the artwork are kept. The result is ~95 KB instead of the 1.6 MB source.

To replace the artwork later, overwrite `art/couple-source.png` and run both commands.
Anything around **1260 px wide** is right (it displays at up to 420 px); keep lettering off
the image, since the section prints the names itself. If `couple.webp` is missing, the drawn
SVG is shown instead.

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

The form posts `{ name, message, submittedAt }` to the URL in `VITE_MESSAGE_ENDPOINT`.
With no URL set, messages are only logged to the browser console.

### Option A — Google Sheet (free, recommended)

1. Create a Google Sheet (e.g. "Wedding messages").
2. **Extensions → Apps Script**, delete the sample code, paste in
   `google-apps-script/Code.gs`, and save.
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   Authorise when asked, then copy the **Web app URL** (ends in `/exec`).
4. In this folder:
   ```bash
   cp .env.example .env.local
   ```
   and set `VITE_MESSAGE_ENDPOINT=` to that URL.
5. Restart `npm run dev` (and rebuild before deploying — the URL is baked in at
   build time). Messages arrive as rows in a **Messages** tab.

If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → New version**;
the URL stays the same.

### Option B — Formspree

Create a form at formspree.io and set `VITE_MESSAGE_ENDPOINT` to its
`https://formspree.io/f/…` URL. Messages arrive by email. No code change.

Either way the URL is public (it's in the page's JavaScript) — that's expected for both
services. The hidden `website` honeypot drops most bot submissions; the Apps Script also
caps name/message length.

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

## Link preview (WhatsApp and others)

When the link is shared, apps show `public/og-image.jpg` (the couple illustration on the
page's ivory pattern, 1200×630, ~36 KB), then:

- **Title:** We are getting married — Fathima Shahadiya & Mohammed Ajmal P
- **Description:** We request the pleasure of your company as we begin our life together.

Both live in `index.html` (`og:` and `twitter:` tags).

Preview apps only follow absolute image URLs, so set the published address before
building:

```bash
VITE_SITE_URL=https://your-site.example npm run build
```

(or put `VITE_SITE_URL=` in `.env.local`). The build warns if it's missing.

- **After changing the couple picture**, regenerate the preview image: `npm run og`
  (it uses `public/assets/couple.png` when present, the drawn SVG otherwise).
- **Previews only work once the site is online** — WhatsApp can't reach `localhost`.
- **WhatsApp caches previews** per link. If you shared the link before the image was
  right, add something to the URL (e.g. `?v=2`) to get a fresh preview.

## Sound

Save an audio file as `src/assets/music.mp3` (or `music.m4a` / `music.ogg`) and a **Play
sound** button appears in the bottom-right corner; without the file, nothing is shown.
Files in `src/assets/` get a content-hashed name when built, so a replaced file is never
served stale from a guest's cache. Browsers never allow sound to
start by itself, so guests tap to play. The track loops, fades in and out over ~2 s, and
pauses when the tab is in the background.

Keep the file small (a 2–3 minute loop at 128 kbps is ~2–3 MB). Only use audio you have
the rights to — your own recording, or a track whose licence allows use on a website. For
an Islamic wedding, many families prefer a vocal-only nasheed or a Quran recitation over
instrumental music; that's your call.
