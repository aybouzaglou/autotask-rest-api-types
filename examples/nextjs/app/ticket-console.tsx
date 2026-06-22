"use client";

import { useEffect, useState } from "react";
import type { Ticket } from "autotask-rest-api-types";
import type { PickListOption } from "../lib/field-metadata-sample";

interface ListResponse {
  mode: "live" | "simulated";
  picklists: Record<"status" | "priority" | "queueID", PickListOption[]>;
  tickets: Ticket[];
}

const labelOf = (opts: PickListOption[] | undefined, value: number | null | undefined) =>
  opts?.find((o) => o.value === value)?.label ?? (value ?? "—");

export function TicketConsole() {
  const [data, setData] = useState<ListResponse | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ title: "", status: 1, priority: 3, queueID: 0, description: "" });

  async function refresh() {
    const res = await fetch("/api/tickets");
    const json = await res.json();
    if (res.ok) setData(json);
    else setErrors(json.errors ?? ["Failed to load"]);
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErrors([]);
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyID: 688,
        title: form.title,
        status: Number(form.status),
        priority: Number(form.priority),
        queueID: form.queueID ? Number(form.queueID) : null,
        description: form.description || null,
      }),
    });
    const json = await res.json();
    setBusy(false);
    if (res.ok) {
      setForm({ ...form, title: "", description: "" });
      await refresh();
    } else {
      setErrors(json.errors ?? ["Create failed"]);
    }
  }

  const pl = data?.picklists;

  return (
    <div className="grid">
      <section className="card">
        <h2>Create ticket</h2>
        <form onSubmit={submit} className="form">
          <label>
            Title
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Short summary" />
          </label>
          <div className="row">
            <label>
              Status
              <select value={form.status} onChange={(e) => setForm({ ...form, status: Number(e.target.value) })}>
                {pl?.status.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            <label>
              Priority
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })}>
                {pl?.priority.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
          </div>
          <label>
            Queue
            <select value={form.queueID} onChange={(e) => setForm({ ...form, queueID: Number(e.target.value) })}>
              <option value={0}>— none —</option>
              {pl?.queueID.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
          <label>
            Description
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          </label>
          <button disabled={busy} type="submit">{busy ? "Creating…" : "Create ticket"}</button>
        </form>

        {errors.length > 0 && (
          <div className="errors">
            <strong>API error ({"{ errors: string[] }"}):</strong>
            <ul>{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
          </div>
        )}
        <p className="hint">
          Tip: pick a priority, then change it in dev tools to an invalid code (e.g. 99) to see the typed
          <code> AutotaskApiError</code> surfaced — the same edge case the live API returns.
        </p>
      </section>

      <section className="card">
        <h2>Tickets for company 688 {data && <span className="count">({data.tickets.length})</span>}</h2>
        <table>
          <thead>
            <tr><th>#</th><th>Title</th><th>Status</th><th>Priority</th><th>Queue</th><th>Created</th></tr>
          </thead>
          <tbody>
            {data?.tickets.map((t) => (
              <tr key={t.id}>
                <td className="mono">{t.ticketNumber}</td>
                <td>{t.title}</td>
                <td>{labelOf(pl?.status, t.status)}</td>
                <td>{labelOf(pl?.priority, t.priority)}</td>
                <td>{labelOf(pl?.queueID, t.queueID)}</td>
                <td className="mono">{t.createDate?.slice(0, 10) ?? "—"}</td>
              </tr>
            ))}
            {data && data.tickets.length === 0 && <tr><td colSpan={6} className="empty">No tickets yet.</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  );
}
