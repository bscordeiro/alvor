# Alvor

Alvor is a calm operational dashboard: Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn Base UI (Nova) + Lucide. It includes a concise landing page, a standalone visual sign-in example, a dashboard surface with local starter data, an adaptive application shell with a fast hover-expand desktop sidebar, and a component showcase. Real URL routing, lazy pages, light/dark/system themes, PWA shell, and design tokens from `DESIGN.md` keep it ready to shape.

## Requirements

- Node `^20.19.0 || >=22.12.0`, npm 11
- Python 3 + Pillow only to regenerate PWA icons (`npm run icons`)

## Setup

```sh
npm install
npm run dev
```

## Scripts

| Script | What |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Oxlint with warnings denied |
| `npm run design:lint` | Validate `DESIGN.md` |
| `npm run design:export` | Regenerate `src/design-theme.css` from `DESIGN.md` |
| `npm run design:check` | Fail if `src/design-theme.css` drifts from `DESIGN.md` |
| `npm run icons` | Regenerate PWA icons from the SVG "A" mark (needs Pillow) |

## Routes

`src/App.tsx` declares routes with `react-router`; `src/components/layout/nav-items.ts` is the canonical application nav (Landing → `/`, Dashboard → `/dashboard`, Showcase → `/showcase`). `src/pages/showcase.tsx` composes focused demos from `src/pages/showcase/`, keeping interaction state inside each demo. `SiteShell` derives active state from the URL and preserves useful scroll context across history navigation. The main application shell is used by `/dashboard`, `/showcase`, and legacy placeholder routes; `/` and `/login` stay standalone. The sign-in example opens in a new tab and never sends, authenticates, or stores form values.

Lazy loading is per route: the landing, sign-in, dashboard, and showcase surfaces load independently. Showcase sections have stable anchors and are indexed from `/showcase`; the header search also finds component families.

### Adding a page

1. Add the item with its `path` in `nav-items.ts` when it belongs in application navigation.
2. Add a lazy route in `App.tsx` and a title in `TITLES`.
3. Add a stable entry to `src/pages/showcase/section-registry.ts` when the page exposes showcase patterns.
4. Replace `PlaceholderPage` with the real surface when ready.

### Route roles

- `/` is public landing content and intentionally has no application shell.
- `/login` is a standalone visual form opened in a new tab; it is not authentication.
- `/dashboard` is the primary public dashboard surface with local starter data and URL-backed, non-sensitive table controls.
- `/showcase` is the complete developer reference for shipped UI primitives.

The three application navigation items are Landing, Dashboard, and Showcase. Sign in stays a separate action so the public access flow does not become a destination inside the application shell.

### Removing the showcase

Delete `src/pages/showcase/`, remove its route and navigation entry, and replace links to `/showcase`. The landing and dashboard pages remain independent.

## Design tokens

`DESIGN.md` is the source of truth for light-scheme primitives. Flow:

```text
DESIGN.md → npm run design:export → src/design-theme.css (checked-in contract)
```

`src/design-theme.css` is intentionally not imported at runtime: its `--spacing-*` keys hijack `max-w-*` utilities and its values form cyclic variables with the aliases below. `src/index.css` holds literal primitives mirroring `DESIGN.md`, maps them onto runtime variables (`--paper`, `--brand`, …), and owns the `.dark` overrides plus the Tailwind `@theme inline` aliases. Run `npm run design:check` after token edits; it checks generated-file drift and runtime mappings, and any `DESIGN.md` change must be mirrored into `src/index.css` by hand.

## PWA

Service worker uses a user-confirmed update prompt. The app toasts when offline-ready and keeps an update notification visible until the user reloads or dismisses it. Caches are cleaned on activate. Manifest, `start_url`, and `scope` assume the app is served from `/`; for a subpath deployment, set Vite `base` and mirror it in `vite.config.ts` PWA paths.

To clear dev caches: DevTools → Application → Storage → Clear site data.

## Conventions

- Imports use the `@/*` alias. `cn` comes from `@/lib/utils` in project code; generated `src/components/ui/*` files import `cn` directly to stay close to upstream shadcn.
- `strict` + `noUncheckedIndexedAccess` are on.
- No automated test runner or CI is configured (deliberate). Verify with `npm run lint` (warnings denied), `npm run design:lint`, `npm run design:check`, and `npm run build`. Manually inspect direct routes, new-tab sign-in isolation, themes, responsive layouts, keyboard focus, reduced motion, history restoration, and showcase anchors/search.

## Browser support

Evergreen browsers with `backdrop-filter`, `color-mix`, and `oklch`. Reduced-motion preferences are respected; animations are fade/small-slide only.
