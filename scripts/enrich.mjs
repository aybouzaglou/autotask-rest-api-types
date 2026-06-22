#!/usr/bin/env node
// @ts-check
/**
 * READ-ONLY live enrichment.
 *
 * Calls the Autotask `entityInformation/fields` (and userDefinedFields) GET
 * endpoints for every typed collection and emits src/generated/field-metadata.ts:
 *   - FIELD_METADATA   collection -> field metadata (dataType, required, readOnly,
 *                      reference target, picklist values) for YOUR instance
 *   - PICKLISTS        collection -> field -> picklist options
 *   - picklist literal-union type aliases for stricter typing
 *   - lookup helpers
 *
 * Uses scripts/_at-readonly.mjs, which can ONLY issue GET requests — this script
 * cannot create, modify, or delete anything. Values reflect the connected
 * instance; re-run `npm run enrich` to refresh.
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve, sep } from "node:path";
import { createReadOnlyClient } from "./_at-readonly.mjs";
import { AUTOTASK_COLLECTIONS } from "../dist/generated/metadata.js";

// Output path resolution:
//   1. explicit CLI arg (resolved against the caller's CWD), e.g.
//      `npx autotask-enrich ./autotask-field-metadata.ts`
//   2. no arg + installed as a dependency (running from node_modules): write to
//      ./autotask-field-metadata.ts in the CONSUMER'S project, never inside
//      node_modules (that path is unimportable and wiped on reinstall).
//   3. no arg + this repo's own checkout: the in-repo generated file, for
//      local `npm run enrich`.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const insideNodeModules = scriptDir.includes(`${sep}node_modules${sep}`);
const OUT_FILE = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : insideNodeModules
    ? resolve(process.cwd(), "autotask-field-metadata.ts")
    : join(scriptDir, "..", "src", "generated", "field-metadata.ts");
const CONCURRENCY = 5;

console.log(`Field metadata will be written to: ${OUT_FILE}`);

const at = createReadOnlyClient();

/** TS type name for a collection (strip the model's trailing "Model"). */
const typeNameOf = (coll) => {
  const model = AUTOTASK_COLLECTIONS[coll].model;
  return model ? model.replace(/Model$/, "") : coll;
};

const num = (s) => {
  if (s == null) return null;
  const n = Number(s);
  return Number.isFinite(n) && String(n) === String(s).trim() ? n : s;
};

/** Largest reference-backed picklist we keep options for (drop huge ID pickers). */
const MAX_REFERENCE_OPTIONS = 50;

/** Normalize a raw fieldInfo field into our shape. */
const normField = (f) => {
  const raw = f.isPickList && Array.isArray(f.picklistValues) ? f.picklistValues : null;
  // Reference fields rendered as picklists (e.g. webhook fieldID, resource
  // pickers) can list thousands of volatile ids — keep referenceEntityType but
  // drop the bulky option list. Semantic picklists (status, priority, …) stay.
  const keep = raw && (!f.isReference || raw.length <= MAX_REFERENCE_OPTIONS);
  return {
    name: f.name ?? null,
    dataType: f.dataType ?? null,
    length: f.length ?? null,
    isRequired: !!f.isRequired,
    isReadOnly: !!f.isReadOnly,
    isQueryable: f.isQueryable !== false,
    isReference: !!f.isReference,
    referenceEntityType: f.referenceEntityType || null,
    isPickList: !!f.isPickList,
    picklistValues: keep
      ? raw.map((v) => ({
          value: num(v.value),
          label: v.label ?? null,
          isActive: v.isActive !== false,
          isDefault: !!v.isDefaultValue,
          sortOrder: v.sortOrder ?? null,
          parentValue: v.parentValue != null ? num(v.parentValue) : null,
        }))
      : null,
  };
};

async function pMapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return out;
}

