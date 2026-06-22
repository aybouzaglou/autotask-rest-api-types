# Autotask REST API — Guide for AI Coding Assistants

This package (`autotask-rest-api-types`) gives you everything needed to write **correct, type-checked** Autotask PSA integrations. Read this before generating Autotask code.

## Source of truth

- **Entities:** import interfaces by name — `import type { Ticket, Company, Contact } from "autotask-rest-api-types"`. There are 200+.
- **What exists & what you can do:** the runtime catalog `AUTOTASK_COLLECTIONS` (typed `as const`) describes every collection — `canQuery`, `canCreate`, `canUpdate`, `canDelete`, `hasUserDefinedFields`, `parentWriteOnly`, `parents`, and the legacy `entity` name. **Consult it before assuming an operation is allowed.**
- **Collection ↔ entity name:** `AUTOTASK_COLLECTIONS["Companies"].entity === "Account"`; reverse via `ENTITY_TO_COLLECTION["Account"] === "Companies"`.

## Hard rules (these prevent the most common mistakes)

1. **Every field is `optional` and `| null`.** Reads are `T | null | undefined`. Narrow before use, or use `requireField(obj, "field")` / `as Loaded<T>`. Never assume a field is populated.
2. **Dates are UTC date-time strings with no timezone designator** (e.g. `"2024-01-31T15:04:05.307"`), not `Date` objects. Append `"Z"` before parsing — `new Date(s + "Z")` — or JS reads them as local time and shifts every value by the runtime's offset.
3. **Picklist fields are `number`** (e.g. `Ticket.status`, `Ticket.priority`, `Company.companyType`). Valid codes are **instance-specific**. Don't invent them — resolve them from your own generated field-metadata file (run `npx autotask-enrich ./autotask-field-metadata.ts`, then import `getPicklist(collection, field)`, `picklistLabel`, `picklistValue`, and `*Value` literal-union aliases like `TicketPriorityValue` from `./autotask-field-metadata`), or call `fieldInfo()` live. Reference (foreign-key) fields are `number` too; their target entity is `getFieldMeta(collection, field)?.referenceEntityType` (or `referenceEntityType` from `fieldInfo()`).
4. **Filter operators** are exactly: `eq`, `noteq`, `gt`, `gte`, `lt`, `lte`, `beginsWith`, `endsWith`, `contains`, `exist`, `notExist`, `in`, `notIn`, plus grouping `and` / `or`. Spelling is case-sensitive — it's `noteq` (not `ne`), `beginsWith` (not `startsWith`), `notExist`, `notIn`.
5. **`update()` = PATCH (partial). `replace()` = PUT, which sets every omitted writable field to `null`.** Default to `update()`. Only `replace()` for a deliberate full overwrite.
6. **Create/update/replace return `{ itemId }` (HTTP 200, not 201)** — just the id, not the full record. Re-`get()` if you need the saved object. Use `writtenId(res)` to get a `number`.
7. **Not everything is deletable, and child entities write under their parent.** `Companies` and `Tickets` have no delete endpoint. `*Notes`, `*Attachments`, etc. are created/updated under the parent path (`POST /Companies/{parentId}/Notes`). Check `AUTOTASK_COLLECTIONS[name].canDelete` / `.parentWriteOnly` / `.deleteRequiresParent` / `.parents`. When `deleteRequiresParent` is true (e.g. `ConfigurationItemDnsRecords`), delete via `delete(parentId, id)` — the top-level `delete(id)` has no endpoint.
8. **Max 500 records per page.** Use `collectAll` / `iterateAll` to page large sets (they use stateless id-cursor paging).
9. **Filter `value` is not type-checked against the field.** `{ op: "eq", field: "status", value: "open" }` compiles even though `status` is numeric — the compiler can't correlate them (UDF/dotted-path fields require `field: string`). Get the value type right yourself.
10. **Rate limit: 10,000 requests/hour/database.** Batch with queries + `includeFields`; avoid N+1 fetch loops.

## Webhook rules

- Verify webhook signatures against the raw request body before `JSON.parse`: `verifyAutotaskSignature(raw, secret, req.headers.get(AUTOTASK_SIGNATURE_HEADER))`.
- Keep `{ escapeBody: true }` as an opt-in fallback only. It is reverse-engineered from community behavior and should be enabled only after a real Autotask callout fails raw-body verification.
- Parse with `parseWebhookDelivery`, then narrow with `isDeliveryFor(delivery, "Tickets")` and action guards such as `isUpdateDelivery`. `parseWebhookDelivery` accepts legacy payload entity names such as `Account` and normalizes them to collection names such as `Companies`. `Fields` exists at the type level only on create/update deliveries.
- Treat delivered `Fields` as permissive. A raw live capture still needs to confirm exact casing, UDF nesting, and whether delete/deactivation callouts omit `Fields` or send an empty object.
- For registration from field names, do not use parent entity `fieldInfo()` and do not query the parent webhook route for metadata. Query the child collection metadata (`TicketWebhookFields/entityInformation/fields`, and `TicketWebhookUdfFields/entityInformation/fields` for UDFs), then resolve the `fieldID` / `udfFieldID` picklists.

> **Known catalog gap:** `ResourceTimeOffAdditional` and `ResourceTimeOffBalances` appear in `AUTOTASK_COLLECTIONS` with `typed: false` and all-false capability flags. That is a generation artifact — the API exposes them only under their parent (`GET/PUT/PATCH /Resources/{parentId}/TimeOffAdditional`, `GET /Resources/{parentId}/TimeOffBalances[/{year}]`), with no top-level operational path, so the catalog can't infer their shape. Address them via the parent path directly, not via the catalog flags.

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

