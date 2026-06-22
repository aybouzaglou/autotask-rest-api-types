# autotask-rest-api-types

**Comprehensive, type-safe TypeScript types for the Datto/Kaseya Autotask PSA REST API** — generated directly from Autotask's official Swagger 2.0 specification.

Built to make Autotask integrations in **Next.js / TypeScript** projects safe and self-documenting, and to help **AI coding assistants** write correct Autotask code (it ships a machine-readable catalog of every entity and operation).

- ✅ **223 entity interfaces** (Companies, Tickets, Contacts, Contracts, Configuration Items, Projects, Time Entries, attachments, …) with per-field JSDoc.
- ✅ **221 strongly-typed REST collections** mapped to their entity in `AutotaskEntities`.
- ✅ **Fully-typed query filters** — all 13 query operators plus grouped `and`/`or`, `includeFields`, a fluent filter DSL, and cursor pagination helpers.
- ✅ **Typed response envelopes** — `{ items, pageDetails }`, `{ item }`, `{ itemId }`, plus the entity-information / live picklist metadata shapes.
- ✅ **Two client surfaces** — drop-in typing for the popular [`@apigrate/autotask-restapi`](https://github.com/apigrate/autotask-restapi) connector, and a provider-agnostic `AutotaskTypedClient` you can implement over `fetch`.
- ✅ **Runtime catalog** — `AUTOTASK_COLLECTIONS` describes every collection (operations, UDF support, parent collections) for tooling and agents.
- ✅ **Optional instance enrichment** — `npx autotask-enrich` (read-only) captures **your own** instance's live picklist values, required/read-only flags, and reference targets into a file in **your** project, plus strict picklist type aliases (`TicketPriorityValue = 1 | 2 | 3 | 4`). Instance-specific data is never bundled or published — you generate it yourself.
- ✅ **Type-only by default** — no runtime dependencies; tree-shakeable; ESM with full `.d.ts`.

> Unofficial / community-maintained. "Autotask" is a trademark of Datto/Kaseya. Generated from the public API spec; not affiliated with or endorsed by Datto or Kaseya.

---

## Install

```bash
pnpm add autotask-rest-api-types
# or: npm i autotask-rest-api-types   /   yarn add autotask-rest-api-types
```

Install it as a normal dependency — the package ships a few **runtime** helpers (`filters`, `collectAll`/`iterateAll`, `getUdf`/`toUdfArray`, `writtenId`, `requireField`, `isPresent`, `isAutotaskError`, and the `AUTOTASK_COLLECTIONS` catalog). If you import **only types** (`import type …`), a dev dependency (`-D`) is fine.

The package has **no runtime dependencies of its own**. If you also want a transport, the examples below use the official connector:

```bash
pnpm add @apigrate/autotask-restapi
```

---

## Quick start — with the apigrate connector

The simplest way to get full autocomplete is to cast the connector instance to `AutotaskApi`:

```ts
import { AutotaskRestApi } from "@apigrate/autotask-restapi";
import type { AutotaskApi, Company } from "autotask-rest-api-types";
import { filters } from "autotask-rest-api-types";

const autotask = new AutotaskRestApi(
  process.env.AUTOTASK_USER!,        // API user (UserName header)
  process.env.AUTOTASK_SECRET!,      // secret (Secret header)
  process.env.AUTOTASK_INTEGRATION_CODE!, // tracking id (ApiIntegrationCode header)
) as unknown as AutotaskApi;

const f = filters<Company>();
const { items, pageDetails } = await autotask.Companies.query({
  maxRecords: 50,
  includeFields: ["id", "companyName", "isActive"],
  filter: [f.eq("isActive", true), f.beginsWith("companyName", "A")],
});

items.forEach((c: Company) => console.log(c.id, c.companyName));
```

Everything is typed end-to-end: `filter` fields autocomplete from the entity, `includeFields` is checked, and `items` is `Company[]`.

---

## Quick start — provider-agnostic (`fetch`, Next.js route handler, etc.)

Implement the small `AutotaskTypedClient` interface over any transport. The entity type is inferred from the collection name on every call:

```ts
import type { AutotaskTypedClient } from "autotask-rest-api-types";

// (sketch) your own thin wrapper around fetch + zone detection
const client: AutotaskTypedClient = createMyClient();

// `tickets` is typed as Ticket[] — inferred purely from the string "Tickets".
const { items: tickets } = await client.query("Tickets", {
  filter: [{ op: "eq", field: "status", value: 1 }],
});
```

See [`docs/AI_GUIDE.md`](docs/AI_GUIDE.md) for a complete `fetch`-based client implementation including header auth and zone detection, and [`examples/nextjs`](examples/nextjs) for a runnable Next.js Ticket Console (works simulated with no credentials, flips to live when present).

### Error handling

Failed requests return an `{ errors: string[] }` envelope (HTTP 400/500) — invalid picklist values, `maxRecords > 500`, missing required fields, etc. Type and narrow it with `AutotaskErrorResponse` / `isAutotaskError`:

```ts
import { isAutotaskError } from "autotask-rest-api-types";

const res = await fetch(url, { method: "POST", headers, body });
if (!res.ok) {
  const body = await res.json();
  if (isAutotaskError(body)) console.error(body.errors); // string[]
}
```

> **Connector vs `fetch`.** The apigrate connector (the `AutotaskApi` cast) **throws** on a failed request rather than returning the envelope — the call rejects with an `AutotaskApiError` carrying `.status` and `.details` (the `{ errors }` body). Wrap those calls in `try/catch` and read `err.details` / `err.status`. The `isAutotaskError` check above is for the raw `fetch` / `AutotaskTypedClient` path, which returns the body.

---

## Entities & the collection registry

Import any entity interface directly:

```ts
import type { Ticket, Contact, ConfigurationItem, ContractService } from "autotask-rest-api-types";
```

Map a collection name to its entity type generically:

```ts
import type { AutotaskEntities, EntityName, EntityOf } from "autotask-rest-api-types";

type T = AutotaskEntities["Tickets"];     // Ticket
type C = EntityOf<"Companies">;           // Company
function load<K extends EntityName>(name: K): Promise<EntityOf<K>[]> { /* ... */ }
```

### Field typing conventions

Generated from the spec, so the mapping is mechanical and consistent:

| Swagger | TypeScript | Notes |
|---|---|---|
| `integer` (int32 / int64) | `number` | Autotask ids stay within JS safe-integer range |
| `number` (double) | `number` | |
| `string` | `string` | |
| `string` (`date-time`) | `string` | UTC, **no** `Z`/offset, e.g. `2024-01-31T15:04:05.307`; append `"Z"` to parse |
| `string` (`byte`) | `string` | base64 (attachment `data`) |
| `boolean` | `boolean` | |
| `userDefinedFields` | `UserDefinedField[]` | name/value pairs (see below) |

**Every field is optional and nullable** (`field?: T | null`). This is deliberate and reflects the API's real behavior: Autotask returns `null` for empty fields and omits any field you leave out of `includeFields`. `id` is `readonly id?: number` (server-assigned, never null on a fetched record). Read-only fields (server-managed, e.g. `createDate`) carry the `readonly` modifier and JSDoc.

### Working with nullable fields

Helpers reduce the narrowing tax of the null-everywhere shape:

```ts
import { requireField, isPresent } from "autotask-rest-api-types";
import type { Loaded, WithId, Company } from "autotask-rest-api-types";

// get() resolves to bare `null` on a 404 (the apigrate connector returns the
// API body verbatim), so null-check the result before destructuring `item`.
const res = await autotask.Companies.get(1);
if (res?.item) {
  const name = requireField(res.item, "companyName"); // string — throws if null/absent
  const loaded = res.item as Loaded<Company>;          // every field non-null (assertion of intent)
  loaded.companyName.trim();
}

const active = companies.filter((c) => isPresent(c.companyName)); // typed narrowing in filter
const withId: WithId<Company> = { id: 1, companyName: "Acme" };    // id guaranteed present
```

### Legacy business-object names

Autotask's REST collection names differ from its older SOAP/business-object names: **Company = `Account`**, **ConfigurationItem = `InstalledProduct`**, **BillingCode = `AllocationCode`**, etc. Each entity's legacy name is in `AUTOTASK_COLLECTIONS[name].entity`, and `ENTITY_TO_COLLECTION` resolves the reverse:

```ts
import { ENTITY_TO_COLLECTION } from "autotask-rest-api-types";
ENTITY_TO_COLLECTION["Account"];           // "Companies"
ENTITY_TO_COLLECTION["InstalledProduct"];  // "ConfigurationItems"
```

---

## Querying

Queries follow the Swagger `QueryModel`: `{ maxRecords?, includeFields?, filter[] }`. Top-level `filter` entries are combined with **AND**; use explicit `and` / `or` groups for anything else.

### Operators

| Kind | Operators |
|---|---|
| Comparison | `eq`, `noteq`, `gt`, `gte`, `lt`, `lte`, `beginsWith`, `endsWith`, `contains` |
| Existence (no value) | `exist`, `notExist` |
| Set (array value) | `in`, `notIn` |
| Grouping (nested `items`) | `and`, `or` |

### As plain objects

```ts
import type { AutotaskQuery, Ticket } from "autotask-rest-api-types";

const q: AutotaskQuery<Ticket> = {
  maxRecords: 100,
  includeFields: ["id", "ticketNumber", "title", "status"],
  filter: [
    { op: "eq", field: "companyID", value: 123 },
    { op: "in", field: "status", value: [1, 5, 8] },
    { op: "or", items: [
      { op: "gte", field: "createDate", value: "2024-01-01T00:00:00Z" },
      { op: "exist", field: "lastActivityDate" },
    ] },
  ],
};
```

### With the fluent DSL

```ts
import { filters } from "autotask-rest-api-types";
import type { Ticket } from "autotask-rest-api-types";

const f = filters<Ticket>();
const q = {
  filter: [
    f.eq("companyID", 123),
    f.in("status", [1, 5, 8]),
    f.or(f.gte("createDate", "2024-01-01T00:00:00Z"), f.exist("lastActivityDate")),
    f.udf("CustomerRef", "eq", "ACME-001"), // user-defined field
  ],
} satisfies AutotaskQuery<Ticket>;
```

### Pagination

Autotask returns up to **500 records per page** (`MAX_PAGE_SIZE`) with a `pageDetails` block. To pull an entire result set, use the built-in id-cursor helpers — robust and stateless (no reliance on `nextPageUrl`):

```ts
import { collectAll, iterateAll } from "autotask-rest-api-types";

// Buffer everything:
const all = await collectAll((q) => autotask.Tickets.query(q), {
  filter: [{ op: "eq", field: "companyID", value: 123 }],
});

// Or stream page-by-page:
for await (const ticket of iterateAll((q) => autotask.Tickets.query(q), baseQuery)) {
  // ...
}
```

---

## Create / Update / Delete

```ts
import type { CreateModel, UpdateModel, Ticket } from "autotask-rest-api-types";
import { writtenId } from "autotask-rest-api-types";

// Create — omit `id` (server-assigned). Returns HTTP 200 with { itemId }.
const create: CreateModel<Ticket> = { companyID: 1, title: "Server down", status: 1, priority: 2 };
const res = await autotask.Tickets.create(create);
const id = writtenId(res); // normalize itemId to a number

// Update (PATCH, partial) — only the fields you send change. `id` is required.
const patch: UpdateModel<Ticket> = { id, status: 5 };
await autotask.Tickets.update(patch);

// Delete — only on entities that allow it. Tickets are NOT deletable via the API
// (AUTOTASK_COLLECTIONS.Tickets.canDelete === false); a TimeEntry, for example, is:
await autotask.TimeEntries.delete(someTimeEntryId);
```

`CreateInput<"Tickets">` / `UpdateInput<"Tickets">` are convenience aliases keyed by collection name.

> **PATCH vs PUT — read this.** `update()` is a **PATCH** (sparse): only the fields you send are changed. `replace()` is a **PUT** (full replace): **every writable field you omit from the body is set to `null`/default.** The types enforce this — `replace()` takes a `ReplaceModel<T>` that **requires every writable field** (read-only fields excluded), so a partial like `{ id, title }` won't compile; build it from a fully-loaded record (`replace({ ...loaded, title })`). Prefer `update()` unless you deliberately want a full replace. Create, update, and replace all return **HTTP 200** with `{ itemId }` (Autotask does not use `201`).

> **Many entities can't be deleted via the API** (e.g. `Companies`, `Tickets`), and child entities like `*Notes` are **created/updated under their parent** (`POST /Companies/{parentId}/Notes`). The runtime catalog records this — check `AUTOTASK_COLLECTIONS[name].canDelete` and `.parentWriteOnly` / `.parents` before assuming an operation exists.

---

## User-defined fields (UDFs)

UDFs arrive as an array of `{ name, value }` pairs (values are always strings on the wire):

```ts
import { getUdf, toUdfArray } from "autotask-rest-api-types";

const ref = getUdf(ticket.userDefinedFields, "CustomerRef"); // string | null

await autotask.Tickets.update({
  id: 123,
  userDefinedFields: toUdfArray({ CustomerRef: "ACME-001", SlaTier: 2 }),
});
```

---

## Live metadata & picklists

Picklist option values are **instance-specific** and therefore not in the static spec — fetch them at runtime via the entity-information endpoints, which are fully typed here:

```ts
import type { FieldInformationResult, PickListValue } from "autotask-rest-api-types";

const { fields } = await autotask.Tickets.fieldInfo();
const status = fields.find((x) => x.name === "status");
status?.picklistValues?.forEach((v: PickListValue) => console.log(v.value, "→", v.label));
```

`info()`, `fieldInfo()`, and `udfInfo()` are typed to `EntityInformationResult`, `FieldInformationResult`, and `UserDefinedFieldInformationResult`.

### Captured field metadata (generate your own — never bundled)

Picklist values, required/read-only flags, and reference targets are **instance-specific**, so they are **not** part of this package — shipping one tenant's configuration to everyone would be both wrong and a privacy leak. Instead, generate a snapshot of **your** instance into **your** project:

```bash
# read-only against your instance; reads creds from ./.env in your project
npx autotask-enrich ./autotask-field-metadata.ts
```

`.env` keys recognized (case-insensitive): user (`APIUSER`/`AUTOTASK_USER`), secret (`APISECRET`/`AUTOTASK_SECRET`), tracking code (`TRACKINGID`/`AUTOTASK_INTEGRATION_CODE`), optional full zone URL (`AUTOTASK_BASE_URL`). The tool **only issues GET requests** — it can't create, modify, or delete anything.

The generated file exports lookup helpers and **opt-in strict picklist types**, which you import from your own path:

```ts
import {
  getFieldMeta, getPicklist, picklistLabel, picklistValue, FIELD_METADATA,
  type TicketPriorityValue,
} from "./autotask-field-metadata";

getFieldMeta("Tickets", "status")?.isRequired;                       // true
getFieldMeta("Tickets", "assignedResourceID")?.referenceEntityType; // "Resource"
getPicklist("Companies", "companyType");                            // [{ value: 1, label: "Customer" }, …]
picklistLabel("Tickets", "priority", 1);                            // "High"
picklistValue("Tickets", "priority", "Critical");                   // 4

const priority: TicketPriorityValue = 2; // 1 | 2 | 3 | 4 — `99` would be a compile error
```

> These values mirror the instance they were captured from and change with your Autotask configuration — re-run the command to refresh. Add the generated file to `.gitignore` if your instance config is sensitive.

---

## Runtime collection catalog

`AUTOTASK_COLLECTIONS` is a typed `as const` map of every REST collection — great for building UIs, validation, or guiding an AI assistant:

```ts
import { AUTOTASK_COLLECTIONS, COLLECTION_NAMES } from "autotask-rest-api-types";

AUTOTASK_COLLECTIONS.Tickets;
// {
//   name: "Tickets", entity: "Ticket", model: "TicketModel", typed: true,
//   canQuery: true, canCount: true, canGet: true, canCreate: true,
//   canUpdate: true, canDelete: false, hasUserDefinedFields: true,
//   parentWriteOnly: false, deleteRequiresParent: false, parents: []
// }

const updatable = COLLECTION_NAMES.filter((n) => AUTOTASK_COLLECTIONS[n].canUpdate);
```

---

## Design notes & limitations

- **Everything is `| null` and optional.** Intentional — it forces you to handle Autotask's empty-as-null reality and partial responses. Narrow with a guard (`if (c.companyName != null) …`) when you need a concrete value.
- **Filter `value` is not correlated to the field's type.** `value` is `string | number | boolean`. This is required so UDF names and dotted child-field paths (arbitrary strings) remain valid `field`s — TypeScript can't subtract known keys from `string`, so correlation would break those legitimate queries.
- **Picklist fields are `number` in the base interfaces** (their valid codes are instance-specific). For real values + strict types, use your own generated `./autotask-field-metadata` file (`getPicklist`, `picklistLabel`, and the `*Value` aliases — see [Captured field metadata](#captured-field-metadata-generate-your-own--never-bundled)) or call `fieldInfo()` live.
- **Reference (foreign-key) fields are `number`** in the base interfaces; your generated `./autotask-field-metadata` (`referenceEntityType`) and live `fieldInfo()` both report the target entity.
- **`CollectionName` ⊋ `EntityName`.** `AUTOTASK_COLLECTIONS` / `CollectionName` cover *every* REST path including action-only ones (`Version`, `ZoneInformation`, `Authenticate`, …). The client surfaces use `EntityName` / `TypedCollectionName` — only collections with a generated entity interface (`typed: true`).
- **`exactOptionalPropertyTypes` compatible.** Types are authored as `?: T | null`; the `| null` mirrors the wire. Works with the flag on or off.

### Rate limits

Autotask allows **10,000 external requests per hour per database** (across all integrations), and adds latency as you approach it (0.5s at 50%, 1s at 75%+). Check current usage via `GET /ThresholdInformation` (typed as `ThresholdInformation`). Combine with the `collectAll` / `iterateAll` helpers, which page at the 500-record server cap.

---

## Regenerating from a newer spec

The committed `swagger.json` is the single source of truth. To refresh against a newer API version:

```bash
curl -s https://webservices.autotask.net/ATServicesRest/swagger/docs/v1 -o swagger.json
npm run generate   # rewrites src/generated/*
npm run build
```

`scripts/generate.mjs` is the only generator; hand-written code in `src/core` and `src/client.ts` is never touched.

To capture instance-specific picklist/field metadata for local development (read-only API calls, credentials from `.env`):

```bash
npm run enrich   # writes src/generated/field-metadata.ts (git-ignored, NOT published)
npm run build
```

The output is **instance-specific** and therefore git-ignored and excluded from the published tarball — it never leaves your machine. Consumers of the published package generate their own with `npx autotask-enrich` (see [Captured field metadata](#captured-field-metadata-generate-your-own--never-bundled)). The enrich client **only issues GET requests** — it can't create, modify, or delete data.

---

## License

MIT.
