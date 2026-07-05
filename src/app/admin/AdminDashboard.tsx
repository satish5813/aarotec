"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Lead } from "@/lib/db";

export default function AdminDashboard({
  leads,
  username,
}: {
  leads: Lead[];
  username: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [l.name, l.email, l.phone, l.city, l.source]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [leads, query]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function remove(id: number) {
    if (!confirm("Delete this lead permanently?")) return;
    setBusy(id);
    const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    setBusy(null);
    if (res.ok) router.refresh();
    else alert("Failed to delete.");
  }

  function exportCsv() {
    const header = ["ID", "Name", "Email", "Phone", "City", "Source", "User Agent", "Created At"];
    const rows = filtered.map((l) => [
      l.id,
      l.name,
      l.email,
      l.phone,
      l.city,
      l.source,
      l.userAgent,
      l.createdAt,
    ]);
    const esc = (v: unknown) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [header, ...rows].map((r) => r.map(esc).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main style={page}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px 64px" }}>
        <header style={headerRow}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Leads</h1>
            <p style={{ color: "#8fa1bd", fontSize: 13, margin: "4px 0 0" }}>
              {leads.length} total · signed in as <strong>{username}</strong>
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={ghostBtn} onClick={exportCsv}>
              Export CSV
            </button>
            <button style={ghostBtn} onClick={() => router.refresh()}>
              Refresh
            </button>
            <button style={dangerGhost} onClick={logout}>
              Log out
            </button>
          </div>
        </header>

        <input
          placeholder="Search name, email, phone, city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={search}
        />

        {filtered.length === 0 ? (
          <p style={{ color: "#8fa1bd", marginTop: 40, textAlign: "center" }}>
            {leads.length === 0 ? "No leads captured yet." : "No matches."}
          </p>
        ) : (
          <div style={{ overflowX: "auto", marginTop: 18 }}>
            <table style={table}>
              <thead>
                <tr>
                  {["#", "Name", "Email", "Phone", "City", "Source", "Received", ""].map(
                    (h) => (
                      <th key={h} style={th}>
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} style={{ borderTop: "1px solid #1e2940" }}>
                    <td style={td}>{l.id}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{l.name}</td>
                    <td style={td}>
                      <a href={`mailto:${l.email}`} style={link}>
                        {l.email}
                      </a>
                    </td>
                    <td style={td}>
                      <a href={`tel:${l.phone}`} style={link}>
                        {l.phone}
                      </a>
                    </td>
                    <td style={td}>{l.city}</td>
                    <td style={{ ...td, maxWidth: 220 }}>
                      <span title={l.source} style={truncate}>
                        {l.source}
                      </span>
                    </td>
                    <td style={{ ...td, whiteSpace: "nowrap", color: "#9fb0cc" }}>
                      {formatDate(l.createdAt)}
                    </td>
                    <td style={td}>
                      <button
                        style={delBtn}
                        disabled={busy === l.id}
                        onClick={() => remove(l.id)}
                        title="Delete lead"
                      >
                        {busy === l.id ? "…" : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#0b0f17",
  color: "#e9eef7",
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
};
const headerRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 16,
  flexWrap: "wrap",
  marginBottom: 20,
};
const ghostBtn: React.CSSProperties = {
  padding: "9px 14px",
  borderRadius: 10,
  border: "1px solid #2b3a55",
  background: "#131a26",
  color: "#e9eef7",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};
const dangerGhost: React.CSSProperties = {
  ...ghostBtn,
  borderColor: "#5a2330",
  color: "#ff9b9b",
};
const search: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 14px",
  borderRadius: 10,
  border: "1px solid #2b3a55",
  background: "#0d131f",
  color: "#e9eef7",
  fontSize: 14,
  outline: "none",
};
const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
  background: "#0f1522",
  borderRadius: 12,
  overflow: "hidden",
};
const th: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 14px",
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: ".04em",
  color: "#8fa1bd",
  background: "#111a2a",
  whiteSpace: "nowrap",
};
const td: React.CSSProperties = { padding: "12px 14px", verticalAlign: "top" };
const link: React.CSSProperties = { color: "#7ab0ff", textDecoration: "none" };
const truncate: React.CSSProperties = {
  display: "inline-block",
  maxWidth: 220,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "#9fb0cc",
};
const delBtn: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid #5a2330",
  background: "transparent",
  color: "#ff9b9b",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};
