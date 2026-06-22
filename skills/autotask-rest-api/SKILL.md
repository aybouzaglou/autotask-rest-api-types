---
name: autotask-rest-api
description: Use when writing or reviewing TypeScript against the Datto/Kaseya Autotask PSA REST API with the autotask-rest-api-types package — covering entities, query filters, create/update/delete, UDFs, picklists, pagination, and webhooks. Encodes the rules that keep generated code compiling and matching the wire, including the null-everywhere field shape, instance-specific picklist codes, PATCH-vs-PUT writes, parent-scoped child entities, and the exact filter operator set.
license: MIT
metadata:
  author: Abraham Bouzaglou
  homepage: https://github.com/aybouzaglou/autotask-rest-api-types
  version: "0.1.0"
---

Read this before generating Autotask code. The `autotask-rest-api-types` package gives you typed entities, queries, responses, and a client surface; this skill is the set of rules that make code written against them correct.

## Source of truth

- **Entities** — import interfaces by name: `import type { Ticket, Company, Contact } from "autotask-rest-api-types"`. There are 223. Exact field names and types live in the interfaces; import them and let the compiler guide you.
- **What exists and what you may do** — the runtime catalog `AUTOTASK_COLLECTIONS` (typed `as const`) describes every collection: `canQuery`, `canCreate`, `canUpdate`, `canDelete`, `hasUserDefinedFields`, `parentWriteOnly`, `parents`, and the legacy `entity` name. **Consult the catalog before assuming an operation is allowed.**
- **Collection ↔ entity name** — `AUTOTASK_COLLECTIONS["Companies"].entity === "Account"`; reverse with `ENTITY_TO_COLLECTION["Account"] === "Companies"`.

## Hard rules

These prevent the most common mistakes.

