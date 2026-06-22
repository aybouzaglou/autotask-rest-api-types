/**
 * Ergonomic, fully-typed helpers for building Autotask query filters and for
 * paging through large result sets. All helpers are tiny and dependency-free.
 */

import type {
  AutotaskQuery,
  ComparisonFilter,
  ExistenceFilter,
  SetFilter,
  GroupFilter,
  QueryFilter,
  FilterField,
  FilterScalar,
} from "./query.js";
import type { AutotaskQueryResult } from "./responses.js";

/**
 * A field-aware filter DSL bound to entity `T`. Field names autocomplete from
 * the entity's keys (arbitrary strings — UDF names, dotted paths — are also
 * accepted). Build a DSL with {@link filters}.
 *
 * ```ts
 * const f = filters<Ticket>();
 * const query = {
 *   filter: [
 *     f.eq("companyID", 123),
 *     f.or(f.eq("status", 1), f.eq("status", 5)),
 *   ],
 * } satisfies AutotaskQuery<Ticket>;
 * ```
 */
export interface FilterDsl<T> {
  eq(field: FilterField<T>, value: FilterScalar): ComparisonFilter<T>;
  noteq(field: FilterField<T>, value: FilterScalar): ComparisonFilter<T>;
  gt(field: FilterField<T>, value: FilterScalar): ComparisonFilter<T>;
  gte(field: FilterField<T>, value: FilterScalar): ComparisonFilter<T>;
  lt(field: FilterField<T>, value: FilterScalar): ComparisonFilter<T>;
  lte(field: FilterField<T>, value: FilterScalar): ComparisonFilter<T>;
  beginsWith(field: FilterField<T>, value: string): ComparisonFilter<T>;
  endsWith(field: FilterField<T>, value: string): ComparisonFilter<T>;
  contains(field: FilterField<T>, value: string): ComparisonFilter<T>;
  exist(field: FilterField<T>): ExistenceFilter<T>;
  notExist(field: FilterField<T>): ExistenceFilter<T>;
  in(field: FilterField<T>, values: ReadonlyArray<string | number>): SetFilter<T>;
  notIn(field: FilterField<T>, values: ReadonlyArray<string | number>): SetFilter<T>;
  and(...items: ReadonlyArray<QueryFilter<T>>): GroupFilter<T>;
  or(...items: ReadonlyArray<QueryFilter<T>>): GroupFilter<T>;
  /** A comparison against a user-defined field (sets `udf: true`). */
  udf(field: string, op: ComparisonFilter<T>["op"], value: FilterScalar): ComparisonFilter<T>;
}

/** Create a {@link FilterDsl} bound to entity `T`. */
export function filters<T = unknown>(): FilterDsl<T> {
  const cmp = (op: ComparisonFilter<T>["op"]) => (field: FilterField<T>, value: FilterScalar): ComparisonFilter<T> => ({ op, field, value });
  return {
    eq: cmp("eq"),
    noteq: cmp("noteq"),
    gt: cmp("gt"),
    gte: cmp("gte"),
    lt: cmp("lt"),
    lte: cmp("lte"),
    beginsWith: (field, value) => ({ op: "beginsWith", field, value }),
    endsWith: (field, value) => ({ op: "endsWith", field, value }),
    contains: (field, value) => ({ op: "contains", field, value }),
    exist: (field) => ({ op: "exist", field }),
    notExist: (field) => ({ op: "notExist", field }),
    in: (field, values) => ({ op: "in", field, value: values }),
    notIn: (field, values) => ({ op: "notIn", field, value: values }),
    and: (...items) => ({ op: "and", items }),
    or: (...items) => ({ op: "or", items }),
    udf: (field, op, value) => ({ op, field, value, udf: true }),
  };
}

/** Autotask's maximum number of records returned per query page. */
export const MAX_PAGE_SIZE = 500;

/**
 * The id-cursor helpers page by `id`, so the wire query MUST return each
 * record's `id`. If the caller restricts columns with `includeFields` but omits
 * `id`, transparently add it (field names are case-insensitive on the wire).
 * Without this, Autotask omits the `id` column, the cursor can never advance,
 * and the whole result set is silently dropped. `undefined` (all fields) is left
 * as-is — a full record always includes `id`.
 */
function withIdField<T>(
  includeFields: AutotaskQuery<T>["includeFields"],
): AutotaskQuery<T>["includeFields"] {
  if (!includeFields) return includeFields;
  return includeFields.some((f) => String(f).toLowerCase() === "id")
    ? includeFields
    : [...includeFields, "id"];
}

