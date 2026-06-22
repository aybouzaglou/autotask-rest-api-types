import assert from "node:assert/strict";
import { test } from "node:test";
import {
  autotaskHmacEscape,
  buildWebhookRegistrationPlan,
  computeAutotaskSignature,
  createWebhookRouter,
  executeWebhookRegistrationPlan,
  normalizeWebhookEntityType,
  parseDeliveryFromErrorLog,
  parseHookSignature,
  parseWebhookDelivery,
  resolveFieldIds,
  verifyAutotaskSignature,
} from "../dist/core/webhooks/index.js";

test("webhook signatures round-trip and reject bad inputs", async () => {
  const raw = JSON.stringify({ hello: "Autotask", nested: { value: 1 } });
  const secret = "top-secret";
  const signature = await computeAutotaskSignature(raw, secret);

  assert.match(signature, /^sha1=/);
  assert.equal(await verifyAutotaskSignature(raw, secret, signature), true);
  assert.equal(await verifyAutotaskSignature(raw, "wrong-secret", signature), false);
  assert.equal(await verifyAutotaskSignature(`${raw} `, secret, signature), false);
});

test("parseWebhookDelivery rejects unknown discriminants", () => {
  const base = {
    Guid: "guid-1",
    EntityType: "Tickets",
    Id: 1,
    EventTime: "2026-06-21T12:00:00",
    SequenceNumber: 1,
    PersonID: 2,
    Action: "Update",
    Fields: { title: "Changed" },
  };

  assert.equal(parseWebhookDelivery(base).Action, "Update");
  assert.equal(normalizeWebhookEntityType("Account"), "Companies");
  assert.equal(parseWebhookDelivery({ ...base, EntityType: "Account" }).EntityType, "Companies");
  assert.equal(parseWebhookDelivery({ ...base, EntityType: "InstalledProduct" }).EntityType, "ConfigurationItems");
  assert.throws(() => parseWebhookDelivery({ ...base, Action: "Rename" }), /Action/);
  assert.throws(() => parseWebhookDelivery({ ...base, EntityType: "Tasks" }), /EntityType/);
});

test("buildWebhookRegistrationPlan validates shape and emits ordered steps", () => {
  assert.throws(
    () =>
      buildWebhookRegistrationPlan("TicketNote", {
        webhook: { name: "notes", isSubscribedToUpdateEvents: true },
        fields: [{ fieldID: 1, subscribed: true }],
        udfFields: [{ udfFieldID: 2, subscribed: true }],
      }),
    /do not support UDF/,
  );

  assert.throws(
    () =>
      buildWebhookRegistrationPlan("Ticket", {
        webhook: { name: "empty", isSubscribedToUpdateEvents: true },
      }),
    /at least one field/,
  );

  const deleteOnly = buildWebhookRegistrationPlan("Ticket", {
    webhook: { name: "delete only", isSubscribedToDeleteEvents: true },
  });
  assert.equal(deleteOnly.steps.length, 1);
  assert.equal(deleteOnly.steps[0]?.kind, "parent");

  const plan = buildWebhookRegistrationPlan("Ticket", {
    webhook: { name: "ticket updates", isSubscribedToUpdateEvents: true },
    fields: [
      { fieldID: 10, subscribed: true },
      { fieldID: 11, displayAlways: true },
    ],
    excludedResourceIDs: [99],
  });

  assert.deepEqual(
    plan.steps.map((step) => step.kind),
    ["parent", "field", "field", "excludedResource"],
  );
  assert.equal(plan.steps[1]?.collection, "TicketWebhookFields");
  assert.deepEqual(plan.steps[1]?.body, {
    fieldID: 10,
    isSubscribedField: true,
    isDisplayAlwaysField: false,
  });
});

test("resolveFieldIds reports missing names", () => {
  assert.deepEqual(resolveFieldIds(["status", "priority"], new Map([["status", 1], ["priority", 2]])), [1, 2]);
  assert.throws(() => resolveFieldIds(["status", "missing"], new Map([["status", 1]])), /missing/);
});

