// @ts-check
/**
 * Autotask REST API → TypeScript type generator.
 *
 * Source of truth: the public Autotask PSA Swagger 2.0 document
 * (https://webservices14.autotask.net/ATServicesRest/swagger/docs/v1), saved
 * locally as ./swagger.json so generation is reproducible & offline.
 *
 * Emits (into src/generated/):
 *   - entities.ts   one interface per real Autotask entity (the `XxxModel`
 *                   definitions that appear inside QueryActionResult/
 *                   ItemQueryResultModel wrappers). Fields carry JSDoc with the
 *                   wire format and read-only flags.
 *   - registry.ts   the AutotaskEntities map (collection name -> entity type),
 *                   the EntityName union, and CreateModel/UpdateModel helpers.
 *   - metadata.ts   a runtime `as const` catalog describing every REST
 *                   collection: underlying entity name, supported operations,
 *                   UDF support, and parent collections. Handy for tooling/AI.
 *
 * Nothing here is hand-edited after generation. Stable, hand-written code
 * (query/filter/response types, the typed client surface) lives in src/core
 * and src/*.ts and is never touched by this script.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src", "generated");

/** @type {any} */
const swagger = JSON.parse(readFileSync(join(ROOT, "swagger.json"), "utf8"));
const defs = swagger.definitions;
const paths = swagger.paths;

// ---------------------------------------------------------------------------
// 1. Identify the canonical entity model set.
//    An Autotask "entity" is any model M that the API can return inside a
//    QueryActionResult[M,Entity] (list query) or ItemQueryResultModel[M,Entity]
//    (single get) wrapper. The bracketed second token is the underlying
//    business-object name (e.g. CompanyModel <-> Account).
// ---------------------------------------------------------------------------

/** @type {Map<string, string>} modelName -> underlying entity name */
const modelToEntity = new Map();
const wrapperRe = /^(?:QueryActionResult|ItemQueryResultModel)\[([A-Za-z0-9]+),([A-Za-z0-9]+)\]$/;
for (const name of Object.keys(defs)) {
  const m = name.match(wrapperRe);
  if (m) {
    const [, model, entity] = m;
    if (!modelToEntity.has(model)) modelToEntity.set(model, entity);
  }
}

// Attachment-content models (TicketAttachmentModel, …) are concrete, commonly
// used entities but are fetched directly rather than through a query wrapper,
// so they never appear in modelToEntity above. Fold them in from the collection
// catalog (built below) once it exists — see `addPrimaryModelEntities()`.
const entityModelSet = new Set([...modelToEntity.keys()].filter((m) => defs[m]));

// ---------------------------------------------------------------------------
// 2. Build the REST collection catalog from `paths`.
// ---------------------------------------------------------------------------

const unwrap = (ref) => {
  if (!ref) return null;
  const w = ref.replace("#/definitions/", "");
  const m = w.match(wrapperRe);
  return m ? { model: m[1], entity: m[2] } : { model: w, entity: null };
};
const respModel = (op) => {
  const r = op && op.responses && (op.responses["200"] || op.responses["201"]);
  const sc = r && r.schema;
  if (!sc) return null;
  return unwrap(sc.$ref || (sc.items && sc.items.$ref));
};

/**
 * @typedef {Object} Collection
 * @property {string} name
 * @property {string|null} model
 * @property {string|null} entity
 * @property {Set<string>} methods
 * @property {boolean} query
 * @property {boolean} count
 * @property {boolean} entityInfo
 * @property {boolean} fieldInfo
 * @property {boolean} udfInfo
 * @property {Set<string>} parents
 */

/** @type {Map<string, Collection>} */
const collections = new Map();
const collection = (name) => {
  let c = collections.get(name);
  if (!c) {
    c = {
      name,
      model: null,
      entity: null,
      methods: new Set(),
      rootMethods: new Set(),
      idMethods: new Set(),
      childRootMethods: new Set(),
      childIdMethods: new Set(),
      query: false,
      count: false,
      entityInfo: false,
      fieldInfo: false,
      udfInfo: false,
      parents: new Set(),
    };
    collections.set(name, c);
  }
  return c;
};

