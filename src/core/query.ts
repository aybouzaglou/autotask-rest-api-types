/**
 * Query & filter types for the Autotask REST API.
 *
 * Autotask queries are POSTed to `/{Entity}/query` (or sent as the `search`
 * query-string parameter on a GET) using the shape modelled by the Swagger
 * `QueryModel`: `{ maxRecords?, includeFields?, filter[] }`. Filters are an
 * array of conditions combined with implicit AND at the top level, with
 * explicit `and`/`or` grouping available via nested `items`.
 */

/** Operators that compare a field against a single scalar value. */
export type ComparisonOperator =
  | "eq"
  | "noteq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "beginsWith"
  | "endsWith"
  | "contains";

/** Operators that test only whether a field is set. They take no `value`. */
export type ExistenceOperator = "exist" | "notExist";

/** Operators that match a field against a list of values. */
export type SetOperator = "in" | "notIn";

/** Operators that group nested conditions. */
export type GroupingOperator = "and" | "or";

/** Every supported filter operator. */
export type FilterOperator =
  | ComparisonOperator
  | ExistenceOperator
  | SetOperator
  | GroupingOperator;

/** A scalar value usable in a comparison filter. */
export type FilterScalar = string | number | boolean;

/**
 * The set of field names a filter may target for entity `T`: any of the
 * entity's own keys (with autocomplete) plus any other string (UDF names and
 * dotted child-field paths the API also accepts).
 */
export type FilterField<T> = (Extract<keyof T, string>) | (string & {});

/** A single field compared to a scalar, e.g. `{ op: "eq", field: "id", value: 1 }`. */
export interface ComparisonFilter<T = unknown> {
  op: ComparisonOperator;
  field: FilterField<T>;
  value: FilterScalar;
  /** Set to true when `field` names a user-defined field. */
  udf?: boolean;
}

/** A field existence test, e.g. `{ op: "exist", field: "resolution" }`. */
export interface ExistenceFilter<T = unknown> {
  op: ExistenceOperator;
  field: FilterField<T>;
  udf?: boolean;
}

/** A field matched against a list, e.g. `{ op: "in", field: "status", value: [1, 5, 8] }`. */
export interface SetFilter<T = unknown> {
  op: SetOperator;
  field: FilterField<T>;
  value: ReadonlyArray<string | number>;
  udf?: boolean;
}

/** A logical grouping of nested conditions, e.g. `{ op: "or", items: [...] }`. */
export interface GroupFilter<T = unknown> {
  op: GroupingOperator;
  items: ReadonlyArray<QueryFilter<T>>;
}

/** Any single condition in a query's `filter` array. */
export type QueryFilter<T = unknown> =
  | ComparisonFilter<T>
  | ExistenceFilter<T>
  | SetFilter<T>
  | GroupFilter<T>;

/**
 * The body of an Autotask `/query` request.
 *
 * @typeParam T - the entity being queried, used to type `filter` fields and
 *                `includeFields` against the entity's own properties.
 */
export interface AutotaskQuery<T = unknown> {
  /**
   * Cap the number of records returned per page. Must be between **1 and 500** —
   * Autotask rejects values outside that range with a validation error; it does
   * not silently clamp. Omit to use the server default. See {@link MAX_PAGE_SIZE}.
   */
  maxRecords?: number;
  /**
   * Restrict the returned columns. Omit to return all fields. Field names are
   * case-insensitive on the wire; the entity's own keys autocomplete here.
   */
  includeFields?: ReadonlyArray<Extract<keyof T, string> | (string & {})>;
  /** One or more conditions, combined with AND at the top level. */
  filter: ReadonlyArray<QueryFilter<T>>;
}