/**
 * Page through an entire result set using id-cursor pagination — a stateless
 * approach that works with any typed query function (no reliance on
 * `nextPageUrl`). It repeatedly queries `id > cursor`, advancing the cursor to
 * the **largest id seen so far** each round, until a short page is returned.
 *
 * Robustness notes:
 * - Records are **de-duplicated by id**, so a boundary record returned on two
 *   adjacent pages is yielded only once.
 * - **`id` is required** to page. If `baseQuery.includeFields` omits it, `id` is
 *   added automatically (see {@link withIdField}); without it Autotask would
 *   drop the column and the whole set would be silently lost. If a non-empty
 *   page still comes back with no usable `id`, this **throws** rather than
 *   silently truncating.
 * - **Completeness depends on ascending-id order.** The cursor jumps to the
 *   page's max id, so de-duplication is order-independent, but *coverage* is
 *   not: a page returned out of ascending order would skip lower-id matches.
 *   This relies on Autotask returning lowest-id-first for an `id >` filter (its
 *   default); the REST `QueryModel` has no sort field. If you need a hard
 *   guarantee, page via `pageDetails.nextPageUrl` instead. A full page that
 *   fails to advance the cursor stops rather than looping forever.
 *
 * @param queryFn  a function that runs a query (e.g. `(q) => api.Tickets.query(q)`)
 * @param baseQuery the query to page (its `filter` is preserved and ANDed with the cursor)
 * @param pageSize  records per page (defaults to Autotask's max of 500)
 *
 * ```ts
 * const all = await collectAll((q) => api.Tickets.query(q), {
 *   filter: [{ op: "eq", field: "companyID", value: 123 }],
 * });
 * ```
 */
export async function collectAll<T extends { id?: number | null }>(
  queryFn: (query: AutotaskQuery<T>) => Promise<AutotaskQueryResult<T>>,
  baseQuery: AutotaskQuery<T>,
  pageSize: number = MAX_PAGE_SIZE,
): Promise<T[]> {
  const out: T[] = [];
  const seen = new Set<number>();
  let cursor = 0;
  const baseFilters = baseQuery.filter ?? [];
  const includeFields = withIdField(baseQuery.includeFields);
  for (;;) {
    const page = await queryFn({
      ...baseQuery,
      includeFields,
      maxRecords: pageSize,
      filter: [...baseFilters, { op: "gt", field: "id", value: cursor }],
    });
    const items = page.items ?? [];
    let maxId = cursor;
    let sawId = false;
    for (const item of items) {
      const itemId = item.id;
      if (itemId == null) continue;
      sawId = true;
      if (itemId > maxId) maxId = itemId;
      if (seen.has(itemId)) continue;
      seen.add(itemId);
      out.push(item);
    }
    // A non-empty page with no usable id means the cursor can't advance: fail
    // loudly instead of silently returning a truncated/empty set.
    if (items.length > 0 && !sawId) {
      throw new Error(
        "collectAll: a page returned records without an `id`, so id-cursor pagination cannot advance. " +
          "Ensure the query returns `id`, or page via pageDetails.nextPageUrl instead.",
      );
    }
    if (items.length < pageSize) break; // last (short) page
    if (maxId <= cursor) break; // full page but cursor can't advance — stop, don't loop forever
    cursor = maxId;
  }
  return out;
}

/**
 * Async generator yielding every record of a query, one page at a time, using
 * the same id-cursor strategy as {@link collectAll} — including auto-including
 * `id`, de-duplication, and throwing on a non-empty page with no usable `id`.
 * Useful for streaming large sets without buffering them all in memory.
 *
 * ```ts
 * for await (const ticket of iterateAll((q) => api.Tickets.query(q), baseQuery)) {
 *   // ...
 * }
 * ```
 */
export async function* iterateAll<T extends { id?: number | null }>(
  queryFn: (query: AutotaskQuery<T>) => Promise<AutotaskQueryResult<T>>,
  baseQuery: AutotaskQuery<T>,
  pageSize: number = MAX_PAGE_SIZE,
): AsyncGenerator<T, void, unknown> {
  const seen = new Set<number>();
  let cursor = 0;
  const baseFilters = baseQuery.filter ?? [];
  const includeFields = withIdField(baseQuery.includeFields);
  for (;;) {
    const page = await queryFn({
      ...baseQuery,
      includeFields,
      maxRecords: pageSize,
      filter: [...baseFilters, { op: "gt", field: "id", value: cursor }],
    });
    const items = page.items ?? [];
    let maxId = cursor;
    let sawId = false;
    for (const item of items) {
      const itemId = item.id;
      if (itemId == null) continue; // can't track for the cursor — skip (matches collectAll)
      sawId = true;
      if (itemId > maxId) maxId = itemId;
      if (seen.has(itemId)) continue;
      seen.add(itemId);
      yield item;
    }
    if (items.length > 0 && !sawId) {
      throw new Error(
        "iterateAll: a page returned records without an `id`, so id-cursor pagination cannot advance. " +
          "Ensure the query returns `id`, or page via pageDetails.nextPageUrl instead.",
      );
    }
    if (items.length < pageSize) return; // last (short) page
    if (maxId <= cursor) return; // full page but cursor can't advance — stop, don't loop forever
    cursor = maxId;
  }
}
