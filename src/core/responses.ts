/**
 * Response envelopes and entity-information (metadata) types for the Autotask
 * REST API. Shapes mirror the Swagger result models exactly.
 */

/** Paging block returned alongside list query results. */
export interface PageDetails {
  /** Number of records returned on this page. */
  count?: number | null;
  /** Echo of the requested page size. Read-only. */
  readonly requestCount?: number | null;
  /** Absolute URL of the previous page, or null on the first page. */
  prevPageUrl?: string | null;
  /** Absolute URL of the next page, or null on the last page. */
  nextPageUrl?: string | null;
}

/** Result of a list query: `GET /{Entity}/query` or `POST /{Entity}/query`. */
export interface AutotaskQueryResult<T> {
  items: T[];
  pageDetails: PageDetails;
}

/** Result of a single-record fetch: `GET /{Entity}/{id}`. `item` is null on 404. */
export interface AutotaskItemResult<T> {
  item: T | null;
}

/**
 * Result of a create (`POST`) or update (`PATCH`/`PUT`). Autotask echoes back
 * the affected record's id. It is typically a number but is modelled loosely by
 * the API, so `string | number` is the safe type.
 */
export interface AutotaskWriteResult {
  itemId: number | string;
}

/** Result of `GET /{Entity}/query/count`. */
export interface AutotaskCountResult {
  queryCount: number;
}

/**
 * Error envelope Autotask returns on a failed request (validation errors,
 * invalid picklist values, `maxRecords` out of range, etc.). The HTTP status is
 * typically 400 or 500 and the body looks like:
 * `{ "errors": ["Picklist value [99] does not exist for priority."] }`.
 */
export interface AutotaskErrorResponse {
  errors: string[];
}

// ---------------------------------------------------------------------------
// Entity information (metadata) — returned by the entityInformation endpoints.
// These describe your *specific* Autotask instance, including the live picklist
// values that the static Swagger spec cannot contain.
// ---------------------------------------------------------------------------

/** One selectable option of a picklist field, from `fieldInfo()`. */
export interface PickListValue {
  /** The stored value (the number you send/receive), serialized as a string here. */
  value?: string | null;
  /** The human-readable label shown in the Autotask UI. */
  label?: string | null;
  isDefaultValue?: boolean | null;
  sortOrder?: number | null;
  /** For dependent picklists, the parent value this option belongs to. */
  parentValue?: string | null;
  isActive?: boolean | null;
  /** True for built-in system values (vs. user-added options). */
  isSystem?: boolean | null;
}

/** Field metadata from `GET /{Entity}/entityInformation/fields`. */
export interface FieldInformation {
  name?: string | null;
  /** Data type name, e.g. "string", "integer", "datetime", "double". */
  dataType?: string | null;
  length?: number | null;
  isRequired?: boolean | null;
  isReadOnly?: boolean | null;
  isQueryable?: boolean | null;
  /** True when the field references another entity (a foreign key). */
  isReference?: boolean | null;
  /** The referenced entity's name when `isReference` is true, e.g. "Resource". */
  referenceEntityType?: string | null;
  isPickList?: boolean | null;
  /** Live, instance-specific picklist options when `isPickList` is true. */
  picklistValues?: PickListValue[] | null;
  /** For dependent picklists, the field whose value selects the option set. */
  picklistParentValueField?: string | null;
  isSupportedWebhookField?: boolean | null;
}

/** User-defined field metadata from `.../entityInformation/userDefinedFields`. */
export interface UserDefinedFieldInformation {
  name?: string | null;
  label?: string | null;
  type?: string | null;
  length?: number | null;
  description?: string | null;
  isRequired?: boolean | null;
  isReadOnly?: boolean | null;
  isQueryable?: boolean | null;
  isReference?: boolean | null;
  referenceEntityType?: string | null;
  isPickList?: boolean | null;
  picklistValues?: PickListValue[] | null;
  picklistParentValueField?: string | null;
  defaultValue?: string | null;
  isSupportedWebhookField?: boolean | null;
}

/** Access level enum returned by `info()` (numeric on the wire). */
export type RestUserAccessLevel = number;

/** Entity-level metadata from `GET /{Entity}/entityInformation`. */
export interface EntityInformation {
  readonly name?: string | null;
  readonly canCreate?: boolean | null;
  readonly canDelete?: boolean | null;
  readonly canQuery?: boolean | null;
  readonly canUpdate?: boolean | null;
  readonly userAccessForCreate?: RestUserAccessLevel | null;
  readonly userAccessForDelete?: RestUserAccessLevel | null;
  readonly userAccessForQuery?: RestUserAccessLevel | null;
  readonly userAccessForUpdate?: RestUserAccessLevel | null;
  readonly hasUserDefinedFields?: boolean | null;
  readonly supportsWebhookCallouts?: boolean | null;
}

/** Envelope of `GET /{Entity}/entityInformation`. */
export interface EntityInformationResult {
  info: EntityInformation;
}

/** Envelope of `GET /{Entity}/entityInformation/fields`. */
export interface FieldInformationResult {
  fields: FieldInformation[];
}

/** Envelope of `GET /{Entity}/entityInformation/userDefinedFields`. */
export interface UserDefinedFieldInformationResult {
  fields: UserDefinedFieldInformation[];
}

/** Threshold/usage info from `GET /ThresholdInformation`. */
export interface ThresholdInformation {
  externalRequestThreshold?: number | null;
  requestThresholdTimeframe?: number | null;
  currentTimeframeRequestCount?: number | null;
}

/** Zone routing info from `GET /ZoneInformation` (used for base-URL discovery). */
export interface ZoneInformation {
  zoneName?: string | null;
  url?: string | null;
  webUrl?: string | null;
  ci?: number | null;
}
