# Engineering Conventions

Every rule below traces to an explicit source; patterns merely observed in source code are never promoted to rules.

## Linting and Types

- Follow React Hooks rules; violations fail lint — source: `.oxlintrc.json`
- Keep component files exporting only components; CVA variant helpers stay private — source: `.oxlintrc.json` + `npm run lint`
- Remove unused locals and parameters before build — source: `tsconfig.app.json`
- Keep `strict` and `noUncheckedIndexedAccess` enabled — source: `tsconfig.app.json`
- Declare nav entries once in `layout/nav-items.ts` as id → path; derive active state from the router location, never from local selection state — source: `src/components/layout/nav-items.ts`
- Verify token edits with `design:check` so `src/design-theme.css` never drifts from `DESIGN.md`, and mirror value changes into `src/index.css` literals by hand; never `@import` the generated file (namespace hijack + cyclic vars) — source: `src/index.css` header comment
- `npm run lint` runs Oxlint with `--deny-warnings`; warnings block local verification — source: `package.json`
- Regenerate PWA icons with `npm run icons` (Python 3 + Pillow) instead of hand-editing rasters — source: `package.json` + `scripts/generate-icons.py`
- Import `cn` from `@/lib/utils` in project code; leave generated `components/ui/*` on direct `cn` imports — source: `src/lib/utils.ts`
- Import project source through the `@/*` alias for `./src/*` — source: `tsconfig.app.json`
- Resolve `@` to `./src` at build runtime — source: `vite.config.ts`
- Place generated shadcn UI under `@/components/ui` with base-nova style and CSS variables — source: `components.json`
- Use `lucide-react` for icons — source: `components.json`

## Not established

- Formatting, Testing, Commits and Workflow (testing/CI deliberately absent — see `CONTEXT.md`)
