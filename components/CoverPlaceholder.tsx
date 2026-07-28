// Deterministic per-project accent so the same project always gets the
// same color, but different projects vary — no two placeholder covers
// look identical, even before real images exist.
function hashToIndex(str: string, mod: number) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % mod;
}

const accents = [
  { bg: "#4B3AFF", fg: "#EFEDE7" }, // flash indigo
  { bg: "#FF4433", fg: "#EFEDE7" }, // flag red
  { bg: "#16161B", fg: "#EFEDE7" }, // ink
];

export function CoverPlaceholder({ title }: { title: string }) {
  const { bg, fg } = accents[hashToIndex(title, accents.length)];
  const initial = title.trim().charAt(0).toUpperCase() || "?";

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: bg, color: fg }}
    >
      <span
        aria-hidden="true"
        className="absolute font-display font-extrabold select-none leading-none"
        style={{ fontSize: "13rem", opacity: 0.16, color: fg }}
      >
        {initial}
      </span>
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${fg} 0, ${fg} 1px, transparent 1px, transparent 12px)`,
        }}
      />
      <p className="relative font-mono text-[11px] uppercase tracking-widest text-center px-6">
        Cover pending
        <br />
        <span className="opacity-70">{title}</span>
      </p>
    </div>
  );
}
