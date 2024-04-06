/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#516CF0",
        },
        secondary: {
          DEFAULT: "#FF8500",
        },
        tertiary: {
          DEFAULT: "#232F3E",
        },
        quaternary: {
          DEFAULT: "llinear-gradient(310deg, #000, #ff4800);",
        },
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
