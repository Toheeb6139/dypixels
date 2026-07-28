type SocialLink = {
  label: string;
  href: string;
};

// Your real contact points. Update here if any of these ever change —
// this file is the single source of truth, used in both the footer
// and the About page.
const socials: SocialLink[] = [
  { label: "Email", href: "mailto:dypixels.official@gmail.com" },
  { label: "WhatsApp", href: "https://wa.me/2349134597090" },
  { label: "X", href: "https://x.com/dypixels6139" },
  { label: "Instagram", href: "https://instagram.com/dypixels6139" },
  { label: "TikTok", href: "https://tiktok.com/@dypixels6139" },
  { label: "Facebook", href: "https://www.facebook.com/share/1C5BxGAYMr/" },
  { label: "Threads", href: "https://www.threads.com/@dypixels6139" },
  { label: "Pinterest", href: "https://pin.it/marPzWEOM" },
  { label: "Behance", href: "https://www.behance.net/dypixels" },
];

// A slight, deliberate rotation per tag — pinned-to-a-board, not a
// perfectly aligned nav list. Fixed per index so it's stable across
// renders rather than random on every load.
const tilts = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.5];

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      {socials.map((s, i) => {
        const external = s.href.startsWith("http");
        return (
          <a
            key={s.label}
            href={s.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` }}
            className={`docket inline-block bg-paper font-mono uppercase tracking-wider hover:text-flash hover:-translate-y-0.5 transition-all ${
              compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"
            }`}
          >
            {s.label}
          </a>
        );
      })}
    </div>
  );
}
