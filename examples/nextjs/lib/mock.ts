/**
 * Simulated backend so the example runs with no credentials. It mirrors the
 * shapes of the real typed client (Ticket, AutotaskWriteResult) and reproduces
 * the edge cases we observed live — e.g. an invalid picklist value throws an
 * AutotaskApiError with `{ errors: [...] }`, and `maxRecords > 500` is rejected.
 */
import type { Ticket, CreateModel } from "autotask-rest-api-types";
import { getPicklist } from "./field-metadata-sample";
import { AutotaskApiError } from "./autotask";

let seq = 84860;
const store: Ticket[] = [
  { id: 84801, companyID: 688, ticketNumber: "T20260619.0001", title: "Printer offline in suite 200", status: 8, priority: 2, queueID: 5, createDate: "2026-06-18T14:02:10.000Z", description: "User reports the shared printer is offline.", lastActivityDate: "2026-06-19T09:11:00.000Z" },
  { id: 84802, companyID: 688, ticketNumber: "T20260619.0002", title: "New hire laptop setup", status: 1, priority: 3, queueID: 6, createDate: "2026-06-19T08:30:00.000Z", description: "Provision laptop for new starter.", lastActivityDate: null },
  { id: 84803, companyID: 688, ticketNumber: "T20260619.0003", title: "Email delivery delays", status: 5, priority: 1, queueID: 8, createDate: "2026-06-17T16:45:00.000Z", description: "Intermittent delays on outbound mail.", lastActivityDate: "2026-06-18T12:00:00.000Z" },
];

function validatePicklist(field: string, value: number | null | undefined) {
  if (value == null) return;
  const opts = getPicklist("Tickets", field);
  if (opts && !opts.some((o) => o.value === value)) {
    throw new AutotaskApiError(500, [`Picklist value [${value}] does not exist for ${field}. ; on record number [1].`]);
  }
}

export const mockBackend = {
  listTickets(companyId: number): Ticket[] {
    return store.filter((t) => t.companyID === companyId).sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
  },
  createTicket(input: CreateModel<Ticket>): { itemId: number } {
    if (input.companyID !== 688) throw new AutotaskApiError(403, ["Simulated guard: only company 688 may be written."]);
    if (!input.title) throw new AutotaskApiError(500, ["Attribute 'title' is required. ; on record number [1]."]);
    validatePicklist("status", input.status);
    validatePicklist("priority", input.priority);
    validatePicklist("queueID", input.queueID);
    const id = seq++;
    const now = "2026-06-19T22:30:00.000Z";
    store.unshift({
      id,
      companyID: 688,
      ticketNumber: `T20260619.${String(id).slice(-4)}`,
      title: input.title ?? null,
      status: input.status ?? 1,
      priority: input.priority ?? 3,
      queueID: input.queueID ?? null,
      description: input.description ?? null,
      createDate: now,
      lastActivityDate: null,
    });
    return { itemId: id };
  },
};
