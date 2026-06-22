# Contributing

Thanks for your interest in `autotask-rest-api-types`. This package is mostly
**generated** from Autotask's published Swagger spec, so most changes start with
the generator, not the output.

## Layout

- `swagger.json` — the committed API spec; the single source of truth for entities and collections.
- `scripts/generate.mjs` — the only generator. Rewrites `src/generated/*`. **Never hand-edit generated files.**
- `src/core/`, `src/client.ts`, `src/index.ts` — hand-written types and runtime helpers; the generator never touches these.
- `scripts/enrich.mjs` — the read-only `autotask-enrich` CLI (instance metadata capture).
- `skills/`, `examples/nextjs/` — the agent skill and a runnable Next.js example.

## Workflow

```bash
pnpm install
pnpm generate     # rewrite src/generated/* from swagger.json
pnpm build        # tsc -> dist
pnpm check        # typetest + runtime tests (node --test)
```

To refresh against a newer API version:

```bash
curl -s https://webservices.autotask.net/ATServicesRest/swagger/docs/v1 -o swagger.json
pnpm generate && pnpm build && pnpm check
```

## Conventions

- ESM + NodeNext: relative imports include the `.js` extension.
- `verbatimModuleSyntax` is on — use `import type` for types, `import` for runtime.
- Entities are deliberately `field?: T | null`; keep that shape.
- Runtime helpers are `export function` (not arrow-const) and carry JSDoc with runnable `@example` blocks.
- Never commit `src/generated/field-metadata.ts` — it is instance-specific (tenant data) and git-ignored.

## Before opening a PR

Run `pnpm check` and add a `CHANGELOG.md` entry under a new `## [Unreleased]` heading.