test("executeWebhookRegistrationPlan injects webhookID into child bodies", async () => {
  const plan = buildWebhookRegistrationPlan("Ticket", {
    webhook: { name: "delete loop guard", isSubscribedToDeleteEvents: true },
    excludedResourceIDs: [77],
  });
  const calls = [];

  const result = await executeWebhookRegistrationPlan(plan, async (step, body, parentId) => {
    calls.push({ step, body, parentId });
    return { itemId: calls.length === 1 ? 123 : "456" };
  });

  assert.deepEqual(result, { webhookId: 123, childIds: [456] });
  assert.equal(calls[0].parentId, undefined);
  assert.equal(calls[1].parentId, 123);
  assert.deepEqual(calls[1].body, { resourceID: 77, webhookID: 123 });
});

test("computeAutotaskSignature matches an independent known-answer vector", async () => {
  // Independently computed: crypto.createHmac("sha1", secret).update(body).digest("base64").
  // Pins the hand-rolled base64 + HMAC against a real implementation, which the
  // self-referential round-trip cannot do.
  const body = JSON.stringify({ id: 123, title: "Server down" });
  const secret = "kat-secret-key";
  assert.equal(await computeAutotaskSignature(body, secret), "sha1=wql/x7lvZIcIN10rO/5dWem76B0=");
});

test("verifyAutotaskSignature enforces the algorithm gate and the escape fallback", async () => {
  const raw = JSON.stringify({ a: 1, b: "two" });
  const secret = "s3cret";
  const sig = await computeAutotaskSignature(raw, secret);
  const digest = sig.slice("sha1=".length);

  // Algorithm gate: a non-sha1 prefix is rejected even with a correct digest.
  assert.equal(await verifyAutotaskSignature(raw, secret, `sha256=${digest}`), false);
  // Prefix-less digest is accepted (defensive normalization).
  assert.equal(await verifyAutotaskSignature(raw, secret, digest), true);

  // escapeBody: HMAC is taken over the escaped JSON text.
  const escapedSig = await computeAutotaskSignature(autotaskHmacEscape(raw), secret);
  assert.equal(await verifyAutotaskSignature(raw, secret, escapedSig, { escapeBody: true }), true);
  // The escaped-body signature must not verify the raw body without the flag.
  assert.equal(await verifyAutotaskSignature(raw, secret, escapedSig), false);

  // escapeBody requires a string body; a binary body throws.
  await assert.rejects(
    () => verifyAutotaskSignature(new TextEncoder().encode(raw), secret, escapedSig, { escapeBody: true }),
    /string raw body/,
  );
});

test("parseHookSignature splits a prefix only when the value is base64", () => {
  assert.deepEqual(parseHookSignature("sha1=wql/x7lvZIcIN10rO/5dWem76B0="), {
    algorithm: "sha1",
    value: "wql/x7lvZIcIN10rO/5dWem76B0=",
  });
  // A bare value whose internal char is '=' is treated as a sha1 digest, not split.
  assert.deepEqual(parseHookSignature("abc=="), { algorithm: "sha1", value: "abc==" });
  assert.equal(parseHookSignature(""), null);
  assert.equal(parseHookSignature(null), null);
});

test("buildWebhookRegistrationPlan throws for a create-only spec with no fields", () => {
  assert.throws(
    () => buildWebhookRegistrationPlan("Ticket", { webhook: { name: "c", isSubscribedToCreateEvents: true } }),
    /at least one field/,
  );
});

test("executeWebhookRegistrationPlan injects webhookID into field and udf child bodies", async () => {
  const plan = buildWebhookRegistrationPlan("Ticket", {
    webhook: { name: "field+udf", isSubscribedToUpdateEvents: true },
    fields: [{ fieldID: 10, subscribed: true }],
    udfFields: [{ udfFieldID: 20, displayAlways: true }],
  });

  // usesParentRef is set per child kind (parent false, children true).
  assert.deepEqual(
    plan.steps.map((s) => [s.kind, s.usesParentRef]),
    [["parent", false], ["field", true], ["udfField", true]],
  );

  const bodies = [];
  await executeWebhookRegistrationPlan(plan, async (step, body) => {
    bodies.push({ kind: step.kind, body });
    return { itemId: bodies.length };
  });

  assert.deepEqual(bodies[1], {
    kind: "field",
    body: { fieldID: 10, isSubscribedField: true, isDisplayAlwaysField: false, webhookID: 1 },
  });
  assert.deepEqual(bodies[2], {
    kind: "udfField",
    body: { udfFieldID: 20, isSubscribedField: false, isDisplayAlwaysField: true, webhookID: 1 },
  });
});

