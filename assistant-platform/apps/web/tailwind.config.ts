import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#07050f",
        surface: "#110a1f",
        accent: "#d946ef",
        glow: "#a855f7",
      },
      boxShadow: {
        glow: "0 0 60px rgba(217,70,239,.35)",
      },
    },
  },
  plugins: [],
};

export default config;
