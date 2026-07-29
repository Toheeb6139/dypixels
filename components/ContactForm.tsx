"use client";

import { useState } from "react";
import { submitLead } from "@/app/about/actions";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

const inputClass =
  "w-full border border-line bg-paper px-3 py-2.5 font-body text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-flash";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const result = await submitLead({ name, email, message });

      if (result.ok) {
        setStatus("sent");
        return;
      }

      if (result.reason === "not_configured") {
        const subject = encodeURIComponent(`Project inquiry from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:dypixels.official@gmail.com?subject=${subject}&body=${body}`;
        setStatus("fallback");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="font-mono text-sm text-flash max-w-md">
        Got it — I'll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <input
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <input
        required
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <textarea
        required
        placeholder="What are you working on?"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={inputClass}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="docket px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:text-flash disabled:opacity-40"
      >
        {status === "sending" ? "Sending…" : "Send →"}
      </button>

      {status === "fallback" && (
        <p className="font-mono text-xs text-mute">
          Opening your email app to finish sending.
        </p>
      )}
      {status === "error" && (
        <p className="font-mono text-xs text-flag">
          Something went wrong — email me directly instead.
        </p>
      )}
    </form>
  );
}
