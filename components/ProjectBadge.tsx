import { getProjectAccent } from "@/lib/theme";

// The colorful, theme-matched badge — client name, project type, etc.
// Same seed (project slug) always produces the same color, so a
// project's badges stay visually consistent with each other — unless
// an explicit colorIndex override is set (see /admin), which wins.
export function ProjectBadge({
  children,
  seed,
  colorIndex,
}: {
  children: React.ReactNode;
  seed: string;
  colorIndex?: number | null;
}) {
  const { bg, text } = getProjectAccent(seed, colorIndex);
  return (
    <span
      className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full"
      style={{ backgroundColor: bg, color: text }}
    >
      {children}
    </span>
  );
}

// The neutral counterpart — for facts that aren't part of a project's
// "identity" (like the year), so they stay visually calm rather than
// competing with the theme-matched badges.
export function NeutralBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-600">
      {children}
    </span>
  );
}