## A complete, dependency-free typed client (`fetch`)

Implements `AutotaskTypedClient` with zone detection and header auth. No external packages. (Covers top-level entities; for child-entity writes use the apigrate connector or build the parent-scoped path.)

```ts
import type {
  AutotaskTypedClient,
  EntityName,
  EntityOf,
  AutotaskQuery,
  AutotaskQueryResult,
  AutotaskItemResult,
  AutotaskWriteResult,
  AutotaskCountResult,
  AutotaskCountQuery,
  CreateInput,
  UpdateInput,
  ReplaceInput,
  EntityInformationResult,
  FieldInformationResult,
  UserDefinedFieldInformationResult,
  ZoneInformation,
} from "autotask-rest-api-types";

export interface AutotaskCredentials {
  username: string;        // API user
  secret: string;          // API user secret
  integrationCode: string; // tracking identifier
}

export function createAutotaskClient(creds: AutotaskCredentials): AutotaskTypedClient {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ApiIntegrationCode: creds.integrationCode,
    UserName: creds.username,
    Secret: creds.secret,
  };

  // Discover the account's zone base URL once, then cache it.
  let basePromise: Promise<string> | null = null;
  const base = (): Promise<string> => {
    if (!basePromise) {
      const probe = "https://webservices.autotask.net/ATServicesRest";
      const url = `${probe}/V1.0/zoneInformation?user=${encodeURIComponent(creds.username)}`;
      basePromise = fetch(url, { headers }).then(async (r) => {
        if (!r.ok) throw new Error(`Zone detection failed: ${r.status} ${await r.text()}`);
        const zone = (await r.json()) as ZoneInformation;
        if (!zone.url) throw new Error("Zone response missing url");
        return zone.url.replace(/\/$/, ""); // e.g. https://webservices14.autotask.net/ATServicesRest
      });
    }
    return basePromise;
  };

  async function call<R>(method: string, path: string, body?: unknown, notFoundOk = false): Promise<R> {
    const url = `${await base()}/V1.0/${path}`;
    const res = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    // Only get(id) treats 404 as "not found"; for any other verb a 404 is a
    // real error (wrong path / stale base URL) and must throw.
    if (notFoundOk && res.status === 404) return { item: null } as R;
    if (!res.ok) throw new Error(`Autotask ${method} ${path} → ${res.status}: ${await res.text()}`);
    return (await res.json()) as R;
  }

  return {
    query: <K extends EntityName>(c: K, q: AutotaskQuery<EntityOf<K>>) =>
      call<AutotaskQueryResult<EntityOf<K>>>("POST", `${c}/query`, q),
    count: <K extends EntityName>(c: K, q: AutotaskCountQuery<EntityOf<K>>) =>
      call<AutotaskCountResult>("POST", `${c}/query/count`, q),
    get: <K extends EntityName>(c: K, id: number) =>
      call<AutotaskItemResult<EntityOf<K>>>("GET", `${c}/${id}`, undefined, true),
    create: <K extends EntityName>(c: K, data: CreateInput<K>) =>
      call<AutotaskWriteResult>("POST", `${c}`, data),
    update: <K extends EntityName>(c: K, data: UpdateInput<K>) =>
      call<AutotaskWriteResult>("PATCH", `${c}`, data),
    replace: <K extends EntityName>(c: K, data: ReplaceInput<K>) =>
      call<AutotaskWriteResult>("PUT", `${c}`, data),
    delete: <K extends EntityName>(c: K, id: number) =>
      call<AutotaskWriteResult>("DELETE", `${c}/${id}`),
    info: <K extends EntityName>(c: K) =>
      call<EntityInformationResult>("GET", `${c}/entityInformation`),
    fieldInfo: <K extends EntityName>(c: K) =>
      call<FieldInformationResult>("GET", `${c}/entityInformation/fields`),
    udfInfo: <K extends EntityName>(c: K) =>
      call<UserDefinedFieldInformationResult>("GET", `${c}/entityInformation/userDefinedFields`),
  };
}
```

Usage (e.g. in a Next.js route handler — keep credentials server-side only):

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

## Frequently used entities & key fields

| Collection | Entity (`.entity`) | Notable fields |
|---|---|---|
| `Companies` | `Account` | `companyName`, `companyType` (picklist), `isActive`, `ownerResourceID`, `phone`, `city` |
| `Contacts` | `Contact` | `companyID`, `firstName`, `lastName`, `emailAddress`, `isActive` |
| `Tickets` | `Ticket` | `companyID`, `title`, `status` (picklist), `priority` (picklist), `queueID`, `assignedResourceID`, `dueDateTime` |
| `TicketNotes` | `TicketNote` | parent-write under `Tickets`; `ticketID`, `description`, `noteType`, `publish` |
| `Contracts` | `Contract` | `companyID`, `contractName`, `contractType`, `startDate`, `endDate`, `status` |
| `ConfigurationItems` | `InstalledProduct` | `companyID`, `referenceTitle`, `productID`, `serialNumber`, `installDate` |
| `Projects` | `Project` | `companyID`, `projectName`, `status`, `projectManagerResourceID` |
| `Tasks` | `Task` | parent under `Projects`; `projectID`, `title`, `status`, `assignedResourceID` |
| `TimeEntries` | `TimeEntry` | `ticketID` / `taskID`, `resourceID`, `hoursWorked`, `dateWorked`, `billableToAccount` |
| `Resources` | `Resource` | `userName`, `firstName`, `lastName`, `email`, `isActive` |

Exact field names and types come from the interfaces — import them and let the compiler guide you. For picklist codes (`status`, `priority`, etc.), call `fieldInfo()` against the live instance; never assume codes across instances.
