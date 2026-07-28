import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EFEDE7",
        ink: "#16161B",
        flash: "#4B3AFF",
        flag: "#FF4433",
        mute: "#8C8A90",
        line: "#D9D6CD",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        tag: "2px",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 40%" },
          "50%": { backgroundPosition: "100% 60%" },
        },
        "brands-cycle": {
          "0%, 20%": { opacity: "1", transform: "translateY(0)" },
          "25%, 100%": { opacity: "0", transform: "translateY(4px)" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