1. **Every field is optional and `| null`.** Reads are `T | null | undefined` — this null-everywhere shape is deliberate (Autotask returns `null` for empty fields and omits anything outside `includeFields`). Narrow before use, or reach for `requireField(obj, "field")` / `as Loaded<T>`. Never assume a field is populated.
2. **Dates are UTC date-time strings with no zone designator** (e.g. `"2024-01-31T15:04:05.307"`), not `Date` objects. Append `"Z"` before parsing — `new Date(s + "Z")` — or JS reads them as local time and shifts every value by the runtime's offset.
3. **Picklist and reference fields are `number`, and their codes are instance-specific.** Don't invent codes for `Ticket.status`, `Ticket.priority`, `Company.companyType`, etc. Resolve them from your generated field-metadata file (`npx autotask-enrich ./autotask-field-metadata.ts`, then `getPicklist`, `picklistLabel`, `picklistValue`, and `*Value` aliases like `TicketPriorityValue`) or call `fieldInfo()` live. A reference field's target entity is `getFieldMeta(collection, field)?.referenceEntityType` (or `referenceEntityType` from `fieldInfo()`).
4. **The filter operators are exactly:** `eq`, `noteq`, `gt`, `gte`, `lt`, `lte`, `beginsWith`, `endsWith`, `contains`, `exist`, `notExist`, `in`, `notIn`, plus grouping `and` / `or`. Spelling is case-sensitive: it's `noteq` (not `ne`), `beginsWith` (not `startsWith`), `notExist`, `notIn`.
5. **PATCH, not PUT, by default.** `update()` is a PATCH (only the fields you send change). `replace()` is a PUT, which sets every omitted writable field to `null`. Use `replace()` only for a deliberate full overwrite.
6. **Writes return `{ itemId }` (HTTP 200, not 201)** — just the id, not the saved record. Re-`get()` if you need the object back. Use `writtenId(res)` to read it as a `number`.
7. **Not everything is deletable, and children write under their parent.** `Companies` and `Tickets` have no delete endpoint; `*Notes`, `*Attachments`, etc. are parent-scoped (`POST /Companies/{parentId}/Notes`). Check `AUTOTASK_COLLECTIONS[name].canDelete` / `.parentWriteOnly` / `.deleteRequiresParent` / `.parents`. When `deleteRequiresParent` is true (e.g. `ConfigurationItemDnsRecords`), delete via `delete(parentId, id)`.
8. **Max 500 records per page.** Use `collectAll` / `iterateAll` to page large sets — they use stateless id-cursor paging.
9. **Filter `value` is not type-checked against the field.** `{ op: "eq", field: "status", value: "open" }` compiles even though `status` is numeric (the compiler can't correlate them — UDF and dotted-path fields require `field: string`). Get the value type right yourself.
10. **Rate limit: 10,000 requests/hour/database.** Batch with queries + `includeFields`; avoid N+1 fetch loops.

## Webhook rules

- Verify signatures against the **raw request body** before `JSON.parse`: `verifyAutotaskSignature(raw, secret, req.headers.get(AUTOTASK_SIGNATURE_HEADER))`.
- `{ escapeBody: true }` is an opt-in fallback only — reverse-engineered and undocumented. Enable it only after a real callout fails raw-body verification.
- Parse with `parseWebhookDelivery`, then narrow with `isDeliveryFor(delivery, "Tickets")` and an action guard such as `isUpdateDelivery`. `parseWebhookDelivery` accepts legacy payload names (e.g. `Account`) and normalizes them to collection names (`Companies`). `Fields` exists at the type level only on create/update deliveries.
- Treat delivered `Fields` as permissive — a live capture is still needed to confirm exact casing, UDF nesting, and whether delete/deactivation callouts omit `Fields` or send `{}`.
- For registration from field names, do **not** use the parent entity's `fieldInfo()` or the parent webhook route for metadata. Query the child collection (`TicketWebhookFields/entityInformation/fields`, and `TicketWebhookUdfFields/entityInformation/fields` for UDFs) and read the `fieldID` / `udfFieldID` picklists.

> **Known catalog gap.** `ResourceTimeOffAdditional` and `ResourceTimeOffBalances` appear in `AUTOTASK_COLLECTIONS` with `typed: false` and all-false flags. The API exposes them only under their parent (`GET/PUT/PATCH /Resources/{parentId}/TimeOffAdditional`, `GET /Resources/{parentId}/TimeOffBalances[/{year}]`), with no top-level path, so the catalog can't infer their shape. Use the parent path directly, not the catalog flags.

## Building queries

Prefer the typed DSL — it's concise and the operators are guaranteed valid:

```ts
import { filters } from "autotask-rest-api-types";
import type { AutotaskQuery, Ticket } from "autotask-rest-api-types";

const f = filters<Ticket>();
const query = {
  maxRecords: 500,
  includeFields: ["id", "ticketNumber", "title", "status", "assignedResourceID"],
  filter: [
    f.eq("companyID", 123),
    f.in("status", [1, 8, 9]),
    f.or(f.gte("createDate", "2024-01-01T00:00:00Z"), f.exist("lastActivityDate")),
  ],
} satisfies AutotaskQuery<Ticket>;
```

## A dependency-free typed `fetch` client

When you need a transport without the apigrate connector, implement `AutotaskTypedClient` over `fetch` with zone detection and header auth — no external packages. The full implementation is in [`references/fetch-client.md`](references/fetch-client.md); use it verbatim and call it like:

```ts
const at = createAutotaskClient({
  username: process.env.AUTOTASK_USER!,
  secret: process.env.AUTOTASK_SECRET!,
  integrationCode: process.env.AUTOTASK_INTEGRATION_CODE!,
});

const { items } = await at.query("Tickets", {
  filter: [{ op: "eq", field: "status", value: 1 }],
  includeFields: ["id", "ticketNumber", "title"],
});
```

Keep credentials server-side only (e.g. a Next.js route handler, never the browser).

## Frequently used entities and key fields

| Collection | Entity (`.entity`) | Notable fields |
|---|---|---|
| `Companies` | `Account` | `companyName`, `companyType` (picklist), `isActive`, `ownerResourceID`, `phone`, `city` |
| `Contacts` | `Contact` | `companyID`, `firstName`, `lastName`, `emailAddress`, `isActive` |
| `Tickets` | `Ticket` | `companyID`, `title`, `status` (picklist), `priority` (picklist), `queueID`, `assignedResourceID`, `dueDateTime` |
| `TicketNotes` | `TicketNote` | parent-write under `Tickets`; `ticketID`, `description`, `noteType`, `publish` |
| `Contracts` | `Contract` | `companyID`, `contractName`, `contractType`, `startDate`, `endDate`, `status` |
| `ConfigurationItems` | `InstalledProduct` | `companyID`, `referenceTitle`, `productID`, `serialNumber`, `installDate` |
| `Projects` | `Project` | `companyID`, `projectName`, `status`, `projectLeadResourceID` |
| `Tasks` | `Task` | parent under `Projects`; `projectID`, `title`, `status`, `assignedResourceID` |
| `TimeEntries` | `TimeEntry` | `ticketID` / `taskID`, `resourceID`, `hoursWorked`, `dateWorked`, `isNonBillable` |
| `Resources` | `Resource` | `userName`, `firstName`, `lastName`, `email`, `isActive` |

For picklist codes (`status`, `priority`, …), call `fieldInfo()` against the live instance or use your generated field-metadata; never assume codes hold across instances.
