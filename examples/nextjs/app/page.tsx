import { TicketConsole } from "./ticket-console";
import { isLive, TEST_COMPANY_ID } from "../lib/tickets-service";

export default function Home() {
  return (
    <main className="wrap">
      <header className="head">
        <h1>Autotask Ticket Console</h1>
        <span className={isLive() ? "badge live" : "badge sim"}>{isLive() ? "LIVE" : "SIMULATED"}</span>
      </header>
      <p className="sub">
        Demonstrates <code>autotask-rest-api-types</code> end-to-end: typed query/create, picklist dropdowns from
        captured field metadata, and typed error handling. Writes are restricted to company{" "}
        <strong>{TEST_COMPANY_ID}</strong>{!isLive() && " (no credentials found — using simulated data)"}.
      </p>
      <TicketConsole />
    </main>
  );
}
