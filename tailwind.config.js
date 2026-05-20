/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#151515",
        saffron: "#c47d2b",
        rosewood: "#7f2d35",
        mist: "#f4f1eb",
        leaf: "#46624a",
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(21, 21, 21, 0.10)",
      },
    },
  },
  plugins: [],
};
