/**
 * Service layer used by the API routes. Chooses the LIVE Autotask client when
 * credentials are present in the environment, otherwise the SIMULATED backend.
 * Either way the types are identical — that's the point.
 */
import type { Ticket, CreateModel } from "autotask-rest-api-types";
import { getPicklist, type PickListOption } from "./field-metadata-sample";
import { createAutotaskClient } from "./autotask";
import { mockBackend } from "./mock";

export const TEST_COMPANY_ID = 688;

/**
 * Live mode is OFF unless you BOTH provide credentials AND explicitly opt in
 * with `ENABLE_LIVE_DEMO=1`. This route has no authentication or rate limiting
 * (it's a local demo), so the explicit gate prevents an accidental deploy from
 * exposing an open read/write endpoint to your Autotask instance.
 */
function liveCreds() {
  if (process.env.ENABLE_LIVE_DEMO !== "1") return null;
  const username = process.env.AUTOTASK_USER;
  const secret = process.env.AUTOTASK_SECRET;
  const integrationCode = process.env.AUTOTASK_INTEGRATION_CODE;
  if (username && secret && integrationCode) {
    return { username, secret, integrationCode, baseUrl: process.env.AUTOTASK_BASE_URL };
  }
  return null;
}

export const isLive = () => liveCreds() !== null;

const TICKET_FIELDS = ["id", "ticketNumber", "title", "status", "priority", "queueID", "createDate", "lastActivityDate", "description"] as const;

export async function listTickets(companyId: number): Promise<Ticket[]> {
  const creds = liveCreds();
  if (!creds) return mockBackend.listTickets(companyId);
  const client = createAutotaskClient(creds);
  const { items } = await client.query("Tickets", {
    maxRecords: 50,
    includeFields: [...TICKET_FIELDS],
    filter: [{ op: "eq", field: "companyID", value: companyId }],
  });
  return items;
}

export async function createTicket(input: CreateModel<Ticket>): Promise<{ itemId: number | string }> {
  const creds = liveCreds();
  if (!creds) return mockBackend.createTicket(input);
  const client = createAutotaskClient(creds);
  return client.create("Tickets", input);
}

/** Picklist options used to populate the form dropdowns (from captured metadata). */
export function ticketPicklists(): Record<"status" | "priority" | "queueID", PickListOption[]> {
  const active = (field: string) => (getPicklist("Tickets", field) ?? []).filter((o) => o.isActive);
  return {
    status: active("status"),
    priority: active("priority"),
    queueID: active("queueID"),
  };
}
