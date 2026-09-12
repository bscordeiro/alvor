---
name: Alvor
description: Alvor Graphite design tokens — neutral gray surfaces, single slate accent, soft rounding, subtle depth.
colors:
  primary: "#334155"
  primary-hover: "#2B3748"
  secondary: "#61666E"
  background: "#F7F8FA"
  surface: "#FFFFFF"
  sidebar: "#E9EBEF"
  text: "#111418"
  text-secondary: "#61666E"
  on-primary: "#FFFFFF"
  success: "#16803C"
  info: "#0369A1"
  warning: "#C2410C"
  danger: "#C81E1E"
  light: "#EDF0F3"
  dark: "#333B45"
typography:
  display:
    fontFamily: "'Inter Variable', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 3rem
    fontWeight: 700
    letterSpacing: "-0.02em"
    lineHeight: 1.05
  title:
    fontFamily: "'Inter Variable', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 1.5rem
    fontWeight: 600
    letterSpacing: "-0.01em"
    lineHeight: 1.25
  card:
    fontFamily: "'Inter Variable', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "'Inter Variable', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 1rem
    lineHeight: 1.6
  caption:
    fontFamily: "'Inter Variable', 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 0.875rem
    lineHeight: 1.45
rounded:
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  window:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
  sidebar:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  popover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  banner-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  banner-info:
    backgroundColor: "{colors.info}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  banner-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  banner-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  banner-light:
    backgroundColor: "{colors.light}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  banner-dark:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
---

## Overview

Formal workspace with a neutral identity, balanced for the web. Gray paper surfaces, one confident slate accent, soft 8–12px rounding, and subtle depth. A single Graphite colorway ships light and dark schemes.

## Colors

Slate-gray accent tuned for white-text contrast. Neutral ink on a gray paper background. White surfaces for cards and popovers. Sidebar one step darker than the window. Muted grays only for supporting text.

- **Primary (#334155):** single action color, graphite slate with AA-safe white contrast.
- **Background (#F7F8FA):** gray paper window wash.
- **Surface (#FFFFFF):** cards, popovers, secondary buttons.
- **Sidebar (#E9EBEF):** quiet side rail, one step darker than window.
- **Text (#111418):** neutral ink for primary content.
- **Roles:** success `#16803C`, info `#0369A1`, warning `#C2410C`, danger `#C81E1E`, light `#EDF0F3`, dark `#333B45` — each AA-safe with its paired foreground, both as solid fills with light text and as text on tinted fills. Light and dark roles stay fixed across color schemes, like reference swatches. A single red voice: `destructive` aliases `danger`.

## Typography

Self-hosted Inter Variable first on every platform, then system-ui, Segoe UI, and Roboto as fallback. Display at 48px for heroes, 24px section titles, 18px card titles, 16px body with relaxed 1.6 line height, 14px captions for metadata. Interactive text and sustained reading use body size; compact controls and supporting metadata use caption size without dropping below 14px.

## Layout

4px base unit on an 8pt-friendly scale. Airy window padding (16–32px), compact 8px control padding, sidebar plus fluid content column. Generous whitespace over dividers.

## Elevation & Depth

Depth comes from layered translucency, not flat fills. Toolbar, sidebar, and tab bar use 60–80% translucent surfaces over 20px backdrop blur plus 150% saturation — the vibrancy recipe. Hairline borders delineate, soft drop shadows lift floating layers, and a 1px inner top highlight simulates light falloff. Cards stay solid and flat; only overlays float. Dark scheme deepens shadows and dims the inner highlight.

## Shapes

Controls at 6–8px feel precise; cards and windows at 12–16px feel calm. Never fully square, never pill-shaped except for tiny badges.

## Components

Window and sidebar set the stage. Sidebar categories expand into subcategories; on mobile they surface through a bottom sheet. Primary button carries the palette accent; secondary button stays surface with gray text. Cards group content at 12px radius. Popovers float small and sharp with caption text. Banner components carry each semantic role on its paired foreground.

## Do's and Don'ts

- Do use one slate accent per view; let gray surfaces do the quiet work.
- Do keep corners soft and consistent within each component family.
- Don't rebuild OS window chrome in the browser.
- Don't add glass blur to content panels — keep it on toolbar and floating layers.
- Don't introduce accent hues outside the graphite palette.
- Do keep motion quick and quiet: 150–350ms ease-out, fade or small slide only, and respect reduced-motion settings.
