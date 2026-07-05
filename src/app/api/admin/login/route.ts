import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, makeToken, verifyCredentials } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let username = "";
  let password = "";

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    username = String(body.username || "");
    password = String(body.password || "");
  } else {
    const form = await request.formData();
    username = String(form.get("username") || "");
    password = String(form.get("password") || "");
  }

  if (!verifyCredentials(username.trim(), password)) {
    return NextResponse.json(
      { ok: false, error: "Invalid username or password." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