test("createWebhookRouter verifies, dispatches, and reports status per arm", async () => {
  const secret = "router-secret";
  const payload = {
    Guid: "g1", EntityType: "Tickets", Id: 1, EventTime: "2026-06-21T12:00:00",
    SequenceNumber: 1, PersonID: 2, Action: "Update", Fields: { title: "x" },
  };
  const raw = JSON.stringify(payload);
  const sig = await computeAutotaskSignature(raw, secret);

  let handled = 0;
  const router = createWebhookRouter({ secretKey: secret }).on("Tickets", "Update", () => {
    handled += 1;
  });

  // Valid signature + matching handler -> 200, handler invoked.
  const matched = await router.handleRequest(raw, sig);
  assert.deepEqual({ ok: matched.ok, status: matched.status, matched: matched.matched }, {
    ok: true, status: 200, matched: true,
  });
  assert.equal(handled, 1);

  // Bad signature short-circuits before parse/dispatch -> 401, handler NOT invoked.
  const bad = await router.handleRequest(raw, "sha1=not-the-real-digest");
  assert.equal(bad.ok, false);
  assert.equal(bad.status, 401);
  assert.equal(handled, 1);

  // Valid signature, no registered handler -> 202 unmatched.
  const deleteRaw = JSON.stringify({
    Guid: "g2", EntityType: "Tickets", Id: 2, EventTime: "2026-06-21T12:00:00",
    SequenceNumber: 2, PersonID: 2, Action: "Delete",
  });
  const unmatched = await router.handleRequest(deleteRaw, await computeAutotaskSignature(deleteRaw, secret));
  assert.equal(unmatched.ok, true);
  assert.equal(unmatched.status, 202);
  assert.equal(unmatched.matched, false);

  // Valid signature, non-JSON body -> 400.
  const garbage = "not json";
  const invalid = await router.handleRequest(garbage, await computeAutotaskSignature(garbage, secret));
  assert.equal(invalid.ok, false);
  assert.equal(invalid.status, 400);

  // Handler throw -> 500.
  const throwing = createWebhookRouter({ secretKey: secret }).on("Tickets", "Update", () => {
    throw new Error("boom");
  });
  const failed = await throwing.handleRequest(raw, sig);
  assert.equal(failed.ok, false);
  assert.equal(failed.status, 500);
});

test("createWebhookRouter returns a structured result instead of throwing on a bad escapeBody input", async () => {
  // escapeBody:true + a binary body would throw inside verify; handleRequest must
  // still resolve to a structured result rather than rejecting.
  const router = createWebhookRouter({ secretKey: "s", escapeBody: true });
  const bytes = new TextEncoder().encode(JSON.stringify({ Action: "Update", EntityType: "Tickets" }));
  const res = await router.handleRequest(bytes, "sha1=whatever");
  assert.equal(res.ok, false);
  assert.equal(res.status, 400);
});

test("parseDeliveryFromErrorLog parses valid payloads and returns null otherwise", () => {
  const payload = JSON.stringify({
    Guid: "g", EntityType: "Account", Id: 5, EventTime: "2026-06-21T12:00:00",
    SequenceNumber: 1, PersonID: 1, Action: "Update", Fields: { companyName: "Acme" },
  });
  const delivery = parseDeliveryFromErrorLog({ payload });
  assert.ok(delivery);
  assert.equal(delivery.EntityType, "Companies"); // alias normalized
  assert.equal(delivery.Action, "Update");

  assert.equal(parseDeliveryFromErrorLog({ payload: null }), null);
  assert.equal(parseDeliveryFromErrorLog({}), null);
  assert.equal(parseDeliveryFromErrorLog({ payload: "   " }), null);
  assert.equal(parseDeliveryFromErrorLog({ payload: "not json" }), null);
  // Valid JSON but invalid discriminant -> null (the parse throw is caught).
  assert.equal(
    parseDeliveryFromErrorLog({ payload: JSON.stringify({ Action: "Nope", EntityType: "Tickets" }) }),
    null,
  );
});
