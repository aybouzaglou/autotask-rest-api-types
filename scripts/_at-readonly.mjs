// @ts-check
/**
 * READ-ONLY Autotask client used by enrichment scripts.
 *
 * SAFETY: this module can ONLY issue HTTP GET requests. There is deliberately
 * no code path for POST/PATCH/PUT/DELETE — any attempt throws before a request
 * is made. This guarantees enrichment can never create, modify, or delete data
 * in the connected (production) instance.
 *
 * Credentials are read from .env and NEVER logged.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Parse .env into a map without printing values. Prefers the caller's CWD
 * (so `npx autotask-enrich` reads the consumer's .env) then this package root. */
function loadEnv() {
  let raw = "";
  const candidates = [join(process.cwd(), ".env"), join(ROOT, ".env")];
  let found = false;
  for (const path of candidates) {
    try {
      raw = readFileSync(path, "utf8");
      found = true;
      break;
    } catch {
      // try next candidate
    }
  }
  if (!found) {
    throw new Error(`No .env found (looked in ${candidates.join(" and ")}). Add your Autotask API credentials there.`);
  }
  /** @type {Record<string,string>} */
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

/** Find a value by trying several candidate key names (case-insensitive). */
function pick(env, candidates) {
  const lower = {};
  for (const [k, v] of Object.entries(env)) lower[k.toLowerCase()] = v;
  for (const c of candidates) {
    const hit = lower[c.toLowerCase()];
    if (hit) return hit;
  }
  return undefined;
}

export function getCredentials() {
  const env = loadEnv();
  const username = pick(env, ["AUTOTASK_USER", "AUTOTASK_USERNAME", "ATWS_USER", "AT_USER", "USERNAME", "API_USER", "APIUSER"]);
  const secret = pick(env, ["AUTOTASK_SECRET", "ATWS_SECRET", "AT_SECRET", "SECRET", "API_SECRET", "PASSWORD", "APISECRET", "APISECTRET"]);
  const integrationCode = pick(env, ["AUTOTASK_INTEGRATION_CODE", "AUTOTASK_INTEGRATIONCODE", "AUTOTASK_TRACKING_ID", "INTEGRATION_CODE", "API_INTEGRATION_CODE", "TRACKING_IDENTIFIER", "TRACKINGID", "TRACKING_ID"]);
  const baseOverride = pick(env, ["AUTOTASK_BASE_URL", "AUTOTASK_ZONE_URL", "BASE_URL", "ZONE"]);
  const keysPresent = Object.keys(env);
  if (!username || !secret || !integrationCode) {
    throw new Error(
      `Missing one of username/secret/integrationCode in .env. Keys found: ${keysPresent.join(", ")}`,
    );
  }
  return { username, secret, integrationCode, baseOverride, keysPresent };
}

const PROBE_BASE = "https://webservices.autotask.net/ATServicesRest";

export function createReadOnlyClient() {
  const { username, secret, integrationCode, baseOverride, keysPresent } = getCredentials();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ApiIntegrationCode: integrationCode,
    UserName: username,
    Secret: secret,
  };

  let basePromise = null;
  const base = () => {
    // Only honor an override that is a full URL; values like "ww14" are zone
    // ids, not base URLs, so fall through to zone detection for those.
    if (baseOverride && /^https?:\/\//i.test(baseOverride)) {
      return Promise.resolve(baseOverride.replace(/\/$/, ""));
    }
    if (!basePromise) {
      const url = `${PROBE_BASE}/V1.0/zoneInformation?user=${encodeURIComponent(username)}`;
      basePromise = fetch(url, { headers }).then(async (r) => {
        if (!r.ok) throw new Error(`Zone detection failed: ${r.status} ${await r.text()}`);
        const zone = await r.json();
        if (!zone.url) throw new Error("Zone response missing url");
        return String(zone.url).replace(/\/$/, "");
      });
    }
    return basePromise;
  };

  /** Issue a GET. No other method is possible. */
  async function get(path) {
    const url = `${await base()}/V1.0/${path.replace(/^\//, "")}`;
    const res = await fetch(url, { method: "GET", headers });
    if (res.status === 404) return null;
    if (!res.ok) {
      const body = await res.text();
      const err = new Error(`GET ${path} -> ${res.status}: ${body.slice(0, 300)}`);
      // @ts-ignore
      err.status = res.status;
      throw err;
    }
    return res.json();
  }

  return { get, base, keysPresent };
}
