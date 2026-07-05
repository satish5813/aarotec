import { NextRequest } from "next/server";
import { insertLead } from "@/lib/db";

// Receives a lead from the contact form and saves it to the local SQLite
// database (src/lib/db.ts). Saved leads are viewable in the admin dashboard
// at /admin. Optionally, if LEADS_WEBHOOK_URL is set, each lead is ALSO
// forwarded to a Google Sheet — see LEADS_SETUP.md.

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  // honeypot — real users never fill this
  company?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: NextRequest) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bot trap: pretend success but drop the lead.
  if (body.company && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const city = (body.city || "").trim();

  if (!name || !email || !phone || !city) {
    return Response.json(
      { ok: false, error: "Please fill in all fields." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return Response.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 }
    );
  }

  const lead = {
    name,
    email,
    phone,
    city,
    source: request.headers.get("referer") || "website",
    userAgent: request.headers.get("user-agent") || "",
  };

  // 1) Save to SQLite — this is the primary store behind the /admin dashboard.
  try {
    insertLead(lead);
  } catch (err) {
    console.error("[lead] failed to save to SQLite:", err, { name, email, phone });
    return Response.json(
      { ok: false, error: "Could not submit right now. Please try again or call us." },
      { status: 500 }
    );
  }

  // 2) Optionally forward to a Google Sheet as well, if configured. A webhook
  //    failure here must NOT lose the lead — it's already saved above — so we
  //    only log and still return success.
  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        // Apps Script can be slow on cold start; give it room.
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[lead] saved locally but failed to forward to sheet:", err, {
        name,
        email,
      });
    }
  }

  return Response.json({ ok: true });
}
