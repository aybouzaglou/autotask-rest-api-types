export {
  WEBHOOK_ACTIONS,
  WEBHOOK_ENTITY_TYPE_ALIASES,
  WEBHOOK_ENTITY_TYPES,
  isCreateDelivery,
  isDeactivatedDelivery,
  isDeleteDelivery,
  isDeliveryFor,
  isUpdateDelivery,
  isWebhookEntityTypeInput,
  isWebhookAction,
  isWebhookEntityType,
  normalizeWebhookEntityType,
  parseWebhookDelivery,
} from "./delivery.js";
export type {
  AutotaskWebhookDelivery,
  NormalizedWebhookEntityType,
  WebhookAction,
  WebhookCreateDelivery,
  WebhookDeactivatedDelivery,
  WebhookDeleteDelivery,
  WebhookDeliveryBase,
  WebhookEntityFor,
  WebhookEntityType,
  WebhookEntityTypeInput,
  WebhookFields,
  WebhookUpdateDelivery,
} from "./delivery.js";

export {
  AUTOTASK_SIGNATURE_HEADER,
  autotaskHmacEscape,
  computeAutotaskSignature,
  parseHookSignature,
  timingSafeEqualString,
  verifyAutotaskSignature,
} from "./signature.js";
export type {
  AutotaskSignatureBody,
  ParsedHookSignature,
  VerifyAutotaskSignatureOptions,
} from "./signature.js";

export {
  WEBHOOK_COLLECTIONS_FOR,
  buildWebhookRegistrationPlan,
  executeWebhookRegistrationPlan,
  resolveFieldIds,
} from "./registration.js";
export type {
  ExecutedWebhookRegistrationPlan,
  WebhookCreateStep,
  WebhookCreateStepKind,
  WebhookEntityFamily,
  WebhookFieldSelection,
  WebhookParentBody,
  WebhookRegistrationPlan,
  WebhookRegistrationRunStep,
  WebhookRegistrationSpec,
  WebhookUdfFieldSelection,
} from "./registration.js";

export { parseDeliveryFromErrorLog } from "./error-log.js";

export { createWebhookRouter } from "./router.js";
export type {
  WebhookHandler,
  WebhookRouter,
  WebhookRouterOptions,
  WebhookRouterResult,
} from "./router.js";
