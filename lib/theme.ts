// Deterministic per-project accent — the same project always gets the
// same color pairing, different projects vary. Soft pastel background
// + a readable, saturated text color, styled after common status-pill
// UI patterns.
const ACCENTS = [
  { bg: "#ECEAFE", text: "#4B3AFF" }, // indigo
  { bg: "#FEF3C7", text: "#B45309" }, // amber
  { bg: "#FEE2E2", text: "#DC2626" }, // rose
  { bg: "#D1FAE5", text: "#047857" }, // emerald
  { bg: "#DBEAFE", text: "#1D4ED8" }, // sky
  { bg: "#EDE9FE", text: "#6D28D9" }, // violet
];

function hashToIndex(str: string, mod: number) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % mod;
}

export function getProjectAccent(seed: string) {
  return ACCENTS[hashToIndex(seed, ACCENTS.length)];
}