async function main() {
  const base = await at.base();
  console.log("Zone:", base);

  const collections = Object.keys(AUTOTASK_COLLECTIONS)
    .filter((c) => AUTOTASK_COLLECTIONS[c].typed)
    .sort();
  console.log(`Fetching field metadata for ${collections.length} typed collections (read-only)…`);

  const results = {};
  const failures = []; // { coll, status }
  let ok = 0;
  let emptyFields = 0; // HTTP 200 but no fields (addressable only under a parent) — benign
  await pMapLimit(collections, CONCURRENCY, async (coll) => {
    try {
      const resp = await at.get(`${coll}/entityInformation/fields`);
      const fields = (resp && resp.fields) || [];
      if (!fields.length) {
        emptyFields++;
        return;
      }
      results[coll] = fields.map(normField);
      ok++;
      if (ok % 25 === 0) console.log(`  …${ok} done`);
    } catch (e) {
      // _at-readonly.get() returns null on 404 (never throws), so anything that
      // lands here is a real error. Record the status; classify after the loop.
      failures.push({ coll, status: e && e.status ? e.status : "unknown" });
    }
  });

  // Classify. 405 = "fields only addressable under a parent" (benign). Auth
  // (401/403) and rate-limit (429) are FATAL — continuing would silently emit a
  // misleadingly-incomplete file. 5xx/unknown are surfaced (and abort if mass).
  const fatal = failures.filter((f) => f.status === 401 || f.status === 403 || f.status === 429);
  const benign = failures.filter((f) => f.status === 405);
  const otherErrors = failures.filter((f) => !fatal.includes(f) && !benign.includes(f));

  console.log(
    `Field metadata: ${ok} captured, ${emptyFields} parent-only/empty, ` +
      `${benign.length} parent-only (405), ${otherErrors.length} unexpected error(s), ${fatal.length} fatal.`,
  );
  if (otherErrors.length) {
    console.warn(`  Errored collections: ${otherErrors.map((f) => `${f.coll}(${f.status})`).join(", ")}`);
  }

  const die = (msg) => { console.error(`\n${msg}`); process.exit(1); };
  if (fatal.length) {
    const kinds = [...new Set(fatal.map((f) => f.status))].join(", ");
    die(
      `Aborting WITHOUT writing: ${fatal.length} collection(s) failed with auth/rate-limit errors (HTTP ${kinds}). ` +
        `Writing now would produce a misleadingly-incomplete field-metadata file.\n` +
        `Fix credentials, lower CONCURRENCY, or wait for the rate-limit window, then re-run.`,
    );
  }
  if (ok === 0) {
    die(`Aborting: no collections captured (0 with field data). Nothing useful to write.`);
  }
  if (otherErrors.length > 10) {
    die(
      `Aborting WITHOUT writing: ${otherErrors.length} collections failed with unexpected errors ` +
        `(likely a transient outage or throttling). Re-run; if it persists, investigate before trusting the output.`,
    );
  }

  // ---- Emit src/generated/field-metadata.ts ----
  const collNames = Object.keys(results).sort();
  let picklistFieldCount = 0;
  let picklistOptionCount = 0;
  for (const c of collNames)
    for (const f of results[c])
      if (f.picklistValues) {
        picklistFieldCount++;
        picklistOptionCount += f.picklistValues.length;
      }

  const out = [];
  out.push(`/**
 * AUTO-GENERATED — DO NOT EDIT BY HAND.
 * Instance-specific field metadata captured (read-only) from your Autotask
 * instance via scripts/enrich.mjs. Re-run \`npm run enrich\` to refresh.
 *
 * Zone: ${base}
 * Collections: ${collNames.length} | picklist fields: ${picklistFieldCount} | picklist options: ${picklistOptionCount}
 *
 * NOTE: picklist values and required/reference flags are specific to the
 * instance this was generated from and can change as your Autotask config
 * changes. Treat them as current-state reference, not eternal truth.
 */
`);

  out.push(`/** One selectable option of a picklist field. */`);
  out.push(`export interface PickListOption {`);
  out.push(`  /** The stored value you send/receive (numeric where numeric). */`);
  out.push(`  value: number | string;`);
  out.push(`  /** Human-readable label shown in the Autotask UI. */`);
  out.push(`  label: string | null;`);
  out.push(`  isActive: boolean;`);
  out.push(`  isDefault: boolean;`);
  out.push(`  sortOrder: number | null;`);
  out.push(`  /** For dependent picklists, the parent option this belongs to. */`);
  out.push(`  parentValue: number | string | null;`);
  out.push(`}\n`);

  out.push(`/** Field metadata for one entity field (from entityInformation/fields). */`);
  out.push(`export interface AutotaskFieldMeta {`);
  out.push(`  name: string | null;`);
  out.push(`  dataType: string | null;`);
  out.push(`  length: number | null;`);
  out.push(`  isRequired: boolean;`);
  out.push(`  isReadOnly: boolean;`);
  out.push(`  isQueryable: boolean;`);
  out.push(`  isReference: boolean;`);
  out.push(`  /** Referenced entity (business-object name) when isReference, e.g. "Resource". */`);
  out.push(`  referenceEntityType: string | null;`);
  out.push(`  isPickList: boolean;`);
  out.push(`  picklistValues: PickListOption[] | null;`);
  out.push(`}\n`);

  out.push(`/** Field metadata for every captured collection, keyed by REST collection name. */`);
  out.push(`export const FIELD_METADATA: Record<string, AutotaskFieldMeta[]> = ${JSON.stringify(results, null, 0)};\n`);

  // Literal-union aliases for numeric picklist fields with a manageable size.
  out.push(`// ---------------------------------------------------------------------------`);
  out.push(`// Opt-in strict picklist types. Use where you want compile-time checking of`);
  out.push(`// picklist codes, e.g. \`const p: TicketPriorityValue = 2\`. These reflect the`);
  out.push(`// captured instance; widen to \`number\` if your config differs.`);
  out.push(`// ---------------------------------------------------------------------------\n`);
  const pascal = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const aliasNames = [];
  for (const c of collNames) {
    const typeName = typeNameOf(c);
    for (const f of results[c]) {
      if (!f.picklistValues) continue;
      if (f.isReference) continue; // FK pickers, not semantic enums
      if (/Id$/i.test(f.name)) continue; // id-valued pseudo-picklists
      const numericVals = f.picklistValues.map((o) => o.value).filter((v) => typeof v === "number");
      if (!numericVals.length || numericVals.length !== f.picklistValues.length) continue; // mixed/string: skip
      if (numericVals.length > 40) continue; // too unwieldy as a union
      if (numericVals.some((v) => v >= 100000)) continue; // looks like ids, not enum codes
      const uniq = [...new Set(numericVals)].sort((a, b) => a - b);
      const alias = `${typeName}${pascal(f.name)}Value`;
      if (aliasNames.includes(alias)) continue;
      aliasNames.push(alias);
      const labels = f.picklistValues.map((o) => `${o.value}=${o.label}`).join(", ");
      out.push(`/** ${c}.${f.name} — ${labels} */`);
      out.push(`export type ${alias} = ${uniq.join(" | ")};`);
    }
  }
  out.push("");

  // Helpers
  out.push(`/** All field metadata for a collection. */`);
  out.push(`export function getFieldMetadata(collection: string): AutotaskFieldMeta[] | undefined {`);
  out.push(`  return FIELD_METADATA[collection];`);
  out.push(`}\n`);
  out.push(`/** Metadata for a single field. */`);
  out.push(`export function getFieldMeta(collection: string, field: string): AutotaskFieldMeta | undefined {`);
  out.push(`  return FIELD_METADATA[collection]?.find((f) => f.name === field);`);
  out.push(`}\n`);
  out.push(`/** Picklist options for a field, or undefined if it is not a captured picklist. */`);
  out.push(`export function getPicklist(collection: string, field: string): PickListOption[] | undefined {`);
  out.push(`  return getFieldMeta(collection, field)?.picklistValues ?? undefined;`);
  out.push(`}\n`);
  out.push(`/** Resolve a picklist value to its label. */`);
  out.push(`export function picklistLabel(collection: string, field: string, value: number | string): string | undefined {`);
  out.push(`  const opt = getPicklist(collection, field)?.find((o) => o.value === value);`);
  out.push(`  return opt?.label ?? undefined;`);
  out.push(`}\n`);
  out.push(`/** Resolve a picklist label (case-insensitive) to its stored value. */`);
  out.push(`export function picklistValue(collection: string, field: string, label: string): number | string | undefined {`);
  out.push(`  const opt = getPicklist(collection, field)?.find((o) => o.label?.toLowerCase() === label.toLowerCase());`);
  out.push(`  return opt?.value;`);
  out.push(`}`);

  writeFileSync(OUT_FILE, out.join("\n") + "\n");
  console.log(`\nWrote ${OUT_FILE}`);
  console.log(`  ${collNames.length} collections, ${picklistFieldCount} picklist fields, ${picklistOptionCount} options, ${aliasNames.length} strict picklist type aliases`);
}

main().catch((e) => {
  console.error("Enrichment failed:", e.message);
  process.exit(1);
});
