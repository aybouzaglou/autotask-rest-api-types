import type { EntityOf } from "../../generated/registry.js";
import type { UserDefinedField } from "../udf.js";

/**
 * Autotask entity families that can emit webhook callouts.
 *
 * These are REST collection names. `parseWebhookDelivery` also accepts the
 * legacy/business-object names Autotask uses in webhook payloads and normalizes
 * them to these collection names.
 */
export const WEBHOOK_ENTITY_TYPES = [
  "Tickets",
  "Companies",
  "Contacts",
  "ConfigurationItems",
  "TicketNotes",
] as const;

/** Webhook action discriminants observed/documented for Autotask callouts. */
export const WEBHOOK_ACTIONS = ["Create", "Update", "Delete", "Deactivated"] as const;

/** Legacy/business-object entity names accepted from Autotask webhook payloads. */
export const WEBHOOK_ENTITY_TYPE_ALIASES = {
  Account: "Companies",
  Company: "Companies",
  Contact: "Contacts",
  InstalledProduct: "ConfigurationItems",
  ConfigurationItem: "ConfigurationItems",
  Ticket: "Tickets",
  TicketNote: "TicketNotes",
} as const satisfies Record<string, WebhookEntityType>;

/** REST collection names supported by Autotask webhook callouts. */
export type WebhookEntityType = (typeof WEBHOOK_ENTITY_TYPES)[number];

/** Discriminant values used by Autotask webhook callouts. */
export type WebhookAction = (typeof WEBHOOK_ACTIONS)[number];

/** Entity type values accepted from raw Autotask webhook payloads. */
export type WebhookEntityTypeInput = WebhookEntityType | keyof typeof WEBHOOK_ENTITY_TYPE_ALIASES;

/** Normalized collection name for a known raw webhook entity-type value. */
export type NormalizedWebhookEntityType<T extends WebhookEntityTypeInput> =
  T extends WebhookEntityType
    ? T
    : T extends keyof typeof WEBHOOK_ENTITY_TYPE_ALIASES
      ? (typeof WEBHOOK_ENTITY_TYPE_ALIASES)[T]
      : never;

/** Map a webhook entity-type literal to this package's generated entity type. */
export type WebhookEntityFor<E extends WebhookEntityType> = EntityOf<E>;

/**
 * Subscribed fields delivered for create/update callouts.
 *
 * The exact keys depend on the webhook's runtime subscription settings.
 * Update callouts carry only changed/subscribed fields. UDF delivery shape is
 * not yet confirmed from a raw live callout; Autotask may nest UDFs under
 * `userDefinedFields` or expose a different shape. Keep handlers tolerant.
 *
 * ```ts
 * const body = parseWebhookDelivery(json);
 * if (isDeliveryFor(body, "Tickets") && isUpdateDelivery(body)) {
 *   body.Fields.title; // string | null | undefined
 * }
 * ```
 */
export type WebhookFields<E extends WebhookEntityType> =
  Partial<NonNullable<WebhookEntityFor<E>>> & {
    userDefinedFields?: UserDefinedField[];
  } & Record<string, unknown>;

/**
 * Common webhook envelope fields.
 *
 * Use `Guid` as the idempotency key when deduplicating deliveries.
 * `SequenceNumber` can have gaps, and the literal `EventTime` format still
 * needs confirmation against a captured callout from a live instance.
 */
export interface WebhookDeliveryBase<E extends WebhookEntityType = WebhookEntityType> {
  Guid: string;
  EntityType: E;
  Id: number;
  EventTime: string;
  SequenceNumber: number;
  PersonID: number;
  Action: WebhookAction;
}

/** Create callout with subscribed field values. */
export interface WebhookCreateDelivery<E extends WebhookEntityType = WebhookEntityType>
  extends WebhookDeliveryBase<E> {
  Action: "Create";
  Fields: WebhookFields<E>;
}

/** Update callout with changed/subscribed field values. */
export interface WebhookUpdateDelivery<E extends WebhookEntityType = WebhookEntityType>
  extends WebhookDeliveryBase<E> {
  Action: "Update";
  Fields: WebhookFields<E>;
}

/**
 * Delete callout.
 *
 * Autotask delete/deactivated callouts are id-oriented. A live instance still
 * needs to confirm whether the physical `Fields` key is absent or `{}`; narrow
 * on `Action` and do not rely on the key's presence.
 */
export interface WebhookDeleteDelivery<E extends WebhookEntityType = WebhookEntityType>
  extends WebhookDeliveryBase<E> {
  Action: "Delete";
}

/**
 * Deactivation callout.
 *
 * Treat this as an operational notification, not a record-change payload. A
 * live capture should confirm whether it is sent to `webhookUrl` or
 * `deactivationUrl`, and whether the same signature header is present.
 */
export interface WebhookDeactivatedDelivery<E extends WebhookEntityType = WebhookEntityType>
  extends WebhookDeliveryBase<E> {
  Action: "Deactivated";
}

