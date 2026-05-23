# Next Visit — Design System Rules

> Drop this file at the root of your repo. Claude Code reads it on every
> chat in this project, so the design system becomes the default and you
> don't have to re-explain it.

You are working on **Next Visit**, a travel app. Every UI change you make
must follow the design system below. If something would break a rule,
flag it rather than ship it.

---

## 1 · Brand colors are tokens, not hex codes

The full token palette lives in `tokens/tokens.css`. **Never write a raw
hex code, rgb(), or hsl() in any UI file.** Always reference a token.

```css
/* ❌ Wrong */
color: #ec4079;
background: rgb(14, 34, 64);

/* ✅ Right */
color: var(--nv-pink-500);
background: var(--nv-bg-dark);
```

If you need a color the system doesn't have, **add it to `tokens.css`
first** with a clear name, then reference it. Don't smuggle one-offs into
component files.

### Quick token reference

- **Navy** (structural · type, nav, dark surfaces): `--nv-navy-50` →  `--nv-navy-950`. Brand navy is `--nv-navy-800`.
- **Cream** (warm light surfaces): `--nv-paper`, `--nv-cream-50` → `--nv-cream-300`. Brand cream is `--nv-cream-100`.
- **Pink** (the accent · use sparingly): `--nv-pink-50` → `--nv-pink-800`. Brand pink is `--nv-pink-500`.
- **Semantic**: `--nv-success`, `--nv-warning`, `--nv-error` plus matching `*-bg` for filled backgrounds.
- **Role aliases** (prefer these in components): `--nv-bg-page`, `--nv-bg-surface`, `--nv-text-primary`, `--nv-text-secondary`, `--nv-text-muted`, `--nv-border-subtle`, `--nv-accent`, etc.

---

## 2 · Pink discipline (the most important rule)

Pink is the brand voice. It only earns its place when it marks **the
single most important thing on the screen**. Default to navy or cream.

### Pink IS for
- The one primary CTA on a screen
- The "next visit" highlight — wherever it appears
- Focus rings and hover accents
- One hero data series in charts
- Brand moments (celebrations, milestones, countdowns reaching zero)

### Pink is NOT for
- Body text or large headings
- Backgrounds (except small accent fills)
- Error states — that's `--nv-error` (crimson), never pink
- Secondary buttons or muted UI
- Decorative borders or dividers

**Rule of thumb**: if you see two pink things on the same screen, one of
them is wrong unless they're both literally the same "next visit" concept.

---

## 3 · Typography

Three families, three roles. Don't mix them up.

- **Headings** → `var(--nv-font-serif)` (Fraunces). Use for h1-h3, hero numbers, emotional moments.
- **Body & UI** → `var(--nv-font-sans)` (Inter). Default for everything not in the other two buckets.
- **Labels, dates, data, code** → `var(--nv-font-mono)` (DM Mono). Use uppercase + wide tracking for eyebrows and small caps.

Type scale is `--nv-text-xs` through `--nv-text-5xl`. Don't invent
intermediate sizes.

---

## 4 · Brand marks (locked)

The Next Visit identity is a **locked** system. The wordmark logo and the
app icon are the canonical marks; don't redraw them, don't restyle them,
don't invent variants. Use the existing components.

### The two marks

- **Logo A (wordmark)** — `NEXTVISIT` in 9 cream split-flap tiles with a
  pink monospace date line `· 3 · jan ·` beneath. The primary mark.
  Use wherever a logo would normally appear (header, footer, share cards,
  marketing pages, splash screens).
- **App icon (full bleed)** — The square mark. Two edge-to-edge flap
  tiles: cream **N** on the left, pink **V** on the right. Each glyph is
  nudged toward the centre seam by 7&hairsp;% of the icon size so the
  pair reads tight. Use for favicons, iOS / Android icons, social avatars.

### Reference implementation

Live in `brand/` at the repo root:

- `brand/marks.jsx` — `FlapChar`, `LogoA`, `AppIcon`. Import from here;
  do **not** copy-paste the JSX into your own components.
