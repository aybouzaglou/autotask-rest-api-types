/**
 * autotask-rest-api-types
 * ------------------------
 * Comprehensive TypeScript types for the Datto/Kaseya Autotask PSA REST API,
 * generated from the official Swagger 2.0 specification.
 *
 * What's exported:
 *   - Every queryable entity interface (Company, Ticket, Contact, …) and the
 *     attachment-content entities — see `./generated/entities`.
 *   - The `AutotaskEntities` collection→entity map, `EntityName` union, and the
 *     `CreateModel` / `UpdateModel` helpers — see `./generated/registry`.
 *   - A runtime catalog of every REST collection (`AUTOTASK_COLLECTIONS`) with
 *     supported operations and UDF flags — see `./generated/metadata`.
 *   - Query/filter types, response envelopes, and entity-information (metadata)
 *     types — see `./core/*`.
 *   - Typed client surfaces (`AutotaskApi`, `AutotaskTypedClient`) — see
 *     `./client`.
 *
 * @packageDocumentation
 */

// --- Entities (the 200+ interfaces) ---------------------------------------
export type * from "./generated/entities.js";

// --- Collection registry & helpers ----------------------------------------
export type {
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

// --- Runtime collection catalog (values + types) --------------------------
export {
  AUTOTASK_COLLECTIONS,
  COLLECTION_NAMES,
  ENTITY_TO_COLLECTION,
} from "./generated/metadata.js";
export type {
  CollectionMetadata,
  CollectionName,
  TypedCollectionName,
} from "./generated/metadata.js";

// --- Query & filter types --------------------------------------------------
export type {
  AutotaskQuery,
  QueryFilter,
  ComparisonFilter,
  ExistenceFilter,
  SetFilter,
  GroupFilter,
  FilterOperator,
  ComparisonOperator,
  ExistenceOperator,
  SetOperator,
  GroupingOperator,
  FilterField,
  FilterScalar,
} from "./core/query.js";

// --- Response envelopes & metadata types ----------------------------------
export type {
  AutotaskQueryResult,
  AutotaskItemResult,
  AutotaskWriteResult,
  AutotaskCountResult,
  AutotaskErrorResponse,
  PageDetails,
  PickListValue,
  FieldInformation,
  UserDefinedFieldInformation,
  EntityInformation,
  EntityInformationResult,
  FieldInformationResult,
  UserDefinedFieldInformationResult,
  RestUserAccessLevel,
  ThresholdInformation,
  ZoneInformation,
} from "./core/responses.js";

// --- User-defined fields (types + runtime helpers) ------------------------
export type { UserDefinedField } from "./core/udf.js";
export { getUdf, toUdfArray } from "./core/udf.js";

// --- Filter DSL & pagination helpers --------------------------------------
export type { FilterDsl } from "./core/filter.js";
export {
  filters,
  collectAll,
  iterateAll,
  MAX_PAGE_SIZE,
} from "./core/filter.js";

// --- Narrowing & write helpers --------------------------------------------
export type { Loaded, WithId } from "./core/util.js";
export { isPresent, requireField, writtenId, isAutotaskError } from "./core/util.js";

// --- Webhooks --------------------------------------------------------------
export {
  AUTOTASK_SIGNATURE_HEADER,
  WEBHOOK_ACTIONS,
  WEBHOOK_COLLECTIONS_FOR,
  WEBHOOK_ENTITY_TYPE_ALIASES,
  WEBHOOK_ENTITY_TYPES,
  autotaskHmacEscape,
  buildWebhookRegistrationPlan,
  computeAutotaskSignature,
  createWebhookRouter,
  executeWebhookRegistrationPlan,
  isCreateDelivery,
  isDeactivatedDelivery,
  isDeleteDelivery,
  isDeliveryFor,
  isUpdateDelivery,
  isWebhookAction,
  isWebhookEntityType,
  isWebhookEntityTypeInput,
  normalizeWebhookEntityType,
  parseDeliveryFromErrorLog,
  parseHookSignature,
  parseWebhookDelivery,
  resolveFieldIds,
  timingSafeEqualString,
  verifyAutotaskSignature,
} from "./core/webhooks/index.js";
export type {
  AutotaskSignatureBody,
  AutotaskWebhookDelivery,
  ExecutedWebhookRegistrationPlan,
  NormalizedWebhookEntityType,
  ParsedHookSignature,
  VerifyAutotaskSignatureOptions,
  WebhookAction,
  WebhookCreateDelivery,
  WebhookCreateStep,
  WebhookCreateStepKind,
  WebhookDeactivatedDelivery,
  WebhookDeleteDelivery,
  WebhookDeliveryBase,
  WebhookEntityFamily,
  WebhookEntityFor,
  WebhookEntityType,
  WebhookEntityTypeInput,
  WebhookFieldSelection,
  WebhookFields,
  WebhookHandler,
  WebhookParentBody,
  WebhookRegistrationPlan,
  WebhookRegistrationRunStep,
  WebhookRegistrationSpec,
  WebhookRouter,
  WebhookRouterOptions,
  WebhookRouterResult,
  WebhookUdfFieldSelection,
  WebhookUpdateDelivery,
} from "./core/webhooks/index.js";

// --- Typed client surfaces -------------------------------------------------
export type {
  AutotaskApi,
  AutotaskEntityAccessor,
  AutotaskAttachmentAccessor,
  AttachmentEntityName,
  AutotaskTypedClient,
  AutotaskCountQuery,
  RequestOptions,
} from "./client.js";
