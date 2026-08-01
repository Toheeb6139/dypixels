// Deterministic per-project accent — the same project always gets the
// same color, but different projects vary. Can also be explicitly
// overridden per project (see badge_color in /admin) instead of
// relying purely on the automatic hash.
export const ACCENTS = [
  { bg: "#ECEAFE", text: "#4B3AFF", name: "Indigo" },
  { bg: "#FEF3C7", text: "#B45309", name: "Amber" },
  { bg: "#FEE2E2", text: "#DC2626", name: "Rose" },
  { bg: "#D1FAE5", text: "#047857", name: "Emerald" },
  { bg: "#DBEAFE", text: "#1D4ED8", name: "Sky" },
  { bg: "#EDE9FE", text: "#6D28D9", name: "Violet" },
];

function hashToIndex(str: string, mod: number) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % mod;
}

export function getProjectAccent(seed: string, override?: number | null) {
  if (typeof override === "number" && override >= 0 && override < ACCENTS.length) {
    return ACCENTS[override];
  }
  return ACCENTS[hashToIndex(seed, ACCENTS.length)];
}
