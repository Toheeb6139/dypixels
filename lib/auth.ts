// Lightweight, dependency-free string hash so the session cookie value
// is never the raw secret itself. This is a single-admin password gate,
// not general-purpose auth — good enough for "only I can edit my site,"
// not a substitute for real auth if this ever needs multiple users.
export function hashSecret(secret: string) {
  let hash = 0;
  for (let i = 0; i < secret.length; i++) {
    hash = (hash << 5) - hash + secret.charCodeAt(i);
    hash |= 0;
  }
  return `s${hash}`;
}

export const ADMIN_COOKIE_NAME = "dypixels_admin";
