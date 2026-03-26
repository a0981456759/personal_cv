import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#1a1b26",
          "bg-alt": "#24283b",
          "bg-highlight": "#292e42",
          border: "#3b4261",
        },
        text: {
          primary: "#c0caf5",
          secondary: "#565f89",
          muted: "#3b4261",
        },
        accent: {
          green: "#9ece6a",
          cyan: "#7dcfff",
          yellow: "#e0af68",
          purple: "#bb9af7",
          red: "#f7768e",
          orange: "#ff9e64",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Noto Sans TC"', "monospace"],
      },
      maxWidth: {
        terminal: "768px",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-in": "fadeIn 0.3s ease-out",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
