# A complete, dependency-free typed `fetch` client

Implements `AutotaskTypedClient` with zone detection and header auth. No external packages. Covers top-level entities; for child-entity writes use the apigrate connector or build the parent-scoped path. Referenced from [`SKILL.md`](../SKILL.md).

```ts
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

export interface AutotaskCredentials {
  username: string;        // API user
  secret: string;          // API user secret
  integrationCode: string; // tracking identifier
}

export function createAutotaskClient(creds: AutotaskCredentials): AutotaskTypedClient {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ApiIntegrationCode: creds.integrationCode,
    UserName: creds.username,
    Secret: creds.secret,
  };

  // Discover the account's zone base URL once, then cache it.
  let basePromise: Promise<string> | null = null;
  const base = (): Promise<string> => {
    if (!basePromise) {
      const probe = "https://webservices.autotask.net/ATServicesRest";
      const url = `${probe}/V1.0/zoneInformation?user=${encodeURIComponent(creds.username)}`;
      basePromise = fetch(url, { headers }).then(async (r) => {
        if (!r.ok) throw new Error(`Zone detection failed: ${r.status} ${await r.text()}`);
        const zone = (await r.json()) as ZoneInformation;
        if (!zone.url) throw new Error("Zone response missing url");
        return zone.url.replace(/\/$/, ""); // e.g. https://webservices14.autotask.net/ATServicesRest
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
    // Only get(id) treats 404 as "not found"; for any other verb a 404 is a
    // real error (wrong path / stale base URL) and must throw.
    if (notFoundOk && res.status === 404) return { item: null } as R;
    if (!res.ok) throw new Error(`Autotask ${method} ${path} → ${res.status}: ${await res.text()}`);
    return (await res.json()) as R;
  }

  return {
    query: <K extends EntityName>(c: K, q: AutotaskQuery<EntityOf<K>>) =>
      call<AutotaskQueryResult<EntityOf<K>>>("POST", `${c}/query`, q),
    count: <K extends EntityName>(c: K, q: AutotaskCountQuery<EntityOf<K>>) =>
      call<AutotaskCountResult>("POST", `${c}/query/count`, q),
    get: <K extends EntityName>(c: K, id: number) =>
      call<AutotaskItemResult<EntityOf<K>>>("GET", `${c}/${id}`, undefined, true),
    create: <K extends EntityName>(c: K, data: CreateInput<K>) =>
      call<AutotaskWriteResult>("POST", `${c}`, data),
    update: <K extends EntityName>(c: K, data: UpdateInput<K>) =>
      call<AutotaskWriteResult>("PATCH", `${c}`, data),
    replace: <K extends EntityName>(c: K, data: ReplaceInput<K>) =>
      call<AutotaskWriteResult>("PUT", `${c}`, data),
    delete: <K extends EntityName>(c: K, id: number) =>
      call<AutotaskWriteResult>("DELETE", `${c}/${id}`),
    info: <K extends EntityName>(c: K) =>
      call<EntityInformationResult>("GET", `${c}/entityInformation`),
    fieldInfo: <K extends EntityName>(c: K) =>
      call<FieldInformationResult>("GET", `${c}/entityInformation/fields`),
    udfInfo: <K extends EntityName>(c: K) =>
      call<UserDefinedFieldInformationResult>("GET", `${c}/entityInformation/userDefinedFields`),
  };
}
```
