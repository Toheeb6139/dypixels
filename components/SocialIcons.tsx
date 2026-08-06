type IconProps = { className?: string };

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function EmailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} {...strokeProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} {...strokeProps}>
      <path d="M6.5 17.5 4 20l2.6-2.4A8 8 0 1 1 12 20a8 8 0 0 1-5.5-2.5z" />
      <path d="M9 9.8c0 3 2.6 5.4 5.5 5.4.7 0 1-.6.9-1.2l-.2-1a.8.8 0 0 0-.8-.6l-1.2.2a4.2 4.2 0 0 1-2.3-2.3l.2-1.2a.8.8 0 0 0-.6-.8l-1-.2c-.6-.1-1.2.2-1.2.9z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} {...strokeProps}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} {...strokeProps}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} {...strokeProps}>
      <path d="M14 4v10.5a3 3 0 1 1-3-3" />
      <path d="M14 4c0 2.5 2 4.5 4.5 4.5" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} {...strokeProps}>
      <path d="M15 21v-8h2.5l.5-3.5h-3V7.2c0-1 .4-1.7 1.9-1.7H18V2.3A20 20 0 0 0 15.6 2c-2.4 0-4.1 1.5-4.1 4.2v3.3H9V13h2.5v8" />
    </svg>
  );
}

export function ThreadsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} {...strokeProps}>
      <circle cx="12" cy="12" r="4.3" />
      <path d="M15.3 12c0 2.6-1 4.8-3.6 4.8S8 17 8 13.6 9.4 8 12 8c2 0 3.3 1.1 3.3 1.1" />
    </svg>
  );
}

export function PinterestIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} {...strokeProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.5 18c1-3.5 1.5-6 1.5-7.3a2 2 0 0 1 4 .2c0 1.4-1 3.6-1.5 4.6-.4 1 .2 1.9 1.2 1.9 2 0 3.3-2.5 3.3-4.9 0-2.6-2-4.4-4.6-4.4-3 0-4.8 2.2-4.8 4.4 0 .8.3 1.6.7 2" />
    </svg>
  );
}

export function BehanceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} {...strokeProps}>
      <path d="M3 6.5h5c3.5 0 3.5 4.5 0 4.5H3z" />
      <path d="M3 11h5.3c3.9 0 3.9 5 0 5H3z" />
      <path d="M14.5 12.2h6.3c0-3-1.6-4.7-3.3-4.7-2.4 0-3.9 2-3.9 4.6 0 2.9 1.6 4.7 4 4.7 1.5 0 2.5-.6 3.1-1.7" />
      <path d="M15 6.3h4.8" />
    </svg>
  );
}
