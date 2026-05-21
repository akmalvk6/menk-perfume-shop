/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* Luxury customer palette */
        cream: "#F7F5F2",
        gold: "#C9A13B",
        "gold-dark": "#B88A1D",
        "gold-light": "#D4B44A",
        ink: "#1A1A1A",
        "ink-light": "#4A4A4A",
        "warm-white": "#FEFDFB",
        /* Admin palette (preserved) */
        mist: "#f4f1eb",
        rosewood: "#7f2d35",
        velvet: "#100019",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", '"Times New Roman"', "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        logo: ["Outfit", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 30px rgba(0, 0, 0, 0.05)",
        card: "0 8px 40px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 20px 60px rgba(0, 0, 0, 0.1)",
        gold: "0 4px 30px rgba(201, 161, 59, 0.15)",
        "gold-hover": "0 8px 40px rgba(201, 161, 59, 0.25)",
      },
    },
  },
  plugins: [],
};