- `brand/marks.md` — The construction spec (token mappings, exact
  proportions, don'ts). Read this before you touch anything in the folder.

### Mark-only rules

- The mark glyphs use `var(--nv-font-mark)` (Space Grotesk). This font
  is **mark-only** — never use it for body, UI labels, or headings.
- The tile inner background is `var(--nv-tile-bg)` (#06122a) — a
  one-off color that lives only inside the marks. Don't introduce it
  anywhere else.
- The pink V is one of the few places pink appears as a fill rather than
  an accent stroke. Pink discipline (rule 2) still applies to the rest
  of the screen — the mark itself doesn't "use up" your one pink moment.
- Minimum legible size: **icon 28&nbsp;px**, **wordmark 120&nbsp;px wide /
  18&nbsp;mm in print**. Below that, use the icon (not the wordmark).
- Clearspace: **one tile width** around the wordmark on every side;
  **¼ of icon size** around the icon in print contexts.

### The four don'ts

1. Don't change the V's color. Pink only.
2. Don't pad the icon. It's full-bleed.
3. Don't flip the pair. N is always left, V is always right.
4. Don't add the date line to the icon. The date is wordmark-only.

---

## 5 · Components

The atoms below carry ~80% of the UI. Use these — don't roll your own.

- **Button** — 4 variants: `btn-primary` (pink), `btn-secondary` (navy), `btn-tertiary` (outlined), `btn-ghost` (transparent). Plus `btn-danger` for destructive. One primary per screen.
- **Input** — Default + `.error` state. Always paired with a `<label>` and a hint or error message.
- **Badge** — Variants: `badge-pink` (reserved for "next visit"), `badge-navy` (everything else neutral), `badge-success`, `badge-warn`, `badge-error`.
- **Toast** — Three flavors: success (green dot), error (crimson), brand (pink ✦). Always 380px max width.
- **Card** — White surface on cream page. Use `--nv-shadow-md`. Don't add borders unless the card is on a same-colored surface.

If a component you need doesn't exist yet, **spec it first** (props, states, light + dark), then build.

---

## 6 · Every screen needs three states

Before any screen is "done," you must spec **empty**, **loading**, and **error**:

- **Empty** — Pink-accented glyph, friendly explainer, single primary CTA. Cream background.
- **Loading** — Skeleton placeholders matching the real layout's shape. No spinners on full pages — use skeletons.
- **Error** — Crimson-tinted, with a "Try again" action. Never just a console error.

---

## 7 · Dark mode

The token file flips role tokens automatically when `:root[data-theme="dark"]`
is set (or the OS prefers dark mode and `data-theme="light"` is not set).

**Test every screen in both themes.** If something breaks in dark mode,
it's because a raw color slipped through instead of a token. Fix the
component, not the override.

---

## 8 · The 10-question review gate

Before any screen merges, it must answer **yes** to all ten:

1. Are all colors token-referenced? (No raw hex in the diff.)
2. Is there exactly one primary action?
3. Is pink reserved for the moment?
4. Are errors crimson, not pink?
5. Does the screen have an empty / loading / error state?
6. Does it work in dark mode?
7. Are type roles consistent? (Fraunces for headings, Inter for body, DM Mono for data.)
8. Do interactive elements have hover, focus, and disabled states?
9. Does it survive at 320px wide and at 1440px+?
10. Would a stranger know it's Next Visit from this screen alone?

If you answer no to any, fix it before opening the PR.

---

## 9 · How to ask Claude Code to help

Use these standard prompts. They map to the rollout phases:

- **"Install tokens"** — paste `tokens/tokens.css` into the global stylesheet and replace every raw hex in the codebase with the matching token. Show me the diff first.
- **"Audit [filename]"** — check this file against the design system above. List token violations, contrast issues, missing states, and any pink overuse.
- **"Migrate [filename]"** — refactor this screen to use the design system: tokens, atoms, type roles, and all three states (empty / loading / error).
- **"Review my PR"** — run the 10-question gate on these changes. Tell me which questions fail and why.

---

## 10 · When in doubt

Ask before adding. New colors, new font sizes, new component patterns —
all of these should be flagged for review, not invented inline. The
system grows on purpose, not by accretion.
