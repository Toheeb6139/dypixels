import { createClient } from "@supabase/supabase-js";

// SERVER-ONLY. Uses the service role key, which bypasses Row Level
// Security entirely. Never import this file from a client component,
// and never send SUPABASE_SERVICE_ROLE_KEY to the browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isAdminConfigured() {
  return Boolean(supabaseUrl && serviceRoleKey);
}

// Falls back to a placeholder URL when unconfigured so the module can
// still be imported (and the dashboard can render a setup message)
// without throwing at import time.
export const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  serviceRoleKey || "placeholder",
  { auth: { persistSession: false } }
);
