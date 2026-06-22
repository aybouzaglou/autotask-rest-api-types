/**
 * User-defined fields (UDFs).
 *
 * Autotask returns UDFs on supported entities as an array of `{ name, value }`
 * pairs rather than as first-class columns. `value` is always serialized as a
 * string on the wire (even for numeric/date/list UDFs) and is `null` when empty.
 */

export interface UserDefinedField {
  /** The UDF's configured name (label) in your Autotask instance. */
  name?: string | null;
  /**
   * The UDF value, always a string on the wire (or `null` when empty).
   * Cast/parse according to the UDF's configured data type.
   */
  value?: string | null;
}

/** Read a UDF value by name from an entity's `userDefinedFields` array. */
export function getUdf(
  udfs: ReadonlyArray<UserDefinedField> | null | undefined,
  name: string,
): string | null {
  if (!udfs) return null;
  const found = udfs.find((u) => u.name === name);
  return found && found.value != null ? found.value : null;
}

/**
 * Build a `userDefinedFields` array from a plain record for create/update.
 *
 * `undefined` values are **omitted** (treated as "not provided"), so they are
 * never sent — this matters for PATCH/`update`, where sending a field tells
 * Autotask to change it. Use an explicit `null` to **clear** a UDF.
 *
 * Values are stringified with `String()`, so `true` becomes `"true"` and `2`
 * becomes `"2"`. If a UDF expects a specific wire format (e.g. `"1"`/`"0"` or
 * `"True"` for a checkbox), pass a pre-formatted **string** rather than relying
 * on this conversion. Non-finite numbers (`NaN`, `Infinity`) throw.
 *
 * ```ts
 * toUdfArray({ A: "x", B: null, C: undefined });
 * // → [{ name: "A", value: "x" }, { name: "B", value: null }]   (C dropped)
 * ```
 */
export function toUdfArray(
  record: Readonly<Record<string, string | number | boolean | null | undefined>>,
): UserDefinedField[] {
  const out: UserDefinedField[] = [];
  for (const [name, value] of Object.entries(record)) {
    if (value === undefined) continue; // not provided — don't send (would otherwise clear it)
    if (value === null) {
      out.push({ name, value: null }); // explicit clear
      continue;
    }
    if (typeof value === "number" && !Number.isFinite(value)) {
      throw new Error(`Cannot serialize UDF "${name}": ${value} is not a finite number.`);
    }
    out.push({ name, value: String(value) });
  }
  return out;
}
