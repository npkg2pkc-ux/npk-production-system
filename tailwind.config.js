/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kadido: {
          navy: "#001B44",
          "navy-light": "#003366",
          cyan: "#00B4D8",
          "cyan-dark": "#0096C7",
          mint: "#7FFFD4",
          "mint-dark": "#5FE9C5",
        },
      },
    },
  },
  plugins: [],
};
