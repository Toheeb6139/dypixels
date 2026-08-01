import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Theme-relative — flip between light/dark via the CSS
        // variables defined in globals.css. Use these for page chrome:
        // backgrounds, body text, borders.
        paper: "var(--color-paper)",
        ink: "var(--color-ink)",
        flash: "var(--color-flash)",
        flag: "var(--color-flag)",
        mute: "var(--color-mute)",
        line: "var(--color-line)",
        // Fixed — same value regardless of theme. Use for things that
        // are always dark (media letterboxes) or always light (text
        // sitting on the permanently-indigo footer/ticker).
        charcoal: "#16161B",
        cream: "#EFEDE7",
        spark: "#FFC53D", // warm yellow accent — grommet circles, footer highlight
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
