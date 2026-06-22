import type { AutotaskWriteResult } from "../responses.js";
import { writtenId } from "../util.js";
import type { EntityName, EntityOf } from "../../generated/registry.js";

/** Webhook setup families exposed by Autotask. */
export type WebhookEntityFamily = "Company" | "Contact" | "ConfigurationItem" | "Ticket" | "TicketNote";

interface WebhookCollectionSet {
  readonly parent: EntityName;
  readonly fields: EntityName;
  readonly udfFields?: EntityName;
  readonly excluded: EntityName;
}

/**
 * REST collection names for each webhook family.
 *
 * `TicketNote` intentionally has no UDF field collection.
 */
export const WEBHOOK_COLLECTIONS_FOR = {
  Company: {
    parent: "CompanyWebhooks",
    fields: "CompanyWebhookFields",
    udfFields: "CompanyWebhookUdfFields",
    excluded: "CompanyWebhookExcludedResources",
  },
  Contact: {
    parent: "ContactWebhooks",
    fields: "ContactWebhookFields",
    udfFields: "ContactWebhookUdfFields",
    excluded: "ContactWebhookExcludedResources",
  },
  ConfigurationItem: {
    parent: "ConfigurationItemWebhooks",
    fields: "ConfigurationItemWebhookFields",
    udfFields: "ConfigurationItemWebhookUdfFields",
    excluded: "ConfigurationItemWebhookExcludedResources",
  },
  Ticket: {
    parent: "TicketWebhooks",
    fields: "TicketWebhookFields",
    udfFields: "TicketWebhookUdfFields",
    excluded: "TicketWebhookExcludedResources",
  },
  TicketNote: {
    parent: "TicketNoteWebhooks",
    fields: "TicketNoteWebhookFields",
    excluded: "TicketNoteWebhookExcludedResources",
  },
} as const satisfies Record<WebhookEntityFamily, WebhookCollectionSet>;

type WebhookParentCollection<F extends WebhookEntityFamily> =
  (typeof WEBHOOK_COLLECTIONS_FOR)[F]["parent"];

/** Parent webhook body for the selected family, excluding the server id. */
export type WebhookParentBody<F extends WebhookEntityFamily = WebhookEntityFamily> = Omit<
  Partial<EntityOf<WebhookParentCollection<F>>>,
  "id"
>;

/** Numeric field selection, resolved from the live `fieldID` picklist first. */
export interface WebhookFieldSelection {
  fieldID: number;
  subscribed?: boolean;
  displayAlways?: boolean;
}

/** Numeric UDF selection, resolved from the live `udfFieldID` picklist first. */
export interface WebhookUdfFieldSelection {
  udfFieldID: number;
  subscribed?: boolean;
  displayAlways?: boolean;
}

/**
 * Webhook registration input.
 *
 * `fields`, `udfFields`, and `excludedResourceIDs` contain already-resolved
 * numeric ids. If you start from field names, resolve them from the live
 * `*WebhookFields` / `*WebhookUdfFields` child metadata before building a plan;
 * parent entity `FieldInformation` does not contain the webhook `fieldID`.
 */
export interface WebhookRegistrationSpec<F extends WebhookEntityFamily = WebhookEntityFamily> {
  webhook: WebhookParentBody<F>;
  fields?: readonly WebhookFieldSelection[];
  udfFields?: readonly WebhookUdfFieldSelection[];
  excludedResourceIDs?: readonly number[];
}

/** Kind of create operation inside a registration plan. */
export type WebhookCreateStepKind = "parent" | "field" | "udfField" | "excludedResource";

/** One create operation in an ordered webhook registration plan. */
export interface WebhookCreateStep {
  kind: WebhookCreateStepKind;
  collection: EntityName;
  body: Readonly<Record<string, unknown>>;
  usesParentRef: boolean;
}

/** Ordered, side-effect-free plan for creating a webhook and child rows. */
export interface WebhookRegistrationPlan<F extends WebhookEntityFamily = WebhookEntityFamily> {
  family: F;
  collections: (typeof WEBHOOK_COLLECTIONS_FOR)[F];
  steps: readonly WebhookCreateStep[];
}

/**
 * Function used by {@link executeWebhookRegistrationPlan} to perform one step.
 *
 * Write the row from the `body` argument (second parameter) — for child steps
 * it already includes the injected `webhookID` foreign key. `step.body` is the
 * pre-injection template and omits `webhookID`; do not send it directly.
 */
export type WebhookRegistrationRunStep = (
  step: WebhookCreateStep,
  body: Readonly<Record<string, unknown>>,
  parentId?: number,
) => Promise<AutotaskWriteResult>;

/** Result returned after executing a registration plan. */
export interface ExecutedWebhookRegistrationPlan {
  webhookId: number;
  childIds: number[];
}

/**
 * Build an ordered webhook registration plan without making HTTP calls.
 *
 * ```ts
 * const plan = buildWebhookRegistrationPlan("Ticket", {
 *   webhook: {
 *     name: "Ticket updates",
 *     webhookUrl: "https://example.com/api/autotask",
 *     isSubscribedToUpdateEvents: true,
 *   },
 *   fields: [{ fieldID: 12, subscribed: true }],
 *   excludedResourceIDs: [123],
 * });
 * ```
 */
