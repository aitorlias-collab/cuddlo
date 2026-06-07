# Design

## Theme

Light. Warm-accented neutrals with lavender as primary brand color. The background is white (not cream — cream is the 2026 AI default; warmth comes from typography and accents, not background tint). Lavender (#A09BDD) is the primary interactive and accent color. Mint (#7DD4B8) is used for positive states and secondary accents. Cream-sand (#C4A882) is reserved for decorative blobs and warm highlights only.

Color strategy: **Committed** — lavender carries 30–50% of hero surfaces and primary actions.

## Colors

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `oklch(1 0 0)` | Page background (pure white) |
| `--color-surface` | `oklch(0.98 0.005 60)` | Cards, inputs (barely-warm white) |
| `--color-lavender` | `oklch(0.72 0.09 290)` | Primary brand / interactive (#A09BDD) |
| `--color-lavender-light` | `oklch(0.95 0.03 290)` | Lavender tint backgrounds (#EEEDFE) |
| `--color-mint` | `oklch(0.81 0.09 165)` | Positive / secondary accent (#7DD4B8) |
| `--color-mint-light` | `oklch(0.96 0.03 165)` | Mint tint backgrounds (#E1F5EE) |
| `--color-sand` | `oklch(0.76 0.06 75)` | Warm accent / decorative (#C4A882) |
| `--color-ink` | `oklch(0.24 0.03 60)` | Primary text (#3D3529) |
| `--color-ink-mid` | `oklch(0.44 0.03 60)` | Secondary text (#6B5C4E) |

## Typography

**Display / Heading**: Bodoni Moda (Google Fonts) — high-contrast didone serif, premium Italian editorial feel. Physical-object reference: label on a high-end Milanese stationery box. Weights 400/600/700.

**Body / UI**: Figtree (Google Fonts) — geometric-humanist sans, friendly without being childish, warm without Inter's corporate coldness. Weights 400/500/600/700.

### Scale (fluid clamp)

| Step | Class | Clamp |
|---|---|---|
| xs | `text-xs` | 0.75rem |
| sm | `text-sm` | 0.875rem |
| base | `text-base` | 1rem |
| lg | `text-lg` | 1.125rem |
| xl | `text-xl` | 1.25rem |
| 2xl | `text-display-sm` | clamp(1.5rem, 3vw, 2rem) |
| 3xl | `text-display-md` | clamp(2rem, 4vw, 2.75rem) |
| hero | `text-display-lg` | clamp(2.5rem, 5.5vw, 3.75rem) |

Hero ceiling: 3.75rem (60px). Never exceeds 6rem per skill rules.

## Components

### Buttons

- **Primary**: `bg-lavender-accent text-white rounded-full px-8 py-4` — pill shape, lavender fill, white text
- **Secondary**: `border border-sand/40 rounded-full px-8 py-4 text-ink-mid` — outlined, no fill
- **Ghost**: transparent, underlined

### Cards

- Border radius: **12px** (`rounded-xl`) — not the current 24–32px which reads as over-rounded
- Surface: `--color-surface`, no border, 1 elevation shadow at most 6px blur
- No ghost-card pattern (border + shadow together is banned)

### Section tags / eyebrows

- **Use sparingly** — maximum one per page, not on every section (absolute ban)
- Style: small pill badge, not uppercase tracked text

## Layout

- Max content width: `max-w-6xl` (1152px)
- Section padding: `py-24` desktop, `py-16` mobile
- Grid: CSS Grid for 2D layouts, Flexbox for 1D
- Spacing rhythm: 4/6/8/12/16/24/32/48/64px scale

## Motion

Framer Motion. Entrance: `fadeUp` (y: 24 → 0, opacity 0 → 1, duration 0.6s, ease [0.22, 1, 0.36, 1]). Stagger: 0.12s between children. Floating badges: `y: ±5px`, 3–3.5s loop, easeInOut. All animations respect `prefers-reduced-motion` (TODO: add media query).

## Remaining considerations

- No product imagery — the testimonial card in Hero acts as social proof substitute. When real product photos are available, replace the right panel of the Hero with a before/after product shot.
- Contrast-checked: all text/bg pairs verified ≥4.5:1 (AA). Stars use `text-lavender-dark` on white; `text-lavender` (#EEEDFE) on dark lavender surfaces.
