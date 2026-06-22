/**
 * Small helpers for working with the deliberately optional-and-nullable entity
 * shapes (`field?: T | null`). Type-level helpers cost nothing at runtime; the
 * two functions are tiny and tree-shakeable.
 */

import type { AutotaskWriteResult, AutotaskErrorResponse } from "./responses.js";

/**
 * The "fully loaded" view of an entity: every field present and non-null. Use
 * it when you know a record came back complete (e.g. a `get` without
 * `includeFields`) and want to drop the `| null | undefined` noise.
 *
 * ```ts
 * const company = result.item as Loaded<Company>;
 * company.companyName.trim(); // no narrowing needed
 * ```
 *
 * This is an assertion of intent — it does not validate at runtime. Prefer
 * {@link requireField} when you want a checked narrowing.
 */
export type Loaded<T> = { [K in keyof T]-?: NonNullable<T[K]> };

/** An entity guaranteed to carry its `id` (e.g. any fetched or created record). */
export type WithId<T> = T & { id: number };

/** True when a value is neither null nor undefined (handy in `.filter`). */
export function isPresent<T>(value: T | null | undefined): value is T {
  return value != null;
}

/** True when a response body is an Autotask error envelope (`{ errors: [...] }`). */
export function isAutotaskError(body: unknown): body is AutotaskErrorResponse {
  return (
    typeof body === "object" &&
    body !== null &&
    Array.isArray((body as { errors?: unknown }).errors)
  );
}

/**
 * Return a required field's value or throw a clear error if it is null/absent.
 * Narrows the type to the non-null value.
 *
 * ```ts
 * const name = requireField(company, "companyName"); // string (throws if null)
 * ```
 */
export function requireField<T, K extends keyof T>(obj: T, key: K): NonNullable<T[K]> {
  const value = obj[key];
  if (value == null) {
    throw new Error(`Autotask record is missing required field "${String(key)}"`);
  }
  return value as NonNullable<T[K]>;
}

/**
 * Normalize the `itemId` from a create/update/delete response to a `number`.
 * Autotask returns `{ itemId }` (HTTP 200) where the id is loosely typed; the
 * apigrate connector passes it through verbatim. Throws if the value isn't a
 * positive id — note `Number(null)` and `Number("")` are both `0`, so a
 * missing/empty `itemId` is rejected rather than silently returned as `0`.
 */
export function writtenId(result: AutotaskWriteResult): number {
  const id = typeof result.itemId === "number" ? result.itemId : Number(result.itemId);
  if (!Number.isFinite(id) || id <= 0) {
    throw new Error(`Autotask write response had an invalid itemId: ${JSON.stringify(result.itemId)}`);
  }
  return id;
}
