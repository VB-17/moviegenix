module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        dark: {
          50: "#5F626B",
          100: "#555962",
          200: "#4C4F59",
          300: "#424651",
          400: "#424651",
          500: "#393D48",
          600: "#2F343F",
          700: "#262A36",
          800: "#1C212E",
          900: "#131825",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "list-gradient": "linear-gradient(90deg, transparent 90%, #64748b)",
      },
    
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
