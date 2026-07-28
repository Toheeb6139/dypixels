"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-paper">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <p className="font-mono text-xs uppercase tracking-widest text-mute mb-3 text-center">
          dypixels / admin
        </p>
        <h1 className="font-display text-2xl mb-8 text-center">
          Only you should be here.
        </h1>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-ink bg-paper px-4 py-3 font-mono text-sm mb-4 focus:outline-none focus-visible:outline-2 focus-visible:outline-flash"
        />

        {error && (
          <p className="font-mono text-xs text-flag mb-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full docket px-4 py-3 font-mono text-xs uppercase tracking-wider hover:text-flash transition-colors disabled:opacity-40"
        >
          {loading ? "Checking…" : "Enter"}
        </button>
      </form>
    </main>
  );
}
