/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        ["lfui-border"]: "hsl(var(--lfui-border))",
        ["lfui-input"]: "hsl(var(--lfui-input))",
        ["lfui-ring"]: "hsl(var(--lfui-ring))",
        ["lfui-background"]: "hsl(var(--lfui-background))",
        ["lfui-foreground"]: "hsl(var(--lfui-foreground))",
        ["lfui-primary"]: {
          DEFAULT: "hsl(var(--lfui-primary))",
          foreground: "hsl(var(--lfui-primary-foreground))",
        },
        ["lfui-secondary"]: {
          DEFAULT: "hsl(var(--lfui-secondary))",
          foreground: "hsl(var(--lfui-secondary-foreground))",
        },
        ["lfui-destructive"]: {
          DEFAULT: "hsl(var(--lfui-destructive))",
          foreground: "hsl(var(--lfui-destructive-foreground))",
        },
        ["lfui-muted"]: {
          DEFAULT: "hsl(var(--lfui-muted))",
          foreground: "hsl(var(--lfui-muted-foreground))",
        },
        ["lfui-accent"]: {
          DEFAULT: "hsl(var(--lfui-accent))",
          foreground: "hsl(var(--lfui-accent-foreground))",
        },
        ["lfui-popover"]: {
          DEFAULT: "hsl(var(--lfui-popover))",
          foreground: "hsl(var(--lfui-popover-foreground))",
        },
        ["lfui-card"]: {
          DEFAULT: "hsl(var(--lfui-card))",
          foreground: "hsl(var(--lfui-card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--lfui-radius)",
        md: "calc(var(--lfui-radius) - 2px)",
        sm: "calc(var(--lfui-radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
