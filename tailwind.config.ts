import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EFEDE7", // chalk white — the gallery wall
        ink: "#16161B", // near-black, warm dark
        flash: "#4B3AFF", // signature electric indigo
        flag: "#FF4433", // small dose of wit — errors, hovers, tiny accents
        spark: "#FFC53D", // warm yellow accent — grommet circles, footer highlight
        mute: "#8C8A90", // meta / caption grey
        line: "#D9D6CD", // hairline dividers
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        tag: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