for (const [p, ops] of Object.entries(paths)) {
  const m = p.match(/^\/V1\.0\/([A-Za-z0-9]+)(.*)$/);
  if (!m) continue;
  const [, name, tail] = m;
  const c = collection(name);
  for (const [meth, op] of Object.entries(ops)) {
    if (typeof op !== "object") continue;
    const M = meth.toUpperCase();
    c.methods.add(M);
    // Operation flags must reflect the ENTITY's own endpoints only — the
    // collection root (/V1.0/{Name}) and by-id (/V1.0/{Name}/{id}) — not its
    // child sub-resources (e.g. /Companies/{parentId}/Contacts/{id}), which
    // would otherwise inflate canDelete/canCreate for the parent.
    if (tail === "") c.rootMethods.add(M);
    if (tail === "/{id}") c.idMethods.add(M);
    if ((tail === "" || tail === "/{id}") && meth === "get") {
      const rm = respModel(op);
      if (rm && rm.model && !c.model) {
        c.model = rm.model;
        c.entity = rm.entity;
      }
    }
    if (tail === "/query" && meth === "post") {
      const rm = respModel(op);
      if (rm && rm.model && !c.model) {
        c.model = rm.model;
        c.entity = rm.entity;
      }
    }
  }
  if (tail === "/query") c.query = true;
  if (tail === "/query/count") c.count = true;
  if (tail === "/entityInformation") c.entityInfo = true;
  if (tail === "/entityInformation/fields") c.fieldInfo = true;
  if (tail === "/entityInformation/userDefinedFields") c.udfInfo = true;
}

