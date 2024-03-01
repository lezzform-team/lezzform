/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "lf-",
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
        border: "hsl(var(--lf-border))",
        input: "hsl(var(--lf-input))",
        ring: "hsl(var(--lf-ring))",
        background: "hsl(var(--lf-background))",
        foreground: "hsl(var(--lf-foreground))",
        primary: {
          DEFAULT: "hsl(var(--lf-primary))",
          foreground: "hsl(var(--lf-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--lf-secondary))",
          foreground: "hsl(var(--lf-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--lf-destructive))",
          foreground: "hsl(var(--lf-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--lf-muted))",
          foreground: "hsl(var(--lf-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--lf-accent))",
          foreground: "hsl(var(--lf-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--lf-popover))",
          foreground: "hsl(var(--lf-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--lf-card))",
          foreground: "hsl(var(--lf-card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--lf-radius)",
        md: "calc(var(--lf-radius) - 2px)",
        sm: "calc(var(--lf-radius) - 4px)",
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
  plugins: [require("tailwindcss-animate")],
};
