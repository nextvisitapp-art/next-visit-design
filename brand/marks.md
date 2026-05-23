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
NEXTVISIT      ← 9 FlapChar tiles
· 3 · jan ·    ← DM Mono date line, --nv-pink-500
```

| Spec | Value |
|---|---|
| Tiles | 9 — spelling `NEXTVISIT` |
| Tile gap | `w * 0.077` (≈ 4 px at default size) |
| Wordmark-to-date gap | `w * 0.36` |
| Date line font | `--nv-font-mono` (DM Mono), weight 500 |
| Date line tracking | `.42em`, uppercase |
| Date line color | `--nv-pink-500` |
| Date content | `· 3 · jan ·` — the locked placeholder |
| Default size | `w=52, h=70, dateSize=13` |

`<LogoA/>` accepts `w`, `h`, `dateSize`, and `date` props.

The date `· 3 · jan ·` is **part of the locked mark**. On the brand page,
leave it as-is. In product UI where a real date is meaningful (e.g. a
splash screen showing the user's actual next trip), pass `date="· 12 · jul ·"`
— but only when the real next-visit date is what's on screen. If you don't
know the date, use the default.

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

// Default wordmark (header, footer)
<LogoA />

// Larger wordmark for hero / splash
<LogoA w={64} h={86} dateSize={15} />

// Wordmark with a real next-visit date
<LogoA date="· 12 · jul ·" />

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
