import { supabaseAdmin, isAdminConfigured } from "@/lib/supabaseAdmin";
import { Project, Lead } from "@/lib/types";
import { DashboardClient } from "./DashboardClient";

// This page shows live projects and lead submissions behind a login —
// it should never be served from a stale build-time snapshot.
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  if (!isAdminConfigured()) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-paper">
        <div className="max-w-md font-mono text-sm">
          <p className="text-flag uppercase tracking-wider text-xs mb-3">
            Supabase not connected
          </p>
          <p className="text-ink/80">
            Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and
            SUPABASE_SERVICE_ROLE_KEY to your environment, run the schema in
            supabase/schema.sql, then redeploy. See README.md.
          </p>
        </div>
      </main>
    );
  }

  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  const { data: leads } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <DashboardClient
      projects={(projects as Project[]) ?? []}
      leads={(leads as Lead[]) ?? []}
    />
  );
}
