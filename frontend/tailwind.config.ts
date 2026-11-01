import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dark: "#4f46e5",
        },

        secondary: {
          DEFAULT: "#8b5cf6",
          light: "#a78bfa",
          dark: "#7c3aed",
        },

        success: {
          DEFAULT: "#10b981",
          light: "#34d399",
          dark: "#059669",
        },

        warning: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
          dark: "#d97706",
        },

        danger: {
          DEFAULT: "#ef4444",
          light: "#f87171",
          dark: "#dc2626",
        },

        background: "#f4f5fb",
        surface: "#ffffff",
        foreground: "#20283b",
        muted: "#9299aa",
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },

      borderRadius: {
        clay: "20px",
        "clay-sm": "12px",
        "clay-lg": "26px",
      },

      boxShadow: {
        clay: "7px 7px 16px rgba(163,177,198,0.28), -7px -7px 16px rgba(255,255,255,0.9)",

        "clay-inset":
          "inset 3px 3px 6px rgba(163,177,198,0.2), inset -3px -3px 6px rgba(255,255,255,0.9)",

        "clay-hover":
          "9px 9px 19px rgba(163,177,198,0.3), -9px -9px 19px rgba(255,255,255,0.95)",
      },

      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s infinite",
      },

      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },

        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(12px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        pulseSoft: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.6",
          },
        },
      },
    },
  },

  plugins: [],
};

export default config;