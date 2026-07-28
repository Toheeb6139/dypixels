export function CoverPlaceholder({
  title,
  variant = "card",
}: {
  title: string;
  variant?: "card" | "featured";
}) {
  const isFeatured = variant === "featured";

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-paper overflow-hidden border border-line">
      {/* Refined branded texture — subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #16161B 0, #16161B 0.5px, transparent 0.5px, transparent 10px)",
        }}
      />
      {/* Soft vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/[0.03] to-transparent" />

      <p
        className={`relative font-mono uppercase tracking-widest text-ink/70 text-center px-6 ${
          isFeatured ? "text-sm md:text-base" : "text-[11px] md:text-xs"
        }`}
      >
        {title}
      </p>
    </div>
  );
}