/** Discriminated union for Autotask webhook deliveries. */
export type AutotaskWebhookDelivery<E extends WebhookEntityType = WebhookEntityType> =
  E extends WebhookEntityType
    ?
        | WebhookCreateDelivery<E>
        | WebhookUpdateDelivery<E>
        | WebhookDeleteDelivery<E>
        | WebhookDeactivatedDelivery<E>
    : never;

/** True when a value is one of the supported webhook entity-type literals. */
export function isWebhookEntityType(value: unknown): value is WebhookEntityType {
  return typeof value === "string" && WEBHOOK_ENTITY_TYPES.includes(value as WebhookEntityType);
}

/** True when a value is a supported REST collection name or webhook payload alias. */
export function isWebhookEntityTypeInput(value: unknown): value is WebhookEntityTypeInput {
  return normalizeWebhookEntityType(value) !== null;
}

/**
 * Normalize a webhook payload `EntityType` to this package's REST collection name.
 *
 * Autotask's official sample payload shows legacy names such as `Account`.
 * Consumers should narrow on the normalized collection names (`"Companies"`,
 * `"Tickets"`, etc.) after parsing.
 */
export function normalizeWebhookEntityType<T extends WebhookEntityTypeInput>(
  value: T,
): NormalizedWebhookEntityType<T>;
export function normalizeWebhookEntityType(value: unknown): WebhookEntityType | null;
export function normalizeWebhookEntityType(value: unknown): WebhookEntityType | null {
  if (isWebhookEntityType(value)) return value;
  if (typeof value !== "string") return null;
  const aliases = WEBHOOK_ENTITY_TYPE_ALIASES as Readonly<Record<string, WebhookEntityType>>;
  return aliases[value] ?? null;
}

/** True when a value is one of the supported webhook action literals. */
export function isWebhookAction(value: unknown): value is WebhookAction {
  return typeof value === "string" && WEBHOOK_ACTIONS.includes(value as WebhookAction);
}

/** Narrow a parsed delivery to a create callout. */
export function isCreateDelivery<E extends WebhookEntityType>(
  delivery: AutotaskWebhookDelivery<E>,
): delivery is Extract<AutotaskWebhookDelivery<E>, { Action: "Create" }> {
  return delivery.Action === "Create";
}

/** Narrow a parsed delivery to an update callout. */
export function isUpdateDelivery<E extends WebhookEntityType>(
  delivery: AutotaskWebhookDelivery<E>,
): delivery is Extract<AutotaskWebhookDelivery<E>, { Action: "Update" }> {
  return delivery.Action === "Update";
}

/** Narrow a parsed delivery to a delete callout. */
export function isDeleteDelivery<E extends WebhookEntityType>(
  delivery: AutotaskWebhookDelivery<E>,
): delivery is Extract<AutotaskWebhookDelivery<E>, { Action: "Delete" }> {
  return delivery.Action === "Delete";
}

/** Narrow a parsed delivery to a deactivation callout. */
export function isDeactivatedDelivery<E extends WebhookEntityType>(
  delivery: AutotaskWebhookDelivery<E>,
): delivery is Extract<AutotaskWebhookDelivery<E>, { Action: "Deactivated" }> {
  return delivery.Action === "Deactivated";
}

/** Narrow a parsed delivery to one webhook-enabled Autotask entity family. */
export function isDeliveryFor<E extends WebhookEntityType>(
  delivery: AutotaskWebhookDelivery,
  entityType: E,
): delivery is AutotaskWebhookDelivery<E> {
  return delivery.EntityType === entityType;
}

/**
 * Parse an unknown JSON value into the webhook delivery union.
 *
 * This is intentionally thin: it verifies only the discriminants that make
 * routing and type narrowing safe, and it normalizes legacy `EntityType` names
 * such as `Account` to REST collection names such as `Companies`. It does not
 * deeply validate every envelope field or every `Fields` value. In particular,
 * it does not check that `Fields` is present on a Create/Update payload — the
 * type asserts it, but a malformed callout could omit it, so still treat
 * `Fields` as possibly absent at runtime.
 *
 * ```ts
 * const delivery = parseWebhookDelivery(await request.json());
 * if (isDeliveryFor(delivery, "Tickets") && isUpdateDelivery(delivery)) {
 *   const maybeTitle = delivery.Fields.title;
 * }
 * ```
 */
export function parseWebhookDelivery(json: unknown): AutotaskWebhookDelivery {
  if (!isObjectRecord(json)) {
    throw new Error("Autotask webhook delivery must be an object.");
  }
  if (!isWebhookAction(json.Action)) {
    throw new Error(`Unknown Autotask webhook Action: ${String(json.Action)}`);
  }
  const entityType = normalizeWebhookEntityType(json.EntityType);
  if (!entityType) {
    throw new Error(`Unknown Autotask webhook EntityType: ${String(json.EntityType)}`);
  }
  return { ...json, EntityType: entityType } as unknown as AutotaskWebhookDelivery;
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
