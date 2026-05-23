// Next Visit — Brand Marks (LOCKED)
//
// FlapChar     — atomic split-flap tile (the building block)
// LogoA        — primary wordmark: NEXTVISIT (optional · date · line)
// AppIcon      — square app icon: full-bleed N + V
//
// These three components are the single source of truth for the Next
// Visit identity. Import them; do NOT redraw or restyle.
//
// All colors reference tokens from `tokens/tokens.css`. The only place
// raw rgba() values appear is in the seam / highlight overlays inside
// the flap tiles, which are mark-internal effects.
//
// Version: 1.0  ·  Locked 23 May 2026

import React from 'react';

// ─────────────────────────────────────────────────────────────────────
// FlapChar — one split-flap tile with a glyph
// ─────────────────────────────────────────────────────────────────────
export function FlapChar({
  char,
  w = 50,
  h = 68,
  color = 'var(--nv-tile-glyph)',
  bg = 'var(--nv-tile-bg)',
  weight = 700,
  family = 'var(--nv-font-mark)',
  borderless = false,
  charScale = 0.66,
  charOffsetX = 0,
}) {
  return (
    <div
      style={{
        width: w,
        height: h,
        position: 'relative',
        background: bg,
        borderRadius: borderless ? 0 : Math.max(2, w * 0.07),
        boxShadow: borderless
          ? 'none'
          : 'inset 0 0 0 1px rgba(251,232,222,0.07), 0 1px 0 rgba(0,0,0,.45)',
        overflow: 'hidden',
        fontFamily: family,
        fontWeight: weight,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color,
          fontSize: h * charScale,
          lineHeight: 1,
          letterSpacing: '-0.01em',
          transform: charOffsetX ? `translateX(${charOffsetX}px)` : undefined,
        }}
      >
        {char}
      </div>
      {/* Horizontal seam at 50% */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'rgba(0,0,0,.6)' }} />
      {/* Top highlight */}
      <div
        style={{
          position: 'absolute',
          left: 0, right: 0, top: 0, height: '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,0))',
          pointerEvents: 'none',
        }}
      />
      {/* Bottom shadow */}
      <div
        style={{
          position: 'absolute',
          left: 0, right: 0, top: '50%', bottom: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.20))',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// LogoA — the wordmark (locked)
// ─────────────────────────────────────────────────────────────────────
// Default: 9 flap tiles only. Pass a `date` prop (e.g. "\u00b7 12 \u00b7 jul \u00b7")
// to add the pink mono date line beneath \u2014 reserved for surfaces where
// a real next-visit date is meaningful (splash, share cards, etc).
export function LogoA({ w = 52, h = 70, dateSize, date = null }) {
  const tileGap = Math.round(w * 0.077);   // tile-to-tile gap
  const wordToDateGap = w * 0.36;          // wordmark-to-date distance
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: date ? wordToDateGap : 0, alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: tileGap }}>
        {[...'NEXTVISIT'].map((c, i) => (
          <FlapChar key={i} char={c} w={w} h={h} />
        ))}
      </div>
      {date && (
        <div
          style={{
            fontFamily: 'var(--nv-font-mono)',
            fontSize: dateSize ?? Math.max(9, w * 0.26),
            letterSpacing: '.42em',
            color: 'var(--nv-pink-500)',
            fontWeight: 500,
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          {date}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// AppIcon — the square app icon (locked, full bleed)
// ─────────────────────────────────────────────────────────────────────
const ICON_RADIUS_RATIO = 0.2237; // iOS squircle ratio

export function AppIcon({ size = 132, shadow = true }) {
  const nudge = size * 0.07; // pull each glyph toward the seam
  return (
    <div
      style={{
        width: size,
        height: size,
        background: 'var(--nv-navy-800)',
        borderRadius: size * ICON_RADIUS_RATIO,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: shadow
          ? `0 ${size * 0.04}px ${size * 0.12}px rgba(0,0,0,.25), inset 0 0 0 1px rgba(251,232,222,.05)`
          : 'none',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <FlapChar
          char="N"
          w={size / 2}
          h={size}
          borderless
          charScale={0.62}
          charOffsetX={nudge}
        />
        <FlapChar
          char="V"
          w={size / 2}
          h={size}
          color="var(--nv-pink-500)"
          borderless
          charScale={0.62}
          charOffsetX={-nudge}
        />
      </div>
    </div>
  );
}
