/**
 * A small, fully-typed Autotask client over `fetch` — the live backend for the
 * example. Server-side only (never expose credentials to the browser).
 */
import type {
  AutotaskTypedClient,
  EntityName,
  EntityOf,
  AutotaskQuery,
  AutotaskQueryResult,
  AutotaskItemResult,
  AutotaskWriteResult,
  AutotaskCountResult,
  AutotaskCountQuery,
  CreateInput,
  UpdateInput,
  ReplaceInput,
  EntityInformationResult,
  FieldInformationResult,
  UserDefinedFieldInformationResult,
  ZoneInformation,
} from "autotask-rest-api-types";
import { isAutotaskError } from "autotask-rest-api-types";

export interface AutotaskCredentials {
  username: string;
  secret: string;
  integrationCode: string;
  /** Optional explicit zone base URL; otherwise auto-detected. */
  baseUrl?: string;
}

/** Thrown when the API returns an error envelope (`{ errors: [...] }`). */
export class AutotaskApiError extends Error {
  constructor(public status: number, public errors: string[]) {
    super(errors.join("; ") || `Autotask request failed (${status})`);
    this.name = "AutotaskApiError";
  }
}

export function createAutotaskClient(creds: AutotaskCredentials): AutotaskTypedClient {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ApiIntegrationCode: creds.integrationCode,
    UserName: creds.username,
    Secret: creds.secret,
  };

  let basePromise: Promise<string> | null = null;
  const base = (): Promise<string> => {
    if (creds.baseUrl) return Promise.resolve(creds.baseUrl.replace(/\/$/, ""));
    if (!basePromise) {
      const probe = "https://webservices.autotask.net/ATServicesRest";
      const url = `${probe}/V1.0/zoneInformation?user=${encodeURIComponent(creds.username)}`;
      basePromise = fetch(url, { headers }).then(async (r) => {
        if (!r.ok) throw new AutotaskApiError(r.status, [`Zone detection failed: ${await r.text()}`]);
        const zone = (await r.json()) as ZoneInformation;
        if (!zone.url) throw new AutotaskApiError(500, ["Zone response missing url"]);
        return zone.url.replace(/\/$/, "");
      });
    }
    return basePromise;
  };

  async function call<R>(method: string, path: string, body?: unknown, notFoundOk = false): Promise<R> {
    const url = `${await base()}/V1.0/${path}`;
    const res = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    // Only get(id) treats 404 as "not found" → { item: null }. For every other
    // verb a 404 is a real error (wrong path, stale base URL) and must throw.
    if (notFoundOk && res.status === 404) return { item: null } as R;
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const errors = isAutotaskError(data) ? data.errors : [`HTTP ${res.status}`];
      throw new AutotaskApiError(res.status, errors);
    }
    return data as R;
  }

  // This demo client only implements top-level (parentless) collection routing.
  // Child entities (e.g. notes/attachments created under a parent) use a
  // `/{Parent}/{parentId}/{Child}` URL the bare collection name can't resolve —
  // fail loudly rather than silently POSTing to the wrong (top-level) path.
  const noChildRouting = (parentId: number | undefined) => {
    if (parentId !== undefined) {
      throw new AutotaskApiError(501, [
        "This example client does not implement child-entity routing (parentId). " +
          "Use the @apigrate/autotask-restapi connector for parent-scoped writes.",
      ]);
    }
  };

  return {
    query: <K extends EntityName>(c: K, q: AutotaskQuery<EntityOf<K>>) =>
      call<AutotaskQueryResult<EntityOf<K>>>("POST", `${c}/query`, q),
    count: <K extends EntityName>(c: K, q: AutotaskCountQuery<EntityOf<K>>) =>
      call<AutotaskCountResult>("POST", `${c}/query/count`, q),
    get: <K extends EntityName>(c: K, id: number, parentId?: number) => {
      noChildRouting(parentId);
      return call<AutotaskItemResult<EntityOf<K>>>("GET", `${c}/${id}`, undefined, true);
    },
    create: <K extends EntityName>(c: K, data: CreateInput<K>, parentId?: number) => {
      noChildRouting(parentId);
      return call<AutotaskWriteResult>("POST", `${c}`, data);
    },
    update: <K extends EntityName>(c: K, data: UpdateInput<K>, parentId?: number) => {
      noChildRouting(parentId);
      return call<AutotaskWriteResult>("PATCH", `${c}`, data);
    },
    replace: <K extends EntityName>(c: K, data: ReplaceInput<K>, parentId?: number) => {
      noChildRouting(parentId);
      return call<AutotaskWriteResult>("PUT", `${c}`, data);
    },
    delete: <K extends EntityName>(c: K, id: number, parentId?: number) => {
      noChildRouting(parentId);
      return call<AutotaskWriteResult>("DELETE", `${c}/${id}`);
    },
    info: <K extends EntityName>(c: K) =>
      call<EntityInformationResult>("GET", `${c}/entityInformation`),
    fieldInfo: <K extends EntityName>(c: K) =>
      call<FieldInformationResult>("GET", `${c}/entityInformation/fields`),
    udfInfo: <K extends EntityName>(c: K) =>
      call<UserDefinedFieldInformationResult>("GET", `${c}/entityInformation/userDefinedFields`),
  };
}
