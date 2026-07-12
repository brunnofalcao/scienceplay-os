import type { Config } from "tailwindcss";

// Design tokens extraídos do Brandbook Protocolo 5R v1.0 (Science Play).
// Regra de ouro: papel como fundo (nunca branco puro), navy dono da marca,
// âmbar como acento único (≤10% de qualquer peça).
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#2B3990", deep: "#131A45" },
        paper: "#F7F4EE",
        amber5r: "#C8842E",
        ink: "#1E2126",
        graphite: "#1E2126",
        mist: "#E9ECF7",
        line: "#E3DFD5",
        muted: "#6E7480",
        // Escala tonal dos 5 R's (denso → claro): o protocolo clareia o quadro.
        r1: "#131A45",
        r2: "#2B3990",
        r3: "#4353B8",
        r4: "#7C89D6",
        r5: "#B9C1EA",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: { prose: "70ch", wrap: "1120px" },
      letterSpacing: { kicker: "0.18em" },
    },
  },
  plugins: [],
};
export default config;
