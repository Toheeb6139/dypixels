import type { CSSProperties } from "react";
import {
  EmailIcon,
  WhatsAppIcon,
  XIcon,
  InstagramIcon,
  TikTokIcon,
  FacebookIcon,
  ThreadsIcon,
  PinterestIcon,
  BehanceIcon,
} from "./SocialIcons";

type SocialLink = {
  label: string;
  href: string;
  Icon: (props: { className?: string }) => React.ReactElement;
};

// Your real contact points. Update here if any of these ever change —
// this file is the single source of truth, used in both the footer
// and the About page.
const socials: SocialLink[] = [
  { label: "Email", href: "mailto:dypixels.official@gmail.com", Icon: EmailIcon },
  { label: "WhatsApp", href: "https://wa.me/2349134597090", Icon: WhatsAppIcon },
  { label: "X", href: "https://x.com/dypixels6139", Icon: XIcon },
  { label: "Instagram", href: "https://instagram.com/dypixels6139", Icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com/@dypixels6139", Icon: TikTokIcon },
  { label: "Facebook", href: "https://www.facebook.com/share/1C5BxGAYMr/", Icon: FacebookIcon },
  { label: "Threads", href: "https://www.threads.com/@dypixels6139", Icon: ThreadsIcon },
  { label: "Pinterest", href: "https://pin.it/marPzWEOM", Icon: PinterestIcon },
  { label: "Behance", href: "https://www.behance.net/dypixels", Icon: BehanceIcon },
];

// A slight, deliberate rotation per tag — pinned-to-a-board, not a
// perfectly aligned nav list. Fixed per index so it's stable across
// renders rather than random on every load.
const tilts = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.5, 2.2];

export function SocialLinks({
  compact = false,
  inverted = false,
  only,
}: {
  compact?: boolean;
  inverted?: boolean;
  only?: string[];
}) {
  const items = only ? socials.filter((s) => only.includes(s.label)) : socials;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s, i) => {
        const external = s.href.startsWith("http");
        return (
          <a
            key={s.label}
            href={s.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={s.label}
            title={s.label}
            style={{ "--tilt": `${tilts[i % tilts.length]}deg` } as CSSProperties}
            className={`docket flex items-center justify-center transition-colors ${
              inverted
                ? "docket-inverted bg-transparent text-cream hover:text-spark"
                : "bg-paper text-ink hover:text-flash"
            } ${compact ? "w-8 h-8" : "w-9 h-9"}`}
          >
            <s.Icon />
          </a>
        );
      })}
    </div>
  );
}
