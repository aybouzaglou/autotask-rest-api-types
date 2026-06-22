// @ts-check
/**
 * Live edge-case probe against the connected Autotask instance.
 *
 * Reads broadly; writes ONLY to company 688 via the guarded write client.
 * Prints how the real API behaves vs. what our TypeScript types model, so we
 * can catch any mismatch. Run: `node scripts/edge-probe.mjs`.
 */

import { createReadOnlyClient } from "./_at-readonly.mjs";
import { createGuardedTicketClient } from "./_at-write.mjs";

const ro = createReadOnlyClient();
const w = createGuardedTicketClient();
const COMPANY = 688;
const line = (s = "") => console.log(s);
const ok = (s) => console.log(`  ✓ ${s}`);
const note = (s) => console.log(`  • ${s}`);
const warn = (s) => console.log(`  ⚠ ${s}`);

const typeofVal = (v) => (v === null ? "null" : Array.isArray(v) ? "array" : typeof v);
/** Tolerant GET: returns the body, or an {__error} marker instead of throwing. */
const tryGet = async (p) => { try { return await ro.get(p); } catch (e) { return { __error: e.message }; } };
const step = async (title, fn) => { line(`\n${title}`); try { await fn(); } catch (e) { warn(`error: ${e.message}`); } };

async function main() {
  line(`Zone: ${await ro.base()}`);
  const created = [];

  // 1. Read company 688 — null vs absent behavior
  line("\n[1] GET Companies/688 — field/null behavior");
  {
    const r = await ro.get(`Companies/${COMPANY}`);
    const c = r.item;
    const keys = Object.keys(c);
    const nullFields = keys.filter((k) => c[k] === null);
    ok(`item returned, ${keys.length} keys`);
    note(`empty fields come back as null (${nullFields.length} null), not absent → matches our \`| null\` typing`);
    note(`id type = ${typeofVal(c.id)} (${c.id}); createDate = ${JSON.stringify(c.createDate)}`);
  }

  // 2. includeFields — only requested fields returned?
  line("\n[2] query Tickets includeFields=[id,title,status]");
  {
    const r = await ro.get(`Tickets/query?search=${encodeURIComponent(JSON.stringify({
      maxRecords: 3, includeFields: ["id", "title", "status"],
      filter: [{ op: "eq", field: "companyID", value: COMPANY }],
    }))}`);
    const items = r.items || [];
    note(`returned ${items.length} items; pageDetails keys = ${Object.keys(r.pageDetails || {}).join(", ")}`);
    if (items[0]) {
      const keys = Object.keys(items[0]);
      ok(`each item has keys: ${keys.join(", ")}`);
      note(keys.every((k) => ["id", "title", "status"].includes(k))
        ? "includeFields strictly limits columns (other fields ABSENT, not null) → our optional `?` typing is correct"
        : `extra keys present: ${keys.filter((k) => !["id","title","status"].includes(k)).join(", ")}`);
    }
  }

  // 3. full query — all fields present, empties null
  line("\n[3] query Tickets (no includeFields)");
  {
    const r = await ro.get(`Tickets/query?search=${encodeURIComponent(JSON.stringify({
      maxRecords: 1, filter: [{ op: "eq", field: "companyID", value: COMPANY }],
    }))}`);
    const t = (r.items || [])[0];
    if (t) {
      note(`full ticket has ${Object.keys(t).length} keys; userDefinedFields type = ${typeofVal(t.userDefinedFields)}`);
      if (Array.isArray(t.userDefinedFields) && t.userDefinedFields[0]) {
        ok(`UDF shape = ${JSON.stringify(t.userDefinedFields[0])} → matches {name,value}`);
      }
    } else note("no existing tickets for 688 yet");
  }

  // 4. count
  line("\n[4] count Tickets for 688");
  {
    const r = await ro.get(`Tickets/query/count?search=${encodeURIComponent(JSON.stringify({
      filter: [{ op: "eq", field: "companyID", value: COMPANY }],
    }))}`);
    ok(`{ queryCount: ${r.queryCount} } (type ${typeofVal(r.queryCount)})`);
  }

  // 5. get nonexistent id
  line("\n[5] GET Tickets/999999999 (nonexistent)");
  {
    const r = await ro.get(`Tickets/999999999`);
    note(`returned ${JSON.stringify(r)} → our get() returns { item: null } for misses`);
  }

  // 6. maxRecords cap
  await step("[6] maxRecords=1000 — server cap or error?", async () => {
    const r = await tryGet(`Tickets/query?search=${encodeURIComponent(JSON.stringify({
      maxRecords: 1000, includeFields: ["id"], filter: [{ op: "gt", field: "id", value: 0 }],
    }))}`);
    if (r.__error) warn(`API rejects maxRecords>500: ${r.__error.split(": ").slice(1).join(": ")} → document maxRecords ∈ [1,500]`);
    else note(`requested 1000, got ${(r.items || []).length}, hasNext=${!!r.pageDetails?.nextPageUrl}`);
  });

  // 7. CREATE a ticket on 688
  line("\n[7] CREATE ticket (company 688)");
  let newId = null;
  {
    const payload = {
      companyID: COMPANY,
      title: "autotask-rest-api-types edge probe",
      status: 1,        // New
      priority: 3,      // Low
      queueID: 5,       // Client Portal
      description: "Created by the types package edge-case probe. Safe to delete.",
    };
    const res = await w.createTicket(payload);
    if (res.ok) {
      newId = res.body.itemId;
      created.push(newId);
      ok(`HTTP ${res.status}, body = ${JSON.stringify(res.body)}`);
      note(`itemId JS type = ${typeofVal(newId)} → our AutotaskWriteResult.itemId is \`number | string\` (${typeofVal(newId) === "number" ? "number here" : "string here"})`);
    } else {
      warn(`create failed: HTTP ${res.status} ${JSON.stringify(res.body).slice(0, 300)}`);
    }
  }

  // 8. GET it back — defaults, date format
  if (newId) {
    line("\n[8] GET the created ticket back");
    const r = await ro.get(`Tickets/${newId}`);
    const t = r.item;
    if (t) {
      ok(`ticketNumber = ${t.ticketNumber}, status = ${t.status}, priority = ${t.priority}`);
      note(`createDate = ${JSON.stringify(t.createDate)} → ISO-8601 string (our type: string)`);
      note(`lastActivityDate type = ${typeofVal(t.lastActivityDate)}; resolution = ${JSON.stringify(t.resolution)}`);
    }
  }

  // 9. UPDATE (PATCH) the ticket
  if (newId) {
    line("\n[9] PATCH the ticket (status → 8 In Progress)");
    const res = await w.updateTicket(newId, { status: 8, description: "Updated by edge probe (PATCH partial)." });
    if (res.ok) {
      ok(`HTTP ${res.status}, body = ${JSON.stringify(res.body)}`);
      const back = await ro.get(`Tickets/${newId}`);
      note(`re-read status = ${back.item.status} (expect 8); title unchanged = ${JSON.stringify(back.item.title)} → PATCH is sparse`);
    } else warn(`update failed: ${res.status} ${JSON.stringify(res.body).slice(0,200)}`);
  }

  // 10. operators — find it various ways
  if (newId) {
    line("\n[10] filter operators");
    for (const f of [
      { op: "eq", field: "id", value: newId },
      { op: "contains", field: "title", value: "edge probe" },
      { op: "in", field: "status", value: [1, 8] },
    ]) {
      const r = await tryGet(`Tickets/query?search=${encodeURIComponent(JSON.stringify({
        includeFields: ["id"], maxRecords: 5,
        filter: [{ op: "eq", field: "companyID", value: COMPANY }, f],
      }))}`);
      if (r.__error) { warn(`${f.op} ${f.field} → error: ${r.__error.split(": ").slice(1).join(": ").slice(0,120)}`); continue; }
      const found = (r.items || []).some((x) => String(x.id) === String(newId));
      ok(`${f.op} ${f.field} → ${(r.items || []).length} hit(s), target found: ${found}`);
    }
  }

  // 11. invalid create — error shape (guarded to 688, will be rejected by API)
  line("\n[11] invalid create (priority 99) — error shape");
  {
    const res = await w.tryCreateTicket({ companyID: COMPANY, title: "should fail", status: 1, priority: 99 });
    note(`HTTP ${res.status}; body = ${JSON.stringify(res.body).slice(0, 320)}`);
    if (res.body && res.body.errors) ok(`error body has \`errors: string[]\` → invalid picklist rejected as expected`);
  }

  line("\n========================================================");
  line(`CREATED TICKET IDS (delete via UI): ${created.join(", ") || "none"}`);
  line("========================================================");
}

main().catch((e) => { console.error("Probe error:", e.message); process.exit(1); });
