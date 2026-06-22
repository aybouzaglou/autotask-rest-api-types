// @ts-check
/**
 * GUARDED write client — used ONLY by the edge-case probe.
 *
 * SAFETY: every write (POST/PATCH) is hard-gated on company id 688
 * ("AUTOTASK API TEST"). A create whose companyID !== 688 throws before any
 * request. An update first GETs the target and refuses unless its companyID is
 * 688. There is no DELETE method. This enforces the user's rule: only the test
 * company may be written, nothing else may be modified or destroyed.
 */

import { createReadOnlyClient, getCredentials } from "./_at-readonly.mjs";

const ALLOWED_COMPANY_ID = 688;
const PROBE_BASE = "https://webservices.autotask.net/ATServicesRest";

export function createGuardedTicketClient() {
  const { username, secret, integrationCode, baseOverride } = getCredentials();
  const ro = createReadOnlyClient(); // reuse zone detection + GET
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ApiIntegrationCode: integrationCode,
    UserName: username,
    Secret: secret,
  };

  let basePromise = null;
  const base = () => {
    if (baseOverride && /^https?:\/\//i.test(baseOverride)) {
      return Promise.resolve(baseOverride.replace(/\/$/, ""));
    }
    if (!basePromise) {
      const url = `${PROBE_BASE}/V1.0/zoneInformation?user=${encodeURIComponent(username)}`;
      basePromise = fetch(url, { headers }).then(async (r) => {
        const z = await r.json();
        return String(z.url).replace(/\/$/, "");
      });
    }
    return basePromise;
  };

  async function send(method, path, body) {
    const url = `${await base()}/V1.0/${path}`;
    const res = await fetch(url, { method, headers, body: JSON.stringify(body) });
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { json = text; }
    return { status: res.status, ok: res.ok, body: json };
  }

  function assert688(companyID, op) {
    if (companyID !== ALLOWED_COMPANY_ID) {
      throw new Error(`BLOCKED: ${op} targets companyID ${companyID}; only ${ALLOWED_COMPANY_ID} is permitted.`);
    }
  }

  return {
    get: ro.get,
    base,

    /** Create a ticket — requires companyID === 688. Returns { status, ok, body }. */
    async createTicket(data) {
      assert688(data.companyID, "createTicket");
      return send("POST", "Tickets", data);
    },

    /**
     * Create attempt that may intentionally be invalid (for error-shape probing).
     * Still hard-gated on companyID === 688 so a bad payload can never touch
     * another company.
     */
    async tryCreateTicket(data) {
      assert688(data.companyID, "tryCreateTicket");
      return send("POST", "Tickets", data);
    },

    /** Update a ticket (PATCH) only after confirming it belongs to company 688. */
    async updateTicket(id, changes) {
      const cur = await ro.get(`Tickets/${id}`);
      const co = cur && cur.item && cur.item.companyID;
      assert688(co, `updateTicket(${id})`);
      return send("PATCH", "Tickets", { id, ...changes });
    },
  };
}
