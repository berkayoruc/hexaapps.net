/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      colors: {
        ink: "#121417",
        paper: "#F4F4F1",
        muted: "#4A4D52",
        line: "#E2E2DC",
        accent: { DEFAULT: "#2B4EE6", dark: "#1F3BB8" },
        sun: { DEFAULT: "#FFC94A", tint: "#FFE7A3" },
        coral: { DEFAULT: "#FF7759", tint: "#FFD9CF", light: "#FF9A80" },
        mint: { DEFAULT: "#34C99A", tint: "#CDF3E1", ink: "#0B5E40" },
        lilac: "#B79CFF",
        peri: { tint: "#DCE4FF" },
      },
      boxShadow: {
        pop: "0 6px 0 #121417",
        "pop-sm": "0 4px 0 #121417",
        phone: "0 40px 80px -24px rgba(18,20,23,0.45)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
