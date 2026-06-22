import type { WebhookEventErrorLog } from "../../generated/entities.js";
import type { AutotaskWebhookDelivery } from "./delivery.js";
import { parseWebhookDelivery } from "./delivery.js";

/**
 * Parse a failed webhook delivery captured in `WebhookEventErrorLog.payload`.
 *
 * The error-log payload is the closest REST-exposed artifact to a raw captured
 * delivery. It is still best-effort: missing, non-JSON, or discriminator-invalid
 * payloads return `null` rather than throwing.
 */
export function parseDeliveryFromErrorLog(log: WebhookEventErrorLog): AutotaskWebhookDelivery | null {
  if (typeof log.payload !== "string" || !log.payload.trim()) return null;
  try {
    return parseWebhookDelivery(JSON.parse(log.payload));
  } catch {
    return null;
  }
}
