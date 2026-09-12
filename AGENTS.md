# Agent Guidance

## Project essentials

- Stack: Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn Base UI (Nova) + Lucide
- Package manager: npm (`package-lock.json`)
- Detail files: `CONTEXT.md` (snapshot, project map, durable decisions), `CONVENTIONS.md` (engineering rules). Read `CONTEXT.md` before non-trivial work.

## Commands

- Start dev server: `npm run dev`
- Build with type-check: `npm run build`
- Lint: `npm run lint`
- Validate design tokens: `npm run design:lint`
- Export design tokens: `npm run design:export`
- Preview production build: `npm run preview`
- Not detected: tests, standalone type-check, formatter

## Working rules

- Start from one explicit goal; search before broad reading; keep work within requested scope and `CONVENTIONS.md`.
- Verify with checks proportional to change risk, using the commands above.
- Stop for material ambiguity involving requirements, public contracts, data loss, security, or irreversible actions.
- Use repository evidence for APIs, commands, endpoints, files, and behavior.
- Keep secrets, tokens, PII, and private paths out of logs and examples.

## Documentation impact

After verified code or configuration changes, report whether public behavior, setup, contracts, architecture, security, or developer-workflow documentation needs updating.
