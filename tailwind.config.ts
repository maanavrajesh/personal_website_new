import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Familjen Grotesk", "Archivo", "sans-serif"],
        mono: ["Space Mono", "IBM Plex Mono", "monospace"],
      },
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        muted: "var(--muted-ink)",
        stock: "var(--ticket-stock)",
        board: "var(--board)",
        rail: "var(--rail)",
      },
    },
  },
  plugins: [],
};

export default config;
