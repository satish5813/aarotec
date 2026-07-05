import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Minimal admin auth: a single username/password pair stored in env vars.
// On login we hand out an HMAC-signed cookie so we never store sessions
// server-side. Change ADMIN_USERNAME / ADMIN_PASSWORD to set the credentials.

export const SESSION_COOKIE = "admin_session";

// Defaults are provided so the feature works out of the box in local dev.
// ALWAYS override these in production via environment variables.
export function adminUsername() {
  return process.env.ADMIN_USERNAME || "admin";
}
function adminPassword() {
  return process.env.ADMIN_PASSWORD || "changeme123";
}
function secret() {
  // Fall back to a value derived from the password so the cookie is still
  // tamper-resistant even if ADMIN_SESSION_SECRET is not set.
  return process.env.ADMIN_SESSION_SECRET || `lumino-${adminPassword()}`;
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function verifyCredentials(username: string, password: string) {
  return safeEqual(username, adminUsername()) && safeEqual(password, adminPassword());
}

// Token format: "<username>.<hmac(username)>"
export function makeToken() {
  const user = adminUsername();
  const sig = createHmac("sha256", secret()).update(user).digest("hex");
  return `${user}.${sig}`;
}

export function isValidToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const user = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret()).update(user).digest("hex");
  return safeEqual(user, adminUsername()) && safeEqual(sig, expected);
}

// Server-side check for use in Server Components / route handlers.
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return isValidToken(store.get(SESSION_COOKIE)?.value);
}
