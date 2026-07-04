# Hummingbird Design System

A monochrome design system reconstructed from the Hummingbird Design studio's
November 2015 identity style guide, implemented as semantic HTML + design
tokens. This document is the written spec; the living version — every
component rendered with live examples — is the `/design-system` page.

## Principles

1. **Monochrome, by design.** The brand is true greys only. Color never
   arrives as a flat UI fill; it exists as photographic overlay tint — or,
   in this implementation, as user customization of the oklch channels.
2. **Squared. Always.** `--radius` is a token set to `0`. Hairline borders
   and whitespace separate surfaces; nothing floats on a shadow.
3. **The markup is the API.** Selectors mirror semantic markup
   (`button.primary`, `article.card > header`, `aside[data-slot='panel']`).
   No utility classes, no Tailwind, no Radix, no inline styles.
4. **Native first.** `<dialog>` with `showModal`, `<details name>` accordions,
   scroll-snap sliders, `:user-invalid` validation. JavaScript only assists.
5. **One token file.** Every visual decision resolves to a custom property in
   `src/styles/tokens.css`.

## Color

### Neutral ramp (light theme)

| Token         | Value               | Role                        |
| ------------- | ------------------- | --------------------------- |
| `--paper`     | `oklch(100% 0 0)`   | page background             |
| `--wash`      | `oklch(97% .004 85)`| raised / recessed surfaces  |
| `--line`      | `oklch(90% .006 85)`| hairline borders            |
| `--ink-faint` | `oklch(56% 0 0)`    | captions, disabled          |
| `--ink-soft`  | `oklch(40% 0 0)`    | body text                   |
| `--ink`       | `oklch(31% 0 0)`    | headings, strong borders    |

The dark theme flips the ramp (paper `22%` → ink `97%`); `data-theme` on
`<html>` selects `light` (default), `dark`, or `system`.

### Customizable brand colors

Every brand color is an **oklch channel triplet** — three custom properties
the rest of the system derives from:

```css
--accent-l: 40%;  --accent-c: 0;    --accent-h: 85;
--danger-l: 40%;  --danger-c: 0.11; --danger-h: 5;
--success-l: 50%; --success-c: 0.05; --success-h: 135;
```

- `--accent` defaults to **chroma 0** — the accent *is* ink until customized.
- `--accent-strong` (hover) derives from `--accent-l` via `calc()`, so it
  tracks customization and flips direction per theme.
- `--accent-wash` is `color-mix(in oklch, var(--accent) 12%, var(--paper))`.
- `danger` (wine) and `success` (moss) are not in the brand book — a
  monochrome identity has no error state — but keep its low-vibrancy feel.

The **ThemeCustomizer** composite edits the triplets at runtime: sliders
dispatch `palette/set` through the global reducer, and the provider writes
the channels as inline custom properties on `<html>` (winning over both
themes until `palette/reset`).

### Variant ramps

Each brand color ships as a nine-step ramp, `100` (near paper) → `900`
(near ink), with `500` the color itself:

```css
--accent-100 … --accent-900
--danger-100 … --danger-900
--success-100 … --success-900
```

Steps are derived in `tokens.css` with `color-mix(in oklch, …)` toward
`--paper` (tints) and `--ink` (shades), so every variant stays correct in
both themes and under customization. All ramps render as full swatch strips
on the `/design-system` page.

## Typography

| Face                    | Role                                   | Weights       |
| ----------------------- | -------------------------------------- | ------------- |
| Novecento Sans Wide     | display, labels — uppercase, tracked   | 300–700       |
| Sofia Pro               | body — light                           | 200, 400, 700 |
| Montserrat (Google)     | subheadings                            | 300, 400      |
| ui-monospace stack      | code                                   | —             |

Scale (`--text-*`): `xs` 11px eyebrow · `sm` 13px small print · `md` 16px
body · `lg` 22px h4 · `xl` 30px h3 · `2x` 36px h2 · `3x` 54px h1 ·
`4x` fluid hero (`clamp(3.375rem, 8vw, 5.5rem)`).

