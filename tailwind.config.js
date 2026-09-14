/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "ui-sans-serif", "system-ui"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        heroIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        heroIn: "heroIn 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};
