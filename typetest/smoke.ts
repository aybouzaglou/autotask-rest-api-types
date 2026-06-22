/**
 * Consumer smoke test. Compiled against the built `dist` types via a path
 * alias (see typetest/tsconfig.json). Mixes valid usage (must compile) with
 * `@ts-expect-error` on deliberately wrong code (the error MUST be caught, or
 * tsc fails the build). This is how we prove the types both infer and protect.
 */
import type {
  Company,
  Ticket,
  AutotaskQuery,
  AutotaskApi,
  AutotaskTypedClient,
  CreateModel,
  UpdateModel,
  EntityName,
} from "autotask-rest-api-types";
import type { Loaded, WithId } from "autotask-rest-api-types";
import {
  AUTOTASK_COLLECTIONS,
  ENTITY_TO_COLLECTION,
  getUdf,
  filters,
  collectAll,
  requireField,
  writtenId,
} from "autotask-rest-api-types";

// --- Entities infer correct field types -----------------------------------
const c: Company = { id: 1, companyName: "Acme", isActive: true };
const name: string | null | undefined = c.companyName;
const id: number | undefined = c.id;
void name;
void id;

// null is part of every value field (the classic Autotask gotcha) -----------
const maybe: string | null | undefined = c.address1;
void maybe;

// --- Query is typed against the entity -------------------------------------
const q: AutotaskQuery<Ticket> = {
  maxRecords: 50,
  includeFields: ["id", "title", "status"],
  filter: [
    { op: "eq", field: "companyID", value: 123 },
    { op: "in", field: "status", value: [1, 5, 8] },
    { op: "exist", field: "assignedResourceID" },
    { op: "or", items: [
      { op: "gte", field: "createDate", value: "2024-01-01T00:00:00Z" },
      { op: "beginsWith", field: "ticketNumber", value: "T2024" },
    ] },
  ],
};
void q;

// --- Create / Update helpers ----------------------------------------------
const newTicket: CreateModel<Ticket> = { title: "Server down", companyID: 1, status: 1 };
const patch: UpdateModel<Ticket> = { id: 999, status: 5 };
void newTicket;
void patch;

// --- Typed client surfaces infer return types ------------------------------
declare const api: AutotaskApi;
async function viaAccessor() {
  const r = await api.Companies.query({ filter: [{ op: "eq", field: "isActive", value: true }] });
  const first: Company | undefined = r.items[0];
  void first;
}
void viaAccessor;

declare const client: AutotaskTypedClient;
async function viaClient() {
  const r = await client.query("Tickets", { filter: [{ op: "gt", field: "id", value: 0 }] });
  const t: Ticket | undefined = r.items[0];
  void t;
}
void viaClient;

// --- Filter DSL + pagination helper ----------------------------------------
const tf = filters<Ticket>();
const dslQuery: AutotaskQuery<Ticket> = {
  filter: [
    tf.eq("companyID", 123),
    tf.in("status", [1, 5, 8]),
    tf.or(tf.gte("createDate", "2024-01-01T00:00:00Z"), tf.exist("lastActivityDate")),
  ],
};
void dslQuery;
async function pageThrough() {
  const all: Ticket[] = await collectAll((q) => api.Tickets.query(q), dslQuery);
  void all;
}
void pageThrough;

// --- Runtime catalog is strongly typed -------------------------------------
const ticketsMeta = AUTOTASK_COLLECTIONS.Tickets;
const canQuery: boolean = ticketsMeta.canQuery;
const collName: EntityName = "ConfigurationItems";
void canQuery;
void collName;
void getUdf;

// --- Narrowing & write helpers ---------------------------------------------
async function helpers() {
  // get() resolves to bare null on a 404, so null-check the whole result.
  const got = await api.Companies.get(1);
  if (got?.item) {
    const loaded = got.item as Loaded<Company>;
    const upper: string = loaded.companyName.toUpperCase(); // no narrowing needed
    void upper;
    const nm: string = requireField(got.item, "companyName"); // throws if null
    void nm;
  }
  const res = await api.Tickets.create({ companyID: 1, title: "x", status: 1 });
  const numericId: number = writtenId(res);
  await api.Tickets.update({ id: numericId, status: 5 });
  const withId: WithId<Ticket> = { id: numericId, title: "x" };
  void withId;
}
void helpers;

// replace() (PUT) requires the FULL writable shape — spreading a loaded record
// satisfies it (all writable fields present); a partial would not (see bad9).
async function replaceFull() {
  const res = await api.Tickets.get(1);
  if (res?.item) {
    const loaded = res.item as Loaded<Ticket>;
    await api.Tickets.replace({ ...loaded, title: "renamed" });
  }
}
void replaceFull;

// Reverse lookup: legacy business-object name -> REST collection
const coll: string | undefined = ENTITY_TO_COLLECTION["Account"]; // "Companies"
void coll;

// Instance field-metadata is now consumer-generated (`npx autotask-enrich`) and
// is not part of the published package surface, so it isn't exercised here.

// Attachment-content collections expose the two-arg get(parentId, id):
async function attachmentGet() {
  const res = await api.TicketAttachments.get(123, 456);
  void res?.item;
}
void attachmentGet;

// ===========================================================================
// NEGATIVE CASES — each MUST be flagged, or this file fails to compile.
// ===========================================================================

// @ts-expect-error — get(parentId, id) is NOT valid on a normal entity accessor
const badGet = api.Companies.get(1, 2);
void badGet;

// NOTE (by design): filter `value` is a free scalar (string | number | boolean)
// and is NOT correlated to the field's type. This is required so that UDF names
// and dotted child-field paths (arbitrary strings) remain valid `field`s — TS
// cannot subtract known keys from `string`, so correlating value would break
// those legitimate queries. The following is therefore intentionally allowed:
const looseValue: AutotaskQuery<Ticket> = { filter: [{ op: "eq", field: "udfName", value: "x", udf: true }] };
void looseValue;

// @ts-expect-error — invalid operator
const bad2: AutotaskQuery<Ticket> = { filter: [{ op: "matches", field: "id", value: 1 }] };
void bad2;

// @ts-expect-error — "in" requires an array value, not a scalar
const bad3: AutotaskQuery<Ticket> = { filter: [{ op: "in", field: "status", value: 1 }] };
void bad3;

// @ts-expect-error — assigning a string to a number field
const bad4: Company = { id: "not-a-number" };
void bad4;

// @ts-expect-error — update without the required id
const bad5: UpdateModel<Ticket> = { status: 5 };
void bad5;

// @ts-expect-error — unknown collection name
const bad6: EntityName = "NotARealCollection";
void bad6;

// @ts-expect-error — unknown field on entity literal is rejected
const bad7: Company = { id: 1, notAField: 1 };
void bad7;

// @ts-expect-error — TimeEntries is not an attachment collection: no get(parentId, id)
const bad8 = api.TimeEntries.get(1, 2);
void bad8;

// @ts-expect-error — replace() (PUT) needs the FULL writable shape, not a partial
const bad9 = api.Tickets.replace({ id: 1, title: "x" });
void bad9;

// @ts-expect-error — get() can resolve to bare null on a 404, so destructuring
// `item` directly (without null-checking the result first) is rejected.
const bad10 = (async () => { const { item } = await api.Companies.get(1); return item; })();
void bad10;
