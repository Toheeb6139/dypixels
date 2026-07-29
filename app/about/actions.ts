"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { isSupabaseConfigured } from "@/lib/projects";

export async function submitLead(data: {
  name: string;
  email: string;
  message: string;
}): Promise<
  | { ok: true }
  | { ok: false; reason: "not_configured" }
  | { ok: false; reason: "error"; message: string }
> {
  if (!isSupabaseConfigured()) {
    // No database yet — the form component falls back to a pre-filled
    // mailto link instead of silently failing.
    return { ok: false, reason: "not_configured" };
  }

  const { error } = await supabase.from("leads").insert({
    name: data.name,
    email: data.email,
    message: data.message,
  });

  if (error) {
    return { ok: false, reason: "error", message: error.message };
  }

  revalidatePath("/admin/dashboard");
  return { ok: true };
}