export function buildWebhookRegistrationPlan<F extends WebhookEntityFamily>(
  family: F,
  spec: WebhookRegistrationSpec<F>,
): WebhookRegistrationPlan<F> {
  const collections = WEBHOOK_COLLECTIONS_FOR[family];
  const wantsCreate = spec.webhook.isSubscribedToCreateEvents === true;
  const wantsUpdate = spec.webhook.isSubscribedToUpdateEvents === true;
  const wantsDelete = spec.webhook.isSubscribedToDeleteEvents === true;
  const fields = spec.fields ?? [];
  const udfFields = spec.udfFields ?? [];
  const excludedResourceIDs = spec.excludedResourceIDs ?? [];
  const udfCollection = "udfFields" in collections ? collections.udfFields : undefined;

  if (!wantsCreate && !wantsUpdate && !wantsDelete) {
    throw new Error("Webhook registration requires at least one subscribed event flag.");
  }
  if ((wantsCreate || wantsUpdate) && fields.length + udfFields.length < 1) {
    throw new Error("Create/update webhook registrations require at least one field or UDF field.");
  }
  if (udfFields.length > 0 && !udfCollection) {
    throw new Error(`${family} webhooks do not support UDF field subscriptions.`);
  }

  const steps: WebhookCreateStep[] = [
    {
      kind: "parent",
      collection: collections.parent,
      body: { ...spec.webhook },
      usesParentRef: false,
    },
  ];

  for (const field of fields) {
    assertPositiveId(field.fieldID, "fieldID");
    steps.push({
      kind: "field",
      collection: collections.fields,
      // All *WebhookField children share this column shape; the `satisfies`
      // checks the keys against the generated entity so a typo is a compile error.
      body: {
        fieldID: field.fieldID,
        isSubscribedField: field.subscribed ?? false,
        isDisplayAlwaysField: field.displayAlways ?? false,
      } satisfies Partial<EntityOf<"TicketWebhookFields">>,
      usesParentRef: true,
    });
  }

  for (const udfField of udfFields) {
    assertPositiveId(udfField.udfFieldID, "udfFieldID");
    steps.push({
      kind: "udfField",
      collection: udfCollection as EntityName,
      body: {
        udfFieldID: udfField.udfFieldID,
        isSubscribedField: udfField.subscribed ?? false,
        isDisplayAlwaysField: udfField.displayAlways ?? false,
      } satisfies Partial<EntityOf<"TicketWebhookUdfFields">>,
      usesParentRef: true,
    });
  }

  for (const resourceID of excludedResourceIDs) {
    assertPositiveId(resourceID, "resourceID");
    steps.push({
      kind: "excludedResource",
      collection: collections.excluded,
      body: { resourceID } satisfies Partial<EntityOf<"TicketWebhookExcludedResources">>,
      usesParentRef: true,
    });
  }

  return { family, collections, steps };
}

/**
 * Resolve webhook field names to numeric ids from a live metadata map.
 *
 * The numeric `fieldID` is not present on the parent entity's
 * `FieldInformation`; build `nameToId` from the live webhook child metadata
 * (`fieldID` picklist on `TicketWebhookFields`, `CompanyWebhookFields`, etc.).
 * Use the same helper for UDFs with a map built from `udfFieldID`.
 */
export function resolveFieldIds(names: readonly string[], nameToId: ReadonlyMap<string, number>): number[] {
  const missing: string[] = [];
  const ids: number[] = [];
  for (const name of names) {
    const id = nameToId.get(name);
    if (id === undefined) {
      missing.push(name);
    } else {
      ids.push(id);
    }
  }
  if (missing.length > 0) {
    throw new Error(`Unresolved Autotask webhook field ids: ${missing.join(", ")}`);
  }
  return ids;
}

/**
 * Execute a registration plan through caller-supplied I/O.
 *
 * The executor creates the parent first, normalizes the returned id with
 * `writtenId`, then injects `webhookID` into every child create body. Autotask
 * child rows reference the parent through that foreign-key column as well as
 * through the positional parent route used by many clients.
 */
export async function executeWebhookRegistrationPlan(
  plan: WebhookRegistrationPlan,
  runStep: WebhookRegistrationRunStep,
): Promise<ExecutedWebhookRegistrationPlan> {
  const [parentStep, ...childSteps] = plan.steps;
  if (!parentStep || parentStep.usesParentRef) {
    throw new Error("Webhook registration plan must start with a parent create step.");
  }

  const parentResult = await runStep(parentStep, parentStep.body);
  const webhookId = writtenId(parentResult);
  const childIds: number[] = [];

  for (const step of childSteps) {
    const body = step.usesParentRef ? { ...step.body, webhookID: webhookId } : step.body;
    const result = await runStep(step, body, step.usesParentRef ? webhookId : undefined);
    childIds.push(writtenId(result));
  }

  return { webhookId, childIds };
}

function assertPositiveId(value: number, label: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`Webhook registration ${label} must be a positive integer.`);
  }
}
