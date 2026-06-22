import type {
  AutotaskWebhookDelivery,
  WebhookAction,
  WebhookEntityType,
} from "./delivery.js";
import { parseWebhookDelivery } from "./delivery.js";
import type { AutotaskSignatureBody, VerifyAutotaskSignatureOptions } from "./signature.js";
import { verifyAutotaskSignature } from "./signature.js";

declare const TextDecoder: {
  new (): {
    decode(input?: ArrayBuffer | Uint8Array): string;
  };
};

type MaybePromise<T> = T | Promise<T>;
type AnyWebhookHandler = (delivery: AutotaskWebhookDelivery) => MaybePromise<void>;

/** Handler type narrowed by entity and action. */
export type WebhookHandler<
  E extends WebhookEntityType,
  A extends WebhookAction,
> = (delivery: Extract<AutotaskWebhookDelivery<E>, { Action: A }>) => MaybePromise<void>;

/** Options for the dependency-free webhook router. */
export interface WebhookRouterOptions extends VerifyAutotaskSignatureOptions {
  secretKey: string;
}

/** Result returned by `WebhookRouter.handleRequest`. */
export type WebhookRouterResult =
  | {
      ok: true;
      status: 200 | 202;
      matched: boolean;
      delivery: AutotaskWebhookDelivery;
    }
  | {
      ok: false;
      status: 400 | 401 | 500;
      matched: boolean;
      reason: "invalid-signature" | "invalid-payload" | "handler-error";
      error?: unknown;
    };

/** Minimal framework-free router for verified Autotask webhook callouts. */
export interface WebhookRouter {
  on<E extends WebhookEntityType, A extends WebhookAction>(
    entityType: E,
    action: A,
    handler: WebhookHandler<E, A>,
  ): WebhookRouter;
  handleRequest(
    rawBody: AutotaskSignatureBody,
    signatureHeader: string | null | undefined,
  ): Promise<WebhookRouterResult>;
}

/**
 * Create a small verify → parse → dispatch router.
 *
 * ```ts
 * const router = createWebhookRouter({ secretKey });
 * router.on("Tickets", "Update", async (delivery) => {
 *   delivery.Fields.title;
 * });
 * ```
 */
export function createWebhookRouter(options: WebhookRouterOptions): WebhookRouter {
  const handlers = new Map<string, AnyWebhookHandler>();

  return {
    on(entityType, action, handler) {
      handlers.set(handlerKey(entityType, action), handler as AnyWebhookHandler);
      return this;
    },
    async handleRequest(rawBody, signatureHeader) {
      let verified: boolean;
      try {
        verified = await verifyAutotaskSignature(rawBody, options.secretKey, signatureHeader, {
          escapeBody: options.escapeBody,
        });
      } catch (error) {
        // verifyAutotaskSignature throws on an unusable body (e.g. escapeBody:true
        // with a non-string body) or when WebCrypto is unavailable. handleRequest
        // must always resolve to a result, so surface that as a structured error
        // rather than letting the promise reject.
        return { ok: false, status: 400, matched: false, reason: "invalid-payload", error };
      }
      if (!verified) {
        return { ok: false, status: 401, matched: false, reason: "invalid-signature" };
      }

      let delivery: AutotaskWebhookDelivery;
      try {
        const text = typeof rawBody === "string" ? rawBody : new TextDecoder().decode(rawBody);
        delivery = parseWebhookDelivery(JSON.parse(text));
      } catch (error) {
        return { ok: false, status: 400, matched: false, reason: "invalid-payload", error };
      }

      const handler = handlers.get(handlerKey(delivery.EntityType, delivery.Action));
      if (!handler) {
        return { ok: true, status: 202, matched: false, delivery };
      }

      try {
        await handler(delivery);
        return { ok: true, status: 200, matched: true, delivery };
      } catch (error) {
        return { ok: false, status: 500, matched: true, reason: "handler-error", error };
      }
    },
  };
}

function handlerKey(entityType: WebhookEntityType, action: WebhookAction): string {
  return `${entityType}:${action}`;
}
