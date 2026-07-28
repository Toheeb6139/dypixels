export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="docket inline-flex items-center gap-1 px-3 py-1 ml-2 text-[11px] uppercase tracking-wider font-mono text-ink bg-paper">
      {children}
    </span>
  );
}
