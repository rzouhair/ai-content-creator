const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        text: 'var(--text)',
        night: {
          DEFAULT: "#000f08",
          foreground: "#FFF",
          100: "#000302",
          200: "#000603",
          300: "#000905",
          400: "#000c07",
          500: "#000f08",
          600: "#00723d",
          700: "#00d572",
          800: "#39ffa3",
          900: "#9cffd1",
        },
        primary: {
          DEFAULT: "#662c91",
          foreground: "#FFF",
          100: "#14091d",
          200: "#28123a",
          300: "#3d1b57",
          400: "#512373",
          500: "#662c91",
          600: "#873bc2",
          700: "#a56cd2",
          800: "#c39de1",
          900: "#e1cef0",
        },
        ghost_white: {
          DEFAULT: "#e8e9f3",
          foreground: "#000f08",
          100: "#21233e",
          200: "#41467c",
          300: "#6b71b1",
          400: "#a9add2",
          500: "#e8e9f3",
          600: "#ecedf5",
          700: "#f1f2f8",
          800: "#f6f6fa",
          900: "#fafbfd",
        },
        platinum: {
          DEFAULT: "#e0e0e0",
          foreground: "#000f08",
          100: "#2d2d2d",
          200: "#5a5a5a",
          300: "#878787",
          400: "#b4b4b4",
          500: "#e0e0e0",
          600: "#e7e7e7",
          700: "#ededed",
          800: "#f3f3f3",
          900: "#f9f9f9",
        },
        secondary: {
          DEFAULT: "#b5d959",
          foreground: "#000f08",
          100: "#27320b",
          200: "#4e6417",
          300: "#759622",
          400: "#9cc82d",
          500: "#b5d959",
          600: "#c4e17a",
          700: "#d3e89b",
          800: "#e1f0bc",
          900: "#f0f7de",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        /* primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        }, */
        light: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@headlessui/tailwindcss"),
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(["tabler"]),
    }),
  ],
};
