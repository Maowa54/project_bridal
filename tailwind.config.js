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
        "gradient-custom": "linear-gradient(to left, #28DEFC, #444CB4)",
        "sidebar-gradient-custom": "linear-gradient(to left, #444CB4, #00aaff)",
      },

      fontFamily: {
        airstrip: ["Airstrip Four", "sans-serif"], // Fallback to sans-serif
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "cupcake"],
  },
};
