import { redirect } from "next/navigation";
import { isAuthenticated, adminUsername } from "@/lib/auth";
import { listLeads } from "@/lib/db";
import AdminDashboard from "./AdminDashboard";

// The admin dashboard is dynamic (per-request auth + live data) and must never
// be cached or statically rendered.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
  const leads = listLeads();
  return <AdminDashboard leads={leads} username={adminUsername()} />;
}
