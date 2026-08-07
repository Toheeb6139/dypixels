type IconProps = { className?: string };

// Bold, filled glyphs — sized to fill their badge, not thin outlines.
// Nominative use (linking to the actual official profile), same as
// virtually every site's social row.

export function EmailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className}>
      <path fill="currentColor" d="M3 11.2 21 3l-6 18-4-7.3L3 11.2Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className}>
      <path
        fill="currentColor"
        d="M12 2.5A9.3 9.3 0 0 0 3.8 16.7L2.5 21.5l5-1.3A9.3 9.3 0 1 0 12 2.5Zm5.4 13.1c-.2.6-1.3 1.2-1.9 1.3-.5.1-1.1.1-1.8-.1a11 11 0 0 1-1.7-.6c-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .5 0 .7.5s.8 2 .9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.1.2-.3.3-.1.6.2.3.9 1.5 2 2.4 1.3 1.2 2.4 1.5 2.7 1.7.3.2.5.1.7-.1l.7-.8c.2-.3.4-.2.7-.1l1.9 1c.2.1.4.2.5.4.1.2.1.8-.1 1.4Z"
      />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className}>
      <path
        fill="currentColor"
        d="m4 3 7 9.2L4.3 21H7l5.4-6.4L17 21h4l-7.3-9.6L20.4 3H18l-5 6-4.5-6H4Zm2.7 1.6h2l9 11.8h-2l-9-11.8Z"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm14.3-1.9a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z"
      />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className}>
      <path
        fill="currentColor"
        d="M14.5 2.5h3c.2 1.9 1.5 3.3 3.5 3.5V9c-1.4 0-2.6-.4-3.5-1.1v6.6a5.6 5.6 0 1 1-5.6-5.6c.2 0 .5 0 .7.1v3.1a2.5 2.5 0 1 0 1.9 2.4V2.5Z"
      />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className}>
      <path
        fill="currentColor"
        d="M14.5 21v-7.5h2.5l.4-3H14.5V8.4c0-.9.2-1.5 1.5-1.5h1.6V4.3C17.3 4.2 16.3 4 15.2 4c-2.4 0-4 1.5-4 4.1v2.4H8.7v3h2.5V21h3.3Z"
      />
    </svg>
  );
}

export function ThreadsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className}>
      <path
        fill="currentColor"
        d="M12.2 2.5c4.7 0 7.8 3 8.1 7.7l-2.2.2c-.3-3.6-2.4-5.7-6-5.7-3.4 0-5.6 1.9-5.6 4.6 0 2.2 1.4 3.4 3 3.4 1.2 0 2-.7 2-1.6 0-.7-.4-1.3-1.1-1.3-.4 0-.6.2-.6.5 0 .2.1.3.3.4l-.3 1.7c-1.3-.2-2.2-1.3-2.2-2.7 0-1.6 1.3-2.9 3.2-2.9 2.1 0 3.6 1.5 3.6 3.6 0 2.3-1.7 3.9-4.2 3.9-3 0-5.5-2-5.5-5.9C4.7 3.9 8.1 1 12.2 1v1.5Z"
      />
    </svg>
  );
}

export function PinterestIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.9.2-2.7l1.4-6s-.3-.7-.3-1.7c0-1.6 1-2.8 2.1-2.8 1 0 1.5.7 1.5 1.7 0 1-.7 2.5-1 3.9-.3 1.1.6 2 1.7 2 2 0 3.5-2.5 3.5-6.1 0-2.5-1.8-4.4-4.9-4.4-3.6 0-5.7 2.6-5.7 5.4 0 1 .4 2.2.9 2.8.1.1.1.2.1.4l-.4 1.5c0 .2-.2.3-.4.1-1.4-.6-2.2-2.5-2.2-4.1 0-3.3 2.4-6.4 7-6.4 3.7 0 6.5 2.6 6.5 6.1 0 3.6-2.3 6.6-5.5 6.6-1.1 0-2.1-.6-2.4-1.2l-.7 2.6c-.2 1-.9 2.2-1.4 3A10 10 0 1 0 12 2Z"
      />
    </svg>
  );
}

export function BehanceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className}>
      <path
        fill="currentColor"
        d="M2 5.5h5.4c2.8 0 4.3 1.3 4.3 3.3 0 1.3-.7 2.2-1.9 2.7 1.6.4 2.5 1.6 2.5 3.2 0 2.4-2 3.8-5 3.8H2v-13Zm4.9 5c1.1 0 1.8-.5 1.8-1.5s-.7-1.4-1.8-1.4H4.6v2.9h2.3Zm.3 5.4c1.4 0 2.1-.6 2.1-1.7s-.7-1.7-2.1-1.7H4.6v3.4h2.6ZM14.3 6h5.4v1.6h-5.4V6Zm-.8 7.7c0-3.2 2-5.4 4.8-5.4 3 0 4.6 2.1 4.6 5.1v.9h-7c.2 1.6 1.2 2.5 2.7 2.5 1 0 1.8-.4 2.2-1.2l1.8 1c-.8 1.4-2.2 2.2-4.1 2.2-2.9 0-5-2.1-5-5.1Zm2.4-1.1h4.7c-.2-1.4-1.1-2.2-2.3-2.2-1.3 0-2.2.9-2.4 2.2Z"
      />
    </svg>
  );
}
