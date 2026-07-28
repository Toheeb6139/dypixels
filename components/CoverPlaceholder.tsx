export function CoverPlaceholder({ title }: { title: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-ink text-paper overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #EFEDE7 0, #EFEDE7 1px, transparent 1px, transparent 12px)",
        }}
      />
      <p className="relative font-mono text-[11px] uppercase tracking-widest text-center px-6">
        image pending
        <br />
        <span className="opacity-60">{title}</span>
      </p>
    </div>
  );
}
