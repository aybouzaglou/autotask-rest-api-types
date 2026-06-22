/**
 * /api/tickets — list (GET) and create (POST) tickets for the test company.
 * Runs server-side so credentials never reach the browser.
 */
import { NextResponse } from "next/server";
import type { CreateModel, Ticket } from "autotask-rest-api-types";
import { AutotaskApiError } from "../../../lib/autotask";
import { listTickets, createTicket, ticketPicklists, isLive, TEST_COMPANY_ID } from "../../../lib/tickets-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const tickets = await listTickets(TEST_COMPANY_ID);
    return NextResponse.json({ mode: isLive() ? "live" : "simulated", picklists: ticketPicklists(), tickets });
  } catch (e) {
    const err = e as AutotaskApiError;
    return NextResponse.json({ errors: err.errors ?? [String(e)] }, { status: err.status ?? 500 });
  }
}

export async function POST(req: Request) {
  let body: Partial<Ticket>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ errors: ["Invalid JSON body"] }, { status: 400 });
  }

  // Safety guard mirrored on the server: only the test company may be written.
  if (body.companyID !== TEST_COMPANY_ID) {
    return NextResponse.json({ errors: [`This demo only writes to company ${TEST_COMPANY_ID}.`] }, { status: 403 });
  }

  // Validate numeric fields from the untyped JSON body up front, so a bad type
  // (e.g. status: "abc") returns a clean 400 instead of a generic API error.
  const mustBeNumber = (k: "status" | "priority" | "queueID") => {
    const v = body[k];
    return v !== undefined && v !== null && typeof v !== "number" ? `Field "${k}" must be a number.` : null;
  };
  const fieldErrors = (["status", "priority", "queueID"] as const).map(mustBeNumber).filter(Boolean) as string[];
  if (fieldErrors.length) {
    return NextResponse.json({ errors: fieldErrors }, { status: 400 });
  }

  const input: CreateModel<Ticket> = {
    companyID: TEST_COMPANY_ID,
    title: body.title ?? null,
    status: body.status ?? 1,
    priority: body.priority ?? 3,
    queueID: body.queueID ?? null,
    description: body.description ?? null,
  };

  try {
    const result = await createTicket(input);
    return NextResponse.json({ ok: true, itemId: result.itemId });
  } catch (e) {
    const err = e as AutotaskApiError;
    return NextResponse.json({ errors: err.errors ?? [String(e)] }, { status: err.status ?? 500 });
  }
}