// Parent relationships & child-path capabilities.
// Many child entities (e.g. CompanyNotes) are read-only on their own top-level
// collection but writable under a parent: /V1.0/Companies/{parentId}/Notes. We
// gather the HTTP methods on those parent child-paths and fold them into the
// child collection's capability flags so "can this entity be created at all?"
// is answered correctly, while `parents` records where the write must happen.
{
  /** key `${parent}//${seg}` -> {parent, seg, rootMethods, idMethods, model} */
  const childPaths = new Map();
  for (const [p, ops] of Object.entries(paths)) {
    let m = p.match(/^\/V1\.0\/([A-Za-z0-9]+)\/\{parentId\}\/([A-Za-z0-9]+)$/);
    let isId = false;
    if (!m) {
      m = p.match(/^\/V1\.0\/([A-Za-z0-9]+)\/\{parentId\}\/([A-Za-z0-9]+)\/\{id\}$/);
      isId = true;
    }
    if (!m) continue;
    const key = `${m[1]}//${m[2]}`;
    const e = childPaths.get(key) || { parent: m[1], seg: m[2], rootMethods: new Set(), idMethods: new Set(), model: null };
    for (const [meth, op] of Object.entries(ops)) {
      if (typeof op !== "object") continue;
      (isId ? e.idMethods : e.rootMethods).add(meth.toUpperCase());
      if (meth === "get" && !e.model) {
        const rm = respModel(op);
        if (rm && rm.model) e.model = rm.model;
      }
    }
    childPaths.set(key, e);
  }
  // Link a child path to its collection BY MODEL. Caveat: a few collections
  // (ResourceTimeOffAdditional, ResourceTimeOffBalances) expose only
  // entityInformation paths at top level — no GET /{id} or POST /query — so
  // their own `model` never resolves and this match can't fire. They remain
  // typed:false with all-false flags; their data lives only under
  // /Resources/{parentId}/TimeOff*. Documented as a known gap in docs/AI_GUIDE.md
  // rather than fixed with a fragile name-based fallback.
  for (const e of childPaths.values()) {
    if (!e.model) continue;
    for (const c of collections.values()) {
      if (c.model === e.model && c.name !== e.parent) {
        c.parents.add(e.parent);
        for (const M of e.rootMethods) c.childRootMethods.add(M);
        for (const M of e.idMethods) c.childIdMethods.add(M);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Finalise the entity model set & assign exposed TypeScript names.
//    Fold in each collection's primary model when it is a concrete entity model
//    (ends in "Model") that is not a system/result envelope (`*ResultModel`).
//    This captures the attachment-content models (TicketAttachmentModel, …),
//    which are real entities fetched outside the query wrapper.
// ---------------------------------------------------------------------------

for (const c of collections.values()) {
  const m = c.model;
  if (!m || !defs[m]) continue;
  if (!/Model$/.test(m)) continue;
  if (/ResultModel$/.test(m)) continue;
  if (!entityModelSet.has(m)) {
    entityModelSet.add(m);
    if (!modelToEntity.has(m)) modelToEntity.set(m, c.entity);
  }
}

const entityModels = [...entityModelSet].sort();

/** @type {Map<string,string>} modelName -> TS type name (strip trailing "Model"). */
const modelToType = new Map();
const usedTypeNames = new Set();
for (const model of entityModels) {
  const base = model.replace(/Model$/, "");
  let name = base;
  let i = 2;
  while (usedTypeNames.has(name)) name = `${base}${i++}`;
  usedTypeNames.add(name);
  modelToType.set(model, name);
}

// ---------------------------------------------------------------------------
// 4. Type mapping.
// ---------------------------------------------------------------------------

const SKIP_PROP = (propName, spec) => {
  // SOAP-era plumbing that the REST API echoes back but is never useful.
  if (propName === "soapParentPropertyId") return true;
  const ref = spec.$ref || (spec.items && spec.items.$ref) || "";
  if (/Expression\[|ParameterExpression/.test(ref)) return true;
  return false;
};

/** Map a Swagger property spec to a TS type string. */
const tsType = (spec) => {
  if (spec.$ref) {
    const ref = spec.$ref.replace("#/definitions/", "");
    if (ref === "UserDefinedField") return "UserDefinedField";
    if (modelToType.has(ref)) return modelToType.get(ref);
    return "unknown";
  }
  switch (spec.type) {
    case "integer":
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "string":
      return "string";
    case "array": {
      const it = spec.items || {};
      if (it.$ref) {
        const ref = it.$ref.replace("#/definitions/", "");
        if (ref === "UserDefinedField") return "UserDefinedField[]";
        if (modelToType.has(ref)) return `${modelToType.get(ref)}[]`;
        return "unknown[]";
      }
      const inner = tsType(it);
      return `${inner}[]`;
    }
    case "object":
      // A property-less Swagger object carries no shape; the real wire value is
      // usually a serialized scalar (e.g. UDF defaultValue). `unknown` is more
      // honest than `Record<string, unknown>` and forces the consumer to narrow.
      return "unknown";
    default:
      return "unknown";
  }
};

/** Human-readable wire-format note for JSDoc. */
const formatNote = (spec, propName = "") => {
  if (spec.type === "array") return spec.items && spec.items.$ref ? null : "array";
  switch (spec.format) {
    case "int32":
      return "integer (int32)";
    case "int64":
      // ids and foreign keys stay well within JS's safe-integer range; other
      // int64 values (e.g. byte counters) can legitimately exceed 2^53, where
      // JSON.parse silently rounds — so only reassure for id-like fields.
      return /id$/i.test(propName)
        ? "integer (int64) — within JS safe-integer range for Autotask ids"
        : "integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless";
    case "double":
      return "decimal (double)";
    case "date-time":
      return 'UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`)';
    case "byte":
      return "base64-encoded binary string";
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
// 5. Emit entities.ts
// ---------------------------------------------------------------------------

const banner = (extra = "") => `/**
 * AUTO-GENERATED — DO NOT EDIT BY HAND.
 * Generated from swagger.json by scripts/generate.mjs.
 * Run \`npm run generate\` to refresh after updating swagger.json.
 *${extra ? `\n * ${extra}\n *` : ""}/
`;

const emitEntities = () => {
  const out = [];
  out.push(banner());
  out.push(`import type { UserDefinedField } from "../core/udf.js";\n`);

  for (const model of entityModels) {
    const def = defs[model];
    const typeName = modelToType.get(model);
    const entity = modelToEntity.get(model);
    const props = def.properties || {};
    const propNames = Object.keys(props);

    const docLines = [`The \`${typeName}\` entity.`];
    if (entity && entity !== typeName) docLines.push(`Underlying Autotask business object: \`${entity}\`.`);
    docLines.push(`Generated from Swagger model \`${model}\`.`);
    out.push(`/**\n${docLines.map((l) => ` * ${l}`).join("\n")}\n */`);
    out.push(`export interface ${typeName} {`);

    for (const propName of propNames) {
      const spec = props[propName];
      if (SKIP_PROP(propName, spec)) continue;
      const type = tsType(spec);
      const readOnly = spec.readOnly === true;
      const isId = propName === "id";

      // JSDoc per field
      const notes = [];
      const fmt = formatNote(spec, propName);
      if (fmt) notes.push(fmt);
      if (readOnly) notes.push("read-only (server-managed)");
      if (spec.description) notes.unshift(String(spec.description).trim());
      if (notes.length) out.push(`  /** ${notes.join(". ")}. */`);

      // id is always present on a fetched record; every other field is optional
      // (the API omits fields you exclude with includeFields and returns null
      // for empty values). null is included so consumers handle the classic
      // Autotask "empty field === null" case.
      const ro = readOnly ? "readonly " : "";
      if (isId) {
        // id is server-assigned; readonly signals it shouldn't be mutated. It
        // is always present on a fetched/created record (use WithId<T>/Loaded<T>).
        out.push(`  readonly id?: number;`);
      } else {
        out.push(`  ${ro}${propName}?: ${type} | null;`);
      }
    }
    out.push(`}\n`);
  }
  writeFileSync(join(OUT, "entities.ts"), out.join("\n"));
  return entityModels.length;
};

// ---------------------------------------------------------------------------
// 6. Emit registry.ts — the collection -> entity type map.
//    Only collections that resolve to one of our generated entity types are
//    included in the strongly-typed map (others are action-only endpoints).
// ---------------------------------------------------------------------------

const emitRegistry = () => {
  const out = [];
  out.push(banner("The map of REST collection name -> entity interface."));

  const mapped = [...collections.values()]
    .filter((c) => c.model && modelToType.has(c.model))
    .sort((a, b) => a.name.localeCompare(b.name));

  const typesUsed = [...new Set(mapped.map((c) => modelToType.get(c.model)))].sort();
  out.push(`import type {\n${typesUsed.map((t) => `  ${t},`).join("\n")}\n} from "./entities.js";\n`);

  out.push(`/**
 * Maps every queryable Autotask REST collection name to its entity interface.
 * Use it to write a generically-typed client, e.g.
 *
 * \`\`\`ts
 * function query<K extends EntityName>(
 *   collection: K,
 *   q: AutotaskQuery<AutotaskEntities[K]>,
 * ): Promise<AutotaskQueryResult<AutotaskEntities[K]>>;
 * \`\`\`
 */`);
  out.push(`export interface AutotaskEntities {`);
  for (const c of mapped) {
    out.push(`  ${c.name}: ${modelToType.get(c.model)};`);
  }
  out.push(`}\n`);

  out.push(`/** Union of every queryable Autotask REST collection name. */`);
  out.push(`export type EntityName = keyof AutotaskEntities;\n`);

  out.push(`/** The entity interface for a given collection name. */`);
  out.push(`export type EntityOf<K extends EntityName> = AutotaskEntities[K];\n`);

  out.push(`/**
 * Shape accepted when creating an entity: the entity without its server-assigned
 * \`id\`. Read-only fields are ignored by the API if sent, so they remain present
 * but typed \`readonly\` on the source interface.
 */`);
  out.push(`export type CreateModel<T> = Omit<T, "id">;\n`);

  out.push(`/**
 * Shape accepted when updating an entity via PATCH (\`update()\`): a partial set
 * of fields plus the required \`id\`. PATCH is **sparse** — only the fields you
 * send are changed. For PUT (\`replace()\`), which resets omitted writable fields,
 * use {@link ReplaceModel} instead.
 */`);
  out.push(`export type UpdateModel<T> = Partial<Omit<T, "id">> & { id: number };\n`);

  out.push(`/**
 * Internal: resolves to \`A\` when X and Y are identical *including* readonly-ness,
 * else \`B\`. Used to detect \`readonly\` (server-managed) properties.
 */`);
  out.push(`type IfEquals<X, Y, A = X, B = never> =\n  (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;\n`);

  out.push(`/** Keys of \`T\` whose declared property is **not** \`readonly\` (i.e. writable). */`);
  out.push(`type WritableKeys<T> = {\n  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>;\n}[keyof T];\n`);

  out.push(`/**
 * Shape accepted when replacing an entity via PUT (\`replace()\`).
 *
 * ⚠️ PUT is **destructive**: every writable field you OMIT is reset to
 * null/default. To keep that honest at the type level, \`ReplaceModel<T>\` requires
 * **all** writable fields (plus \`id\`); read-only fields are excluded. A partial
 * object like \`{ id, title }\` will therefore NOT compile here — that would
 * silently null everything else. Build it from a fully-loaded record
 * (\`replace({ ...loaded, title })\`), or prefer \`update()\` (PATCH) for partial
 * changes.
 *
 * Caveat: "writable" is derived from the spec's \`readOnly\` flags, which Autotask
 * populates incompletely — so this can require fields that are effectively
 * server-managed (timestamps, \`userDefinedFields\`, etc.). Treat it as a strong
 * hint, not a perfect contract; \`update()\` sidesteps the issue entirely.
 */`);
  out.push(`export type ReplaceModel<T> = Required<Pick<T, WritableKeys<T>>> & { id: number };\n`);

  out.push(`/** Convenience: create payload for a named collection. */`);
  out.push(`export type CreateInput<K extends EntityName> = CreateModel<AutotaskEntities[K]>;\n`);
  out.push(`/** Convenience: update (PATCH) payload for a named collection. */`);
  out.push(`export type UpdateInput<K extends EntityName> = UpdateModel<AutotaskEntities[K]>;\n`);
  out.push(`/** Convenience: replace (PUT) payload for a named collection. */`);
  out.push(`export type ReplaceInput<K extends EntityName> = ReplaceModel<AutotaskEntities[K]>;\n`);

  writeFileSync(join(OUT, "registry.ts"), out.join("\n"));
  return mapped.length;
};

// ---------------------------------------------------------------------------
// 7. Emit metadata.ts — runtime catalog of every collection.
// ---------------------------------------------------------------------------

const emitMetadata = () => {
  const out = [];
  out.push(banner("Runtime catalog of every Autotask REST collection."));

  out.push(`/** Operations supported by a collection's REST endpoints. */`);
  out.push(`export interface CollectionMetadata {`);
  out.push(`  /** REST collection name as used in the URL path, e.g. "Companies". */`);
  out.push(`  readonly name: string;`);
  out.push(`  /** Underlying Autotask business object, e.g. "Account". null when not applicable. */`);
  out.push(`  readonly entity: string | null;`);
  out.push(`  /** Swagger model backing this collection, e.g. "CompanyModel". null for action-only endpoints. */`);
  out.push(`  readonly model: string | null;`);
  out.push(`  /** True when the collection exposes a generated entity interface in AutotaskEntities. */`);
  out.push(`  readonly typed: boolean;`);
  out.push(`  readonly canQuery: boolean;`);
  out.push(`  readonly canCount: boolean;`);
  out.push(`  readonly canGet: boolean;`);
  out.push(`  readonly canCreate: boolean;`);
  out.push(`  readonly canUpdate: boolean;`);
  out.push(`  readonly canDelete: boolean;`);
  out.push(`  readonly hasUserDefinedFields: boolean;`);
  out.push(`  /** True when create/update are only possible under a parent path (the own collection is read-only). */`);
  out.push(`  readonly parentWriteOnly: boolean;`);
  out.push(`  /** True when delete is only possible under a parent path (own /{id} has no DELETE) — call delete(parentId, id), e.g. ConfigurationItemDnsRecords. */`);
  out.push(`  readonly deleteRequiresParent: boolean;`);
  out.push(`  /** Parent collections this entity can also be addressed under, e.g. Notes under Companies. */`);
  out.push(`  readonly parents: readonly string[];`);
  out.push(`}\n`);

  const all = [...collections.values()].sort((a, b) => a.name.localeCompare(b.name));
  const rec = (c) => {
    const def = c.model ? defs[c.model] : null;
    const hasUdf = !!(def && def.properties && def.properties.userDefinedFields);
    const root = (m) => c.rootMethods.has(m);
    const byId = (m) => c.idMethods.has(m);
    const childRoot = (m) => c.childRootMethods.has(m);
    const childId = (m) => c.childIdMethods.has(m);

    // Own-endpoint capabilities (the /{Name} root and /{Name}/{id}).
    const selfGet = byId("GET");
    const selfCreate = root("POST");
    const selfUpdate = root("PATCH") || root("PUT");
    const selfDelete = byId("DELETE");
    // Parent child-path capabilities (/{Parent}/{parentId}/{Seg}[/{id}]).
    const viaParentCreate = childRoot("POST");
    const viaParentUpdate = childRoot("PATCH") || childRoot("PUT");

    const canCreate = selfCreate || viaParentCreate;
    const canUpdate = selfUpdate || viaParentUpdate;
    const canDelete = selfDelete || childId("DELETE");
    // Writes that are ONLY possible under a parent (the own collection is
    // read-only) — POST/PATCH the entity under /{Parent}/{parentId}/{Seg}.
    const parentWriteOnly =
      c.parents.size > 0 && (canCreate || canUpdate) && !selfCreate && !selfUpdate;
    // Delete is possible, but only via the parent child-path (own /{id} has no
    // DELETE) — the caller must use delete(parentId, id), not delete(id).
    const deleteRequiresParent = c.parents.size > 0 && canDelete && !selfDelete;

    return {
      name: c.name,
      entity: c.entity,
      model: c.model,
      typed: !!(c.model && modelToType.has(c.model)),
      canQuery: c.query,
      canCount: c.count,
      canGet: selfGet || childId("GET"),
      canCreate,
      canUpdate,
      canDelete,
      hasUserDefinedFields: hasUdf,
      parentWriteOnly,
      deleteRequiresParent,
      parents: [...c.parents].sort(),
    };
  };

  out.push(`/** Every REST collection exposed by the Autotask API, keyed by name. */`);
  out.push(`export const AUTOTASK_COLLECTIONS = {`);
  for (const c of all) {
    const r = rec(c);
    const parents = r.parents.length ? `[${r.parents.map((p) => JSON.stringify(p)).join(", ")}]` : "[]";
    out.push(`  ${JSON.stringify(c.name)}: { name: ${JSON.stringify(r.name)}, entity: ${JSON.stringify(r.entity)}, model: ${JSON.stringify(r.model)}, typed: ${r.typed}, canQuery: ${r.canQuery}, canCount: ${r.canCount}, canGet: ${r.canGet}, canCreate: ${r.canCreate}, canUpdate: ${r.canUpdate}, canDelete: ${r.canDelete}, hasUserDefinedFields: ${r.hasUserDefinedFields}, parentWriteOnly: ${r.parentWriteOnly}, deleteRequiresParent: ${r.deleteRequiresParent}, parents: ${parents} },`);
  }
  out.push(`} as const satisfies Record<string, CollectionMetadata>;\n`);

  out.push(`/**
 * All REST collection names known to the API (typed entities + action-only
 * endpoints like Version/ZoneInformation/Authenticate). This is a strict
 * superset of \`EntityName\` (the queryable, typed collections used by the
 * client surfaces). Use \`EntityName\`/\`TypedCollectionName\` when you need a
 * collection that has a generated entity interface.
 */`);
  out.push(`export type CollectionName = keyof typeof AUTOTASK_COLLECTIONS;\n`);

  out.push(`/** Collection names that have a generated entity interface (typed === true). */`);
  out.push(`export type TypedCollectionName = {`);
  out.push(`  [K in CollectionName]: (typeof AUTOTASK_COLLECTIONS)[K]["typed"] extends true ? K : never;`);
  out.push(`}[CollectionName];\n`);

  out.push(`/** Array of every collection name. */`);
  out.push(`export const COLLECTION_NAMES = Object.keys(AUTOTASK_COLLECTIONS) as CollectionName[];\n`);

  // Reverse lookup: Autotask's legacy business-object name -> REST collection.
  // Resolves classic AI/dev confusion (Account -> Companies, InstalledProduct
  // -> ConfigurationItems, AllocationCode -> BillingCodes).
  const entityToCollection = {};
  for (const c of all) {
    if (c.entity && !(c.entity in entityToCollection)) entityToCollection[c.entity] = c.name;
  }
  out.push(`/**
 * Maps an Autotask legacy business-object name (the \`entity\` field, e.g.
 * "Account") to its REST collection name (e.g. "Companies"). Useful for
 * resolving names that appear in older SOAP-era docs or \`referenceEntityType\`.
 */`);
  out.push(`export const ENTITY_TO_COLLECTION: Record<string, CollectionName> = {`);
  for (const [entity, coll] of Object.entries(entityToCollection).sort((a, b) => a[0].localeCompare(b[0]))) {
    out.push(`  ${JSON.stringify(entity)}: ${JSON.stringify(coll)},`);
  }
  out.push(`};\n`);

  writeFileSync(join(OUT, "metadata.ts"), out.join("\n"));
  return all.length;
};

// ---------------------------------------------------------------------------

const nEntities = emitEntities();
const nMapped = emitRegistry();
const nCollections = emitMetadata();

console.log(`Generated:`);
console.log(`  entities.ts  — ${nEntities} entity interfaces`);
console.log(`  registry.ts  — ${nMapped} typed collections in AutotaskEntities`);
console.log(`  metadata.ts  — ${nCollections} collections in runtime catalog`);
