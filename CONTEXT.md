# Project Context

## Snapshot

- Root: `.`
- Stack: Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn Base UI (Nova) + Lucide
- Package manager: npm (`package-lock.json`)
- Application paths: `src/`, `index.html`, `public/`, `DESIGN.md`
- Commands: recorded in `AGENTS.md` plus `README.md` (`design:check`, `icons`).
- Not detected: test paths, workspace layout, standalone type-check, CI workflows

## Project Map

- `DESIGN.md`: design tokens and rationale consumed by `design:lint` and `design:export`
- `components.json`: shadcn configuration (base-nova style, Lucide, `@/` aliases)
- `index.html`: Vite HTML entry mounting `#root` from `src/main.tsx`
- `public/`: static assets served as-is
- `src/App.tsx`: lazy `react-router` routes, standalone Landing/Login routes, application routes inside `SiteShell`, plus `document.title` map
- `src/components/`: reusable UI (`ui/`), dashboard visuals (`dashboard/metric-card.tsx`, `inline-charts.tsx`), and layout (`layout/site-shell.tsx`, `brand-mark.tsx`, `header-search.tsx`, `user-profile.tsx`, `nav-items.ts` canonical id → path)
- `src/design-theme.css`: generated Tailwind v4 tokens from `DESIGN.md` (checked by `design:check`)
- `src/index.css`: owns runtime primitives, maps semantic aliases, owns `.dark`; intentionally does not import generated token file
- `src/hooks/`: shared hooks (`use-theme` with light/dark/system support, `use-toast-position`, `use-status-flash` transient trigger feedback)
- `src/lib/`: shared helpers (`utils.ts` class-name merge)
- `src/main.tsx`: React strict-mode bootstrap, `BrowserRouter`, PWA toasts
- `src/pages/`: standalone `landing.tsx` and `login.tsx`, shell-based `dashboard.tsx` preview, `/showcase` component gallery composed from `showcase/` domain demos, and `not-found.tsx` for unknown routes; cards/forms/data-table include explicit spacing buffers
- `vite.config.ts`: Vite setup with React, Tailwind, and `@` alias

## Excluded Paths

- Normal probe skips: `dist/`, `node_modules/`.
- Inspect these paths only when the task concerns generated output, dependencies, or local tooling.

## Durable Decisions

- Real URL routing via `react-router` with per-route lazy loading; nav active state derives from location — source: user decision 2026-09-12
- No tests or CI configured yet, by explicit user choice; `npm run lint` denies warnings, plus `design:lint`, `design:check`, build — source: user decision 2026-09-12
- `DESIGN.md` is the token source of truth; `design-theme.css` is a generated, checked-in contract (`design:check` fails on drift) that is NOT imported at runtime — importing it hijacks `max-w-*` via `--spacing-*` and creates cyclic color vars — source: visual-bug investigation 2026-09-12
- `cn` boundary: project code imports `@/lib/utils`, generated `ui/*` imports `cn` directly to stay upstream-close — source: audit remediation 2026-09-12
- Brand mark is the SVG "A"; `npm run icons` regenerates PWA rasters from it (needs Pillow) — source: audit remediation 2026-09-12
- `shadcn` CLI lives in `devDependencies`; only its CSS ships via build — source: audit remediation 2026-09-12
- UI component files export components only; CVA variant helpers stay private so `npm run lint` can deny warnings — source: lint remediation 2026-09-12
- Application nav has exactly three entries: Landing (`/`), Dashboard (`/dashboard`), and Showcase (`/showcase`); `/login` is a standalone visual example opened in a new tab and is not part of shell navigation; `/me` redirects to `/dashboard` for compatibility — source: user decision 2026-09-12
- Header shows profile preview (`Ada Lovelace`) as `UserProfile`; shell navigation starts as a compact desktop rail and expands on mouse hover or keyboard focus with a fast animation; mobile uses bottom tabs; active state derives from current route — source: user request 2026-09-12
- `/dashboard` is the primary public dashboard surface, not authenticated; its indicators, charts, and initial work items use local starter data, while table filter, sort, and pagination use non-sensitive URL parameters for continuity — source: UX direction 2026-09-12
- Theme control toggles light and dark directly; system mode remains the automatic initial preference and follows live OS preference changes until a manual choice, while preserving initial flash prevention — source: user request 2026-09-12
- Async/direct action buttons echo the toast outcome: `Button` `status` prop swaps the loading slot to the matching icon + tone while the label stays hidden, label fading back after auto-revert, driven by `useStatusFlash` — source: user request 2026-09-12
- PWA updates use a user-confirmed prompt instead of auto-reload, preserving active form work until explicit reload — source: UX hardening 2026-09-12
