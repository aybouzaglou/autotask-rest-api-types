# Autotask Types — Next.js Ticket Console (example)

A small Next.js (App Router) app that exercises [`autotask-rest-api-types`](../../) end-to-end:

- **Typed query + create** for Tickets via a `fetch`-based `AutotaskTypedClient`.
- **Picklist dropdowns** (status / priority / queue) populated from a small **sample** metadata module ([`lib/field-metadata-sample.ts`](lib/field-metadata-sample.ts)) — generic Autotask defaults, not anyone's tenant data. A real app generates its own with `npx autotask-enrich`.
- **Typed error handling** — API errors surface as `{ errors: string[] }` (the real Autotask shape).
- **Runs with no credentials** in **SIMULATED** mode (mock backend), and flips to **LIVE** only when you opt in (see below).
- **Write guard** — only company **688** can be written, enforced on the server route (and mirrored in the simulated backend).

> ⚠️ **Demo, not production.** The `/api/tickets` route has **no authentication or rate limiting**. Live mode is gated behind an explicit `ENABLE_LIVE_DEMO=1` flag so it can't switch on by accident, but you should still never deploy this route to the public internet against a real instance.

> 🔔 **Webhook receiver.** `POST /api/autotask` verifies inbound Autotask webhook deliveries against the raw request body. It needs `AUTOTASK_WEBHOOK_SECRET` (the registered webhook's `secretKey`) and returns `500` until it is set — see [`.env.local.example`](.env.local.example).

## Run it (simulated — no credentials)

```bash
cd examples/nextjs
pnpm install      # the parent package is referenced via file:../..
pnpm dev          # http://localhost:3000
```

You'll see three mock tickets and can create more. Try creating a ticket with an invalid picklist value to see the typed error envelope.

## Run it live

```bash
cp .env.local.example .env.local   # set ENABLE_LIVE_DEMO=1 and your API user / secret / tracking code
pnpm dev
```

Live mode requires **both** `ENABLE_LIVE_DEMO=1` **and** credentials. With both present the badge switches to **LIVE** and every action hits your real Autotask instance (writes still restricted to company 688). The list query uses `includeFields` and the create returns `{ itemId }`.

> If you change the parent package, rebuild it first (`pnpm build` in the repo root) so the example picks up the latest `dist`.

## What to look at

| File | Shows |
|---|---|
| [`lib/autotask.ts`](lib/autotask.ts) | A complete typed `fetch` client (zone detection, header auth, `AutotaskApiError`) implementing `AutotaskTypedClient` |
| [`lib/tickets-service.ts`](lib/tickets-service.ts) | Live-vs-simulated switch (`ENABLE_LIVE_DEMO` gate); `includeFields` query; picklist options from the sample module |
| [`app/api/tickets/route.ts`](app/api/tickets/route.ts) | Route handlers (GET list / POST create) with the 688 write guard |
| [`app/api/autotask/route.ts`](app/api/autotask/route.ts) | Webhook receiver: raw-body HMAC verification (`AUTOTASK_WEBHOOK_SECRET`), `parseWebhookDelivery`, and typed `isDeliveryFor`/action narrowing |
| [`app/ticket-console.tsx`](app/ticket-console.tsx) | Client UI: picklist dropdowns, create form, typed error display |

Type-checks and builds cleanly with `pnpm build` (`next build`).
