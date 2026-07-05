"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0b0f17",
        color: "#e9eef7",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        padding: "24px",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: 360,
          background: "#131a26",
          border: "1px solid #223049",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 20px 60px rgba(0,0,0,.45)",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>
          Admin Login
        </h1>
        <p style={{ fontSize: 13, color: "#8fa1bd", margin: "0 0 20px" }}>
          Sign in to view captured leads.
        </p>

        <label style={labelStyle}>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          style={inputStyle}
          required
        />

        {error && (
          <p style={{ color: "#ff8080", fontSize: 13, margin: "4px 0 12px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 8,
            padding: "12px 16px",
            borderRadius: 10,
            border: "none",
            background: loading ? "#2a5bd7aa" : "#2a5bd7",
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  color: "#8fa1bd",
  margin: "0 0 6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  marginBottom: 16,
  borderRadius: 10,
  border: "1px solid #2b3a55",
  background: "#0d131f",
  color: "#e9eef7",
  fontSize: 15,
  outline: "none",
};
