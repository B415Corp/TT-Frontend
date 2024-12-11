/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        primary: "#69d2e7",
        secondary: "#a7dbd8",
        background: "#e0e4cc",
        accent: "#f38630",
        accent2: "#fa6900",
        text: "black",
        background: "#212121",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
