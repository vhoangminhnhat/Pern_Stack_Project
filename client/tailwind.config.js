/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.ts",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
