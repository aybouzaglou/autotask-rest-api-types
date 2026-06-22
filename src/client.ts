/**
 * Typed client surfaces for the Autotask REST API.
 *
 * Two complementary shapes are offered:
 *
 *  1. {@link AutotaskApi} — mirrors the accessor style of the
 *     `@apigrate/autotask-restapi` connector (`api.Companies.query(...)`), so
 *     you can cast an existing connector instance and get full autocomplete:
 *
 *     ```ts
 *     import { AutotaskRestApi } from "@apigrate/autotask-restapi";
 *     import type { AutotaskApi } from "autotask-rest-api-types";
 *
 *     const autotask = new AutotaskRestApi(USER, SECRET, CODE) as unknown as AutotaskApi;
 *     const { items } = await autotask.Companies.query({
 *       filter: [{ op: "eq", field: "isActive", value: true }],
 *     });
 *     // items: Company[]
 *     ```
 *
 *  2. {@link AutotaskTypedClient} — a provider-agnostic, collection-keyed
 *     interface you can implement over `fetch`, the apigrate connector, or any
 *     transport, with the entity type inferred from the collection name.
 */

import type {
  AutotaskEntities,
  EntityName,
  EntityOf,
  CreateModel,
  UpdateModel,
  ReplaceModel,
  CreateInput,
  UpdateInput,
  ReplaceInput,
} from "./generated/registry.js";
import type { AutotaskQuery, QueryFilter } from "./core/query.js";
import type {
  AutotaskQueryResult,
  AutotaskItemResult,
  AutotaskWriteResult,
  AutotaskCountResult,
  EntityInformationResult,
  FieldInformationResult,
  UserDefinedFieldInformationResult,
} from "./core/responses.js";

/** A count request body — a query with only its `filter` (no field selection). */
export interface AutotaskCountQuery<T = unknown> {
  filter: ReadonlyArray<QueryFilter<T>>;
}

/**
 * Per-request options forwarded by the apigrate connector to the underlying
 * fetch (e.g. to set headers like `IgnoreOptionalDefaults`). Loosely typed
 * because the connector passes it through verbatim.
 */
export type RequestOptions = Record<string, unknown>;

/**
 * Per-entity accessor matching the `@apigrate/autotask-restapi` connector.
 *
 * Mirrors the connector's real surface: `query`/`count` never take a parentId
 * (child entities are queried via their own `/{Entity}/query` endpoint with a
 * filter); `create`/`update`/`replace`/`delete` accept a leading `parentId` for
 * child entities. `get` only ever takes `(id)` here — the connector's
 * `get(parentId, id)` form exists for a small set of attachment entities only;
 * use {@link AutotaskAttachmentAccessor} for those.
 */
export interface AutotaskEntityAccessor<T> {
  /** Run a list query. Returns `{ items, pageDetails }`. */
  query(query: AutotaskQuery<T>): Promise<AutotaskQueryResult<T>>;
  /** Count matching records. Returns `{ queryCount }`. */
  count(query: AutotaskCountQuery<T>): Promise<AutotaskCountResult>;

  /**
   * Fetch one record by id. Resolves to `{ item }` on success, or **bare `null`
   * on a 404** — the `@apigrate/autotask-restapi` connector returns the API body
   * verbatim and maps not-found to `null` (not `{ item: null }`). Null-check the
   * whole result before destructuring:
   *
   * ```ts
   * const res = await api.Companies.get(1);
   * if (res?.item) { /* use res.item *\/ }
   * ```
   */
  get(id: number): Promise<AutotaskItemResult<T> | null>;

  /** Create a record (omit `id`). Returns `{ itemId }` (HTTP 200). */
  create(data: CreateModel<T>, opts?: RequestOptions): Promise<AutotaskWriteResult>;
  /** Create a child record under a parent. */
  create(parentId: number, data: CreateModel<T>, opts?: RequestOptions): Promise<AutotaskWriteResult>;

  /** Partially update a record (PATCH) — only the fields you send change. `id` is required. */
  update(data: UpdateModel<T>, opts?: RequestOptions): Promise<AutotaskWriteResult>;
  /** Partially update a child record under a parent. */
  update(parentId: number, data: UpdateModel<T>, opts?: RequestOptions): Promise<AutotaskWriteResult>;

  /**
   * Fully replace a record (PUT). `id` is required.
   *
   * ⚠️ Destructive: PUT sets **every writable field you omit from the body to
   * null/default**. Accordingly this takes a {@link ReplaceModel} that requires
   * the **full writable shape** — a partial object won't compile. Build it from a
   * fully-loaded record (`replace({ ...loaded, title })`), or prefer
   * {@link update} (PATCH) for partial changes.
   */
  replace(data: ReplaceModel<T>, opts?: RequestOptions): Promise<AutotaskWriteResult>;
  /** Fully replace a child record under a parent. ⚠️ Requires the full writable shape — see {@link replace}. */
  replace(parentId: number, data: ReplaceModel<T>, opts?: RequestOptions): Promise<AutotaskWriteResult>;

