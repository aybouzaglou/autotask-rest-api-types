/**
 * Webhook consumer typetests. Compiled against the built `dist` declarations.
 */
import {
  buildWebhookRegistrationPlan,
  createWebhookRouter,
  isCreateDelivery,
  isDeleteDelivery,
  isDeliveryFor,
  isUpdateDelivery,
  normalizeWebhookEntityType,
  parseWebhookDelivery,
} from "autotask-rest-api-types/webhooks";
import { parseWebhookDelivery as parseWebhookDeliveryFromRoot } from "autotask-rest-api-types";
import type {
  AutotaskWebhookDelivery,
  WebhookDeleteDelivery,
  WebhookFields,
  WebhookParentBody,
} from "autotask-rest-api-types/webhooks";

const delivery = parseWebhookDelivery({
  Action: "Update",
  EntityType: "Ticket",
  Guid: "guid-1",
  Id: 100,
  EventTime: "2026-06-21T12:00:00",
  SequenceNumber: 1,
  PersonID: 12,
  Fields: { title: "Server down", companyID: 1 },
});

if (isDeliveryFor(delivery, "Tickets") && isUpdateDelivery(delivery)) {
  const title: string | null | undefined = delivery.Fields.title;
  const companyID: number | null | undefined = delivery.Fields.companyID;
  void title;
  void companyID;
}

const normalized: "Companies" | null = normalizeWebhookEntityType("Account");
void normalized;

if (isDeleteDelivery(delivery)) {
  // Lock that the guard narrows specifically to the Delete arm — not merely to
  // some Fields-less arm. These two lines fail to compile if isDeleteDelivery
  // ever narrowed to the wrong discriminant.
  const action: "Delete" = delivery.Action;
  const deleteArm: WebhookDeleteDelivery = delivery;
  void action;
  void deleteArm;
  // @ts-expect-error — delete deliveries do not expose Fields at the type level.
  const fields = delivery.Fields;
  void fields;
}

// Positive companion: isCreateDelivery narrows to the Create arm, which exposes Fields.
const createDelivery = parseWebhookDelivery({
  Action: "Create",
  EntityType: "Tickets",
  Guid: "guid-create",
  Id: 300,
  EventTime: "2026-06-21T12:02:00",
  SequenceNumber: 3,
  PersonID: 12,
  Fields: { title: "New" },
});
if (isDeliveryFor(createDelivery, "Tickets") && isCreateDelivery(createDelivery)) {
  const fields: WebhookFields<"Tickets"> = createDelivery.Fields;
  const title: string | null | undefined = createDelivery.Fields.title;
  void fields;
  void title;
}

const rootDelivery: AutotaskWebhookDelivery = parseWebhookDeliveryFromRoot({
  Action: "Create",
  EntityType: "Companies",
  Guid: "guid-2",
  Id: 200,
  EventTime: "2026-06-21T12:01:00",
  SequenceNumber: 2,
  PersonID: 12,
  Fields: { companyName: "Acme" },
});
void rootDelivery;

const router = createWebhookRouter({ secretKey: "secret" });
router.on("Tickets", "Update", (body) => {
  const title: string | null | undefined = body.Fields.title;
  void title;
});
router.on("Tickets", "Delete", (body) => {
  // @ts-expect-error — delete handlers receive the delete arm, not an update arm.
  const fields = body.Fields;
  void fields;
});

// Registration: the parent webhook body is typed from the family's webhook entity.
const ticketPlan = buildWebhookRegistrationPlan("Ticket", {
  webhook: {
    name: "Ticket updates",
    webhookUrl: "https://example.com/api/autotask",
    isSubscribedToUpdateEvents: true,
  },
  fields: [{ fieldID: 12, subscribed: true }],
});
void ticketPlan;

buildWebhookRegistrationPlan("Ticket", {
  webhook: {
    name: "Bad body",
    // @ts-expect-error — unknown property is not part of the Ticket webhook body.
    notARealWebhookColumn: true,
  },
  fields: [{ fieldID: 1 }],
});

const parentBody: WebhookParentBody<"Ticket"> = {
  name: "x",
  isSubscribedToUpdateEvents: true,
};
void parentBody;

// @ts-expect-error — the server-assigned id is omitted from the parent body type.
const parentWithId: WebhookParentBody<"Ticket"> = { id: 1 };
void parentWithId;
