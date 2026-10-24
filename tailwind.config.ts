import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ardna: {
          primary: "#174B35",
          "primary-dark": "#0D3022",
          "primary-light": "#1E6344",
          secondary: "#3D8852",
          "secondary-light": "#4FA066",
          cream: "#F7F7F0",
          "cream-dark": "#EEEEE5",
          gold: "#DDAA57",
          "gold-light": "#E8C07A",
          "gold-dark": "#C48E3A",
          surface: "#FFFFFF",
          muted: "#6B7280",
          warning: "#D97706",
          error: "#DC2626",
          success: "#059669",
        },
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        arabic: ["IBM Plex Sans Arabic", "Cairo", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