Rules: display type is never bolded for emphasis; body copy caps at
`--measure` (68ch); leading is `1.2` tight / `1.7` normal.

## Rhythm, shape, motion

- **Spacing** — 4/8 grid: `xs` 8 · `sm` 12 · `md` 24 · `lg` 48 · `xl` 96 (px).
- **Widths** — `--measure` 68ch · `--page-max` 80rem · `--panel-w` 20rem.
- **Shape** — `--radius: 0`; borders are `--border` (hairline `--line`) and
  `--border-strong` (`--ink`).
- **Motion** — one easing token `--snap` (200ms cubic-bezier), collapsed
  entirely under `prefers-reduced-motion`.

## Component inventory

### Primitives — `src/components/primitives/`

| Component  | Renders                          | Essential props                          |
| ---------- | -------------------------------- | ---------------------------------------- |
| Button     | `button`                         | variant, size, disabled, type, onClick   |
| Input      | `input`                          | type, value, placeholder, required, onChange |
| Textarea   | `textarea`                       | value, rows, placeholder, onChange       |
| Select     | `select`                         | options, value, onChange                 |
| Checkbox   | `label > input[type=checkbox]`   | label, checked, onChange                 |
| Radio      | `label > input[type=radio]`      | label, name, value, checked, onChange    |
| Switch     | `input[role=switch]`             | label, checked, onChange                 |
| Slider     | `input[type=range]`              | label, min, max, step, value, onChange   |
| Heading    | `h1`–`h6`                        | level, id                                |
| Badge      | `span[data-badge]`               | variant                                  |
| Progress   | `progress`                       | label, value, max                        |
| Disclosure | `details/summary`                | summary, open, name                      |
| Dialog     | `dialog` (showModal)             | open, title, footer, onClose             |

### Composites — `src/components/composites/`

| Component       | Renders                                    | Essential props        |
| --------------- | ------------------------------------------ | ---------------------- |
| Card            | `article.card`                             | title, footer          |
| Field           | `div[data-field]`                          | label, htmlFor, hint, error |
| Alert           | `aside[data-alert]`                        | variant, title         |
| Tabs            | `[role=tablist]` + panels                  | tabs, label            |
| Breadcrumb      | `nav > ol`                                 | items                  |
| SearchField     | `form[role=search]`                        | placeholder, onSearch  |
| Carousel        | `section[aria-roledescription=carousel]`   | slides, label          |
| Swatches        | `div[data-swatches]`                       | tokens, label          |
| ThemeCustomizer | `form[data-component=theme-customizer]`    | —                      |
| Chat            | `section[data-component=chat]`             | —                      |

### Layouts — `src/components/layouts/`

| Component | Renders                    | Essential props |
| --------- | -------------------------- | --------------- |
| Header    | `body > header` (sticky)   | —               |
| Footer    | `body > footer`            | —               |
| Panel     | `aside[data-slot='panel']` | label           |

## Theming & state

Global state lives in `src/lib/state/` (typed reducer + context):

- `theme` — `'light'` (default) | `'dark'` | `'system'`, mirrored to
  `data-theme` on `<html>`.
- `palette` — per-color `ColorChannels` overrides (`lightness`, `chroma`,
  `hue`), applied as inline `--{color}-l/c/h` properties. Empty means the
  token defaults rule.

Actions: `theme/set`, `palette/set`, `palette/reset`, plus panel and notice
actions. Components dispatch creators from `actions.ts`, never object
literals.

## File map

```
src/styles/tokens.css     # the whole theme: channels, ramps, scale, rhythm
src/styles/base.css       # semantic element defaults (incl. range slider)
src/styles/components.css # variants + structural CSS, selectors mirror markup
src/components/…          # primitives / composites / layouts (see tables)
src/lib/state/            # reducer, actions, provider (theme + palette)
src/app/page.tsx          # portfolio landing with the highlight carousel
src/app/design-system/    # the living design system documentation
```
