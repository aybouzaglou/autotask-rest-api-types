# Webhook Support — Implementation Plan

> **Status:** Proposed · **Date:** 2026-06-21
> **Scope:** Add receive-side + setup helpers for Autotask PSA webhooks to `autotask-rest-api-types`.
> **Source:** Multi-agent research + design + adversarial verification (both reviewers: _ship-with-fixes_; fixes folded in).

This document is broken into **slices**. Each slice is sized for **one agent**, owns a distinct file (or a small, non-overlapping set), states its dependencies, and has its own acceptance criteria. Parallel-safe slices are marked. The **Shared Contracts** section below is the seam: every slice must produce/consume exactly those names and signatures so independently-built slices link together without coordination.

---

## ⚠️ Confidence note — read before building runtime that touches the wire

Two evidence tiers are **not** equal:

- **Codebase facts — verified.** File paths, exports, `tsconfig`, the entity/registry shapes below were all directly confirmed in this repo.
- **Autotask wire-format facts — NOT verbatim-confirmed.** The payload key casing, the exact `Fields` representation, UDF nesting, and the signature/escaping details come from **secondary sources** (the n8n Autotask trigger node's TS types + an official help page that shows the payload only as a screenshot image). **No raw captured delivery was found.**

Consequences baked into this plan:
1. **Types are deliberately permissive** so they stay correct even if a wire detail differs (`Partial<Entity> & Record<string, unknown>`). Phase 1 is safe to ship regardless.
2. **The signature verifier is unproven against live traffic.** It defaults to verifying **raw bytes** (what docs say is signed) with an opt-in `{ escapeBody: true }` fallback (reverse-engineered from n8n). **Slice V must run before the verifier is called "authoritative."**

---

## Conventions every slice must follow

(Confirmed against the existing codebase — do not deviate.)

- **`verbatimModuleSyntax: true`** → type-only imports **must** use `import type { … }`; runtime imports use `import { … }`. Mixing will fail to compile.
- **ESM + NodeNext** → relative imports include the **`.js`** extension (e.g. `import type { EntityOf } from "../../generated/registry.js";`).
- **`tsconfig`**: `target/lib: ES2020` (no DOM lib), `strict`, `exactOptionalPropertyTypes: false`, `noUncheckedIndexedAccess: true`. `include: ["src/**/*.ts"]` already picks up `src/core/webhooks/**` — no tsconfig edit needed.
- **Zero runtime dependencies.** No `node:crypto`, no third-party packages. Crypto = WebCrypto via `globalThis.crypto?.subtle`, feature-detected.
- **Runtime helpers are `export function`** (matches `getUdf`, `requireField`, `writtenId`, `isPresent`). Do **not** use arrow-const exports for the type guards.
- **Heavy JSDoc with runnable `@example` blocks**, matching `src/core/*.ts`.
- **Never hand-edit `src/generated/*`.** New code only *imports* from it.
- **Never bake unconfirmed operational numbers into constants** (e.g. the ~1,500/hr threshold) — JSDoc prose only.
- **`writtenId(result)`** is the canonical way to read a write id — `AutotaskWriteResult.itemId` is `number | string`; never `as number`.

---

## Shared Contracts (the seam — all slices agree on these)

New folder: **`src/core/webhooks/`**, files: `delivery.ts`, `signature.ts`, `registration.ts`, `router.ts` (optional), `error-log.ts`, `index.ts` (barrel).

### Type surface (from `delivery.ts`)
```ts
WEBHOOK_ENTITY_TYPES            // readonly ["Tickets","Companies","Contacts","ConfigurationItems","TicketNotes"]
type WebhookEntityType          // (typeof WEBHOOK_ENTITY_TYPES)[number]
type WebhookAction              // "Create" | "Update" | "Delete" | "Deactivated"
type WebhookEntityFor<E>        // E -> EntityOf<E>
type WebhookFields<E>           // Partial<NonNullable<WebhookEntityFor<E>>> & { userDefinedFields?: UserDefinedField[] } & Record<string, unknown>
interface WebhookDeliveryBase<E>
interface WebhookCreateDelivery<E>      // + Fields
interface WebhookUpdateDelivery<E>      // + Fields
interface WebhookDeleteDelivery<E>      // no Fields
interface WebhookDeactivatedDelivery<E> // no Fields
type AutotaskWebhookDelivery<E = WebhookEntityType>
```
### Guard / parse surface (from `delivery.ts`)
```ts
function isWebhookEntityType(v: unknown): v is WebhookEntityType
function isCreateDelivery<E>(d): d is WebhookCreateDelivery<E>
function isUpdateDelivery<E>(d): d is WebhookUpdateDelivery<E>
function isDeleteDelivery<E>(d): d is WebhookDeleteDelivery<E>
function isDeactivatedDelivery<E>(d): d is WebhookDeactivatedDelivery<E>
function isDeliveryFor<E>(d, e: E): d is AutotaskWebhookDelivery<E>
function parseWebhookDelivery(json: unknown): AutotaskWebhookDelivery
```
### Signature surface (from `signature.ts`)
```ts
const AUTOTASK_SIGNATURE_HEADER = "x-hook-signature"
function parseHookSignature(header): { algorithm: string; value: string } | null
function timingSafeEqualString(a: string, b: string): boolean
function computeAutotaskSignature(rawBody, secretKey): Promise<string>            // "sha1=BASE64"
function verifyAutotaskSignature(rawBody, secretKey, header, opts?): Promise<boolean>
function autotaskHmacEscape(jsonText: string): string                              // opt-in, reverse-engineered
```
### Registration surface (from `registration.ts`)
```ts
type WebhookEntityFamily        // "Company"|"Contact"|"ConfigurationItem"|"Ticket"|"TicketNote"
const WEBHOOK_COLLECTIONS_FOR   // family -> { parent, fields, udfFields?, excluded } (TicketNote: NO udfFields)
interface WebhookRegistrationSpec
interface WebhookCreateStep
interface WebhookRegistrationPlan
function buildWebhookRegistrationPlan(family, spec): WebhookRegistrationPlan
function resolveFieldIds(names: string[], nameToId: Map<string, number>): number[]
function executeWebhookRegistrationPlan(plan, runStep): Promise<{ webhookId; childIds }>
```
### Error-log surface (from `error-log.ts`)
```ts
function parseDeliveryFromErrorLog(log: WebhookEventErrorLog): AutotaskWebhookDelivery | null
```
### Router surface (optional, from `router.ts`)
```ts
function createWebhookRouter(opts: WebhookRouterOptions): WebhookRouter
```

---

## Dependency graph & suggested order

```
Phase 1 (safe now, no wire dependency):
  S1 delivery.ts ──┐
                   ├─► S6 wiring (barrel + index + package.json)
  S3 registration ─┘        ▲
                            │
Phase 2 (after S1):         │
  S2 signature.ts ──────────┤
  S4 error-log.ts (needs S1)┤
                            │
Phase 3 (optional/last):    │
  S5 router.ts (needs S1+S2)┘

Cross-cutting:
  S7 tests (needs the slices it covers)
  S8 docs (needs final API of S1/S2/S3)
  SV live-callout verification (gates S2/S1 "authoritative" status)
```

**Parallel-safe from the start:** S1, S2, S3 (no new-code deps on each other).
**Must follow:** S4 → after S1 · S5 → after S1+S2 · S6 → after the file-slices it re-exports · S7/S8 → after their targets.

---

# Slices

Each slice = one agent. Format: **Goal · Files · Depends on · Spec · Acceptance · Out of scope.**

---

## S1 — Delivery payload types & guards `[Phase 1] [parallel-safe]`

**Goal:** Replace `any` on inbound webhook bodies with a discriminated-union type + narrowing guards + a thin parse.

**Files:** create `src/core/webhooks/delivery.ts` (pure types + one-line `function` guards).

**Depends on:** nothing (imports only `EntityOf` from `../../generated/registry.js`, `UserDefinedField` from `../udf.js`).

**Spec:**
- `WEBHOOK_ENTITY_TYPES = ["Tickets","Companies","Contacts","ConfigurationItems","TicketNotes"] as const`.
- `WebhookEntityFor<E>` maps each entity-type literal to its `EntityOf<…>` interface (`never` for non-members).
- `WebhookFields<E> = Partial<NonNullable<WebhookEntityFor<E>>> & { userDefinedFields?: UserDefinedField[] } & Record<string, unknown>`.
  - JSDoc must state: which fields appear is runtime subscription config; **Update carries only changed/subscribed fields**; UDF nesting (`userDefinedFields` vs flat) is **unconfirmed — verify against a live callout**.
- `WebhookDeliveryBase<E>` carries the envelope: `Guid: string`, `EntityType: E`, `Id: number`, `EventTime: string`, `SequenceNumber: number`, `PersonID: number`. JSDoc: dedupe on `Guid`; `SequenceNumber` may have gaps; `EventTime` format unconfirmed.
- `Fields` lives **only** on `WebhookCreateDelivery`/`WebhookUpdateDelivery`; **omitted** from `WebhookDeleteDelivery`/`WebhookDeactivatedDelivery` (omission, not `?:` — required because `exactOptionalPropertyTypes: false`).
- `AutotaskWebhookDelivery<E = WebhookEntityType>` = distributive union over the 4 action arms.
- Guards as `export function`; `parseWebhookDelivery` asserts an object with a string `Action` then returns the union (no deep validation — it's a parse, not a validator).

**Prose discipline (verifier-mandated):** Do **not** claim "no `Fields` on Delete" as a runtime fact. Say: _"`Fields` carries no meaningful data on Delete/Deactivated (id-only per docs); the key may be absent **or** an empty object — narrow on `Action`, don't rely on its presence."_ Mark exact physical presence as _verify against live instance_.

**Acceptance:**
- `pnpm typecheck` passes.
- A `Tickets`+`Update` delivery, after `isDeliveryFor(d,"Tickets")` + `isUpdateDelivery(d)`, exposes `d.Fields.title` as `string | null | undefined` (not `unknown`).
- Accessing `d.Fields` on a value narrowed to `Delete` is a **compile error**.

**Out of scope:** any I/O, crypto, the barrel/exports (S6 owns that).

---

## S2 — Signature verification (WebCrypto, edge-safe) `[Phase 2] [parallel-safe]`

**Goal:** Provide a dependency-free HMAC verifier for inbound deliveries.

**Files:** create `src/core/webhooks/signature.ts`.

**Depends on:** nothing in new code. **Gated by SV** before being documented as authoritative.

**Spec:**
- `AUTOTASK_SIGNATURE_HEADER = "x-hook-signature"` — JSDoc: _"lowercase because Fetch/Workers `Headers.get()` normalizes to lowercase; documented wire name is `X-Hook-Signature`."_
- `computeAutotaskSignature(rawBody, secretKey)` → `"sha1=" + base64(HMAC_SHA1(secret, bytes))`. Use `globalThis.crypto?.subtle`; throw a clear error if unavailable (Node 18+/Workers/modern browser).
- `verifyAutotaskSignature(rawBody, secretKey, header, opts?)`:
  - parse header via `parseHookSignature` (tolerant of missing `sha1=` prefix; note prefix-less branch is **defensive/speculative**, not an observed format).
  - compare with `timingSafeEqualString` (constant-time, no `node:crypto`).
  - `opts.escapeBody` (default **false**) applies `autotaskHmacEscape` to a string body first.
- `autotaskHmacEscape(jsonText)`: the n8n reverse-engineered table (`& < > ' " \` +` and non-ASCII → `\uXXXX`). JSDoc: **reverse-engineered, undocumented, opt-in, off by default.**
- **DOM/types in ES2020:** `crypto.subtle`/`TextEncoder`/`btoa` aren't in `lib: ES2020`. Prefer a **minimal local `declare`** for just those globals over `/// <reference lib="dom" />` (the repo has no triple-slash precedent and ships no ambient types). Keep declarations inside this file only.

**Acceptance:**
- `pnpm typecheck` passes with no DOM lib added globally.
- Round-trip: `verifyAutotaskSignature(body, secret, await computeAutotaskSignature(body, secret))` → `true`; wrong secret → `false`; tampered body → `false`.
- No import of `node:crypto` or any package.

**Out of scope:** request/framework objects (operate on `string | ArrayBuffer | Uint8Array` + header string only).

---

## S3 — Registration plan builder (pure, no I/O) `[Phase 1/3] [parallel-safe]`

**Goal:** Tame the multi-step webhook setup into an ordered, testable plan the caller executes through their own client.

**Files:** create `src/core/webhooks/registration.ts`.

**Depends on:** imports `EntityName` from `../../generated/registry.js`.

**Spec:**
- `WEBHOOK_COLLECTIONS_FOR` maps each family → `{ parent, fields, udfFields?, excluded }` using **real registry collection names**. **`TicketNote` has NO `udfFields`** (confirmed in `registry.ts`) — omit it; `satisfies Record<WebhookEntityFamily, …>`.
- `buildWebhookRegistrationPlan(family, spec)`:
  - throw if `fields.length + (udfFields?.length ?? 0) < 1` (Autotask requires ≥1 field/UDF).
  - throw if `spec.udfFields?.length` and the family has no `udfFields` collection (TicketNote).
  - emit ordered `WebhookCreateStep[]`: parent first (`usesParentRef: false`), then fields, udf fields, excluded resources (all `usesParentRef: true`).
  - field body: `{ fieldID, isSubscribedField: subscribed ?? false, isDisplayAlwaysField: displayAlways ?? false }`; udf body uses `udfFieldID`; excluded body uses `{ resourceID }`.
- `resolveFieldIds(names, nameToId)`: **pure** map lookup; throw listing any unresolved names. JSDoc must state the integer `fieldID` is **not** in this library's `FieldInformation` (only `name` + `isSupportedWebhookField`) — the caller obtains the name→id map from live `entityInformation/fields` metadata.
- `executeWebhookRegistrationPlan(plan, runStep)`: optional driver; caller supplies `runStep(step, parentId)`; thread parent id into children. JSDoc note: webhook children reference the parent via a **`webhookID` foreign-key column on their own collection**, not the client's positional `parentId`.

**Acceptance:**
- `buildWebhookRegistrationPlan("TicketNote", { …, udfFields:[…] })` throws.
- A 0-field spec throws.
- A `Ticket` spec with 2 fields + 1 excluded resource yields 4 ordered steps (parent + 2 + 1).
- `resolveFieldIds(["status","missing"], map)` throws naming `missing`.

**Out of scope:** making HTTP calls; deriving field ids from `FieldInformation` (it has none — do not pretend).

---

## S4 — Error-log delivery parser `[Phase 2]`

**Goal:** Let consumers replay/inspect failed deliveries from `WebhookEventErrorLog.payload` (a `string`).

**Files:** create `src/core/webhooks/error-log.ts`.

**Depends on:** **S1** (`parseWebhookDelivery`, `AutotaskWebhookDelivery`); imports `WebhookEventErrorLog` from `../../generated/entities.js`.

**Spec:** `parseDeliveryFromErrorLog(log)` → `JSON.parse(log.payload)` then `parseWebhookDelivery`; return `null` on missing/invalid payload (don't throw — error-log payloads are best-effort captures). JSDoc: `payload` is the closest thing the REST API exposes to a raw captured delivery.

**Acceptance:** a log with a valid JSON `payload` returns a narrowable delivery; `payload: null` / non-JSON returns `null`. `pnpm typecheck` passes.

**Out of scope:** querying the error-log collection (that's the consumer's existing client call).

---

## S5 — Optional router/dispatcher `[Phase 3] [OPTIONAL — cut first if scope tightens]`

**Goal:** One-call verify→parse→dispatch ergonomics, layered on S1+S2. Strictly opt-in, tree-shakeable.

**Files:** create `src/core/webhooks/router.ts`.

**Depends on:** **S1 + S2**.

**Spec:** `createWebhookRouter({ secretKey, escapeBody? })` returns an object with `.on(entityType, action, handler)` (handler receives the **narrowed** delivery, e.g. `d.Fields: Partial<Ticket>`) and `.handleRequest(rawBody, signatureHeader)` → verifies, parses, dispatches to the matching handler, returns a small result (`{ ok, status }` or similar). No framework types; raw body + header string only.

**Guardrail (verifier-flagged):** this is the one piece that edges toward "framework." Keep it **dependency-free, separately importable, and never imported by `delivery.ts`/`signature.ts`** so it drops out of bundles that only want types. If scope tightens, demote to an example in S8 instead of shipping.

**Acceptance:** registering `on("Tickets","Update", h)` calls `h` with a delivery where `Fields` autocompletes as `Partial<Ticket>`; a bad signature short-circuits before dispatch. `pnpm typecheck` passes.

**Out of scope:** retries, queues, dedup stores, persistence (consumer's job — document in S8).

---

## S6 — Barrel + package wiring `[integration]`

**Goal:** Surface the new modules exactly like every other core helper.

**Files:** create `src/core/webhooks/index.ts`; edit `src/index.ts`; edit `package.json`.

**Depends on:** the file-slices it re-exports (build with whatever subset is done; this slice should be re-run when more land).

**Spec:**
- `src/core/webhooks/index.ts`: barrel re-exporting types + runtime from `delivery.js`, `signature.js`, `registration.js`, `error-log.js`, and `router.js` if present. Respect `verbatimModuleSyntax` (`export type` for types, `export` for runtime).
- `src/index.ts`: add a `// --- Webhooks ---` block re-exporting the webhook surface from `./core/webhooks/index.js`, matching the existing grouping/comment style.
- `package.json` `exports`: add
  ```json
  "./webhooks": {
    "types": "./dist/core/webhooks/index.d.ts",
    "import": "./dist/core/webhooks/index.js",
    "default": "./dist/core/webhooks/index.js"
  }
  ```
  `files` already ships `dist` + `src`; `sideEffects: false` already enables tree-shaking — no further change. Do **not** touch `tsconfig` (`include` already globs `src/**`).

**Acceptance:** `pnpm build` emits `dist/core/webhooks/index.{js,d.ts}`; both `import { verifyAutotaskSignature } from "autotask-rest-api-types"` and `from "autotask-rest-api-types/webhooks"` resolve in a consuming typecheck.

**Out of scope:** authoring the modules themselves.

---

## S7 — Tests & typetests `[cross-cutting]`

**Goal:** Lock the type guarantees and the verifier behavior.

**Files:** add to `typetest/` (extend the existing pattern) and a small runtime test for `signature.ts` (round-trip) and `registration.ts` (plan shape + guard throws). Use the repo's existing test/typetest mechanism — inspect `typetest/` first.

**Depends on:** the slices under test (S1 → typetests; S2/S3 → runtime tests).

**Spec / must-assert:**
- `delivery.Fields.title` resolves to `string | null | undefined` (not `unknown`) under `noUncheckedIndexedAccess: true` — the autocomplete guarantee.
- `Fields` access on a `Delete`-narrowed delivery is a type error (negative typetest).
- `computeAutotaskSignature` → `verifyAutotaskSignature` round-trips true; wrong-secret/tampered → false.
- `buildWebhookRegistrationPlan` throws for TicketNote+UDF and for 0 fields; emits correct ordered steps otherwise.

**Acceptance:** `pnpm typecheck` + the test command pass; negative typetests fail to compile when the guard is removed.

---

## S8 — Docs & example `[cross-cutting]`

**Goal:** Make the feature discoverable and correct-by-copy-paste.

**Files:** add a `## Webhooks` section to `README.md`; optionally extend `docs/AI_GUIDE.md`; add a Next.js App Router route to `examples/nextjs` (`app/api/autotask/route.ts`).

**Depends on:** final API of S1/S2/S3.

**Spec — the example must show the correct happy path:**
- Read **raw bytes** (`await req.text()`) **before** `JSON.parse` (the HMAC is over raw body).
- Verify with `verifyAutotaskSignature(raw, secret, req.headers.get(AUTOTASK_SIGNATURE_HEADER))`; **comment at the call site:** _"if real callouts return 401, retry with `{ escapeBody: true }` — Autotask may custom-escape the signed body; reverse-engineered, undocumented."_
- `parseWebhookDelivery` → narrow with `isDeliveryFor` + action guards → handle.
- Registration example: use `writtenId(res)` (not `as number`); build `nameToId` from live `fieldInfo("Tickets")` (return type is `FieldInformationResult` — access the fields array off the envelope, **not** `FieldInformation[]` directly); pass your API user's resource id to `excludedResourceIDs` to break echo loops.
- Document operational facts as **prose, not enforced**: ack 2xx fast (~10s timeout, retries), idempotency/dedup on `Guid`, `isReady` + owner-permission gating can make a "successful" registration never fire, silent auto-deactivation on sustained failures, ~50 active webhooks/entity, threshold-exceeded (number unconfirmed — don't state it as fact).

**Acceptance:** README section renders; example route typechecks against the package; no `as number`; raw-body-before-parse is explicit.

---

## SV — Live-callout verification `[cross-cutting, manual] [GATES S2/S1 authoritative status]`

**Goal:** Replace secondary-source assumptions with one real captured delivery. **Until done, the verifier and exact `Fields` shape are "best-effort."**

**Owner:** whoever has a live Autotask sandbox (likely the user). Not a code slice — a checklist.

**Confirm against one real webhook + capture (e.g. RequestBin / logged raw body):**
1. Exact envelope keys + casing (`Guid`/`EntityType`/`Id`/`EventTime`/`SequenceNumber`/`PersonID` + `Action`).
2. `Fields` shape: flat `{ name: value }` map **vs** `{ Name, Value }[]`; and whether UDFs are flat or nested under `userDefinedFields`.
3. Whether `Fields` key is **absent or `{}`** on `Delete`/`Deactivated`.
4. Signature: `X-Hook-Signature` header present; `HMAC_SHA1(secret, rawBytes)` base64 == header value **without** `escapeBody`; if not, confirm the escape set is needed.
5. `EventTime` literal format; picklist/reference fields = IDs (not labels).
6. Whether `Deactivated` hits `webhookUrl` or the `deactivationUrl`, and whether that callout is signed.

**Feedback loop:** any surprise → tighten the JSDoc in S1/S2 and the example in S8; flip `escapeBody` default only if raw verification fails on real traffic.

---

## Quick reference — verified repo facts the slices rely on

| Fact | Where |
|---|---|
| `TicketNote` webhook group has **no** `UdfField` collection (others have all four) | `src/generated/registry.ts` |
| `FieldInformation` has `name` + `isSupportedWebhookField` but **no `fieldID`** | `src/core/responses.ts:75-92` |
| `AutotaskWriteResult.itemId` is `number \| string` → use `writtenId()` | `src/core/util.ts`, `src/core/responses.ts` |
| `WebhookEventErrorLog.payload` is a `string` | `src/generated/entities.ts` |
| `EntityOf<K>`, `EntityName` available | `src/generated/registry.ts` |
| `UserDefinedField` = `{ name?, value? }`, `value: string \| null` | `src/core/udf.ts` |
| `include: ["src/**/*.ts"]`, `verbatimModuleSyntax: true`, `lib: ES2020`, `exactOptionalPropertyTypes: false` | `tsconfig.json` |
| `sideEffects: false`; subpath `exports` for `.`/`./entities`/`./metadata` | `package.json` |
