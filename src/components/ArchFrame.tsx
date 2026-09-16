import { assets } from '../lib/site'

/** Width of the arch, and of the column of text that has to sit inside it. */
export const FRAME_WIDTH = 'min(640px, 97vw)'
export const CONTENT_WIDTH = `calc(${FRAME_WIDTH} * 0.82)`
/** Where the arch stops curving inward — text above this line would cross it. */
export const CONTENT_TOP = `calc(${FRAME_WIDTH} * 0.36)`

/**
 * The pointed mosque arch behind the invitation.
 *
 * The head is an SVG with a fixed aspect ratio; the legs are CSS rules that
 * fill whatever height is left, so the frame fits any screen without the
 * ornament being stretched or spilling past the viewport. Leg offsets and
 * widths are percentages of the frame width, matching the coordinates in
 * arch-head.svg (a 600-unit-wide viewBox).
 */
export function ArchFrame() {
  // Each leg continues a stroke from arch-head.svg, so its offset is the
  // stroke's LEFT EDGE — centre minus half the stroke width — as a percentage
  // of the 600-unit viewBox. Using the centre instead leaves a visible jog
  // where the SVG meets the CSS.
  const legs = [
    { inset: '6.417%', width: '0.5%', opacity: 0.45 }, // centre x=40, stroke 3
    { inset: '10.875%', width: '0.25%', opacity: 0.28 }, // centre x=66, stroke 1.5
  ]

  return (
    <div className="absolute inset-0 flex justify-center pointer-events-none select-none">
      <div className="flex flex-col h-full" style={{ width: FRAME_WIDTH }}>
        <img src={assets.archHead} alt="" className="w-full h-auto shrink-0" />

        <div className="relative flex-1 w-full">
          {legs.map((leg) =>
            (['left', 'right'] as const).map((side) => (
              <span
                key={`${side}-${leg.inset}`}
                className="absolute top-0 bottom-0"
                style={{
                  [side]: leg.inset,
                  width: leg.width,
                  background: `hsl(var(--foreground) / ${leg.opacity})`,
                }}
              />
            )),
          )}

          {(['left', 'right'] as const).map((side) => (
            <span
              key={`dash-${side}`}
              className="absolute top-0 bottom-0"
              style={{
                [side]: '15.25%', // centre x=92, stroke 1
                width: '0.167%',
                backgroundImage:
                  'repeating-linear-gradient(to bottom, hsl(var(--foreground) / 0.2) 0 3px, transparent 3px 10px)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
