# Brand marks · spec

> Locked v1.0 · 23 May 2026. Two marks. Don't redraw, don't restyle.
> Import from `brand/marks.jsx`.

---

## The two marks

| Mark | Use for | File |
|---|---|---|
| **Logo A** (wordmark) | Header, footer, marketing, share cards, splash screens | `<LogoA/>` |
| **App icon** (full bleed) | Favicon, iOS/Android app icon, social avatars, anywhere a square is needed | `<AppIcon/>` |

---

## Construction — `FlapChar`

The atom. One split-flap tile with one glyph.

| prop | default | meaning |
|---|---|---|
| `char` | — | the single character to render |
| `w` | 50 | tile width (px) |
| `h` | 68 | tile height (px) |
| `color` | `--nv-tile-glyph` | glyph color (= cream-100) |
| `bg` | `--nv-tile-bg` | tile inner background (= #06122a) |
| `family` | `--nv-font-mark` | Space Grotesk |
| `weight` | 700 | font-weight |
| `borderless` | `false` | drop the rounded corners + border — for full-bleed icon use |
| `charScale` | 0.66 | glyph font-size as a fraction of `h` |
| `charOffsetX` | 0 | px translate on the glyph; used by `AppIcon` to pull N/V toward the seam |

Inside each tile (z-stack, bottom → top):
1. Solid `bg`
2. Centered glyph (`fontSize = h * charScale`, `letter-spacing: -0.01em`)
3. 1 px horizontal seam at 50 %, `rgba(0,0,0,0.6)`
4. Top-half white-light gradient (`rgba(255,255,255,.06) → 0`)
5. Bottom-half dark gradient (`rgba(0,0,0,.05) → rgba(0,0,0,.20)`)
6. (when not `borderless`) inner cream highlight ring + drop shadow

---

## Construction — `LogoA` (wordmark)

```
NEXTVISIT      ← 9 FlapChar tiles (default)
· 12 · jul ·   ← optional DM Mono date line, --nv-pink-500 — only when a
                 real next-visit date is on screen
```

| Spec | Value |
|---|---|
| Tiles | 9 — spelling `NEXTVISIT` |
| Tile gap | `w * 0.077` (≈ 4 px at default size) |
| Default size | `w=52, h=70` |
| Date line (opt-in) | font `--nv-font-mono` (DM Mono), weight 500, tracking `.42em`, uppercase, color `--nv-pink-500` |
| Wordmark-to-date gap (when date present) | `w * 0.36` |

`<LogoA/>` accepts `w`, `h`, `dateSize`, and `date` props. **`date` defaults
to `null`** — the wordmark renders as 9 tiles only.

Pass `date="· 12 · jul ·"` on splash screens, share cards, marketing
surfaces, or anywhere a real next-visit date is the moment. Don't pass
a placeholder date just to "look complete" — if no date is meaningful,
leave it off.

---

## Construction — `AppIcon` (square icon, full bleed)

Two `FlapChar` tiles, edge-to-edge, no gap, no inner rounding. The outer
shell is the only thing rounded.

| Spec | Value |
|---|---|
| Outer | `size × size`, `border-radius = size * 0.2237` (iOS squircle) |
| Outer background | `--nv-navy-800` |
| Outer shadow | `0 (4% size) (12% size) rgba(0,0,0,.25), inset 0 0 0 1px rgba(251,232,222,.05)` |
| Left tile | `char='N'`, `w=size/2`, `h=size`, `color=--nv-tile-glyph`, `borderless`, `charScale=0.62`, `charOffsetX=+size*0.07` |
| Right tile | `char='V'`, `w=size/2`, `h=size`, `color=--nv-pink-500`, `borderless`, `charScale=0.62`, `charOffsetX=-size*0.07` |
| Seam | The 50 %-line on each tile aligns to make one continuous horizontal seam across the whole icon |

The 7 % inward nudge on each glyph is what makes the pair read tight.
Don't remove it.

---

## Sizing & clearspace

| | Minimum | Clearspace |
|---|---|---|
| Wordmark (screen) | 120 px wide | 1 tile width on every side |
| Wordmark (print) | 18 mm wide | 1 tile width on every side |
| Icon | 28 px square | ¼ icon size on every side (print only) |

Below the wordmark minimum, **use the icon instead**. Don't try to make
the wordmark smaller and hope it still reads.

---

## Color usage (mark-only)

| Used as | Token | Hex |
|---|---|---|
| Icon shell | `--nv-navy-800` | `#0e2240` |
| Tile inner | `--nv-tile-bg` | `#06122a` |
| Wordmark glyphs / N glyph in icon | `--nv-tile-glyph` (= cream-100) | `#fbe8de` |
| V glyph / date line | `--nv-pink-500` | `#ec4079` |

`--nv-tile-bg` is the only token that exists **solely** for the marks.
Don't reach for it anywhere else in the product.

---

## Mark-only typography

The brand mark uses **Space Grotesk 700** as `--nv-font-mark`. This
font is reserved for the marks. Do not use it for UI, body, headings,
or anything that is not literally a flap-tile glyph.

Make sure it is loaded on any page that renders `<LogoA/>` or `<AppIcon/>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
```

---

## The four don'ts

1. **Don't change the V's color.** Pink only. Not navy, not cream, not the success green, not "what if it picked up the accent color of the current page."
2. **Don't pad the icon.** It's full-bleed. If you find yourself wanting to add an inner margin, you want the wordmark, not the icon.
3. **Don't flip the pair.** N is always left, V is always right.
4. **Don't put the date line in the icon.** The date is wordmark-only. The icon stays N-V.

---

## API quick reference

```jsx
import { LogoA, AppIcon, FlapChar } from '~/brand/marks';

// Default wordmark — 9 tiles only (header, footer, most surfaces)
<LogoA />

// Larger wordmark for hero / splash
<LogoA w={64} h={86} />

// Wordmark with a real next-visit date underneath
// (splash, share cards — only when a real date is on screen)
<LogoA date="· 12 · jul ·" dateSize={15} />

// App icon at favicon size
<AppIcon size={32} shadow={false} />

// App icon at iOS @3x master size
<AppIcon size={1024} />
```

---

## When in doubt

Ask before drawing anything new on top of the mark. The system is small
on purpose — the answer to "should I make a variant for X?" is almost
always **no, use the icon**.
