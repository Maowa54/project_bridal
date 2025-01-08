import daisyui from "daisyui"; // Use ES module import for daisyui

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      screens: {
        "custom-lg": "1278px", // Custom screen size for 1278px
        "custom-xl": "1656px", // Custom screen size for 1656px
      },
      backgroundImage: {
        "gradient-custom": "linear-gradient(to right, #20FFD2, #0D9470)",
        "sidebar-gradient-custom": "linear-gradient(to bottom, #20FFD2, #0D9470)", // More light-to-dark teal
      },
      fontFamily: {
        airstrip: ["Airstrip Four", "sans-serif"], // Fallback to sans-serif
      },
    },
  },
  plugins: [daisyui], // Use the ES module import directly here
  daisyui: {
    themes: ["light", "cupcake"],
  },
};
