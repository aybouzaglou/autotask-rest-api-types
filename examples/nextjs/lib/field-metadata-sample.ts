/**
 * SAMPLE picklist metadata for the demo — generic Autotask-style defaults, NOT
 * captured from any real instance. It mirrors the shape the package's optional
 * enrichment produces (`PickListOption` + `getPicklist`) so the example can show
 * dropdowns and label lookups without shipping anyone's tenant data.
 *
 * In a real app, generate your instance's metadata into your own project:
 *
 *   npx autotask-enrich ./autotask-field-metadata.ts
 *
 * (read-only against your Autotask instance) and import from that file instead.
 */

/** One selectable option of a picklist field (mirrors the enrichment output). */
export interface PickListOption {
  value: number | string;
  label: string | null;
  isActive: boolean;
  isDefault: boolean;
  sortOrder: number | null;
  parentValue: number | string | null;
}

const opt = (value: number, label: string, sortOrder: number, isDefault = false): PickListOption => ({
  value,
  label,
  isActive: true,
  isDefault,
  sortOrder,
  parentValue: null,
});

const TICKETS: Record<string, PickListOption[]> = {
  status: [
    opt(1, "New", 0, true),
    opt(5, "In Progress", 1),
    opt(7, "Waiting Customer", 2),
    opt(8, "Complete", 3),
  ],
  priority: [
    opt(1, "High", 0),
    opt(2, "Medium", 1, true),
    opt(3, "Low", 2),
    opt(4, "Critical", 3),
  ],
  queueID: [
    opt(5, "Triage", 0, true),
    opt(6, "Provisioning", 1),
    opt(8, "Support", 2),
  ],
};

const SAMPLE: Record<string, Record<string, PickListOption[]>> = { Tickets: TICKETS };

/** Picklist options for a field, or undefined if not a known sample picklist. */
export function getPicklist(collection: string, field: string): PickListOption[] | undefined {
  return SAMPLE[collection]?.[field];
}
