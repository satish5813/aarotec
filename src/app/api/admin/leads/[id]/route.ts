import { NextResponse } from "next/server";
import { deleteLead } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId)) {
    return NextResponse.json({ ok: false, error: "Bad id" }, { status: 400 });
  }
  deleteLead(numId);
  return NextResponse.json({ ok: true });
}
