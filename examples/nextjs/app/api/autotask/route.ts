/**
 * /api/autotask — minimal Autotask webhook receiver example.
 *
 * The HMAC is over the raw body, so this route reads text before parsing JSON.
 */
import { NextResponse } from "next/server";
import {
  AUTOTASK_SIGNATURE_HEADER,
  isDeliveryFor,
  isUpdateDelivery,
  parseWebhookDelivery,
  verifyAutotaskSignature,
} from "autotask-rest-api-types/webhooks";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = process.env.AUTOTASK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ errors: ["AUTOTASK_WEBHOOK_SECRET is not configured."] }, { status: 500 });
  }

  const raw = await req.text();
  const signature = req.headers.get(AUTOTASK_SIGNATURE_HEADER);

  // If real callouts return 401, retry with `{ escapeBody: true }` — Autotask
  // may custom-escape the signed body; reverse-engineered, undocumented.
  const verified = await verifyAutotaskSignature(raw, secret, signature);
  if (!verified) {
    return NextResponse.json({ errors: ["Invalid Autotask webhook signature."] }, { status: 401 });
  }

  let delivery;
  try {
    delivery = parseWebhookDelivery(JSON.parse(raw));
  } catch {
    return NextResponse.json({ errors: ["Invalid Autotask webhook payload."] }, { status: 400 });
  }

  if (isDeliveryFor(delivery, "Tickets") && isUpdateDelivery(delivery)) {
    const title = delivery.Fields.title;
    return NextResponse.json({ ok: true, entity: "Tickets", action: "Update", title });
  }

  return NextResponse.json({ ok: true, entity: delivery.EntityType, action: delivery.Action });
}
