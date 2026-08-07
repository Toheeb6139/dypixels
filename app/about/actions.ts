"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { isSupabaseConfigured } from "@/lib/projects";

const NOTIFY_EMAIL = "dypixels.official@gmail.com";

// Best-effort — a failed notification should never break lead
// submission itself (the lead is already safely saved in Supabase and
// visible in /admin regardless of whether this email goes out). Does
// log failures to the server console (visible in Vercel's function
// logs) so a misconfiguration is actually discoverable instead of
// silently vanishing.
async function sendLeadNotification(data: { name: string; email: string; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping lead notification email.");
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "dypixels site <onboarding@resend.dev>",
        to: NOTIFY_EMAIL,
        reply_to: data.email,
        subject: `New inquiry from ${data.name}`,
        text: `${data.message}\n\n— ${data.name} (${data.email})\n\nView all leads: ${process.env.NEXT_PUBLIC_SITE_URL || "https://dypixels.vercel.app"}/admin/dashboard`,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `Resend notification failed (${res.status}): ${body}. ` +
          `Note: onboarding@resend.dev can only deliver to the exact email address your Resend account was signed up with, until a real domain is verified.`
      );
    }
  } catch (err) {
    console.error("Resend notification threw:", err);
  }
}

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
  await sendLeadNotification(data);
  return { ok: true };
}
