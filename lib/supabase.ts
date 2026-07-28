import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Public, read-only client. Safe to use anywhere — it can only ever
// see rows that Row Level Security allows (published projects).
// Falls back to a placeholder so the app can still build and run on
// placeholder content before Supabase is connected (see lib/projects.ts).
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder"
);