  /** Delete a record by id. */
  delete(id: number): Promise<AutotaskWriteResult>;
  /** Delete a child record by parent id + id. */
  delete(parentId: number, id: number): Promise<AutotaskWriteResult>;

  /** Entity-level metadata for this instance. */
  info(): Promise<EntityInformationResult>;
  /** Field metadata, including live picklist values for this instance. */
  fieldInfo(): Promise<FieldInformationResult>;
  /** User-defined field metadata for this instance. */
  udfInfo(): Promise<UserDefinedFieldInformationResult>;
}

/**
 * Accessor variant for the attachment-content entities that the apigrate
 * connector addresses under their parent for `get` as well — i.e.
 * `get(parentId, id)`. As of the connector's current source this applies to:
 * `ConfigurationItemAttachments`, `ConfigurationItemNoteAttachments`,
 * `OpportunityAttachments`, `TaskAttachments`, `TaskNoteAttachments`,
 * `TicketAttachments`, `TicketNoteAttachments`, `TimeEntryAttachments`.
 */
export interface AutotaskAttachmentAccessor<T> extends Omit<AutotaskEntityAccessor<T>, "get"> {
  /**
   * Fetch one attachment by parent id + id (includes base64 `data`). Resolves to
   * **bare `null` on a 404**, same as {@link AutotaskEntityAccessor.get}.
   */
  get(parentId: number, id: number): Promise<AutotaskItemResult<T> | null>;
}

/**
 * Collections the apigrate connector addresses with a two-arg `get(parentId, id)`
 * (attachment content is fetched under its parent). Every other collection uses
 * the one-arg `get(id)`. Kept in sync with {@link AutotaskAttachmentAccessor}.
 */
export type AttachmentEntityName =
  | "ConfigurationItemAttachments"
  | "ConfigurationItemNoteAttachments"
  | "OpportunityAttachments"
  | "TaskAttachments"
  | "TaskNoteAttachments"
  | "TicketAttachments"
  | "TicketNoteAttachments"
  | "TimeEntryAttachments";

/**
 * The full apigrate-style API surface: one typed accessor per queryable
 * collection. Attachment-content collections (see {@link AttachmentEntityName})
 * get {@link AutotaskAttachmentAccessor} — i.e. `get(parentId, id)`; all others
 * get {@link AutotaskEntityAccessor} with `get(id)`. Cast your connector
 * instance to this type: `new AutotaskRestApi(...) as unknown as AutotaskApi`.
 */
export type AutotaskApi = {
  [K in EntityName]: K extends AttachmentEntityName
    ? AutotaskAttachmentAccessor<EntityOf<K>>
    : AutotaskEntityAccessor<EntityOf<K>>;
};

/**
 * Provider-agnostic, collection-keyed client. The entity type is inferred from
 * the collection name on every method, so the compiler checks your filters,
 * payloads, and the shape of what you get back.
 */
export interface AutotaskTypedClient {
  query<K extends EntityName>(
    collection: K,
    query: AutotaskQuery<EntityOf<K>>,
  ): Promise<AutotaskQueryResult<EntityOf<K>>>;

  count<K extends EntityName>(
    collection: K,
    query: AutotaskCountQuery<EntityOf<K>>,
  ): Promise<AutotaskCountResult>;

  /**
   * Fetch one record by id. Unlike the apigrate-style {@link AutotaskApi}
   * surface (which returns bare `null` on a 404), this provider-agnostic
   * contract expects implementations to map not-found to `{ item: null }` — the
   * reference `fetch` client in the docs does exactly that.
   */
  get<K extends EntityName>(
    collection: K,
    id: number,
    parentId?: number,
  ): Promise<AutotaskItemResult<EntityOf<K>>>;

  create<K extends EntityName>(
    collection: K,
    data: CreateInput<K>,
    parentId?: number,
  ): Promise<AutotaskWriteResult>;

  update<K extends EntityName>(
    collection: K,
    data: UpdateInput<K>,
    parentId?: number,
  ): Promise<AutotaskWriteResult>;

  replace<K extends EntityName>(
    collection: K,
    data: ReplaceInput<K>,
    parentId?: number,
  ): Promise<AutotaskWriteResult>;

  delete<K extends EntityName>(
    collection: K,
    id: number,
    parentId?: number,
  ): Promise<AutotaskWriteResult>;

  info<K extends EntityName>(collection: K): Promise<EntityInformationResult>;
  fieldInfo<K extends EntityName>(collection: K): Promise<FieldInformationResult>;
  udfInfo<K extends EntityName>(collection: K): Promise<UserDefinedFieldInformationResult>;
}

export type { AutotaskEntities, EntityName, EntityOf, CreateModel, UpdateModel, ReplaceModel };
