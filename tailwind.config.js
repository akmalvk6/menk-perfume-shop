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
        velvet: "#100019",
        plasma: "#f45474",
        cyan: "#28e2ff",
        gold: "#f0b45c",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(21, 21, 21, 0.10)",
        neon: "0 24px 80px rgba(244, 84, 116, 0.25)",
      },
    },
  },
  plugins: [],
};
