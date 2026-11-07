/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#09090B",
        bone: "#F4F4F0",
        acid: "#D4FF00",
        coal: "#121216",
        smoke: "#8E8E93",
        amber2: "#F59E0B",
        border: "rgba(255, 255, 255, 0.12)",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        serifac: ["Instrument Serif", "serif"],
        mono2: ["JetBrains Mono", "monospace"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.6, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.08)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

